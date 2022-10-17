import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../forms/Login";
import Register from "../forms/Register";
import Forum from "../view/Forum";
import Content from "../view/Content";
import EditUser from "../forms/EditUser";
import Navigation from "../view/Navigation";
import { removeUser } from "../data/repository";
import { getUser } from "../data/repository";

function Routing () {
    const [user, setUser] = useState(getUser());
    
    const loginUser = (user) => {
        setUser(user);
    };

    const logoutUser = () => {
        removeUser();
        setUser(null);
    };

    return (
        <>
            <Router>
                <Navigation user={user} logoutUser={logoutUser} />
                <Routes>
                    <Route  path="/" element={<Content user={user} />}/>
                    <Route  path="/login" element={<Login loginUser={loginUser} />} />
                    <Route  path="/register" element={<Register loginUser={loginUser} />} />
                    <Route  path="/edituser" element={<EditUser user={user} />} />
                    <Route  path="/forum" element={<Forum user={user} />} />
                </Routes>
            </Router>
        </>
    );
}
export default Routing;