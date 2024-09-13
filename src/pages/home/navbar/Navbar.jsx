/* eslint-disable react/prop-types */
import { RiMenu3Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { logout } from "../../../../src/features/userSlice";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";


const Navbar = ({setOpenMenu, openMenu}) => {
    // const {logout} = useSelector((state) => state.logout)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    

    const handleLogOut = (event)=>{
        event.preventDefault();
        dispatch(logout());
        navigate('/')
        
    }
    const handleMenu = ()=>{
        setOpenMenu(!openMenu)
    }
  return (
    <div>
        <div className="w-full py-3 px-2 flex items-center justify-between gap-[53rem]">
        <button  onClick={handleMenu} className={`${openMenu ? "py-2 px-3 bg-blue-500 text-white hover:opacity-90 rounded duration-100 transition-all" : "mr-40 py-2 px-3 bg-blue-500 text-white hover:opacity-90 rounded duration-500 transition-all"}`}>
            <RiMenu3Fill />
        </button>
        <button onClick={handleLogOut} className="flex items-center justify-between gap-4 rounded py-1 px-4 text-black bg-white border-2 border-solid border-gray-200 mr-8">
            <FaRegUser /> <h1>Admin</h1>
        </button>
        </div>
    </div>
  )
}

export default Navbar