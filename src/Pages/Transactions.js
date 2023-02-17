import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Transactions = () => {
    const user=JSON.parse(localStorage.getItem('userinfo'))
    const navigate=useNavigate()
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
    const [transactions,setTransactions]=useState([])
    const notifywarning=()=> toast.warning("you aren't the admin to access!")
    async function getData(){
        try {
            setDisp('none')
            await axios.get('https://asimplebuyandsellbe.onrender.com/orders/getorders',{
                headers:{
                    "access-token":user.token
                }
            })
            .then(x=>{
                setTransactions(x.data.reverse())
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
    <div style={{minHeight:'100vh'}}>
        <div style={styles1}>
        <table className="table table-striped table-responsive table-bordered">
  <thead>
    <tr>
      <th scope="col">S No.</th>
      <th scope="col">Item</th>
      <th scope="col">Price (Rs)</th>
      <th scope="col">From</th>
      <th scope="col">To</th>
      <th scope="col">PaymentId</th>
      <th scope="col">Shipping adress</th>
    </tr>
  </thead>
  <tbody>
    {transactions.map((transaction,index)=>(
        <tr key={transaction._id}>
            <th scope="row">{index+1}</th>
            <td>{transaction.item.name}</td>
            <td>{transaction.total/100}</td>
            <td>{transaction.item.seller.name}</td>
            <td>{transaction.item.buyer.name}</td>
            <td>{transaction.paymentIntentId}</td>
            <td>
                <div>{transaction.shipping.address.line1}</div>
                <div>
                    <span>{transaction.shipping.address.postal_code},</span>
                    <span>{transaction.shipping.address.city},</span>
                    <span>{transaction.shipping.address.state}.</span>
                </div>
            </td>
        </tr>
    ))}
  </tbody>
</table>
    </div>
    <div className="text-center " style={styles2}>
            <div className="spinner-border us" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
  )
}

export default Transactions