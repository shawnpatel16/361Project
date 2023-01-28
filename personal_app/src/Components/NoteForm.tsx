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
        navigate("..")
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>Title
                <input type="text" ref={titleRef} required defaultValue={title}/>
            </label>

            <label>Tags
                <CreateableReactSelect
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
            </label>

            <label>Body
                <textarea required rows={30} cols={50} ref={markdownRef} defaultValue = {markdown} />
            </label>

            <button type="submit">Save</button>
            <Link to="..">
                <button type="button">Cancel</button>
            </Link>

        </form>
    )

}