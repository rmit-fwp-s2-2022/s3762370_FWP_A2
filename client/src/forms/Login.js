import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { TextTitle } from "../Layout/Layoutcss"
import Main from "../Layout/main"
import { verifyUser } from "../data/repository"


const Login = (props) => {
    const navigate = useNavigate()

    const [fields, setFields] = useState({
        username: '',
        password: ''
    })

    const [err, setErr] = useState(null)
    const [showError, setShowError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        e.preventDefault()
        setFields(fields => ({ ...fields, [e.target.name]: e.target.value }))
    }

    // ここでAPIに保存
    //　save by API
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("pre-checking")

        // const newUser = await verifyUser(fields.username, fields.password);
        const newUser = await verifyUser(fields)

        console.log("middle-checking")

        if (newUser.success === 0) {
            // Login failed, reset password field to blank and set error message.
            setFields({ ...fields, password: "" })
            setErr("Username and / or password invalid, please try again.")
            return
        }
        console.log("after-checking")
        console.log(newUser)

        // Set user state.
        props.loginUser(newUser.user)

        // Navigate to the home page.
        navigate("/")
    }

    return (
        <Main>
            <form onSubmit={handleSubmit} className={"text-center"}>
                <TextTitle>Log in</TextTitle>
                <input name="username" id="username" className="border-b-2 border-slate-800 my-3"
                    value={fields.username} onChange={handleChange} placeholder="Name" />
                <br />
                <input className="border-b-2 border-slate-800 my-3" type={showPassword ? "text" : "password"}
                    name="password" id="password" value={fields.password} onChange={handleChange} placeholder="Password" />
                <br />
                <input type={"checkbox"} onChange={() => setShowPassword(!showPassword)}></input>
                <small> show password</small>
                <br />
                <button type="submit" className="bg-purple-500 rounded-md shadow-md hover:shadow-none hover:bg-purple-800 text-white py-2 px-5 font-bold" >Login</button>
                <br />
                {err !== null &&
                    <span className="help is-danger">{err}</span>
                }
                <br />
                <p >Don't have an account?<Link className="pl-3 font-bold" to={"/register"}> Sign Up </Link></p>

            </form>
        </Main>
    )
}
export default Login