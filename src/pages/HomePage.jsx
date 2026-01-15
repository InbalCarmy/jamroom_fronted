import { Link } from "react-router-dom";


export function HomePage(){


    return(
        <section className="home-page">
            <h1>Welcome to</h1>
            <div>
                JamRoom
            </div>
            <Link to='/login'>Login</Link>

        </section>


    )
}