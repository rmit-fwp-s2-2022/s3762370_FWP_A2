import React, { useState } from "react";
import Sidebar from "../view/Sidebar";

const Main = ({children}) => {

    return (
        <div>
            {/* to use Link include them inside the router */}
            <div className='flex flex-wrap w-full'>
                <div className='mt-5 justify-center w-full lg:w-2/3 p-10 bg-white mb-10 mr-2'>
                    { children }
                </div>
                <div className='w-full lg:w-3/12 ml-2 mt-5 mb-10 '>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default Main