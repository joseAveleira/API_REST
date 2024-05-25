const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

async function chatWithCohere(message, conversationId) {
  const chat = await cohere.chat({
    model: "command-r-plus",
    conversation_id: conversationId,
    message: message,
  });

  return chat.text;
}

module.exports = chatWithCohere;