import { Link } from 'react-router-dom';
import { logout } from '../store/user/user.actions';
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
import {showErrorMsg, showSuccessMsg} from '../services/event-bus.service'


export function AppHeader(){
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)


    async function onLogout(){
        try{
            await logout()
            navigate("/")
            showSuccessMsg(`Bye now`)
        } catch (err) {
            console.log('error logginout', err);
            showErrorMsg('Cannot logout')
        }

    }


    return (
        <header className="app-header">
            <Link to="/main">
                <h1 >
                    JamRoom
                </h1>
            </Link>
            {user &&
                <button onClick={onLogout}>
                    Logout
                </button>     
            }

        </header>

    )
}