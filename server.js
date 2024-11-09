const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


async function extractArticleText(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const title = $('h1').text().trim();
        const articleBody = $('.td-post-content');
        const paragraphs = articleBody.find('p');
        let articleText = '';
        paragraphs.each((i, para) => {
            articleText += $(para).text().trim() + '\n';
        });

        return { title, articleText };
    } catch (error) {
        console.error(`Error fetching URL: ${url} - ${error.message}`);
        return null;
    }
}

// Function to save article text to a file
function saveArticleToFile(urlId, title, content) {
    const fileName = `${urlId}.txt`;
    const filePath = path.join(__dirname, fileName);
    const fileContent = `Title: ${title}\n\n${content}`;
    
    fs.writeFileSync(filePath, fileContent);
    console.log(`Saved article: ${filePath}`);
}

app.post('/extract', async (req, res) => {
    const url = req.body.url;
    const urlId = req.body.urlId;

    if (!url || !urlId) {
        return res.status(400).json({ error: 'Please provide both URL and URL_ID.' });
    }

    const result = await extractArticleText(url);
    if (result) {
        saveArticleToFile(urlId, result.title, result.articleText);
        return res.json({ title: result.title, content: result.articleText });
    } else {
        return res.status(500).json({ error: 'Failed to extract article text.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
