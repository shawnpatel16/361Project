import {NavLink, Link} from "react-router-dom"

// Creating the navbar to be displayed on all pages
export default function Navbar() {
    return (
        <nav className = "nav">
            <Link to="/"className = "site-title navbar-brand">Owl</Link>
            <ul>
                {/* Defining the links for each page and passing in a function to check if the link is active */}
                    <NavLink to="/journal" className={({ isActive }) => (isActive ? "active" : "inactive")}>Journal</NavLink>

                    <NavLink to="/habit" className={({ isActive }) => (isActive ? "active" : "inactive")}>Habit</NavLink>
                
                    <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "inactive")}>About</NavLink>
                
                </ul>
        </nav>
    )
}

