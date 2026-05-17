
import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const addTask = () => {
    if (!text) return;
    setTasks([...tasks, { text, done: false }]);
    setText("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={{padding:"30px", fontFamily:"Arial"}}>
      <h1>Cloud To-Do Manager</h1>

      <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Enter task"
        style={{padding:"8px"}}
      />
      <button onClick={addTask} style={{marginLeft:"10px"}}>
        Add
      </button>

      <ul>
        {tasks.map((task, index)=>(
          <li key={index} style={{marginTop:"10px"}}>
            <span
              onClick={()=>toggleTask(index)}
              style={{
                cursor:"pointer",
                textDecoration: task.done ? "line-through" : "none"
              }}
            >
              {task.text}
            </span>

            <button
              onClick={()=>deleteTask(index)}
              style={{marginLeft:"10px"}}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
