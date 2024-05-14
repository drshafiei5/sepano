import React, { useRef } from 'react'

import TaskList from './task-list';
import { addTask } from '../store/task/task.actions';
import AddTask from './add-task';

function App() {
    

    return (
        <div>
            <h1>Todo List</h1>
            <AddTask />
            <TaskList />
        </div>
    )
}

export default App;