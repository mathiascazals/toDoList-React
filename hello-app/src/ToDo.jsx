import React, { useState, useEffect } from 'react';

function ToDo() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [
  {"title":"Idée","isChecked":false},    
  {"title":"Marché","isChecked":false},    
  {"title":"Wireframe","isChecked":false},    
  {"title":"Design","isChecked":false},    
  {"title":"Landingpage","isChecked":false},    
  {"title":"Développement","isChecked":false},    
  {"title":"Publish","isChecked":false},    
  {"title":"Pub","isChecked":false},    
  {"title":"Feedback","isChecked":false},  ]);

  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
    );
  }, [tasks, search]);

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
      <header>
        <h2>{filteredTasks.filter(task => !task.isChecked).length} tâches restantes</h2>
      </header>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={task.isChecked}
                onChange={() => handleToggle(index)}
              />
              <span className={task.isChecked ? 'completed' : ''}>{task.title}</span>
              <button onClick={() => handleDelete(index)}>&#10006;</button>
              <button onClick={() => handleMoveUp(index)}>&#9650;</button>
              <button onClick={() => handleMoveDown(index)}>&#9660;</button>
            </label>
          </li>
        ))}
      </ul>
      <footer>
      <form onSubmit={(e) => { e.preventDefault(); }}>
          <input type="text"placeholder="Rechercher une tâche"
          value={search}
          onChange={(e) => setSearch(e.target.value)}/>
        </form>
        <br></br>
        <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
          <h3>Ajouter une tâche :</h3>
          <input
            type="text"
            placeholder="Nouvelle tâche"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">&#x2713;</button>
        </form>
      </footer>
    </div>
  );
}

export default ToDo;
