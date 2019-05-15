module.exports = {
  getAllPins: (req, res) => {
    const db = req.app.get('db')
    db.pins.getAllPins()
    .then((data) => {
      res.status(200).send(data)
    })
  },

  getTripPins: (req, res) => {
    const db = req.app.get('db')
    const { trip_id } = req.params
    db.pins.getTripPins({trip_id})
    .then((data) => {
      res.status(200).send(data)
    })
    .catch(err => console.log(err))
  },

// This was initially put together for editing but ditched. Keep it just in case we need it later.

  // getPinById: (req, res) => {
  //   const db = req.app.get('db')
  //   const { id } = req.params
  //   db.pins.getPinById({id})
  //   .then((data) => {
  //     res.status(200).send(data)
  //   })
  // },

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
  },

  PinToBoard: (req, res) => {
    const db = req.app.get('db')
    const { pin_id, trip_id } = req.body

    db.pins.pinToTrips({ pin_id, trip_id })
    .then(()=>res.sendStatus(200))
    .catch(err => console.log(err))
  }
}