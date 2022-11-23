import { useState } from 'react';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import '../styles/TaskList.css';

function TaskList({
  id,
  text,
  done,
  isEdit,
  completeTask,
  changeEditState,
  onEdit,
  deleteTask,
}) {
  const [edit, setEdit] = useState('');

  function handleEdit(e) {
    e.preventDefault();
    onEdit(id, edit);
  }

  if (!isEdit) {
    return (
      <div className={done ? 'task_container done' : 'task_container'}>
        <div className='task_text'>
          <h3>{text}</h3>
        </div>
        <div className='task_icons'>
          <input
            type='checkbox'
            value={done}
            onClick={() => completeTask(id)}
          />
          <BsFillPencilFill onClick={() => changeEditState(id)} />
          <BsFillTrashFill onClick={() => deleteTask(id)} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className='task_text'>
          <h3>{text}</h3>
        </div>
        <form onSubmit={handleEdit}>
          <input type='text' onChange={(e) => setEdit(e.target.value)} />
          <button type='submit'>Edit</button>
        </form>
      </div>
    );
  }
}

export default TaskList;
