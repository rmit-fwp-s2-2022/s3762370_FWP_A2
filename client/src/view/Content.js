import { PostImage,Text, TextTitle } from "../Layout/Layoutcss";

import React, { useState } from "react";
import Main from "../Layout/main";
import Profile from "./Profile";

const Content =(props)=>{

    const [username, setUsername] = useState(localStorage.getItem('fullName'));

    

    return (
        <Main>
            <Profile userLoggedIn={username}/>
            <div className="mt-10 text-[#404040]">
                <TextTitle>Lorem ipsum dolor</TextTitle>
                <Text>quam pellentesque, Dec 1t,2018</Text>
                <PostImage src="/images/image1.jpg" alt="Image" />
                <Text>Nisi vitae suscipt..</Text>
                <Text>Semper quis lectus nulla at. Nullam ac tortor viae faucibus ornare</Text>
                <TextTitle>Placerat vestibulum</TextTitle>
                <Text>elementum Integer enim neque, Sep 21,2018</Text>
                <PostImage src="/images/image2.jpg" alt="Image" />
            </div>
        </Main>
    );
}

export default Content