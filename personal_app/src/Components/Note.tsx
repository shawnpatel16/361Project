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
        <div>
            <h1>{note.title}</h1>
            {note.tags.length > 0 && (
                <div>
                    {note.tags.map(tag => (
                        <div key = {tag.id}>{tag.label}</div>
                    ))}
                    </div>
            )}
            <span>
                <Link to={`/${note.id}/edit`}>
                    <button>Edit</button>
                </Link>
                
                <button onClick={() => {
                    onDelete(note.id)
                    navigate("/")
                }}>
                    Delete
                </button>
                <Link to = "/">
                    <button>Back</button>
                </Link>
            </span>
        </div>
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
}