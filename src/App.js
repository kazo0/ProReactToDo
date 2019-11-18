import React from 'react';
//import logo from './logo.svg';
//import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "Steve",
      todoItems: [{ action: "Buy Flowers", done: false },
      { action: "Get Shoes", done: false },
      { action: "Collect Tickets", done: true },
      { action: "Call Joe", done: false }],
      newItemText: ""
    }
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value })
  }

  createNewToDo = () => {
    if (!this.state.todoItems.find((x) => x.action === this.state.newItemText)) {
      this.setState({
        todoItems: [...this.state.todoItems,
        { action: this.state.newItemText, done: false }],
        newItemText: ""
      })
    }
  }

  render = () =>
    <div>
      <h4 className="bg-primary text-white text-center p-2">
        {this.state.userName}'s To Do List
         ({this.state.todoItems.filter(x => !x.done).length} items to do)
        </h4>
      <div className="container-fluid">
        <div className="my-1">
          <input className="form-control"
            value={this.state.newItemText}
            onChange={this.updateNewTextValue} />
          <button className="btn btn-primary mt-1"
            onClick={this.createNewToDo}>
            Add
        </button>
        </div>
      </div>
    </div>
}