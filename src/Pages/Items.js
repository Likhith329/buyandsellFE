import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { format } from 'timeago.js';

const Items = () => {
    const user=JSON.parse(localStorage.getItem('userinfo'))
    const [items,setItems]=useState([])
    const [render,setRender]=useState(false)
    useEffect(()=>{
        getData()
    },[render])
    const [disp,setDisp]=useState('')
    const styles1={
        display:disp
    }
    const styles2={
        display:disp==''?'none':''
    }
    async function getData(){
        try {
            setDisp('none')
            await axios.get('https://asimplebuyandsellbe.onrender.com/item/getitems',{
                headers:{
                    "access-token":user.token
                }
            })
            .then(x=>{
                let fdata=x.data.filter(x=>x.buyer===null).reverse()
                setItems(fdata)
                setDisp('')
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <div>
        <img className='themeimg' src='https://www.reliancesmartmoney.com/images/default-source/default-album/interestrate.jpg?sfvrsn=0'/>
        {items?<div className='items' style={styles1}>
            {items.map((item)=>(
                <Item key={item._id} item={item} user={user} render={render} setRender={setRender}/>
            ))}
        </div>:''}
        </div>
        <div className="text-center" style={styles2}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
  )
}

export default Items

function Item({item,user,render,setRender}){

    const navigate=useNavigate()
    const notifysuccess=()=> toast.success("Item Bought Successfully!!")
    const notifyremove=()=> toast.success("Item removed Successfully!!")
    const notifyerror=()=> toast.warning("Item Sold Out!!")
    const [disp,setDisp]=useState('')
    const styles1={
        display:disp
    }
    const styles2={
        display:disp==''?'none':''
    }
    const handlebuy=()=>{
        async function buyitem(){
            try {
                setDisp('none')
                await axios.put('https://asimplebuyandsellbe.onrender.com/item/buyitem',{
                itemId:item._id
            },{
              headers:{
                  "access-token":user.token
              }
          }).then(res=>{
                notifysuccess()
                setTimeout(() => {
                    setRender(!render)
                }, 1000);
                setDisp('')
            })
            } catch (error) {
                notifyerror()
                setTimeout(() => {
                    setRender(!render)
                }, 1000);
                setDisp('')
                console.log(error)
            }
           }
           buyitem()
    }
    const handlecheckout=async()=>{
        try {
            setDisp('none')
            await axios.post('https://asimplebuyandsellbe.onrender.com/stripe/create-checkout-session',{
                item,userId:user._id
            }).then((res)=>{
                setDisp('')
                if(res.data.url){
                    window.location.href=res.data.url
                }

            }).catch(error=>console.log(error))
        } catch (error) {
            console.log(error)
        }
    }
    const handleremove=()=>{
        async function removeitem(){
          try {
              setDisp('none')
              await axios.delete('https://asimplebuyandsellbe.onrender.com/item/removeitem', {
                headers: {
                  "access-token":user.token
                },
                data: {
                  itemId:item._id
                }
              }).then(res=>{
              notifyremove()
              setRender(!render)
              setDisp('')
          })
          } catch (error) {
              notifyerror()
              setTimeout(() => {
                setRender(!render)
              }, 1000);
              setDisp('')
              console.log(error)
          }
         }
         removeitem()
      }
    return(
        <div className='item shadow'>
            <div className='d-flex justify-content-center'><img className='itemimg' src={item.itempic}/></div>
            <div className='iteminfo'>
                <div className='itemname'>{item.name}</div>
                <div className='itemdes'>{item.description}</div>
                <div className='d-flex justify-content-between align-items-center'>
                    <span className='itemprice'>₹{item.price}</span>
                    {item.seller._id!=user._id && user._id!=='63ee86e261a8a0d1c24aadba'?
                    <div>

                        <button className='btn btn-primary buybtn' onClick={handlecheckout} style={styles1}>Buy</button>

                        <button className='btn btn-primary buybtn' type="button" style={styles2} disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </button>
                    </div>:''}
                </div>
                {user._id==='63ee86e261a8a0d1c24aadba'?
                <div className='d-flex justify-content-between' style={{width:'100%'}}>
                <button className='btn btn-secondary buybtn'  style={styles1} onClick={()=>{navigate(`edit/${item._id}`)}}>Edit</button>
                <button className='btn btn-secondary buybtn' type="button" style={styles2} disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </button>
                <button className='btn btn-secondary buybtn' onClick={handleremove} style={styles1}>Remove</button>
            </div>:''}
                <div className='itemfooter'>
                    <span className='timeago'>{format(item.updatedAt)}</span>
                    <span className='byname'>by {item.seller._id===user._id?'You':<span>{item.seller.name}</span>}</span>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}