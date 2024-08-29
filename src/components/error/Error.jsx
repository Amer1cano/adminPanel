import { useNavigate } from "react-router-dom"


const Error = () => {
    const navigate = useNavigate();
    const handleGoToHomePage = ()=>{
        navigate("/home")
    }
  return (
    <div className="w-full h-svh m-auto text-center px-52">
        <div className="mt-36">
            <h1 className="text-7xl font-bold">
                404
            </h1>
            <p className="font-serif text-xl mt-6 px-32">
            The page you were looking for doesn’t exist. You may have mistyped the address or the page may have moved.
            </p>
            <button className="mt-6 py-2 px-5 rounded-full bg-black text-white hover:opacity-90" onClick={handleGoToHomePage}>
                Go Home
            </button>
        </div>
    </div>
  )
}

export default Error