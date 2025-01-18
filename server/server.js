const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

// Middleware para análise do corpo da requisição
app.use(express.json());

// Rota para conversão
app.post('/convert', async (req, res) => {
  const { url, format } = req.body;

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    // Escolher o formato para a conversão (MP3, MP4, etc.)
    const stream = ytdl(url, { filter: format === 'mp3' ? 'audioonly' : 'videoandaudio' });

    // Gerar link de download temporário
    const downloadLink = `http://localhost:${port}/download/${format}/${Date.now()}`;

    // Respondendo com o link de download
    res.json({ downloadLink });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process the video' });
  }
});

// Rota para baixar o arquivo convertido (simulação de download)
app.get('/download/:format/:id', (req, res) => {
  const { format, id } = req.params;
  res.send(`Your ${format.toUpperCase()} file download link with ID: ${id}`);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
