import { PostImage, Text, TextTitle } from "../Layout/Layoutcss"

import React, { useState } from "react"
import Main from "../Layout/main"
import Profile from "./Profile"
import { findUser } from "../data/repository"

const Content = (props) => {

    // const [username, setUsername] = useState(localStorage.getItem('fullName'))

    // console.log(users.username)

    return (
        <Main>
            <Profile userLoggedIn={props.user.username} />
            <div className="mt-10 text-[#404040]">
                <TextTitle>Welcome, {props.user.username}</TextTitle>
                <Text>quam pellentesque, Dec 1t,2018</Text>

            </div>
        </Main>
    )
}

export default Content