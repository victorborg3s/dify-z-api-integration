const axios = require('axios');

const zapiService = {
  sendMessage: async (phone, message, zaapid, messageid) => axios.post(
    `https://api.z-api.io/instances/${process.env.ZAPI_INSTANCE}/token/${process.env.ZAPI_TOKEN}/send-text`,
    {
      phone,
      message,
    },
    {
      headers: {
        'Client-Token': process.env.ZAPI_CLIENT_TOKEN,
      }
    }
  )
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return error;
    }),
}

module.exports = { zapiService }
