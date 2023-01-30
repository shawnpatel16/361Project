import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div className = "home-page">
            <h1 className = "home-title">Owl</h1>
                <h3 className="home-description">A better way to stay organized.</h3>
            </div>
            <div className = "card">
                <Link to="/journal">
                    <div className = "container">
                        <h4><b>Click here to start Journaling</b></h4>
                    </div>
                </Link>
            </div>
        </>
    )
}