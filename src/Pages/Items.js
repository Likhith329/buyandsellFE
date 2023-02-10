import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { format } from 'timeago.js';

const Items = () => {
    const user=JSON.parse(localStorage.getItem('userinfo'))
    const [items,setItems]=useState([])
    const [render,setRender]=useState(false)
    useEffect(()=>{
        getData()
    },[render])
    async function getData(){
        const {data}=await axios.get('http://localhost:8000/item/getitems',{
            headers:{
                "access-token":user.token
            }
        })
        let fdata=data.filter(x=>x.buyer===null).reverse()
        setItems(fdata)
    }
  return (
    <div>
        <img className='themeimg' src='https://www.reliancesmartmoney.com/images/default-source/default-album/interestrate.jpg?sfvrsn=0'/>
        {items?<div className='items'>
            {items.map((item)=>(
                <Item key={item._id} item={item} user={user} render={render} setRender={setRender}/>
            ))}
        </div>:''}
    </div>
  )
}

export default Items

function Item({item,user,render,setRender}){
    
    const notifysuccess=()=> toast.success("Item Bought Successfully!!")
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
                await axios.put('http://localhost:8000/item/buyitem',{
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
    return(
        <div className='item shadow'>
            <div className='d-flex justify-content-center'><img className='itemimg' src={item.itempic}/></div>
            <div className='iteminfo'>
                <div className='itemname'>{item.name}</div>
                <div className='itemdes'>{item.description}</div>
                <div className='d-flex justify-content-between align-items-center'>
                    <span className='itemprice'>₹{item.price}</span>
                    {item.seller._id!=user._id?
                    <div>
                        <button className='btn btn-primary buybtn' onClick={handlebuy} style={styles1}>Buy</button>
                        <button className='btn btn-primary buybtn' type="button" style={styles2} disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </button>
                    </div>:''}
                </div>
                <div className='itemfooter'>
                    <span className='timeago'>{format(item.createdAt)}</span>
                    <span className='byname'>by {item.seller._id===user._id?'You':<span>{item.seller.name}</span>}</span>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}