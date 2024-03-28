// import React, { useEffect, useState } from 'react'
// import Header from '../components/common/header'
// import TabsComponent from '../components/dashboard/tabs'
// import axios from "axios";
// import Search from '../components/dashboard/search';
// import PaginationComponent from '../components/dashboard/pagination';
// function DashboardPage (){
// const [coins , setCoins]= useState([]);
// const[search , setSearch] = useState("");
// const [page, setPage] = useState(1);
// const [paginatedCoins, setPaginatedCoins] = useState();
// const handlePageChange = (event, value) => {
//   setPage(value);
//   // Value = new page number
//   var initialCount = (value - 1) * 10;
//   setPaginatedCoins(coins.slice(initialCount, initialCount + 10));
// };
// const onSearchChange = (e)=>{
//   // console.log(e.target.value);
//   setSearch(e.target.value);
// }

// var filterCoins = coins.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())||item.symbol.toLowerCase().includes(search.toLowerCase()
// ));
 


// useEffect(()=>{
//   // fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
//   // .then((res) =>res.json())
//   // .then((data) =>{});
//   axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
//   .then((response)=>{
//     console.log("abc" , response); 
//     setCoins(response.data);
//   })
//   .catch((error)=>{
//     console.log(error);
//   })
// } , []);
 

//   return (
//     <div>
//     <Header/>
//     <Search search={search} onSearchChange={onSearchChange}/>
//      <TabsComponent coins={filterCoins}/> 
    
//             {/* <PaginationComponent
//               page={page}
//               handlePageChange={handlePageChange}
//             />  */}
          
//     </div>
//   )
// }


// export default DashboardPage


import axios from "axios";
import React, { useEffect, useState } from "react";
// import Header from "../components/Common/Header";
// // import Loader from "../components/Common/Loader";
// import Search from "../components/Dashboard/Search";
// import TabsComponent from "../components/Dashboard/Tabs";
import Header from '../components/common/header'
import TabsComponent from '../components/dashboard/tabs'
// import axios from "axios";
import Search from '../components/dashboard/search';
import PaginationComponent from '../components/dashboard/pagination';
import Loader from "../components/common/loader";
import BackTop from "../components/common/backtotop";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]);

  useEffect(() => {
    // Get 100 Coins
    getData();
  }, []);

  const getData = () => {
    // setLoading(true);
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        console.log("RESPONSE>>>", response.data);
        setCoins(response.data);
        setPaginatedCoins(response.data.slice(0, 10));
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERROR>>>", error.message);
        setLoading(false);
      });
  };

  const onSearchChange= (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  // var filteredCoins = coins.filter((coin) => {
  //   if (
  //     coin.name.toLowerCase().includes(search.trim().toLowerCase()) ||
  //     coin.symbol.toLowerCase().includes(search.trim().toLowerCase())
  //   ) {
  //     return coin;
  //   }
  // });

  var filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.trim().toLowerCase())
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    // Value = new page number
    var initialCount = (value - 1) * 10;
    setPaginatedCoins(coins.slice(initialCount, initialCount + 10));
  };

  return (
    <>
        <Header />
        <BackTop/>
    {loading ? (<Loader/>) :(
    <div>
    
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent
            coins={search ? filteredCoins : paginatedCoins}
            setSearch={setSearch}
          />
            {!search && 
           ( <PaginationComponent
              page={page}
              handlePageChange={(event , value )=>handlePageChange(event , value)}
            />
    )}

          
    </div>
    )}
    
    </>
  );
}

export default Dashboard;

// coins == 100 coins

// PaginatedCoins -> Page 1 - coins.slice(0,10)
// PaginatedCoins -> Page 2 = coins.slice(10,20)
// PaginatedCoins -> Page 3 = coins.slice(20,30)
// .
// .
// PaginatedCoins -> Page 10 = coins.slice(90,100)

// PaginatedCoins -> Page X , then initial Count = (X-1)*10
// coins.slice(initialCount,initialCount+10)