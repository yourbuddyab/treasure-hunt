import React from 'react'
import { Outlet } from "react-router-dom";
export default function Main() {
    return (
        <div className='container mt-5'>
            <div className="col-md-12 text-center text-light"><h1>Treasure Hunt</h1></div>
            <Outlet />
        </div>
    )
}
