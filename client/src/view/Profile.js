import React from 'react'
import { Text, TextTitle, UserImage } from '../Layout/Layoutcss'
import { useState } from 'react'
import { Link } from "react-router-dom"
import { getUser } from "../data/repository"

const Profile = (props) => {

    const users = getUser()
    const [fields, setFields] = useState({
        username: users.username,
        email: users.email,
        cDate: users.createdAt,
        uDate: users.updatedAt
    })

    const [showModal, setShowModal] = React.useState(false)

    function deleteUser () {
        setShowModal(false)
        localStorage.clear()

    }

    if (fields.username) {
        return (
            <div className='p-5 shadow-xl rounded-xl'>
                <div>
                    <TextTitle>Profile</TextTitle>
                    <div className='flex border-b border-slate-300'>
                        <UserImage src="/images/unknown.png" alt="Image" />
                        <div className='ml-5 my-auto items-center'>
                            <p>{fields.username}</p>
                            <p className='text-[#404040]'>{fields.email}</p>
                        </div>
                        {/* jump to editing page */}
                        <Link className='ml-10 my-auto' to={"/edituser"}>
                            <a target="_blank" class=" text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </a>
                        </Link>
                        {/* do deleting user profile */}
                        <a target="_blank" class="ml-5 my-auto text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100 cursor-pointer" onClick={() => setShowModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </a>
                        {/* from here POP UP */}
                        {showModal ? (
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        {/*inside of card modal*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="text-3xl font-semibold">
                                                    Delete account
                                                </h3>
                                            </div>

                                            <div className="relative p-6 flex-auto">
                                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                    confirm to delete your account
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                    className="text-black font-bold uppercase px-6 py-2 text-sm outline-none mr-1 mb-1"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    CANCEL
                                                </button>
                                                <button
                                                    className="text-black font-bold uppercase text-sm px-6 py-2 outline-none mr-1 mb-1"
                                                    type="button"
                                                    onClick={() => deleteUser()}
                                                >
                                                    CONFIRM
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                        {/* pop up end */}
                    </div>
                    <p className='mt-2'>Joined: {fields.cDate}</p>
                    <p className='mt-2'>Updateded: {fields.uDate}</p>
                </div>
            </div>
        )
    }
}

export default Profile