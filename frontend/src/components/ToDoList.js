import React from 'react'

import { Popover, Checkbox, AutoComplete } from 'antd'
import { successNotify, errorNotify } from '../lib/notification'
import { getProfile, getAllWorkouts, addTodo, deleteTodo } from '../lib/api'
import { getPayload } from '../lib/auth'
import { OrderedListOutlined } from '@ant-design/icons'
import FlipMove from 'react-flip-move'

class ToDoList extends React.Component {
  state = {
    todos: null,
    workouts: null,
    newTodos: {
      text: ''
    },
    checked: false
  }

  async componentDidMount() {
    this.handleGetToDos()
    this.handleGetWorkouts()
  }

  handleGetToDos = async () => {
    try {
      if (!getPayload().sub) {
        throw new Error('User not logged in')
      }
      const userId = getPayload().sub
      console.log('userId is:', userId)
      const user = await getProfile(userId)
      this.setState({ todos: user.data.todoitems })
    } catch (err) {
      console.log(err)
      this.setState({ todos: [], workouts: [] })
    }
  }

  handleGetWorkouts = async () => {
    try {
      const workouts = await getAllWorkouts()

      this.setState({ workouts: workouts.data })
    } catch (err) {
      console.log(err)
    }
  }

  mapTodoWorkouts = (workouts) => {
    const todoWorkouts = []
    for (let i = 0; i < workouts.length; i++) {
      todoWorkouts.push({ value: workouts[i].name })
    }
    return todoWorkouts
  }

  //* To fix checkbox toggle changing style of text
  handleCheck = (event) => {
    if (event.target.checked) {
      successNotify('Another item off your list')
    } else {
      successNotify('False alarm...')
    }
  }

  handleChange = (event) => {
    const newTodos = { ...this.state.newTodos, 'text': event }
    this.setState({ newTodos, error: false })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await addTodo(this.state.newTodos)
      successNotify('Successfully increased your workload')
      this.handleGetToDos()
      const newTodos = { ...this.state.newTodos }
      newTodos.text = ''
      this.setState( { newTodos } )
    } catch (err) {
      errorNotify('Lucky for you, we cannot add another task to your plate...')
      this.setState({ errors: err.response.data.errors })
    }
  }

  handleDelete = async (event) => {
    event.preventDefault()
    try {
      await deleteTodo(event.target.id)
      successNotify('Successfully deleted a todo, keep up the grind!')
      this.handleGetToDos()
    } catch (err) {
      errorNotify('Looks like theres an error so we are not able to delete a todo...')
    }
  }

  render() {
    if (!this.state.todos) return null
    return (
      <Popover placement="leftTop" title={'To do list'}
        content={this.state.todos.length === 0 ?
          <div>
            <form onSubmit={this.handleSubmit} >
              <AutoComplete
                options={this.mapTodoWorkouts(this.state.workouts)}
                placeholder="Add Todos here..."
                filterOption={(inputValue, options) =>
                  options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onChange={this.handleChange}
                value={this.state.newTodos.text}
                bordered={false}
                className="addTodosInput"
              >
              </AutoComplete>
            </form>
          </div>
          :
          <div>
            <FlipMove>
              {this.state.todos.map((item, index) => {
                return (
                  <div key={index} className="toDoItems">
                    <Checkbox  onChange={this.handleCheck} className={this.state.checked ? 'checked' : 'unchecked'}>{item.text}</Checkbox>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="deleteToDoItems" id={item.id} onClick={this.handleDelete}><path id={item.id} d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                  </ div>
                )
              })}
            </FlipMove>
            <form onSubmit={this.handleSubmit} >
              <AutoComplete
                options={this.mapTodoWorkouts(this.state.workouts)}
                placeholder="Add Todos here..."
                filterOption={(inputValue, options) =>
                  options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onChange={this.handleChange}
                value={this.state.newTodos.text}
                bordered={false}
                className="addTodosInput"
              >
              </AutoComplete>
            </form>
          </div>
        } trigger="click" onClick={() => {
          this.handleGetToDos()
          this.handleGetWorkouts()
        }
        }>
        <OrderedListOutlined style={ { fontSize: '32px' } } />
      </Popover>
    )
  }
}

export default ToDoList
