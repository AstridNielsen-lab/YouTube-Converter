import React, { useState } from 'react';
import { Youtube, Download, Phone, Mail, ExternalLink } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp3');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Youtube className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">Video Converter</span>
            </div>
            <a 
              href="https://likelook.wixsite.com/solutions" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <span>Like Look Solutions</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Convert YouTube Videos
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Convert your favorite YouTube videos to MP3, MP4, or AVI format
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your YouTube video URL here"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            {/* Format Selection */}
            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">
                Select Format
              </label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="mp3">MP3 (Audio)</option>
                <option value="mp4">MP4 (Video)</option>
                <option value="avi">AVI (Video)</option>
              </select>
            </div>

            {/* Convert Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  <span>Convert Now</span>
                </>
              )}
            </button>
          </form>

          {/* Result Section */}
          {showResult && (
            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium mb-2">Conversion Complete!</p>
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                onClick={() => setShowResult(false)}
              >
                <Download className="h-5 w-5" />
                <span>Download File</span>
              </button>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <a 
                href="https://wa.me/5511970603441" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
              >
                +55 11 97060-3441
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <a 
                href="mailto:contact@likelook.solutions" 
                className="text-gray-600 hover:text-blue-600"
              >
                contact@likelook.solutions
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <p>Developed by Julio Campos Machado - Full Stack Developer</p>
          <p className="mt-2">© 2024 Like Look Solutions. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;