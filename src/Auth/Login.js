import axios from 'axios'
import { Form, Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Login = () => {

    const navigate=useNavigate()

    const [disp,setDisp]=useState('')
    const styles1={
        display:disp
    }
    const styles2={
        display:disp==''?'none':''
    }

    const notifysuccess=()=> toast.success("Login Successfull!")
    const notifyinvalid= () => toast.error("Invalid Email or Password!")

    const initialValues={
        email:'',
        password:'',
    }

    const validate=(values)=>{
        let errors={}
        if(!values.email)errors.email='Required*'
        if(!values.password)errors.password='Required*'
        return errors;
        }

    const onSubmit=(values)=>{
        async function Login(){
            try {
                setDisp('none')
                await axios.post('https://asimplebuyandsellbe.onrender.com/register/signin',{
                ...values
            }).then(res=>{
                localStorage.setItem('userinfo',JSON.stringify(res.data))
                notifysuccess()
                setTimeout(() => {
                    navigate('/home')
                }, 1000);
                setDisp('')
            })
            } catch (error) {
                notifyinvalid()
                setDisp('')
                console.log(error)
            }
           }
           Login()
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
                    <div className='header'>Log in</div>
                    <div className='inp'>
                        <label>Email</label>
                        <input type={'email'} className='form-control' placeholder='Enter Email' style={{width:'300px'}} name='email' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        <div className='error'>{formik.errors.email && formik.touched.email?<div className="error">{formik.errors.email}</div>:null}</div>
                    </div>
                    <div className='inp'>
                        <label>Password</label>
                        <input type={'password'} className='form-control' placeholder='Enter Password' style={{width:'300px'}} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        <div className='error'>{formik.errors.password && formik.touched.password?<div className="error">{formik.errors.password}</div>:null}</div>
                    </div>
                    <button className='btn btn-primary loginbtn' type='submit' style={styles1}>Login</button>
                    <button className='btn btn-primary loginbtn' type="button" style={styles2} disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                    <div>Don't have an account? <Link to={'/signup'}>Signup</Link></div>
                </Form>
            </Formik>
            <ToastContainer/>
        </div>
    </div>
  )
}

export default Login