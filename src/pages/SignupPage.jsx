
import { Link } from "react-router-dom"
import { signup } from "../store/user/user.actions"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function SignupPage(){
    const [credentials, setCredentials] = useState({username: '', password: '', instrument: 'Drum'})
    const navigate = useNavigate()

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.instrument) return
        await signup(credentials)
        navigate('/main')
    }



    return(
        <section>
            <form className="signup-form" onSubmit={onSignup}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    placeholder="Enter Username"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={credentials.username}
                    required/>
                
                <label htmlFor="password">Password:</label>
                <input 
                    type="text"
                    placeholder="Password"
                    id="password"
                    name="password" 
                    onChange={handleChange}
                    value={credentials.password}
                    required/>
                
                <label className="instrument" htmlFor="instrument">
                    Instrument:
                    <select
                    name="instrument"
                    id="instrument"
                    onChange={handleChange}
                    value={credentials.instrument}>
                        <option value="Drum">Drum</option>
                        <option value="Guitar">Guitar</option>
                        <option value="Bass">Bass</option>
                        <option value="Saxophone">Saxophone</option>
                        <option value="Keyboards">Keyboards</option>
                        <option value="Vocals">Vocals</option>
                    </select>
                </label>
                <button>Signup</button>
                <div>
                    Already have an account? <Link to="/">Login</Link> 
                </div>
            </form>



        </section>


        
        
    )
}