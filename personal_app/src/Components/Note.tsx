import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";

type NoteProps = {
    onDelete: (id: string) => void
}
export function Note({ onDelete }: NoteProps) {
    // get note
    const note = useNote()
    const navigate = useNavigate()
    return <>
        <div className="view-note-container">
            {/* Display note title */}
            <h1>{note.title}</h1>
            <div className = "view-note-tag-container">
                <h2>Tags</h2>
                {/* Display note tags */}
            {note.tags.length > 0 && (
                <div className = "view-note-tags">
                    {note.tags.map(tag => (
                        <ul className="view-note-tag" key={tag.id}><li className="view-tag">{tag.label}</li></ul>
                    ))}
                </div>
                )}
            </div>
            <div className="markdown-div">
            <div className = "headers-buttons">
            <div className="view-buttons-container">
                        <div className="view-edit-button">
                            {/* Edit button */}
                    <Link to={`/${note.id}/edit`}>
                        <button>Edit</button>
                    </Link>
                </div>
                        <div className="view-back-button">
                            {/* Back button */}
                    <Link to="/journal">
                        <button>Back</button>
                    </Link>
                        </div>
                        {/* Delete button */}
                <div className="view-delete-button">
                    <button onClick={() => {
                        onDelete(note.id)
                        navigate("/journal")
                    }}>
                        Delete
                    </button>
                </div>
            </div>
                    <div className = "view-note-body-title">
                        <h2>Body</h2>
                    </div>
                </div>
                {/* Display markdown */}
            <div className="markdown-box">
                <ReactMarkdown>{note.markdown}</ReactMarkdown>
            </div>
            </div>
        </div>
    </>
}