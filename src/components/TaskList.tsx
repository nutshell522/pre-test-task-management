import React, { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { Task } from '../types/task';
import { TaskRow } from './TaskRow';
import { TaskFilter } from './TaskFilter';

// ! issue: TaskList工作太複雜，切分元件以簡化
export const TaskList: React.FC = () => {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState<{
    status?: Task['status'];
    priority?: Task['priority'];
  }>({});

  const filteredTasks = useMemo(
    () => tasks.filter((task) => (!filter.status || task.status === filter.status) && (!filter.priority || task.priority === filter.priority)),
    [tasks, filter]
  );

  return (
    <div>
      {/* 操作欄位 */}
      <h1 className="text-xl font-bold my-3">Control Panel</h1>
      <TaskFilter filter={filter} setFilter={setFilter} />

      {/* task 列表 */}
      <h1 className="text-xl font-bold my-3">Task list</h1>
      <div className="flex flex-col">
        {filteredTasks.map((task) => (
          <TaskRow task={task} />
        ))}
      </div>
    </div>
  );
};
