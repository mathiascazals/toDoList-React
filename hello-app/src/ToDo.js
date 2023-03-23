import React, { useState, useEffect } from 'react';

function ToDo() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [
    {"title":"1. Idée","isChecked":false},
    {"title":"2. Marché","isChecked":false},
    {"title":"3. Wireframe","isChecked":false},
    {"title":"4. Design","isChecked":false},
    {"title":"5. Landingpage","isChecked":false},
    {"title":"6. Développement","isChecked":false},
    {"title":"7. Publish","isChecked":false},
    {"title":"8. Pub","isChecked":false},
    {"title":"9. Feedback","isChecked":false},
  ]);

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleToggle = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isChecked = !newTasks[index].isChecked;
    setTasks(newTasks);
  };

  const handleAdd = () => {
    const newTasks = [...tasks, {"title": newTask, "isChecked": false}];
    setTasks(newTasks);
    setNewTask("");
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return; // Do nothing if already at top
    const newTasks = [...tasks];
    // Swap the current task with the one above it
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    setTasks(newTasks);
  };

  const handleMoveDown = (index) => {
    if (index === tasks.length - 1) return; // Do nothing if already at bottom
    const newTasks = [...tasks];
    // Swap the current task with the one below it
    [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
    setTasks(newTasks);
  };

  return (
    <div>
      <ul>
      <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
        <input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
        {tasks.map((task, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={task.isChecked}
                onChange={() => handleToggle(index)}
              />
              <span className={task.isChecked ? 'completed' : ''}>{task.title}</span>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => handleMoveUp(index)}>Move Up</button>
              <button onClick={() => handleMoveDown(index)}>Move Down</button>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
