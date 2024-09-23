const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const { difyService } = require('./dify-service')
const { zapiService } = require('./zapi-service')

const app = express()

app.use(express.json())

const phoneConversation = {}

app.post('/', async (req, res) => {
  if (req.body.isGroup) {
    return res.status(200).send()
  }

  const { phone } = req.body
  const previousConversation = phoneConversation[phone]
  const difyResponse = await difyService.sendMessage(req.body.text.message, previousConversation)
  if (!previousConversation) {
    phoneConversation[req.body.phone] = difyResponse.conversation_id
  }
  const { answer, message_id, conversation_id } = difyResponse
  zapiService.sendMessage(
    phone,
    answer,
    conversation_id,
    message_id,
  )

  return res.status(200).send()
})

app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:80')
})
