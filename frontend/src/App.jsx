/**
 * Mental Wellness Daily Check-In App - Main App Component
 * 
 * SDG 3 Alignment: Good Health & Well-Being
 * This application helps users track their daily mental wellness through
 * mood, stress level, and sleep quality check-ins, providing AI-generated
 * insights to promote self-awareness and well-being.
 * 
 * Ethical Note: This application does not provide medical diagnosis or treatment.
 * It is a wellness tool designed to promote self-awareness and healthy habits.
 */

import { useState } from 'react'
import CheckInForm from './components/CheckInForm'
import Disclaimer from './components/Disclaimer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🌱 Mental Wellness Check-In
          </h1>
          <p className="text-gray-600">
            Take a moment to reflect on your day
          </p>
        </header>

        {/* Main Form */}
        <CheckInForm />

        {/* Disclaimer */}
        <Disclaimer />
      </div>
    </div>
  )
}

export default App
