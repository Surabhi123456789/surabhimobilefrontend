import React, { useState } from 'react'
import { Fragment } from 'react'
import "./userOption.css"
import DashboardIcon from "@material-ui/icons/Dashboard"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ListAltIcon from "@material-ui/icons/ListAlt"
import {SpeedDial , SpeedDialAction} from "@material-ui/lab"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { logout } from '../../../actions/userAction'
import { Backdrop } from '@material-ui/core'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector} from 'react-redux'

const UserOptions = ({user}) => {

    const {cartItems} = useSelector((state)=> state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open , setOpen] = useState(false);

    const options = [
        {icon: <ListAltIcon/> , name: "Orders", func: orders},
        {icon: <PersonIcon/> , name: "Profile", func: account},
        {icon: <ShoppingCartIcon    style={{color: cartItems.length > 0 ? "tomato" : "unset"}}  />,
          name: `Cart(${cartItems.length})`, 
          func: cart
        },
        {icon: <ExitToAppIcon/> , name: "Logout", func: logoutUser},
    ];

    if(user.role ==="admin")
    {
       options.unshift({icon: <DashboardIcon/> , name: "Dashboard", func: dashboard})
    }

    function dashboard(){
       navigate("/admin/dashboard");
    }
    
    function orders(){
        navigate("/orders");
    }

    function account(){
        navigate("/account");
    }

    function cart(){
        navigate("/cart");
    }

    function logoutUser(){
         dispatch(logout());
        toast.success("Logout successfully");
    }


  return (
      <Fragment>
        <Backdrop open={open} style={{zIndex: "10"}}/>
            <SpeedDial
               ariaLabel = "SpeedDail tooltip example"
               onClose={()=> setOpen(false)}
               onOpen={()=> setOpen(true)}
               open={open}
               className='speedDial'
               direction="down"
               icon={<img 
                         className='speedDialIcon'
                         src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                         alt="profile"
                         
                     />}
            >
            {options.map((item) => (
                 <SpeedDialAction
                     key={item.name}
                     icon={item.icon}
                     tooltipTitle={item.name}
                      onClick={item.func}
                      tooltipOpen={window.innerWidth <= 600 ? true : false}
                 />
        ))}    
            </SpeedDial>
      </Fragment>
  )
}

export default UserOptions
