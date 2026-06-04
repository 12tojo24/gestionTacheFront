import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/home.css";

export default function Home() {

    const [tasks, setTasks] = useState([]);

    function addTask(title) {

        const newTask = {
            id: Date.now(),
            title: title,
            completed: false
        };

        setTasks([...tasks, newTask]);
    }

    function deleteTask(id) {

        const result = tasks.filter(task => task.id !== id);

        setTasks(result);
    }

    return (
        <div className="container">

            <h1>Gestion des tâches</h1>

            <TaskForm addTask={addTask} />

            <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
            />

        </div>
    );
}