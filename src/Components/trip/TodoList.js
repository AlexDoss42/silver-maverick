import React, { Component } from 'react'
import Todo from '../tiles/Todo'
import axios from 'axios'

class TodoList extends Component {
  constructor(props) {
    super(props)

    const { trip_id } = this.props

    this.state = {
      todolist: [],
      task: '',
      trip_id,
      addTodo: false
    }
  }

  componentDidMount() {
    const { trip_id } = this.state

    axios.get(`/todo/tripTodos/${trip_id}`)
      .then(res => {
        this.setState({
          todolist: res.data
        })
      })
      .catch(() => console.log('you have an error in your CDM for TodoList.js'))
  }

  handleAddClick() {
    this.setState({
      addTodo: !this.state.addTodo
    })
  }

  handleCreateTodoSubmit = async (e) => {
    e.preventDefault()

    let { task, trip_id } = this.state

    if (task === '') {
      alert('Task is required')
    } else {

      axios.post('/todo/task', { task, trip_id })
        .then(res => {
          this.componentDidMount()
        })

      this.setState({
        task: '',
        addTodo: !this.state.addTodo
      })
    }
  }

  handleFormInputUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleDelete = async (deleteId) => {
    const { trip_id } = this.props

    await axios.delete(`/todo/delete/${deleteId}`)
    axios.get(`/todo/tripTodos/${trip_id}`)
      .then(res => {
        this.setState({
          gearlist: res.data
        })
      })
  }

  handleEditSubmit = async (task, todo_id) => {
    axios.put(`/todo/update/${todo_id}`, { task })
      .then(res => {
        this.componentDidMount()
      })
  }

  handleOnClickEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  render() {

    const Tasks = this.state.todolist.map((task) => (
      <Todo
        task={task}
        key={task.todo_id}
        deleteId={task.todo_id}
        handleDelete={this.handleDelete}
        handleEdit={this.handleEditSubmit}
        handleOnClickEdit={this.handleOnClickEdit}
      />
    ))

    if (this.state.addTodo === false) {
      return (
        <div className='todos'>
          <h4>Task for the trip</h4>
          <div className='taskList'>
            {Tasks}
          </div>
          <button
          className='addBtn'
            onClick={() => {
              this.handleAddClick()
            }}>Add a Todo</button>
        </div>
      )
    } else {
      return (
        <>
          <h4>Todos for the trip</h4>
          <form onSubmit={this.handleCreateGearSubmit}>
            <input
              type='text'
              name='task'
              placeholder='Task'
              value={this.state.task}
              onChange={this.handleFormInputUpdate}
            />

            <button>Submit</button>
          </form>

          <button
            onClick={() => {
              this.handleAddClick()
            }}>Cancel</button>
        </>
      )
    }

  }
}
export default TodoList