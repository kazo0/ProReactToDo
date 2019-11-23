import React from 'react';
import { TodoRow } from './TodoRow';
import { TodoBanner } from './TodoBanner';
import { TodoCreator } from './TodoCreator';
import VisibilityControl from './VisiblityControl';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "Steve",
      todoItems: [{ action: "Buy Flowers", done: false },
      { action: "Get Shoes", done: false },
      { action: "Collect Tickets", done: true },
      { action: "Call Joe", done: false }],
      showCompleted: false,
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
      }, () => localStorage.setItem("todos", JSON.stringify(this.state)));
    }
  }

  toggleToDo = (todo) => this.setState({
    todoItems:
      this.state.todoItems.map(item => item.action === todo.action
        ? { ...item, done: !item.done } : item)
  });

  todoTableRows = (doneValue) =>
    this.state.todoItems.filter(x => x.done === doneValue).map(item =>
      <TodoRow key={item.action} item={item} callback={this.toggleToDo} />
    );

  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(data != null
      ? JSON.parse(data)
      : {
        userName: "Steve",
        todoItems: [{ action: "Buy Flowers", done: false },
        { action: "Get Shoes", done: false },
        { action: "Collect Tickets", done: true },
        { action: "Call Joe", done: false }],
        showCompleted: true
      }
    );
  }

  render = () =>
    <div>
      <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
      <div className="container-fluid">
        <TodoCreator callback={this.createNewToDo} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {this.todoTableRows(false)}
          </tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl description="Completed Tasks"
            isChecked={this.state.showCompleted}
            callback={(checked) => this.setState({ showCompleted: checked })} />
        </div>
        {this.state.showCompleted &&
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {this.todoTableRows(true)}
            </tbody>
          </table>

        }
      </div>
    </div>
}