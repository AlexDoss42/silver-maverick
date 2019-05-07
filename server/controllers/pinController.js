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
    const {title, media, description, url, price, address, city, state, country} = req.body

    db.pins.createPin({title, media, description, url, price, address, city, state, country})
    .then(() => res.sendStatus(200))
    .catch(err => console.log)
  },

  updatePin: (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    const {title, media, description, url, price, address, city, state, country} = req.body

    db.pins.updatePin({id, title, media, description, url, price, address, city, state, country})
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err))

  },

  deletePin: (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params

    db.pins.deletePin([ id ])
    .then(res.sendStatus(200))
    .catch(err => console.log(err))
  }
}