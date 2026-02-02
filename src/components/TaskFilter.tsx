import { ChangeEvent } from 'react';
import { Task } from '../types/task';

export interface TaskFilterProps {
  filter: {
    status?: 'todo' | 'in-progress' | 'done' | undefined;
    priority?: 'low' | 'medium' | 'high' | undefined;
  };
  setFilter: (
    value: React.SetStateAction<{
      status?: Task['status'];
      priority?: Task['priority'];
    }>
  ) => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({ filter, setFilter }) => {
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({
      ...prev,
      status: e.target.value as Task['status'],
    }));
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({
      ...prev,
      priority: e.target.value as Task['priority'],
    }));
  };
  return (
    <div className="flex">
      <select value={filter.status || ''} onChange={handleStatusChange}>
        <option value="">All Statuses</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select value={filter.priority || ''} onChange={handlePriorityChange}>
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};
