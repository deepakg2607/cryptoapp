import React from 'react'
import axios from 'axios'

export const getCoinData = (id) => {

    const myData = axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((response)=>{
          console.log("abc" , response); 
           return response.data;
        })
        .catch((error)=>{
          console.log(error);
          // setLoading(false);
        });
        return myData;
}
