import { FormEvent, useRef, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import CreateableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid"

type NoteFormProps = {
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
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        })
        navigate("/journal")
    }


    return (
        <div className = "new-note-container">
        <form onSubmit={handleSubmit}>
            <div className="search-bar-container">
                <div className = "title-label">
                    <label>Title</label>
                </div>
                <div className="title-search">
                    <input className="title-search-bar" type="text" ref={titleRef} required defaultValue={title} />
                </div>
            
                <div className="tag-label">
                    <label>Tags</label>
                </div>
                <div className="tag-search">
                <CreateableReactSelect classNamePrefix="react-select"
                    onCreateOption={label => {
                        const newTag = { id: uuidV4(), label }
                        onAddTag(newTag)
                        setSelectedTags(prev => [...prev, newTag])
                    }}
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
            <div className="newnote-body">
            <div className = "body-label">
                <label>Body</label>
            </div>
            <div className = "text-area">
                <textarea required rows={30} cols={60} ref={markdownRef} defaultValue = {markdown} />
                    </div>
            <div className = "save-cancel-buttons">
            
                
                    
            
            <Link to="/journal">
                <button className = "cancel-button" type="button">Cancel</button>
                            </Link>
            <button className="save-button" type="submit">Save</button>     
                    </div>  
            </div>
            </form>
        </div>
    )

}