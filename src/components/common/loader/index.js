import React from 'react'
import "./style.css"
import { CircularProgress } from '@mui/material'
const Loader = () => {
  return (
    <div className='loader'>
        <CircularProgress/>
    </div>
  )
}

export default Loader