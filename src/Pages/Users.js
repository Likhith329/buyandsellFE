import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Users = () => {
    const user=JSON.parse(localStorage.getItem('userinfo'))
    const navigate=useNavigate()
    const notifywarning=()=> toast.warning("you aren't the admin to access!")
    useEffect(()=>{
        getData()
    },[])
    const [disp,setDisp]=useState('')
    const styles1={
        display:disp
    }
    const styles2={
        display:disp==''?'none':''
    }
    const [users,setUsers]=useState([])
    async function getData(){
        try {
            setDisp('none')
            await axios.get('https://asimplebuyandsellbe.onrender.com/users/getusers',{
                headers:{
                    "access-token":user.token
                }
            })
            .then(x=>{
                setUsers(x.data.reverse())
                setDisp('')
            })
        } catch (error) {
            notifywarning()
            setTimeout(()=>{
                navigate('/home')
            },2000)
            console.log(error)
        }
    }
  return (
    <div  style={{minHeight:'100vh'}}>
        <div style={styles1}>
        {users?
        <div className='users'>
            {users.map((user)=>(
                <div key={user._id} className='user'>
                    <img src={user.profilepic} className='userpic'/>
                    <div className='username'>{user.name}</div>
                    <div className='useremail'>{user.email}</div>
                </div>
            ))}
        </div>:''}
        </div>
        <div className="text-center " style={styles2}>
            <div className="spinner-border us" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        <ToastContainer/>
   </div>
  )
}

export default Users
