
import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note } from "../App";

type NoteLayoutProps = {
    notes: Note[]
}
export function NoteLayout({ notes }: NoteLayoutProps) {
    // get id from the url
    const { id } = useParams()
    // get the note with matching note id
    const note = notes.find(n => n.id === id)

    //if no note, return back to original homepage and replace the url
    if (note == null) return <Navigate to="/journal" replace />

    // render the correct route
    return <Outlet context={note} />

}

// helper function to be used in the routes that use NoteLayout
// provides the context
export function useNote() {
    return useOutletContext<Note>()
}