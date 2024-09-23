const axios = require('axios');

const difyService = {
  sendMessage: async (query, conversation_id) => axios.post(
    'https://api.dify.ai/v1/chat-messages',
    {
      inputs: '',
      query,
      user: process.env.DIFY_USER,
      ...(conversation_id ? { conversation_id }: {}),
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.DIFY_TOKEN}`,
      }
    }
  )
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return error;
    }),
}

module.exports = { difyService };
