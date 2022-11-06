import { useState } from "react"
import { Link } from "react-router-dom"

export default function Navigation (props) {

    return (
        <div className="flex justify-between items-center py-3 px-10 gap-10 bg-[#303030] text-white font-bold">
            <div className="w-full block flex-grow">
                <Link className="mr-4" to={"/"}>Home </Link>
                <Link to={"/forum"}>Forum</Link>
            </div>
            <div className="flex-grow flex items-center">
                <Link to={"/"} className="right-0 mr-4">Contact</Link>
                {
                    props.user !== null &&
                    <>
                        <Link className="nav-link block mr-4" to="/edituser">My Profile</Link>
                        <Link className="nav-link block mr-4" to="/forum">Forum</Link>
                    </>
                }
                {props.user === null ?
                    <>
                        <Link className="nav-link block mr-4" to="/register">Register</Link>
                        <Link className="nav-link block mr-4" to="/login">Login</Link>
                    </>
                    :
                    <>
                        <span className="nav-link text-light block">Welcome, {props.user.username}</span>
                        <Link className="nav-link block" to="/login" onClick={props.logoutUser}>Logout</Link>
                    </>
                }
            </div>
        </div>
    )
}