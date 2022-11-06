import React, { useState, useEffect } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getPosts, createPost } from "../data/repository"
import { TextTitle } from "../Layout/Layoutcss"
import Main from "../Layout/main"

// the reference from prac.9
export default function Forum (props) {
  const [post, setPost] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  // To show replying card
  const [showModal, setShowModal] = React.useState(false)
  const [reply, setReply] = useState([])

  // post reply on database
  const handleReply = async (e) => {

  }

  // cancel a reply
  const cancelReply = (e) => {
    setShowModal(false)
  }

  // Load posts.
  useEffect(() => {
    async function loadPosts () {
      const currentPosts = await getPosts()
      setPosts(currentPosts)
      setIsLoading(false)
    }

    loadPosts()
  }, [])

  const resetPostContent = () => {
    setPost("")
    setErrorMessage(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // As React Quill uses HTML tags within the text the empty check first removes all HTML elements using a regex.
    if (post.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setErrorMessage("A post cannot be empty.")
      return
    }

    // check the number of letter is over 600 or not
    if (CheckLetter === "over") {
      setErrorMessage("your posting is over letters")
      return
    }

    // Create post.
    const newPost = { text: post }

    // -------****-----------------link to the backend-----------------****----------
    await createPost(newPost)
    // -------****-----------------*******************-----------------****----------

    // Add post to locally stored posts.
    setPosts([...posts, newPost])

    resetPostContent()
  }

  // checking the number of letter
  const CheckLetter = (post) => {
    let check = ""

    if (post.length > 600) {
      check = "over"
    }

    return check
  }

  return (
    <div>
      <Main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <TextTitle>New Post</TextTitle>
            <div className="form-group" style={{ marginBottom: "60px" }}>
              <ReactQuill theme="snow" value={post} onChange={setPost} style={{ height: "180px" }} />
            </div>
            {errorMessage !== null &&
              <div className="">
                <span className="text-red-500 text-xs italic">{errorMessage}</span>
              </div>
            }
            <div className="">
              <input type="button"
                className="bg-purple-500 rounded-md shadow-md hover:shadow-none hover:bg-purple-800 text-white py-2 px-5 font-bold cursor-pointer"
                value="Reset"
                onClick={resetPostContent} />
              <input
                type="submit"
                className="bg-red-500 rounded-md shadow-md hover:shadow-none hover:bg-red-800 text-white py-2 px-5 font-bold cursor-pointer ml-2"
                value="Post" />
            </div>
          </fieldset>
        </form>

        {/* to show reply page, after database is complete do this function*/}
        {/* {showModal ? (
        <>
          <form onSubmit={handleReply}>
            <fieldset>
              <TextTitle>Replying</TextTitle>
              <div className="form-group" style={{ marginBottom: "60px" }}>
                <ReactQuill theme="snow" value={reply} onChange={setReply} style={{ height: "180px" }} />
              </div>
              {errorMessage !== null &&
                <div className="form-group">
                  <span className="text-red-500 text-xs italic">{errorMessage}</span>
                </div>
              }
              <div className="form-group">
                <input
                  type="button"
                  className="bg-purple-500 rounded-md shadow-md hover:shadow-none hover:bg-purple-800 text-white py-2 px-5 font-bold cursor-pointer" 
                  value="Cancel"
                  onClick={cancelReply} />
                <input 
                  type="submit"
                  className="bg-red-500 rounded-md shadow-md hover:shadow-none hover:bg-red-800 text-white py-2 px-5 font-bold cursor-pointer ml-2" 
                  value="Reply" />
              </div>
            </fieldset>
          </form>
        </>
      ) : null} */}

        {/* user forum part copy from Lec.9*/}
        <hr />
        <TextTitle>Forum</TextTitle>
        <div>
          {isLoading ?
            <div>Loading posts...</div>
            :
            posts.length === 0 ?
              <span className="text-black text-base">No posts have been submitted.</span>
              :
              posts.map((x) =>
                <div className="border my-4 p-4 border-slate-600">
                  <h6 className="text-base text-black">{x.username}</h6>
                  <div dangerouslySetInnerHTML={{ __html: x.text }} />
                  <button
                    className="bg-red-500 rounded-md shadow-md hover:shadow-none hover:bg-red-800 text-white py-2 px-5 font-bold cursor-pointer ml-2">
                    {/* onClick={() => setShowModal(true)} */}
                  </button >
                </div>
              )
          }
        </div>
      </Main>
    </div>
  )
}
