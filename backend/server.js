/**
 * Mental Wellness Daily Check-In App - Backend Server
 * 
 * SDG 3 Alignment: Good Health & Well-Being
 * This application supports mental wellness by providing a daily check-in system
 * that helps users track their mood, stress levels, and sleep quality, with
 * AI-generated insights to promote self-awareness and well-being.
 * 
 * Ethical Note: This application does not provide medical diagnosis or treatment.
 * It is a wellness tool designed to promote self-awareness and healthy habits.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite default port
  credentials: true
}));
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mental Wellness API is running' });
});

/**
 * POST /api/checkin
 * 
 * Receives daily wellness check-in data from frontend, sends it to Relay.app webhook
 * for AI-generated insights, stores everything in Supabase, and returns the insight.
 * 
 * Request body:
 * {
 *   mood: number (1-5),
 *   stress_level: string ('low' | 'medium' | 'high'),
 *   sleep_quality: string ('poor' | 'average' | 'good'),
 *   note: string (optional)
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   ai_insight: string,
 *   timestamp: string
 * }
 */
app.post('/api/checkin', async (req, res) => {
  try {
    const { mood, stress_level, sleep_quality, note } = req.body;

    // Validate required fields
    if (mood === undefined || !stress_level || !sleep_quality) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: mood, stress_level, and sleep_quality are required'
      });
    }

    // Validate mood range
    if (mood < 1 || mood > 5) {
      return res.status(400).json({
        success: false,
        error: 'Mood must be between 1 and 5'
      });
    }

    // Validate stress_level
    const validStressLevels = ['low', 'medium', 'high'];
    if (!validStressLevels.includes(stress_level.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: 'stress_level must be one of: low, medium, high'
      });
    }

    // Validate sleep_quality
    const validSleepQualities = ['poor', 'average', 'good'];
    if (!validSleepQualities.includes(sleep_quality.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: 'sleep_quality must be one of: poor, average, good'
      });
    }

    // Create timestamp
    const timestamp = new Date().toISOString();

    // Prepare payload for Relay.app webhook
    const relayPayload = {
      mood: parseInt(mood),
      stress_level: stress_level.toLowerCase(),
      sleep_quality: sleep_quality.toLowerCase(),
      note: note || '',
      timestamp: timestamp,
      sdg: 'SDG 3'
    };

    // Call Relay.app webhook
    const relayWebhookUrl = process.env.RELAY_WEBHOOK_URL;
    
    if (!relayWebhookUrl) {
      return res.status(500).json({
        success: false,
        error: 'Relay webhook URL not configured'
      });
    }

    let aiInsight = '';
    
    try {
      const relayResponse = await fetch(relayWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(relayPayload)
      });

      if (!relayResponse.ok) {
        throw new Error(`Relay webhook returned status ${relayResponse.status}`);
      }

      const relayData = await relayResponse.json();
      
      // Extract AI insight from response (adjust based on your Relay.app response structure)
      // Common patterns: relayData.insight, relayData.message, relayData.ai_insight, or relayData itself
      aiInsight = relayData.insight || relayData.message || relayData.ai_insight || JSON.stringify(relayData);
      
    } catch (relayError) {
      console.error('Error calling Relay webhook:', relayError);
      // Fallback insight if webhook fails
      aiInsight = 'Thank you for your check-in. Remember to take care of yourself today.';
    }

    // Store data in Supabase
    const { data: insertedData, error: supabaseError } = await supabase
      .from('check_ins')
      .insert([
        {
          mood: parseInt(mood),
          stress_level: stress_level.toLowerCase(),
          sleep_quality: sleep_quality.toLowerCase(),
          note: note || null,
          ai_insight: aiInsight,
          created_at: timestamp
        }
      ])
      .select()
      .single();

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      return res.status(500).json({
        success: false,
        error: 'Failed to save check-in data',
        details: supabaseError.message
      });
    }

    // Return success response with AI insight
    res.json({
      success: true,
      ai_insight: aiInsight,
      timestamp: timestamp,
      id: insertedData.id
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mental Wellness API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🎯 Check-in endpoint: http://localhost:${PORT}/api/checkin`);
});
