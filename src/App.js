import React from 'react';
import { TodoRow } from './TodoRow';
import { TodoBanner } from './TodoBanner';
import { TodoCreator } from './TodoCreator';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "Steve",
      todoItems: [{ action: "Buy Flowers", done: false },
      { action: "Get Shoes", done: false },
      { action: "Collect Tickets", done: true },
      { action: "Call Joe", done: false }],
    }
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  }

  createNewToDo = (task) => {
    if (!this.state.todoItems.find((x) => x.action === task)) {
      this.setState({
        todoItems: [...this.state.todoItems,
        { action: task, done: false }],
        newItemText: ""
      });
    }
  }

  toggleToDo = (todo) => this.setState({
    todoItems:
      this.state.todoItems.map(item => item.action === todo.action
        ? { ...item, done: !item.done } : item)
  });

  todoTableRows = () =>
    this.state.todoItems.map(item =>
      <TodoRow key={item.action} item={item} callback={this.toggleToDo}/>
    );

  render = () =>
    <div>
      <TodoBanner name={this.state.userName} tasks={this.state.todoItems}/>
      <div className="container-fluid">
        <TodoCreator callback={this.createNewToDo}/>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {this.todoTableRows()}
          </tbody>
        </table>
      </div>
    </div>
}