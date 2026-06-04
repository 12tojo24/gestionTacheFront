export default function TaskItem({ task, deleteTask }) {

    return (
        <div className="task">

            <span>
                {task.title}
            </span>

            <button
                onClick={() => deleteTask(task.id)}
            >
                Supprimer
            </button>

        </div>
    );
}