const { CohereClient } = require("cohere-ai");
const readline = require("readline");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Por favor, introduce tu mensaje: ', async (message) => {
  const chat = await cohere.chat({
    model: "command-r-plus",
    conversation_id: "user_defined_id_2",
    message: message,
  });
  
  console.log(chat);
  rl.close();
});