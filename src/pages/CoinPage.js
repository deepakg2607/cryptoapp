import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/common/header';
import Loader from '../components/common/loader';
import { coinObject } from '../functions/coinObject';
// import List from '../components/dashboard/List';
import CoinInfo from '../components/coins/coininfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/coins/LineChart';
import { convertDate } from '../functions/convertDate';
import SelectDays from '../components/coins/selectDays';
import { settingChartData } from '../functions/settingChartData';
import PriceType from '../components/coins/PriceType';
import List from '../components/dashboard/List';

const CoinPage = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coinData, setCoinData] = useState();
  const[days , setDays] = useState(60);
  const [chartData , setChartData] = useState({})
  const [priceType, setPriceType] = useState("prices");
  useEffect(()=>{
    if(id)
    {
      
       getData();
       
    }
  } , [id]);
  async function  getData()
{
  const data = await getCoinData(id)
  if(data)
  {
    coinObject(setCoinData , data);
    const prices = await getCoinPrices(id , days);

    if(prices.length>0)
    {
      console.log("deepak");
      setChartData({
        
          labels: prices.map((price) => convertDate (price[0])), 
          datasets: [
            {
              data: prices.map((price) => (price[1])), 
              borderWidth : 1, 
              tension : 0.25,
              fill : true,
              borderColor: "#3a80e9", 
              backgroundColor: "rgba(58 , 128 , 233, 0.1)", 
              pointRadius:0, 
            
            },
          ],
      });
      setLoading(false);
    }
  }
  
}

  const handleChange = async (event) =>{
    setLoading(true);
    setDays(event.target.value);
    const prices = await getCoinPrices(id , event.target.value);

    if(prices.length>0)
    {
      // console.log("deepak");
      settingChartData(setChartData ,prices);
      setLoading(false);
    }
   
  
  };
 
  

  const handlePriceTypeChange = async (event) => {
    setLoading(true);
    setPriceType(event.target.value);
    const prices = await getCoinPrices(id, days, event.target.value, setError);
    if (prices) {
      settingChartData(setChartData, prices);
      setLoading(false);
    }
  };
  return (
    <div><Header/>
    {loading ?<Loader/> :(<>
      <div className='wrapper' style={{padding :"0rem 1rem"}}>
      <List coin ={coinData}/>
      </div>
      <div className='wrapper'>
         <SelectDays days={days} handleChange={handleChange}/>
         <PriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
        <LineChart chartData ={chartData} priceType={priceType}/>
      </div>
      <CoinInfo heading={coinData.name} desc={coinData.desc}/>
    </>
    )}
    </div>
  ) 
}

export default CoinPage