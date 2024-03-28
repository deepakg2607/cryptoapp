import React, { useState } from 'react'
import "./style.css";
const CoinInfo = ({heading , desc}) => {

    const short= desc.slice(0, 300);
    const long= desc;
    const[flag , setFlag] = useState(false);
  return (
    <div className='wrapper'>
        <h2 className='coin-heading'>{heading}</h2>
       {desc.length>300 ?<p onClick={()=>setFlag(!flag)}
        className='coin-desc' dangerouslySetInnerHTML={{__html:!flag ? short + "<p style = 'color : var(--grey)'> Read More...</p>" : long + "<p style = 'color : var(--grey)'> Read Less...</p>"}}/> : <p dangerouslySetInnerHTML={{__html:desc}}/> }
    </div>
  )
}

export default CoinInfo