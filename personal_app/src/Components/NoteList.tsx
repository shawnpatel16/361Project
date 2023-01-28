import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";


type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}
type NoteListProps = {
    availableTags: Tag[]
    notes: Note[]
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

type EditTagsModalProps = {
    show: boolean
    availableTags: Tag[]
    handleClose: () => void
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

export function NoteList({ availableTags, notes, onUpdateTag, onDeleteTag}: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTags, notes])
    return (<>
        <h1>Notes</h1>
        <Link to="/new">
           <button>Create</button>
        </Link>
        <button onClick={() => setEditTagsModalIsOpen(true)}>Edit Tags</button>
        <form>
            <label>Search by Title
                <input type = "text" value={title} onChange = {e => setTitle(e.target.value)} />
            </label>
            

            <label>Search by Tags
                <ReactSelect
                    value={selectedTags.map(tag => {
                        return { label: tag.label, value: tag.id }
                    })}
                    options={availableTags.map(tag => {
                        return { label: tag.label, value: tag.id }
                    })}
                    onChange={tags => {
                        setSelectedTags(
                            tags.map(tag => {
                                return { label: tag.label, id: tag.value }
                            })
                        )
                    }}
                    isMulti
                />
            </label>
        </form>
        <div>
            {filteredNotes.map(note => (
                <div key={note.id}>
                    <NoteCard id={note.id} title={note.title} tags = {note.tags} />
                </div>
            ))}
        </div>  
        <EditTagsModal onUpdateTag={onUpdateTag}
            onDeleteTag={onDeleteTag}
            show={editTagsModalIsOpen}
            handleClose={() => setEditTagsModalIsOpen(false)}
            availableTags={availableTags} />
    </>
    )
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
    return <div>
        <a href={`/${id}`}>{title}</a>
        {tags.length > 0 && (
            <div>
                {tags.map(tag => (
                    <div key={tag.id}>{title} tags: {tag.label}</div>
                ))}
                </div>
        )}
        
    </div>
}

function EditTagsModal({ availableTags, handleClose, show, onDeleteTag, onUpdateTag  }: EditTagsModalProps) {
    if (!show) {
        return null
    }

    return (
        <div>
            <div>
                <div>
                    <h4>Edit Tags</h4>
                </div>
                <form>
                    <div>
                        {availableTags.map(tag => (
                            <div key={tag.id}>
                                <div>
                                    <input type = "text" value = {tag.label} onChange={e => onUpdateTag(tag.id, e.target.value)} />
                                </div>
                                <div>
                                    <button onClick={()=> onDeleteTag(tag.id)}>&times;</button>
                                </div>
                                </div>

                        ))}
                    </div>
                </form>
                <button onClick={handleClose}>Close</button>
                    
            </div>
        </div>
    )
}


