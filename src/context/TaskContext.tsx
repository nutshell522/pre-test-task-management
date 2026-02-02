import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { AddTaskForm, Task } from '../types/task';
import { v4 as uuidv4 } from 'uuid';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  // filterTasks: (status?: Task['status'], priority?: Task['priority']) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: uuidv4(),
      title: 'Initial Task',
      // ! issue: status允許值並不包含todo111
      // status: 'todo111',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date(),
      description: 'This is a sample task to start with',
    },
    {
      id: uuidv4(),
      title: 'Second Task',
      status: 'todo',
      priority: 'high',
      createdAt: new Date(),
      description: 'This is another task',
    },
  ]);

  const addTask = useCallback((taskData: AddTaskForm) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date(),
      status: taskData.status || 'todo',
    };

    // ! issue: 關注點分離，將欄位驗證移至submit時
    // if (newTask.title.length > 100) {
    //   alert('Task title too long!');
    //   return;
    // }

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    // ! 避免非同步更新出bug(stale closure)，使用prevTasks來setTask
    // setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task)));
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task)));
    // }, [tasks]);
  }, []);

  const deleteTask = useCallback((id: string) => {
    // const index = tasks.findIndex((task) => task.id === id);
    // if (index !== -1) {
    // ! issue:不應修改原始資料
    // tasks.splice(index, 1);
    // setTasks([...tasks]);
    // }
    setTasks((prevTasks) => prevTasks.filter((task) => task.id != id));
    // }, [tasks]);
  }, []);

  // ! issue:與list頁重複的filter tasks功能，應該可以移除。讓篩選交由UI管理
  // const filterTasks = useCallback(
  //   (status?: Task['status'], priority?: Task['priority']) => {
  //     return tasks.filter((task) => (!status || task.status === status) && (!priority || task.priority === priority));
  //   },
  //   [tasks]
  // );

  const contextValue = useMemo(
    () => ({
      tasks,
      addTask,
      updateTask,
      deleteTask,
      // filterTasks,
    }),
    [tasks, addTask, updateTask, deleteTask]
  );

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
