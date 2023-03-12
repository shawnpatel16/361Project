import { FormEvent, useRef, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import CreateableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid"

// defining type for NoteFormProps
type NoteFormProps = {
    // defining onSubmit and onAddTag functions using NoteData with no return value
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({
    onSubmit,
    onAddTag,
    availableTags,
    title = "",
    markdown = "",
    tags = [],
}: NoteFormProps) {
    // react hook useRef to store information for title and markdown inside references
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()
    // defining function to handle submitting title,markdown, and tags to Notes
    // after submitting, return to journal page
    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    // Pass in noteData with title,markdown,tags with
        // title and markdown will never be null because they are required
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        })
        navigate("/journal")
    }


    return (
        <div className="new-note-div">
            {/* Form to create a new note with title,tags, and markdown */}
            <form onSubmit={handleSubmit}>
                <div className="search-bar-container">
                    <div className = "title-bar">
                    <div className="title-label">
                        <label>Title</label>
                    </div>
                    <div className="title-search">
                        <input className="title-search-bar" type="text" ref={titleRef} required defaultValue={title} />
                    </div>
                    </div>
                    <div className = "tag-bar">
                    <div className="tag-label">
                        <label>Tags</label>
                    </div>
                        <div className="tag-search">
                            {/* Using the react-select library to create a select input that allows us to create our own tags */}
                            <CreateableReactSelect classNamePrefix="react-select"
                                // after creating a new tag, add an id, and adding th newTag to the end of the
                                // current selected tags
                            onCreateOption={label => {
                                const newTag = { id: uuidV4(), label }
                                onAddTag(newTag)
                                setSelectedTags(prev => [...prev, newTag])
                                }}
                                // For each tag, return its label and id for createable react select
                            value={selectedTags.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                                // showing the current available tags 
                            options={availableTags.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                                // map tags to the values we are storing (back to id)
                            onChange={tags => {
                                setSelectedTags(
                                    tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    })
                                )
                                }}
                                // Multiselect version of createable react select
                            isMulti
                        />
                    </div>
                    </div>
                </div>
                {/* Creating the text area for the markdown */}
                <div className="newnote-body">
                    <div className="body-label">
                        <label>Body</label>
                    </div>
                    <div className="text-area">
                        <textarea required rows={30} cols={60} ref={markdownRef} defaultValue={markdown} />
                    </div>

                    {/* Save and cancel buttons */}
                    <div className="save-cancel-buttons">



                                {/* If we click cancel, return to the journal page */}
                        <Link to="/journal">
                            <button className="cancel-button" type="button">Cancel</button>
                        </Link>
                        <button className="save-button" type="submit">Save</button>
                    </div>
                </div>
            </form>
        </div>
    )

}