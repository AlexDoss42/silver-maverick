module.exports = {
  getTrips: (req, res) => {
    const db = req.app.get('db')
    db.trip.getTrips()
    .then((data) => {
      res.status(200).send(data)
    })
    .catch(err => console.log(err, "You are having a problem with your GetTrips in tripCtrl"))
  },

  createATrip: (req, res) => {
    const db = req.app.get('db')
    const { group_leader, name, user_id } = req.body

    db.trip.createATrip({group_leader, name, user_id})
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.status(500).send(err)
      console.log(`Error in TripCtrl createatrip`, err)
    })
  },

  getATrip: (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    db.trip.getTrips({ id })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch(err => console.log(err, "You are having a problem with your GetATrip in tripCtrl"))
  },

  getMyTrips: (req, res) => {
    const db = req.app.get('db')
    const { user_id } = req.params
    db.trip.getMyTrips({ user_id })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch(err => console.log(err, "You are having a problem with your GetATrip in tripCtrl"))
  },

  deleteTrip: (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params

    db.trip.deleteTrip({ id })
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err))
  }
}