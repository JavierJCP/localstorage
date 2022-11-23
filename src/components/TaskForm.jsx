import React, { useState } from 'react';

function TaskForm({ onSubmit }) {
  const [task, setTask] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const newTask = {
      id: crypto.randomUUID(),
      text: task,
      done: false,
      isEdit: false,
    };
    onSubmit(newTask);
    setTask('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='new task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type='submit'>Add Task</button>
    </form>
  );
}

export default TaskForm;
