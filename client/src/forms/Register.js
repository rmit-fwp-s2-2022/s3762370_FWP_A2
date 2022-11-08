import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { findUser, createUser } from "../data/repository"
import Main from "../Layout/main"
import { TextTitle } from "../Layout/Layoutcss"
// import axios from "axios";

export default function Register (props) {
  const navigate = useNavigate()
  const [err, setErr] = useState(null)
  const [fields, setFields] = useState({
    // setFieldsを有効に作動させるために、一度keyの削除。
    // username: "", email: "", password: ""
  })
  const [errors, setErrors] = useState({})

  // Generic change handler.
  const handleInputChange = (event) => {
    // Cancels the browser's original behaviour.
    event.preventDefault()
    // fieldsに配列を追加。左がkeyで右がその内容。
    setFields({ ...fields, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    // submitが押されたことによる画面遷移を阻止。
    // Prevents screen transitions caused by a submit being pressed.
    event.preventDefault()
    const newUser = await createUser(fields)

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = await handleValidation()
    if (!isValid) {
      return
    } else if (newUser.success === 0) {
      setErr("User already exists, please try again.")
      return
    }

    // Create user.
    const user = (trimmedFields)
    await createUser(trimmedFields)
    console.log("user")
    console.log(newUser.data)

    // Set user state.
    props.loginUser(newUser.data)

    // Navigate to the home page.
    navigate("/")
  }

  const handleValidation = async () => {
    const trimmedFields = trimFields()
    const currentErrors = {}

    let key = "username"
    let field = trimmedFields[key]
    if (field.length === 0)
      currentErrors[key] = "Username is required."
    else if (field.length > 32)
      currentErrors[key] = "Username length cannot be greater than 32."
    // ユーザーチェック。アカウントが既に登録されているかどうか
    // user check
    // else if(await findUser(trimmedFields.username) !== null)
    //   currentErrors[key] = "Username is already registered.";

    key = "email"
    field = trimmedFields[key]
    if (field.length === 0) {
      currentErrors[key] = "Username is required."
      // check valid email or not
    } else if (!/\S+@\S+\.\S+/.test(field)) {
      currentErrors[key] = 'Email is invalid'
    }

    key = "password"
    field = trimmedFields[key]
    if (field.length === 0)
      currentErrors[key] = "Password is required."
    else if (field.length < 8)
      currentErrors[key] = "Password must contain at least 8 characters."
    // backend did not provide a findUser. this is checking this in backend....
    // else if(await findUser(trimmedFields.username) !== null)
    //   currentErrors[key] = "Username is already registered.";

    setErrors(currentErrors)

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 }
  }

  // delete empty fields. this is in prac.8 program
  const trimFields = () => {
    const trimmedFields = {}
    Object.keys(fields).map(key => trimmedFields[key] = fields[key].trim())
    setFields(trimmedFields)

    return trimmedFields
  }

  return (
    <Main>
      <form onSubmit={handleSubmit} className={"text-center"}>
        <TextTitle>Sing up</TextTitle>
        {/* input user username */}
        <input
          className="border-b-2 border-slate-800 my-3"
          type="text"
          name="username"
          value={fields.username}
          onChange={handleInputChange}
          placeholder="Name"
        />
        {errors.username &&
          <div className="text-red-500 text-xs italic">{errors.username}</div>
        }
        <br />
        {/* input user email */}
        <input
          className="border-b-2 border-slate-800 my-3"
          type="text"
          name="email"
          value={fields.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email}</p>
        )}
        <br />
        {/* input passWord */}
        <input
          className="border-b-2 border-slate-800 my-3"
          type="password"
          name="password"
          value={fields.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        {errors.password &&
          <div className="text-red-500 text-xs italic">{errors.password}</div>
        }
        <br />
        <input
          type="submit"
          value="Register"
          className="bg-purple-500 rounded-md shadow-md hover:shadow-none hover:bg-purple-800 text-white py-2 px-5 font-bold cursor-pointer"
        />
        <br />
        {err !== null &&
          <span className="help is-danger">{err}</span>
        }
        <br />
      </form>
    </Main>
  )
}