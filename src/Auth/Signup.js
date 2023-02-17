import axios from 'axios'
import { Form, Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    const navigate=useNavigate()
    const [disp,setDisp]=useState('')
    const styles1={
        display:disp
    }
    const styles2={
        display:disp==''?'none':''
    }

    const notifysuccess=()=> toast.success("Registration Successfull!")
    const notifyuserexist= () => toast.warning("User Already Exists!")

    const [profilepic,setProfilepic]=useState()

    const initialValues={
        name:'',
        email:'',
        password:'',
        confirmpassword:'',
        profilepic
    }

    const validate=(values)=>{
        let errors={}
        if(!values.name)errors.name='Required*'
        if(!values.email)errors.email='Required*'
        if(!values.password)errors.password='Required*'
        if(!values.confirmpassword)errors.confirmpassword='Required*'
        if(values.confirmpassword!=values.password)errors.confirmpassword="Password did'nt matched!"
        return errors;
        }

    const onSubmit=(values)=>{
       values.profilepic=profilepic
       async function signup(){
        try {
            setDisp('none')
            await axios.post('https://asimplebuyandsellbe.onrender.com/register/signup',{
            ...values
        }).then(res=>{
            notifysuccess()
            setTimeout(() => {
                navigate('/')
            }, 1000);
            setDisp('')
        })
        } catch (error) {
            notifyuserexist()
            setDisp('')
            console.log(error)
        }
       }
       signup()
      }

      function postpic(file){
        setDisp('none')
        if(file.type=='image/jpeg' || file.type=='image/png'){
            const data=new FormData()
            data.append('file',file)
            data.append('upload_preset','chat_app')
            data.append('cloud_name','likhithkumar')
            fetch('https://api.cloudinary.com/v1_1/likhithkumar/image/upload',{
                method:'post',
                body:data
            })
            .then(res=>res.json())
            .then(data=>{
                setProfilepic(data.url)
                setDisp('')
            })
        }
        else{
            console.log('Invalid type')
        }
    }
      
    const formik=useFormik({
        initialValues,
        validate,
        onSubmit
    })
  return (
    <div className='container-fluid'>
        
        <img src='https://cdn.dribbble.com/users/230124/screenshots/11568503/media/93d586c7df366789a31cc68ca16a08c0.jpg?compress=1&resize=1000x750&vertical=top' className='logo'/>

        <div className='d-flex flex-wrap align-items-center justify-content-evenly'>
            <img className='handshake' src='https://static.vecteezy.com/system/resources/previews/004/305/773/original/businessman-handshake-flat-illustration-business-partners-investors-entrepreneurs-making-deal-isolated-cartoon-characters-on-white-background-successful-partnership-negotiations-concept-vector.jpg'/>
            <Formik>
                <Form onSubmit={formik.handleSubmit} className='form shadow'>
                    <div className='header'>Sign up</div>
                    <div className='inp'>
                        <label>Name</label>
                        <input type={'text'} className='form-control' placeholder='Enter Name' style={{width:'300px'}} name='name' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        <div className='error'>{formik.errors.name && formik.touched.name?<div className="error">{formik.errors.name}</div>:null}</div>
                    </div>
                    <div className='inp'>
                        <label>Email</label>
                        <input type={'email'} className='form-control' placeholder='Enter Email' style={{width:'300px'}} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        <div className='error'>{formik.errors.email && formik.touched.email?<div className="error">{formik.errors.email}</div>:null}</div>
                    </div>
                    <div className='inp'>
                        <label>Upload your pic</label>
                        <input type={'file'} className='form-control'  style={{width:'300px'}} name='profilepic' accept='image/*' onChange={e=>postpic(e.target.files[0])} onBlur={formik.handleBlur}/>
                        <div className='error'>{formik.errors.email && formik.touched.email?<div className="error">{formik.errors.email}</div>:null}</div>
                    </div>
                    <div className='inp'>
                        <label>Password</label>
                        <input type={'password'} className='form-control' placeholder='Enter Password' style={{width:'300px'}} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        <div className='error'>{formik.errors.password && formik.touched.password?<div className="error">{formik.errors.password}</div>:null}</div>
                    </div>
                    <div className='inp'>
                        <label>Confirm Password</label>
                        <input type={'text'} className='form-control' placeholder='Confirm Password' style={{width:'300px'}} name='confirmpassword' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        <div className='error'>{formik.errors.confirmpassword && formik.touched.confirmpassword?<div className="error">{formik.errors.confirmpassword}</div>:null}</div>
                    </div>
                    <button className='btn btn-primary loginbtn' type='submit' style={styles1}>Signup</button>
                    <button className='btn btn-primary loginbtn' type="button" style={styles2} disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                    <div>Already have an account? <Link to={'/'}>Login</Link></div>
                </Form>
            </Formik>
            <ToastContainer/>
        </div>
    </div>
  )
}

export default Signup