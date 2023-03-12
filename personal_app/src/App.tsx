import { useMemo, useState } from 'react'
import { Routes, Route, Navigate} from "react-router-dom"
import { NewNote } from './Components/NewNote'
import { useLocalStorage } from './useLocalStorage'
import { v4 as uuidV4 } from "uuid"
import { NoteList } from './Components/NoteList'
import { NoteLayout } from './Components/NoteLayout'
import { Note } from './Components/Note'
import { EditNote } from './Components/EditNote'
import Home from './Pages/HomePage'
import Navbar from './Components/Navbar'
import About from './Pages/AboutPage'
import Habit from './Pages/HabitPage'



// defining the types
//creating note type with note data and adding an id
export type Note = {
  id: string
} & NoteData

// Creating RawNote type with id and RawNoteData
export type RawNote = {
  id: string
} & RawNoteData

// Storing the note info and tagIds instead of tags themselves
// Don't have to worry about updating every note when changing tags
// Since tags will be updated through Tag 
export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]

}
// creating type for each note with title,markdown,tags
export type NoteData = {
  title: string
  markdown: string
  // array of tags
  tags: Tag[]

}
// Creating type for each tag with id and labe
export type Tag = {
  id: string
  label: string
}

function App() {
  // Persisting the data using LocalStorage
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
// Since rawNotes doesn't have tags, we map the tags that are included to the rawNotes to make NoteData
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])
// When a note is created, save the note inside the notes array
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }
// adding tags to the previous tags array
  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }
// Loop through tags and check for matching id and update the label
  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label}
        } else {
          return tag
        }
      })
    })
  }
// remove tag based on its id
  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }
// Find note that was updated and set its new data and tags
  function onUpdateNote(id: string, { tags, ...data }:
    NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return {
            ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }
  

// remove note based on id
  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }
  return (
    <>
      {/* Navbar route to be displayed on every page */}
      <Navbar/>
      <div>
        {/* defining the different routes on the page */}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/habit" element={<Habit />} />
          {/* defining the journal route and rendering the NoteList */}
      <Route path="/journal"
        element={<NoteList notes={notesWithTags}
          availableTags={tags}
          onUpdateTag={updateTag}
              onDeleteTag={deleteTag} />} />
          

          {/* Defining the route to make a new entry passing in the NewNote component  */}
          <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
          
      {/* Defining the route for each note using its id for viewing and editing */}
      <Route path ="/:id" element = {<NoteLayout notes = {notesWithTags}/>}>
        <Route index element={<Note onDelete={onDeleteNote} />} />
        <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />} />
          </Route>
          {/* Defining a path such that if the path is not recognized, it returns to the journal page */}
      <Route path="*" element={<Navigate to="/journal" />} />
        </Routes>
      </div>
    </>
  )
}

export default App


