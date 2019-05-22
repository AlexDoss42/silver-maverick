import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props)

    const { task, todo_id } = this.props.task
    const { deleteId } = this.props

    this.state = {
      todo_id,
      task,
      deleteId,
      edit: false
    }
  }

  handleEditItemSubmit = async (e) => {
    e.preventDefault()

    const { task, todo_id } = this.state

    this.props.handleEdit(task, todo_id)

    this.setState({
      edit: false
    })
  }

  handleFormInputUpdate = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleCancel = () => {
    this.setState({
      edit: false
    })
  }

  render() {

    let { task, deleteId } = this.state

    if (this.state.edit === false) {
      return (
        <div className='task'>
          <p><em>Todo: {task}</em></p>
          <div>
            <button
              onClick={() => {
                this.setState({
                  edit: true
                })
              }}>edit </button>
            <button
              onClick={() => {
                this.props.handleDelete(deleteId)
              }}> delete</button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <form onSubmit={this.handleEditItemSubmit}>
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
              this.handleCancel()
            }}>Cancel</button>
        </div>
      )

    }

  }
}

export default Todo