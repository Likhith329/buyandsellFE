import axios from 'axios'
import { Form, Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Sell = () => {

  const navigate=useNavigate()
  const user=JSON.parse(localStorage.getItem('userinfo'))

  const [disp,setDisp]=useState('')
  const styles1={
      display:disp
  }
  const styles2={
      display:disp==''?'none':''
  }
  const notifysuccess=()=> toast.success("item added for sale successfully!")
  const [itempic,setItempic]=useState()

  const initialValues={
    name:'',
    description:'',
    price:'',
    itempic
}

  const validate=(values)=>{
    let errors={}
    if(!values.name)errors.name='Required*'
    if(!values.description)errors.description='Required*'
    if(!values.price)errors.price='Required*'
    return errors;
  }

const onSubmit=(values)=>{
   values.itempic=itempic
   async function additem(){
    try {
        setDisp('none')
        await axios.post('https://asimplebuyandsellbe.onrender.com/item/additem',{
        ...values,seller:user._id
    },{
      headers:{
          "access-token":user.token
      }
  }).then(res=>{
        notifysuccess()
        setTimeout(() => {
            navigate('/home')
        }, 1500);
        setDisp('')
    })
    } catch (error) {
        setDisp('')
        console.log(error)
    }
   }
   additem()
  }
  
const formik=useFormik({
    initialValues,
    validate,
    onSubmit
})

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
          setItempic(data.url)
          setDisp('')
      })
  }
  else{
      console.log('Invalid type')
  }
}

  return (
    <div className='container-fluid' style={{minHeight:'100vh'}}>
        <div className='d-flex flex-wrap align-items-center justify-content-evenly'>
            <Formik>
              <Form onSubmit={formik.handleSubmit} className='form shadow'>
                  <div className='header'>Add an item</div>
                  <div className='inp'>
                      <label>Name</label>
                      <input type={'text'} className='form-control' placeholder='Enter Name' style={{width:'300px'}} name='name' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      <div className='error'>{formik.errors.name && formik.touched.name?<div className="error">{formik.errors.name}</div>:null}</div>
                  </div>
                  <div className='inp'>
                      <label>Description</label>
                      <textarea className='form-control' placeholder='Enter Description...' rows={'3'} name='description' onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
                      <div className='error'>{formik.errors.description && formik.touched.description?<div className="error">{formik.errors.description}</div>:null}</div>
                  </div>
                  <div className='inp'>
                      <label>Price</label>
                      <div className="input-group">
                        <span className="input-group-text">???</span>
                        <input type="number" className="form-control" placeholder='Enter Price' aria-label="Amount (to the nearest rupee)" name='price' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      </div>
                      <div className='error'>{formik.errors.price && formik.touched.price?<div className="error">{formik.errors.price}</div>:null}</div>
                  </div>
                  <div className='inp'>
                      <label>Upload pic</label>
                      <input type={'file'} className='form-control' style={{width:'300px'}} name='name' onChange={e=>postpic(e.target.files[0])} onBlur={formik.handleBlur}/>
                  </div>
                  <button className='btn btn-primary loginbtn' type='submit' style={styles1}>Add</button>
                  <button className='btn btn-primary loginbtn' type="button" style={styles2} disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                  </button>
              </Form>
            </Formik>
            <ToastContainer/>
        </div>
    </div>
  )
}

export default Sell