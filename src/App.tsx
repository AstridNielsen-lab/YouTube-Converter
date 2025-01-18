import React, { useState } from 'react';
import { Youtube, Download, ExternalLink } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp3');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Função para verificar se o link é válido do YouTube
  const isValidYouTubeLink = (link: string) => {
    const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtube\.com)\/watch\?v=[\w\-]+/;
    return regex.test(link);
  };

  // Função para exibir o vídeo automaticamente quando o link for colado
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = e.target.value;
    setUrl(newLink);

    // Verifica se o link é válido
    if (isValidYouTubeLink(newLink)) {
      setIsVideoReady(true);
    } else {
      setIsVideoReady(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:3000/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, format }),
      });

      if (!response.ok) {
        throw new Error('Failed to process the request');
      }

      const data = await response.json();
      setDownloadLink(data.downloadLink); // Espera que o backend retorne um link de download
      setShowResult(true);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Função para gerar o link de embed do vídeo
  const getEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
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
                onChange={handleLinkChange}
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

          {/* Display Video after Link is Valid */}
          {isVideoReady && (
            <div className="mt-6">
              <h3 className="text-center text-gray-800 mb-2">Video Preview</h3>
              <iframe
                width="560"
                height="315"
                src={getEmbedUrl(url)}
                title="Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Result Section */}
          {showResult && (
            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium mb-2">Conversion Complete!</p>
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download File</span>
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
