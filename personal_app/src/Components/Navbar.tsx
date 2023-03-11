import {NavLink, Link} from "react-router-dom"

export default function Navbar() {
    return (
        <nav className = "nav">
            <Link to="/"className = "site-title navbar-brand">Owl</Link>
            <ul>
                    <NavLink to="/journal" className={({ isActive }) => (isActive ? "active" : "inactive")}>Journal</NavLink>

                    <NavLink to="/habit" className={({ isActive }) => (isActive ? "active" : "inactive")}>Habit</NavLink>
                
                    <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "inactive")}>About</NavLink>
                
                </ul>
        </nav>
    )
}

