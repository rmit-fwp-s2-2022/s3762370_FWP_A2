import axios from "axios"

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000"
const USER_KEY = "user"

// --- Auth & User ---------------------------------------------------------------------------------------
async function findUser (user_id) {
  const response = await axios.get("http://localhost:4000/api/users/profile", {
    headers: { user_id: user_id },
  })

  const user = response.data.data
  return user
}

async function findAllUser () {
  const response = await axios.get("http://localhost:4000/api/users/userList")
  return response.data
}

async function searchUser (fields) {
  console.log(fields)
  const response = await axios.get(
    "http://localhost:4000/api/users/search",
    fields
  )
  return response.data
}

async function verifyUser (fields) {
  const response = await axios.post(
    "http://localhost:4000/api/auth/sign-in",
    fields
  )
  const user = response.data

  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if (user.success === 1) setUser(user.user)

  return user
}

async function createUser (fields) {
  const response = await axios.post(
    "http://localhost:4000/api/auth/sign-up",
    fields
  )

  console.log(response.data)
  return response.data
}

async function updateUser (fields) {
  let response = await axios({
    method: "put",
    url: "http://localhost:4000/api/users/profile",
    headers: {
      user_id: fields.user_id,
    },
    data: {
      email: fields.email,
    },
  })

  const user = response.data
  if (user.success === 1) {
    setUser(user.data)
  }

  return response.data
}

// --- Post ---------------------------------------------------------------------------------------
// get a post data
async function getPosts () {
  const response = await axios.get(API_HOST + "/api/postings")

  return response.data
}

async function getFollowedUser (fields) {
  const response = await axios.get(API_HOST + "/api/users/followUsers", {
    headers: {
      user_id: fields.user_id,
    },
  })

  return response.data.data
}

// create a post
async function createPost (newPost) {
  let response = await axios({
    method: "post",
    url: "http://localhost:4000/api/postings/",
    headers: {
      user_id: newPost.user_id,
    },
    data: {
      content: newPost.content,
    },
  })

  return response.data
}

async function replyPost (newPost) {
  let response = await axios({
    method: "post",
    url: `http://localhost:4000/api/postings/reply/${newPost.posting_id}`,
    headers: {
      user_id: newPost.user_id,
    },
    data: {
      content: newPost.content,
    },
  })

  return response.data
}

async function followUser (fields) {
  let response = await axios({
    method: "post",
    url: `http://localhost:4000/api/users/follow/${fields.followed_user_id}`,
    headers: {
      user_id: fields.user_id,
    },
  })

  return response.data
}

async function unfollowUser (fields) {
  let response = await axios({
    method: "post",
    url: `http://localhost:4000/api/users/unfollow/${fields.followed_user_id}`,
    headers: {
      user_id: fields.user_id,
    },
  })

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
  getFollowedUser,
  findUser,
  verifyUser,
  createUser,
  findAllUser,
  searchUser,
  getPosts,
  createPost,
  replyPost,
  getUser,
  removeUser,
  updateUser,
  setUser,
  followUser,
  unfollowUser,
}
