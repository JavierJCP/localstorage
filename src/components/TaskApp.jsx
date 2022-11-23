import { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function TaskApp() {
  const [tasks, setTasks] = useState([]);

  function addTask(task) {
    if (task.text.trim()) {
      task.text = task.text.trim();
      setTasks([task, ...tasks]);
    }
  }

  useEffect(() => {
    let data = localStorage.getItem('listTasks');
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('listTasks', JSON.stringify(tasks));
  }, [tasks]);

  function completeTask(id) {
    const temp = [...tasks];
    const item = temp.find((task) => task.id === id);
    item.done = !item.done;
    setTasks([...temp]);
  }

  function changeEditState(id) {
    const temp = [...tasks];
    const item = temp.find((task) => task.id === id);
    item.isEdit = !item.isEdit;
    setTasks([...temp]);
  }

  function onEdit(id, edit) {
    const temp = [...tasks];
    const item = temp.find((task) => task.id === id);
    item.text = edit;
    setTasks([...temp]);
    item.done = false;
    item.isEdit = false;
  }

  function deleteTask(id) {
    const temp = tasks.filter((task) => task.id !== id);
    setTasks([...temp]);
  }

  return (
    <>
      <TaskForm onSubmit={addTask} />
      <div>
        {tasks === [] ? (
          <h2>No task yet</h2>
        ) : (
          tasks.map((task) => (
            <TaskList
              key={task.id}
              id={task.id}
              text={task.text}
              done={task.done}
              isEdit={task.isEdit}
              completeTask={completeTask}
              changeEditState={changeEditState}
              onEdit={onEdit}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>
    </>
  );
}

export default TaskApp;
