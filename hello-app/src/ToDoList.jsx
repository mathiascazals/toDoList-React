import React, { Component } from 'react';

class ToDoList extends Component {
  constructor(props) {
    super(props);
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [
      {"title":"1.Idée","isChecked":true},
      {"title":"2.Marché","isChecked":true},
      {"title":"3.Wireframe","isChecked":true},
      {"title":"4.Design","isChecked":true},
      {"title":"5.Landingpage","isChecked":true},
      {"title":"6.Développement","isChecked":false},
      {"title":"7.Publish","isChecked":false},
      {"title":"8.Pub","isChecked":false},
      {"title":"9.Feedback","isChecked":false}
    ];
    this.state = {
      tasks: savedTasks,
    };
  }

  componentDidMount() {
    this.saveTasks();
  }

  addTask(title) {
    const task = {
      title: title,
      isChecked: false,
    };
    const newTasks = [...this.state.tasks, task];
    this.setState({
      tasks: newTasks,
    });
    this.saveTasks();
  }

  removeTask(index) {
    const newTasks = this.state.tasks.filter((task, i) => i !== index);
    this.setState({
      tasks: newTasks,
    });
    this.saveTasks();
  }

  toggleTask(index) {
    const newTasks = this.state.tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          isChecked: !task.isChecked,
        };
      }
      return task;
    });
    this.setState({
      tasks: newTasks,
    });
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.tasks.map((task, index) => {
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={task.isChecked}
                  onChange={() => this.toggleTask(index)}
                />
                {task.title}
                <button onClick={() => this.removeTask(index)}>Delete</button>
              </li>
            );
          })}
        </ul>
        <form onSubmit={(e) => {
          e.preventDefault();
          const input = document.querySelector('input[type="text"]');
          const title = input.value;
          input.value = '';
          this.addTask(title);
        }}>
          <input type="text" />
          <button type="submit">Add Task</button>
        </form>
      </div>
    );
  }
}

export default ToDoList;