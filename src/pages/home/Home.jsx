

import Layout from "../../layout/Layout";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { useState } from "react";




const Home = () => {
    const [openMenu, setOpenMenu] = useState(true);
    
  return (
    <div className="flex w-full bg-[#E3EFFE]">
        
        <div className="flex items-start justify-between fixed bg-white h-16 w-full ">
        <Layout  openMenu={openMenu}/>
        <Navbar setOpenMenu={setOpenMenu} openMenu={openMenu} />
        </div>
        <div className={`${openMenu? "w-10/12 mt-20 m-auto mx-10 ml-72 duration-100 transition-all" : "w-11/12 mt-20 mx-10 ml-32 duration-500 transition-all"}`}>
            <div className="rounded-xl">
              
                <Outlet/>
             
            </div>
        </div>
    </div>
  )
}

export default Home