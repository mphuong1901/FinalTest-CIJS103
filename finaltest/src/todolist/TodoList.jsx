import React, { useState } from 'react';
import { Tabs, Input, Button, List, Checkbox } from 'antd';
import { DeleteOutlined, DeleteFilled } from '@ant-design/icons';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        active: true,
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, active: !task.active } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleDeleteAllInactive = () => {
    setTasks(tasks.filter(task => task.active));
  };

  const renderTasks = (filterType) => {
    let filteredTasks = tasks;
    if (filterType === 'active') {
      filteredTasks = tasks.filter(task => task.active);
    } else if (filterType === 'completed') {
      filteredTasks = tasks.filter(task => !task.active);
    }

    return (
      <div>
        {filterType === 'completed' && filteredTasks.length > 0 && (
          <Button 
            type="primary" 
            danger 
            onClick={handleDeleteAllInactive}
            style={{ marginBottom: '1rem' }}
          >
            Delete All Completed
          </Button>
        )}
        <List
          className="todo-list"
          dataSource={filteredTasks}
          renderItem={task => (
            <List.Item
              className={`todo-item ${!task.active ? 'completed' : ''}`}
              actions={[
                filterType === 'completed' && (
                  <DeleteOutlined
                    key="delete"
                    className="delete-icon"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                )
              ].filter(Boolean)}
            >
              <Checkbox
                checked={!task.active}
                onChange={() => handleToggleTask(task.id)}
              >
                {task.text}
              </Checkbox>
            </List.Item>
          )}
        />
      </div>
    );
  };

  const items = [
    {
      key: 'all',
      label: 'ALL',
      children: renderTasks('all'),
    },
    {
      key: 'active',
      label: 'ACTIVE',
      children: renderTasks('active'),
    },
    {
      key: 'completed',
      label: 'COMPLETED',
      children: renderTasks('completed'),
    },
  ];

  return (
    <div className="todo-container">
      <h1>TO DO LIST</h1>
      {(activeTab === 'all' || activeTab === 'active') && (
        <div className="input-container">
          <Input
            placeholder="Add a new task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleAddTask}
          />
          <Button type="primary" onClick={handleAddTask}>
            Add
          </Button>
        </div>
      )}
      <Tabs 
        items={items} 
        onChange={(key) => setActiveTab(key)}
      />
    </div>
  );
};

export default TodoList;