import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";

// Note type without the markdown to display on the journal page
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

export function NoteList({ availableTags, notes, onUpdateTag, onDeleteTag }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)
    // update when title, tags are changed
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            // if title is blank or if note has title we are searching for
            // if no tags are selected or note has all the tags we are searching for
            // return true
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTags, notes])
    return (<>
        <div className="journal-page">
            <div className="journal-bar">
                <div className = "journal-header">
                    <h1>Notes</h1>
                </div>
            <div className="journal-buttons">
                <Link to="/new">
                    <button className="create-button">Create</button>
                </Link>
                <button className="edit-button" onClick={() => setEditTagsModalIsOpen(true)}>Edit Tags</button>
            </div>
        </div>

        {/* Form for the search by title and tags feature */}
        <form className = "search-bar-form">
                <div className = "search-bar-div">
                    <div className = "title-bar">
                <div className="title-label">
                    <label>Search by Title</label>
                </div>
                        <div className="title-search">
                            {/* On change, set its title to the title that is being typed in */}
                    <input className="title-search-bar" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                    </div>
                <div className = "tag-bar">
                <div className="tag-label">
                    <label>Search by Tags</label>
                </div>
                        <div className="tag-search">
                        {/* Get the current tags and allow them to be selected to search by tag */}
                    <ReactSelect classNamePrefix="react-select"
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
                        </div>
                    </div>
            </div>
        </form>

            <div className="journal-list">
                {/* Display the notes based on the proper title and tags that are passed in */}
        {filteredNotes.map(note => (
            <div className="scard" key={note.id}>
                {/* using NoteCard function to display */}
                <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </div>
        ))}
        </div>
        <EditTagsModal onUpdateTag={onUpdateTag}
            onDeleteTag={onDeleteTag}
            show={editTagsModalIsOpen}
            handleClose={() => setEditTagsModalIsOpen(false)}
            availableTags={availableTags} />
        </div>
    </>
    )
}

// NoteCard function which displays just the title and tags and not the markdown
function NoteCard({ id, title, tags }: SimplifiedNote) {
    return <>
        {/* Link to the individual page when clicked */}
        <Link to={`/${id}`}>

            {/* Displaying the notecard title and tags */}
            {tags.length > 0 && (
                <div className="note-card">
                    <div className = "note-card-title">
                        {title}
                    </div>
                    <div className="note-card-tags">
                    {tags.map(tag => (
                        
                            <div className="note-card-tag" key={tag.id}> {tag.label}</div>
                            
                    ))}
                    </div>
                </div>
            )}
        </Link>
    </>
}

function EditTagsModal({ availableTags, handleClose, show, onDeleteTag, onUpdateTag }: EditTagsModalProps) {
    const showHideClassName = show ? "modal display-block" : "modal display-none"

    if (!show) {
        return null
    }

    return (
        <div className={showHideClassName}>
            <div className="modal-content">
                <div>
                    <h4>Edit Tags</h4>
                </div>
                <form className = "edit-tags-form">
                    <div>
                        {availableTags.map(tag => (
                            <div className="edit-tag-container" key={tag.id}>
                                <div>
                                    <input type="text" value={tag.label} onChange={e => onUpdateTag(tag.id, e.target.value)} />
                                </div>
                                <div>
                                    <button className = "cancel-button" onClick={() => onDeleteTag(tag.id)}>&times;</button>
                                </div>
                            </div>

                        ))}
                    </div>
                </form>
                <button className = "edit-tag-close" onClick={handleClose}>Close</button>

            </div>
        </div>
    )
}
