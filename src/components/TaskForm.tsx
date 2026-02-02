import { FormEvent, useState } from 'react';
import { AddTaskForm } from '../types/task';
import { Input } from './form/Input';
import { Select } from './form/Select';
import { useTasks } from '../context/TaskContext';

const initialAddTaskForm: AddTaskForm = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'low',
};

export const TaskForm = () => {
  const { addTask } = useTasks();
  const [formData, setFormData] = useState<AddTaskForm>(initialAddTaskForm);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValueValid: () => boolean = () => {
    if (!formData.title.trim()) {
      alert('Title is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 欄位驗證
    if (!isValueValid()) return;
    addTask(formData);
    // 清空欄位
    setFormData(initialAddTaskForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input title="Title" name="title" value={formData.title} onChange={handleValueChange} required />
      <Input title="Description" name="description" value={formData.description} onChange={handleValueChange} />
      <Select title="Status" name="status" value={formData.status} onChange={handleValueChange}>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </Select>
      <Select title="Priority" name="priority" value={formData.priority} onChange={handleValueChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>
      <button type="submit" className="border-2 border-black">
        Submit
      </button>
    </form>
  );
};
