import { Link } from 'react-router-dom';

export function AppHeader(){


    return (
        <header className="app-header">
            <Link to="/">
                <h1 >
                    JamRoom
                </h1>
            </Link>
        </header>

    )
}