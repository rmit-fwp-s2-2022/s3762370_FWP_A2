import React, { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom"
import Login from "../forms/Login"
import Register from "../forms/Register"
import Forum from "../view/Forum"
import Content from "../view/Content"
import UserList from "../view/UserList"
import EditUser from "../forms/EditUser"
import Navigation from "../view/Navigation"
import { removeUser } from "../data/repository"
import { getUser } from "../data/repository"

const AuthGuard = ({ authenticated, children }) => {
  //TODO: Add AuthGuard to all the page that has to be protected
  const navigate = useNavigate()

  useEffect(() => {
    if (!authenticated) {
      navigate("/login")
    }
  }, [authenticated, navigate])

  return authenticated ? children : null
}

function Routing () {
  const [user, setUser] = useState(getUser())

  const loginUser = (user) => {
    setUser(user)
  }

  const logoutUser = () => {
    removeUser()
    setUser(null)
  }

  return (
    <>
      <Router>
        <Navigation user={user} logoutUser={logoutUser} />
        <Routes>
          <Route path="/login" element={<Login loginUser={loginUser} />} />
          <Route
            path="/register"
            element={<Register loginUser={loginUser} />}
          />

          <Route
            path="/"
            element={
              <AuthGuard authenticated={user}>
                <Content user={user} />
              </AuthGuard>
            }
          />
          <Route path="/edituser" element={<EditUser user={user} />} />
          <Route path="/forum" element={<Forum user={user} />} />
          <Route path="/userList" element={<UserList user={user} />} />
        </Routes>
      </Router>
    </>
  )
}
export default Routing
