import React, { useRef } from 'react'

import { addTask } from '../store/task/task.actions';

const AddTask = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    function handleAddTask(e: React.MouseEvent<
        HTMLButtonElement,
        MouseEvent
    >) {
        e.preventDefault();

        if (inputRef.current?.value) {
            addTask(inputRef.current?.value);
            inputRef.current.value = "";
        }
    }

    return (
        <form>
            <input type='text' ref={inputRef} placeholder='Enter Task' />
            <button onClick={handleAddTask}>Add Todo</button>
        </form>
    )
}

export default AddTask