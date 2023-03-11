
import { NoteData, Tag } from "../App"
import { NoteForm } from "./NoteForm"

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
    return (
        <>
            <div className = "new-note-container">
            <h1 className="new-note-title">New Note</h1>
                <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
            </div>
        </>
    )
}