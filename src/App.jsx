import { useEffect } from "react";
import { useState } from "react";

function App() {
  let [data, setData] = useState([]);
  let [scrollPer, setScrollPer] = useState(0);
  let [load,setLoad]=useState(false);
  let getApi = async () => {
    setLoad(true)
    let url = `https://dummyjson.com/products?limit=50&skip=0`;
    let resp = await fetch(url);
    let Jdata = await resp.json();
    if (Jdata && Jdata.products) {
      setData(Jdata.products);
      setLoad(false);
    }
  };
  useEffect(() => {
    getApi();
  },[]);
  let handleScrollPersontage=()=>{
    let th=document.documentElement.scrollHeight-document.documentElement.clientHeight;
    let h=document.documentElement.scrollTop;


    let ph=(h/th)*100;
    setScrollPer(ph);
  }
  useEffect(()=>{
    window.addEventListener(("scroll"),handleScrollPersontage);
    return()=>{
      window.removeEventListener(("scroll"),()=>{})
    }
  },[])
  if (load) {
    return <div className="w-screen h-screen flex justify-center items-center">
      <div>Loading Data...</div>
    </div>
  }
  return (
    <>
    <div style={{width:`${scrollPer}%`}} className="mt-3  h-2  bg-black fixed"></div>
      {
        data&&data.length?data.map((item)=>{
          return (
            <p className="my-4 text-center" key={item.id}>{item.title}</p>
          )
        }):<div>No Data</div>
      }
    </>
  );
}

export default App;
