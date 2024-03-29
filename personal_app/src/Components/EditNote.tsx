import { NoteData, Tag } from "../App"
import { NoteForm } from "./NoteForm"
import { useNote } from "./NoteLayout"

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}
// Returning the edit note page using the noteform component and passing in previously entered values
export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
    const note = useNote()
    return(
        <>
            <div className = "new-note-container">
            <h1>Edit Note</h1>
                <NoteForm title={note.title} markdown={note.markdown} tags={note.tags} onSubmit={data => onSubmit(note.id, data)} onAddTag={onAddTag} availableTags={availableTags} />
            </div>
        </>
    )
}