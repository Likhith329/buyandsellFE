import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate=useNavigate()
    const user=JSON.parse(localStorage.getItem('userinfo'))

    useEffect(()=>{
        if(!user)navigate('/')
      },[])

    return (
        <div>
            {user?
            <div>
                <div className='container-fluid'>
                    <nav className="navbar navbar-expand-lg ">
                        <div className="container-fluid">
                            <a className="navbar-brand" >
                                <img src='https://cdn.dribbble.com/users/230124/screenshots/11568503/media/93d586c7df366789a31cc68ca16a08c0.jpg?compress=1&resize=1000x750&vertical=top' className='navlogo'/>
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                            <div className='d-flex flex-wrap '>
                                <button className='btn btn-outline-light navbtn' onClick={()=>{navigate('')}}>HOME</button>
                                <button className='btn btn-outline-light navbtn' onClick={()=>{navigate('profile')}}>PROFILE</button>
                                <button className='btn btn-outline-light navbtn' onClick={()=>{navigate('sell')}}>SELL</button>
                                <button className='btn btn-outline-light navbtn' onClick={()=>{
                                    localStorage.removeItem('userinfo')
                                    navigate('/')
                                    }}>LOGOUT</button>
                            </div>
                            </div>
                        </div>
                    </nav>
                    <Outlet/>
                </div>
            </div>:navigate('/')}
        </div>
    )
}

export default Home

