import { useState, useEffect } from "react"
import { findAllUser, searchUser, followUsers } from "../data/repository"

export default function Users (props) {
  const [users, setUsers] = useState([])
  const [field, setField] = useState({
    username: "",
  })
  const [username, setUsername] = useState("")

  // Load users.
  useEffect(() => {
    async function loadUsers () {
      const UserList = await findAllUser()
      setUsers(UserList)
    }
    loadUsers()
  }, [])

  // Generic change handler.
  const handleInputChange = (e) => {
    e.preventDefault()
    setField((field) => ({ ...field, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setUsername(field.username)
    async function loadUsers () {
      const UserList = await searchUser(field)
      setUsers(UserList)
    }
    loadUsers()
  }

  return (
    <div>
      <h1 className="display-4">Users</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <div className="col-md-4">
            <label htmlFor="username" className="control-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              className="form-control"
              value={field.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
          </div>
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Search" />
        </div>
      </form>

      {users.length === 0 ? (
        <p className="alert alert-info">
          No username matches the search <strong>'{username}'</strong>.
        </p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
