import axios from "axios"

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000"
const USER_KEY = "user"

// --- Auth & User ---------------------------------------------------------------------------------------
async function verifyUser (fields) {
  console.log(fields)
  const response = await axios.post("http://localhost:4000/api/auth/sign-in", fields)
  console.log("verifyUser-2")
  console.log(response)
  const user = response.data

  console.log("verifyUser-3")
  console.log(user.success)

  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if (user.success === 1)
    setUser(user)

  return user
}

// 実装されていない-!-!-!-!-!-!-!-!-!-!-!-!-!
// async function findUser(id) {
//   const response = await axios.get(API_HOST + `/api/users/select/${id}`);

//   return response.data;
// }
// -!-!-!-!-!-!-!-!-!-!-!-!-!

async function createUser (fields) {

  const response = await axios.post("http://localhost:4000/api/auth/sign-up", fields)

  console.log(response.data)
  return response.data
}

// オリジナル-!-!-!-!-!-!-!-!-!-!-!-!-!
async function updateUser (fields) {
  const response = await axios.put("http://localhost:4000/api/users/profile", fields)

  return response.data
}

// --- Post ---------------------------------------------------------------------------------------
// get a post data
async function getPosts () {
  const response = await axios.get(API_HOST + "/api/posts/:user_id")

  return response.data
}

// create a post
async function createPost (post) {
  const response = await axios.post(API_HOST + "/api/posting", post)

  return response.data
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser (user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

function getUser () {
  return JSON.parse(localStorage.getItem(USER_KEY))
}

function removeUser () {
  localStorage.removeItem(USER_KEY)
}

export {
  // findUser,
  verifyUser, createUser,
  getPosts, createPost,
  getUser, removeUser
}