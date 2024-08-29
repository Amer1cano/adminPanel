
/* eslint-disable react/prop-types */
import { NavLink, useNavigate } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { SiVirtualbox } from "react-icons/si";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaMapLocation } from "react-icons/fa6";
import { BiSolidCity } from "react-icons/bi";
import { IoCarSport } from "react-icons/io5";

const Layout = ({openMenu}) => {
    const navigate = useNavigate();
    const handleClickHome = ()=>{
        navigate('/home')
    }
    const handleClickCat = ()=>{
        navigate('categories')
    }
    const handleClickBrand = ()=>{
        navigate('brands')
    }
    const handleClickModel = ()=>{
        navigate('models')
    }
    const handleClickLoc = ()=>{
        navigate('locations')
    }
    const handleClickCity = ()=>{
        navigate('cities')
    }
    const handleClickCar = ()=>{
        navigate('cars')
    }
    

  return (
    <div className={`${openMenu ? "w-60 h-svh bg-[#001529] duration-100 transition-all" : "w-20 h-svh bg-[#001529]  "}`}>
        <div className="py-6 px-2">
            <h1 className="text-gray-400 text-2xl font-medium hover:text-white duration-100 transition-all">
                
                {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                    openMenu ? "AutozoomAdmin" : "Auto"
                }
            </h1>
            <ul className="flex flex-col gap-2 mt-10 text-gray-400 font-bold text-lg duration-100 transition-all">
                <li onClick={handleClickHome} className="hover:text-white duration-100 transition-all flex gap-4 items-center hover:bg-blue-500 px-3 py-2 rounded">
                    <FaHome className="text-2xl" />
                    {
                        openMenu &&
                    <NavLink to={'/home'}>Dashboard</NavLink>
                    }
                </li>
                <li onClick={handleClickCat} className="hover:text-white duration-500 transition-all flex gap-4 items-center hover:bg-blue-500 px-3 py-2 rounded">
                    <CiSettings className="text-2xl" />
                   {
                    openMenu &&

                    <NavLink to={'categories'}>Categories</NavLink>
                   }
                </li>
                <li onClick={handleClickBrand} className="hover:text-white duration-500 transition-all flex gap-4 items-center hover:bg-blue-500 px-3 py-2 rounded">
                    <SiVirtualbox className="text-2xl" />
                    {
                        openMenu &&

                    <NavLink to={'brands'}>Brands</NavLink>
                    }
                </li>
                <li onClick={handleClickModel} className="hover:text-white duration-500 transition-all flex gap-4 items-center hover:bg-blue-500 px-3 py-2 rounded">
                    <HiClipboardDocumentList className="text-2xl" />
                    {
                        openMenu &&
                    <NavLink to={'models'}>Models</NavLink>
                    }
                </li>
                <li onClick={handleClickLoc} className="hover:text-white duration-500 transition-all flex gap-4 items-center hover:bg-blue-500 px-3 py-2 rounded">
                    <FaMapLocation className="text-2xl" />
                    {
                        openMenu &&

                    <NavLink to={'locations'}>Locations</NavLink>
                    }
                </li>
                <li onClick={handleClickCity} className="hover:text-white duration-500 transition-all flex gap-4 items-center hover:bg-blue-500 px-3 py-2 rounded">
                    <BiSolidCity className="text-2xl" />
                    {
                        openMenu &&

                    <NavLink to={'cities'}>Cities</NavLink>
                    }
                </li>
                <li onClick={handleClickCar} className="hover:text-white duration-500 transition-all flex gap-4 items-center hover:bg-blue-500 px-3 py-2 rounded">
                    <IoCarSport className="text-2xl" />
                    {
                        openMenu && 

                    <NavLink to={'cars'}>Cars</NavLink>
                    }
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Layout