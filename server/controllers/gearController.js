module.exports = {

  getTripGear: (req, res) => {
    const db = req.app.get('db')
    const { trip_id } = req.params
    db.gear.getAllGear({trip_id})
    .then((data) => {
      res.status(200).send(data)
    })
    .catch(err => console.log(err))
  },

  createGear: (req, res) => {
    const db = req.app.get('db')
    const { name, quantity, trip_id } = req.body

    db.gear.createGear({ name, quantity, trip_id })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
  },

  updateGear: (req, res) => {
    const db = req.app.get('db')
    const { gear_id } = req.params
    const { name, quantity } = req.body

    db.gear.updateGear({ name, quantity, gear_id })
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err))
  },

  deleteGear: (req, res) => {
    const db = req.app.get('db')
    const { gear_id } = req.params

    db.gear.deleteGear({gear_id})
    .then(res.sendStatus(200))
    .catch(err => console.log(err))
  }
}