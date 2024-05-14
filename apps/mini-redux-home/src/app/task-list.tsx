import { connect } from '@sepano/mini-redux';
import { tasks } from '../store/task/task.entity';
import { deleteTask } from '../store/task/task.actions';

type TaskListProps = {
    items?: string[]
}


const TaskList = (props: TaskListProps) => {
    const { items = [] } = props || {};

    function handleDeleteTask(task: string) {
        deleteTask(task);
    }

    return (
        <div>
            {
                items.length > 0 ?
                <ul>
                    {items.map((todo, index) => (
                        <li key={index}>
                            {todo}
                            <button
                                onClick={() => handleDeleteTask(todo)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                :
                <p>no task found!</p>
            }
        </div>
    )
}

export default connect(
    TaskList,
    [tasks],
    (state) => state
);