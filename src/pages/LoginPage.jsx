import {  useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../store/user/user.actions"
import "../assets/style/pages/LoginPage.css"


export function LoginPage(){
    const [credentials, setCredentials] = useState({username: '', password: '', instrument: ''})
    const navigate = useNavigate()


    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        await login(credentials)
        navigate('/main')

    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }



    return(
        <section>
            <form className="login-form" onSubmit={onLogin}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    placeholder="Enter Username"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={credentials.username}
                 />
                <label htmlFor="password">Password:</label>
                <input 
                    type="text"
                    placeholder="Password"
                    id="password"
                    name="password" 
                    onChange={handleChange}
                    value={credentials.password}/>
                <button>Login</button>
                <div>
                    Don't have an account? <Link to="/signup">Signup</Link> 
                </div>                
            </form>

    </section>
    )
}