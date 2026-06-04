import { useState } from "react";

export default function TaskForm({ addTask }) {

    const [title, setTitle] = useState("");

    function handleSubmit(e) {

        e.preventDefault();

        if (!title.trim()) return;

        addTask(title);

        setTitle("");
    }

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Nouvelle tâche..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button type="submit">
                Ajouter
            </button>

        </form>
    );
}