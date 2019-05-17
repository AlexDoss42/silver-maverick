module.exports = {
  getTripConversation: (req, res) => {
    const db = req.app.get('db')
    const { trip_id } = req.params

    db.chat.getTripConversation({trip_id})
    .then((data) => {
      res.status(200).send(data)
    })
    .catch(err => console.log(err))
  },

  addMessage: (req, res) => {
    const db = req.app.get('db')
    const {message, username, user_id, trip_id} = req.body

    db.chat.addMessage({message, username, user_id, trip_id})
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
  },

  deleteMessage: (req, res) => {
    const db = req.app.get('db')
    const { chat_id } = req.params

    db.chat.deleteMessage({ chat_id })
    .then(res.sendStatus(200))
    .catch(err => console.log(err))
  }
}