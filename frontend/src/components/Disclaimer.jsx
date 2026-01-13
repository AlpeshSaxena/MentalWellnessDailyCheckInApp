/**
 * Disclaimer Component
 * 
 * Displays a clear, visible disclaimer that this application
 * does not provide medical advice.
 */

function Disclaimer() {
  return (
    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
      <div className="flex items-start">
        <span className="text-yellow-600 text-xl mr-2">⚠️</span>
        <div>
          <p className="text-yellow-800 font-semibold text-sm mb-1">
            Important Disclaimer
          </p>
          <p className="text-yellow-700 text-sm">
            <strong>This is not medical advice.</strong> This application is a wellness tool 
            designed to help you track your daily mental wellness and promote self-awareness. 
            It does not provide medical diagnosis, treatment, or professional mental health services. 
            If you are experiencing a mental health crisis or need professional support, 
            please contact a licensed mental health professional or emergency services.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
