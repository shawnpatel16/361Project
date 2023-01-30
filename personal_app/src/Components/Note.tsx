import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";

type NoteProps = {
    onDelete: (id: string) => void
}
export function Note({ onDelete}: NoteProps) {
    const note = useNote()
    const navigate = useNavigate()
    return <>
        <div className = "view-note-container">
            <h1>{note.title}</h1>
            {note.tags.length > 0 && (
                <div>
                    {note.tags.map(tag => (
                        <div className = "view-note-tags" key = {tag.id}>{tag.label}</div>
                    ))}
                    </div>
            )}
            <div className = "view-buttons-container">
                <div className = "view-edit-button">
                <Link to={`/${note.id}/edit`}>
                    <button>Edit</button>
                </Link>
                </div>
                <div className = "view-delete-button">
                <button onClick={() => {
                    onDelete(note.id)
                    navigate("/")
                }}>
                    Delete
                </button>
                </div>
                <div className = "view-back-button">
                <Link to = "/journal">
                    <button>Back</button>
                </Link>
                </div>
            </div>
        </div>
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
}