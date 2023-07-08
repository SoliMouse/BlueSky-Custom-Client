const functions = require('firebase-functions');
const { BskyAgent } = require('@atproto/api');

const agent = new BskyAgent({ service: 'https://bsky.social/' });

exports.login = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(400).send('Please send a POST request');
    return;
  }

  const { identifier, password } = req.body;

  try {
    await agent.login({ identifier, password });
    res.status(200).send('Authentication successful');
  } catch (error) {
    res.status(400).send('Error authenticating user: ' + error.message);
  }
});

exports.getPosts = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'GET') {
    res.status(400).send('Please send a GET request');
    return;
  }

  const { identifier, token } = req.query;

  try {
    await agent.resumeSession(token);
    const posts = await agent.getAuthorFeed({ author: identifier });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send('Error retrieving posts: ' + error.message);
  }
});
