module.exports = {

  getTripTodos: (req, res) => {
    const db = req.app.get('db')
    const { trip_id } = req.params
    db.todos.getAllTodos({trip_id})
    .then((data) => {
      res.status(200).send(data)
    })
    .catch(err => console.log(err))
  },

  createTodo: (req, res) => {
    const db = req.app.get('db')
    const { task, trip_id } = req.body

    db.todos.createTodo({ task, trip_id })
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
  },

  updateTodo: (req, res) => {
    const db = req.app.get('db')
    const { todo_id } = req.params
    const { task } = req.body

    db.todos.updateTodo({ task, todo_id })
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err))
  },

  deleteTodo: (req, res) => {
    const db = req.app.get('db')
    const { todo_id } = req.params

    db.todos.deleteTodo({todo_id})
    .then(res.sendStatus(200))
    .catch(err => console.log(err))
  }
}