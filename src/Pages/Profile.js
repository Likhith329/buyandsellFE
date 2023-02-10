import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const Profile = () => {
  const user=JSON.parse(localStorage.getItem('userinfo'))
  const [items,setItems]=useState([])
  const [boughtitems,setBoughtitems]=useState([])
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
        setItems(data.filter(x=>x.seller._id===user._id).reverse())
        let fdata=data.filter(x=>x.buyer)
        setBoughtitems(fdata.filter(x=>x.buyer._id===user._id).reverse())
    }
  return (
    <div className='  profilecont'>

      <div className='info'>
        <img className='profilepic' src={user.profilepic}/>
        <div>
          <div className='name'>{user.name}</div>
          <div className='email'>{user.email}</div>
        </div>
      </div>

      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Items you added</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Items you bought</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={'0'}>
            <div className='items'>
              {items?.map((item)=>(
                  <Item key={item._id} item={item} user={user} render={render} setRender={setRender}/>
              ))}
            </div>
          </TabPanel>
          <TabPanel px={'0'}>
          <div className='items'>
              {boughtitems?.map((item)=>(
                  <BoughtItem key={item._id} item={item} user={user}/>
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
    </div>
  )
}

export default Profile

function Item({item,user,render,setRender}){
  const [disp,setDisp]=useState('')
    const styles1={
        display:disp
    }
    const styles2={
        display:disp==''?'none':''
    }
    const notifysuccess=()=> toast.success("Removed Successfully!")
    const notifyerror= () => toast.warning("Item doesn't exist!")
  const handleremove=()=>{
    async function removeitem(){
      try {
          setDisp('none')
          await axios.delete('http://localhost:8000/item/removeitem', {
            headers: {
              "access-token":user.token
            },
            data: {
              itemId:item._id
            }
          }).then(res=>{
          notifysuccess()
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
              {item.buyer===null?
              <div className='itemstatus text-danger'>Not sold</div>:<div className='itemstatus text-warning'>sold</div>}
              <div className='d-flex justify-content-between align-items-center'>
                  <span className='itemprice'>₹{item.price}</span>
                  <button className='btn btn-secondary buybtn' onClick={handleremove} style={styles1}>Remove</button>
                  <button className='btn btn-secondary buybtn' type="button" style={styles2} disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Removing...
                  </button>
              </div>
          </div>
          <ToastContainer/>
      </div>
  )
}

function BoughtItem({item}){
  return(
      <div className='item shadow'>
          <div className='d-flex justify-content-center'><img className='itemimg' src={item.itempic}/></div>
          <div className='iteminfo'>
              <div className='itemname'>{item.name}</div>
              <div className='itemdes'>{item.description}</div>
              <div className='d-flex justify-content-between align-items-center'>
                  <span className='itemprice'>₹{item.price}</span>
              </div>
              <div className='fromname'>from {item.seller.name}</div>
          </div>
      </div>
  )
}