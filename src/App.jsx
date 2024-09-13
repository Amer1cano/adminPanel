import { ToastContainer } from "react-toastify";
import { Route, Routes, useNavigate } from "react-router-dom";
import { lazy,  useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from "./features/userSlice";

const Login = lazy(()=>import('./login/Login'))
const Home = lazy(()=>import('./pages/home/Home'))
const Error = lazy(()=>import('./components/error/Error'))
const Category = lazy(()=>import('./pages/category/Category'))
const City = lazy(()=>import('./pages/city/City'))
const Models = lazy(()=>import('./pages/models/Models'))
const Locations = lazy(()=>import('./pages/locations/Locations'))
const Cars = lazy(()=>import('./pages/cars/Cars'))
const Brands = lazy(()=>import('./pages/brands/Brands'))
// import Home from './pages/home/Home'
// import Login from './login/Login'
// import Category from './pages/category/Category'
// import Cars from './pages/cars/Cars'


const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
    console.log("isAuthenticated:", isAuthenticated); // Log the authentication state
    if (isAuthenticated) {
      console.log('home');

     
    } else {
      navigate("/");
      console.log('/login');
      
    }
  }, [isAuthenticated, navigate, dispatch]);

  return (
    <div>
      <Routes>
      <Route path="home" element={<Home/>}>
      
          <Route index element={<div>
            <h1 className="py-2 mb-4 text-3xl">
              Welcome to Dashboard !
            </h1>
          </div>} /> {/* Default sub-route */}
          <Route path="categories" element={<Category />} />
          <Route path="brands" element={<Brands/>} />
          <Route path="models" element={<Models />} />
          <Route path="locations" element={<Locations/>} />
          <Route path="cities" element={<City/>} />
          <Route path="cars" element={<Cars/>} />
  
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="*"  element={<Error/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;                   
