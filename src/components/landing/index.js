import React from 'react'
import './style.css';
import Button from '../common/button';
import iphone from "../../assests/iphone.png"
import gradient from "../../assests/gradient.png"
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RWebShare } from "react-web-share";
import { toast } from "react-toastify";
const Landing = () => {
  return (
    <div className='flex-info'>
        <div className='left-compo'>
        <motion.h1 className='track-crypto' initial={{opacity:0 , y:50}} animate={{opacity:1 , y:0}} transition={{duration :0.5}}>Track Crypto</motion.h1>
        <motion.h1 className='real-time'
        initial={{opacity:0 , x:50}} animate={{opacity:1 , x:0}} transition={{duration :0.5 , delay:0.5}}
        >Real Time.</motion.h1>
        <motion.p className='info-txt'
        initial={{opacity:0 , z:50}} animate={{opacity:1 , z:0}} transition={{duration :0.5 , delay : 1}}
        >Track crypto through a public api in real time. Visit the dashboard to do so!</motion.p>
        
        <motion.div className='btn-flex'
        initial={{opacity:0 , x:50}} animate={{opacity:1 , x:0}} transition={{duration :0.5 , delay:1.5}}>
            <Link to='/dashboard'>
        <Button text={"Dashboard"}
         outlined={true} 
        onClick={()=>console.log("Button")}/>
        </Link>
        <RWebShare
            data={{
              text: "CryptoDashboard made by Avi Vashishta using React JS.",
              url: "https://cryptocurrency-v2.netlify.app/",
              title: "CryptoTracker.",
            }}
            onClick={() => toast.info("App Shared!")}
          >
            <Button text={"Share App"} outlined={true} />
          </RWebShare>
        </motion.div>
        </div>
        <div className='phone-container'>
            <motion.img src={iphone} className='iphone' alt="Iphone"
              initial={{y : -10}} 
              animate={{y : 10}} 
              transition={{
              type: "smooth",
              repeatType :"mirror" , 
              duration :2,
              repeat : Infinity ,
              }}

            />
            <img src={gradient} className='gradient'  alt="Iphone1"/>
        </div>
    </div>
  )
}

export default Landing