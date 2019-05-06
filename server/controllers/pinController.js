module.exports = {
  getAllPins: (req, res) => {
    const db = req.app.get('db')
    db.pins.getAllPins()
    .then((data) => {
      res.status(200).send(data)
    })
  },

  createPin: (req, res) => {
    const db = req.app.get('db')
  },

  updatePin: (req, res) => {
    const db = req.app.get('db')
  },

  deletePin: (req, res) => {
    const db = req.app.get('db')
  }
}