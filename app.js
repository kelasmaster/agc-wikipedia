const express = require('express');
const app = express();
const port = 3000;

// Mock data for demonstration
const wikiData = {
  'donald-trump': {
    title: 'Donald Trump',
    description: 'Donald John Trump is an American politician, media personality, and businessman...',
    seoDescription: 'Learn about Donald Trump - his biography, achievements, and more.'
  },
  'elon-musk': {
    title: 'Elon Musk',
    description: 'Elon Musk is a business magnate, industrial designer, and engineer...',
    seoDescription: 'Discover Elon Musk - his companies, innovations, and vision for the future.'
  }
};

// Dynamic route handler
app.get('/:keyword', (req, res) => {
  const keyword = req.params.keyword;
  const data = wikiData[keyword];

  if (data) {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="${data.seoDescription}">
        <title>${data.title} - Homepage</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <header>
          <h1>AGC Wikipedia</h1>
        </header>

        <div class="container">
          <aside class="sidebar">
            <h2>Keyword</h2>
            <p id="keyword">${keyword}</p>
          </aside>

          <main class="content">
            <h1 id="page-title">${data.title}</h1>
            <p id="page-description">${data.description}</p>
          </main>
        </div>

        <footer>
          <p>&copy; 2023 AGC Wikipedia</p>
        </footer>
      </body>
      </html>
    `);
  } else {
    res.status(404).send('<h1>Page Not Found</h1>');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
