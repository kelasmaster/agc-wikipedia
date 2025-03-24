const axios = require('axios');

app.get('/:keyword', async (req, res) => {
  const keyword = req.params.keyword;

  try {
    const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${keyword}`);
    const data = response.data;

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="${data.description || 'Learn more about ' + keyword}">
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
            <p id="page-description">${data.extract || 'No description available.'}</p>
          </main>
        </div>

        <footer>
          <p>&copy; 2023 AGC Wikipedia</p>
        </footer>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(404).send('<h1>Page Not Found</h1>');
  }
});
