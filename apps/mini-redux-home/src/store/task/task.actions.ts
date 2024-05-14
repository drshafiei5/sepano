import { tasks } from "./task.entity"

export const addTask = (task: string) => {
    const { items } = tasks.state;
    tasks.update({ items: [...items, task] });
}

export const deleteTask = (task: string) => {
    const { items } = tasks.state;
    const newTasks = items.filter(item => item !== task);
    tasks.update({ items: newTasks });
}