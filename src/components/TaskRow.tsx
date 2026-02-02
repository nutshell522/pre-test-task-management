import { useTasks } from '../context/TaskContext';
import { Task } from '../types/task';

export interface TaskRowProps {
  task: Task;
}

export const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
  const { deleteTask, updateTask } = useTasks();

  const renderTaskActions = (task: Task) => {
    const handleDelete = () => {
      // Potential UX anti-pattern
      const confirmDelete = window.confirm(`Delete task "${task.title}"?`);
      if (confirmDelete) {
        deleteTask(task.id);
      }
    };

    // ! issue: 改使用下拉選單完成狀態切換
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as Task['status'];
      updateTask(task.id, { status: value });
    };

    // ! issue: 少了Priority切換
    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as Task['priority'];
      updateTask(task.id, { priority: value });
    };

    return (
      <>
        <select onChange={handleStatusChange}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select onChange={handlePriorityChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button className="border border-black rounded-md p-1" onClick={handleDelete}>
          Delete
        </button>
      </>
    );
  };
  return (
    <div className="flex gap-1 justify-between" key={task.id}>
      <div className="flex gap-1">
        <h3 className="font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <p>Priority: {task.priority}</p>
      </div>
      <div className="flex gap-1">{renderTaskActions(task)}</div>
    </div>
  );
};
