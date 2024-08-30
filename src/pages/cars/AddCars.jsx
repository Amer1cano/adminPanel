/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import { useAddCarMutation, useGetBrandsDetailsQuery, useGetCategoryDetailsQuery, useGetCityDetailsQuery, useGetLocationDetailsQuery, useGetModelsDetailsQuery } from "../../services/adminApi";
import { toast } from "react-toastify";

const AddCars = ({ setAddModal, updateBrands }) => {
  const [brand_id, setBrand_Id] = useState('');
  const [model_id, setModel_Id] = useState('');
  const [category_id, setCategory_Id] = useState('')
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [city_id, setCity_Id] = useState('');
  const [seconds, setSeconds] = useState('');
  const [max_speed, setMax_Speed] = useState('');
  const [max_people, setMax_People] = useState('');
  const [transmission, setTransmission] = useState('');
  const [motor, setMotor] = useState('');
  const [drive_side, setDrive_Side] = useState()
  const [petrol, setPetrol] = useState('');
  const [limitperday, setLimitPerDay] = useState('');
  const [deposit, setDeposit] = useState('');
  const [premium_protection, setPremium_Protection] = useState()
  const [price_in_aed, setPrice_In_Aed] = useState('');
  const [price_in_usd, setPrice_In_Usd] = useState('');
  const [price_in_asale, setPrice_In_Asale] = useState();
  const [price_in_usale, setPrice_In_Usale] = useState();
  const [location_id, setLocation_id] = useState('');
  const [inclusive, setInclusive] = useState('' );
  // const [cover, setCover] = useState('');
  const [images1, setImages1] = useState();
  const [images2, setImages2] = useState();
  const [images3, setImages3] = useState();


  const [addCar, { isLoading }] = useAddCarMutation();
  const { data: brand } = useGetBrandsDetailsQuery();
  const { data: models } = useGetModelsDetailsQuery();
  const { data: locations } = useGetLocationDetailsQuery();
  const { data: cities } = useGetCityDetailsQuery();
  const {data:categories} = useGetCategoryDetailsQuery();

  const [isOn, setIsOn] = useState(false);

  const handleCancelModal = () => {
    setAddModal(false);
  };
  
  const toggleChange = () => {
    setIsOn(!isOn);
    setInclusive(!isOn);
  }

  const handleInputChange = (setter) => (event) => {
    const value = event.target.value;
    // if (/^\d*$/.test(value)) {
    // }
    setter(value);
  };

  const handleAddNewBrand = async (event) => {
    event.preventDefault();

    if (!images1) {
      toast.error("Please select an image file.");
      console.log("Please select an image file.");

      return;
    }
    if (!images2) {
      toast.error("Please select an image file.");
      console.log("Please select an image file.");

      return;
    }
    if (!images3) {
      toast.error("Please select an image file.");
      console.log("Please select an image file.");

      return;
    }
    if (images1.length === 0) {
      toast.error("Please select at least one image file.");
      console.log("Please select at least one image file.");

      return;
    }



    const formData = new FormData();
    formData.append("brand_id", brand_id);
    formData.append("model_id", model_id);
    formData.append("category_id", category_id)
    formData.append("color", color);
    formData.append("year", year);
    formData.append("city_id", city_id);
    formData.append("seconds", seconds);
    formData.append("max_speed", max_speed);
    formData.append("max_people", max_people);
    formData.append("transmission", transmission);
    formData.append("motor", motor);
    formData.append("petrol", petrol);
    formData.append("drive_side", drive_side)
    formData.append("limitperday", limitperday);
    formData.append("deposit", deposit);
    formData.append("premium_protection", premium_protection)
    formData.append("price_in_aed", price_in_aed);
    formData.append("price_in_usd", price_in_usd);
    formData.append("price_in_aed_sale", price_in_asale);
    formData.append("price_in_usd_sale", price_in_usale);
    formData.append("location_id", location_id);
    formData.append("inclusive", inclusive);
    // formData.append("cover", cover);
    formData.append("images", images1);
    formData.append("images", images2);
    formData.append("cover", images3)
    // console.log("test", formData.get("brand_id"), formData.get("model_id"), formData.get("images1"));

    


    try {
      const response = await addCar(formData).unwrap();
      console.log('API Response:', response);
      toast.success(response?.message || "Car added successfully!");
      setAddModal(false);
      updateBrands(); // Update the list of brands
    } catch (error) {
      console.error("Failed to add car:", error);
      console.error("Error Response Data:", error?.data);
      toast.error(error?.data?.message || "Failed to add car.");
    }

  };

  return (
    <div className="bg-white rounded text-black w-[30rem] px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Add Car</h1>
        <button
          onClick={() => setAddModal(false)}
          className="hover:bg-gray-300 px-3 py-2 rounded duration-200 transition-all"
        >
          <FaX />
        </button>
      </div>

      <form onSubmit={handleAddNewBrand} className="flex flex-col gap-8 mt-6 px-4 pb-4">
        {/* Brand */}
        <div>
          <label htmlFor="brand_title">Brand</label>
          <select
            id="brand_title"
            onChange={(e) => setBrand_Id(e.target.value)}
            value={brand_id}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
            name="brand_title"
          >
            <option value="">Select a brand</option>
            {brand?.data?.map((item, index) => (
              <option

                value={item?.id} key={index}>{item?.title}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category_title">Category</label>
          <select
            id="category_title"
            onChange={(e) => setCategory_Id(e.target.value)}
            value={category_id}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
            name="category_title"
          >
            <option value="">Select a category</option>
            {categories?.data?.map((item, index) => (
              <option value={item?.id} key={index}>{item?.name_en}</option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label htmlFor="model_title">Model</label>
          <select
            id="model_title"
            onChange={(e) => setModel_Id(e.target.value)}
            value={model_id}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
            name="model_title"
          >
            <option value="">Select a model</option>
            {models?.data?.map((item, index) => (
              <option value={item?.id} key={index}>{item?.name}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location_title">Location</label>
          <select
            id="location_title"
            onChange={(e) => setLocation_id(e.target.value)}
            value={location_id}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
            name="location_title"
          >
            <option value="">Select a location</option>
            {locations?.data?.map((item, index) => (
              <option value={item?.id} key={index}>{item?.name}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label htmlFor="city_title">City</label>
          <select
            id="city_title"
            onChange={(e) => setCity_Id(e.target.value)}
            value={city_id}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
            name="city_title"
          >
            <option value="">Select a city</option>
            {cities?.data?.map((item, index) => (
              <option value={item?.id} key={index}>{item?.name}</option>
            ))}
          </select>
        </div>

        {/* Numeric Inputs */}
        <div>
          <label htmlFor="year">Year</label>
          <input
            id="year"
            name="year"
            type="text"
            value={year}
            onChange={(e)=>setYear(e.target.value)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="seconds">Seconds</label>
          <input
            id="seconds"
            name="seconds"
            type="text"
            value={seconds}
            onChange={handleInputChange(setSeconds)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="max_speed">Max Speed</label>
          <input
            id="max_speed"
            name="max_speed"
            type="text"
            value={max_speed}
            onChange={handleInputChange(setMax_Speed)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="max_people">Max People</label>
          <input
            id="max_people"
            name="max_people"
            type="text"
            value={max_people}
            onChange={handleInputChange(setMax_People)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="price_in_aed">Price in AED</label>
          <input
            id="price_in_aed"
            name="price_in_aed"
            type="text"
            value={price_in_aed}
            onChange={handleInputChange(setPrice_In_Aed)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="price_in_usd">Price in USD</label>
          <input
            id="price_in_usd"
            name="price_in_usd"
            type="text"
            value={price_in_usd}
            onChange={handleInputChange(setPrice_In_Usd)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="price_in_sale_aed">Price in AED Sale</label>
          <input
            id="price_in_sale_aed"
            name="price_in_sale_aed"
            type="text"
            value={price_in_asale}
            onChange={handleInputChange(setPrice_In_Asale)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="price_in_sale_usd">Price in USD Sale</label>
          <input
            id="price_in_sale_usd"
            name="price_in_sale_usd"
            type="text"
            value={price_in_usale}
            onChange={handleInputChange(setPrice_In_Usale)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        {/* Other Inputs */}
        <div>
          <label htmlFor="color">Color</label>
          <input
            id="color"
            name="color"
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="transmission">Transmission</label>
          <input
            id="transmission"
            name="transmission"
            type="text"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="motor">Motor</label>
          <input
            id="motor"
            name="motor"
            type="text"
            value={motor}
            onChange={(e) => setMotor(e.target.value)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="petrol">Petrol</label>
          <input
            id="petrol"
            name="petrol"
            type="text"
            value={petrol}
            onChange={(e) => setPetrol(e.target.value)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="drive_side">Drive_side</label>
          <input
            id="drive_side"
            name="drive_side"
            type="text"
            value={drive_side}
            onChange={(e)=>setDrive_Side(e.target.value)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="limitperday">Limit Per Day</label>
          <input
            id="limitperday"
            name="limitperday"
            type="text"
            value={limitperday}
            onChange={handleInputChange(setLimitPerDay)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="deposit">Deposit</label>
          <input
            id="deposit"
            name="deposit"
            type="text"
            value={deposit}
            onChange={handleInputChange(setDeposit)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="premium_protection">Premium_Protection</label>
          <input
            id="premium_protection"
            name="premium_protection"
            type="text"
            value={premium_protection}
            onChange={(e)=>setPremium_Protection(e.target.value)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        {/* <div>
          <label htmlFor="cover">Cover</label>
          <input
            id="cover"
            name="cover"
            type="text"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            className="mt-2 outline-none w-full py-1 px-4 rounded border-solid border-2 border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div> */}

        <div>
          <div
            onClick={toggleChange}
            className="relative inline-flex items-center cursor-pointer">

            <input
              type="checkbox"
              checked={isOn}
              onChange={toggleChange}
              className="sr-only"
              required
              name="inc"
              id="inc"
            />
            <div className="w-12 h-6 bg-gray-300 rounded-full p-1 flex items-center">
              <div
                className={`w-5 h-5 rounded-full shadow-md transform ${isOn ? 'translate-x-5 bg-blue-600' : 'bg-gray-200'
                  } transition-transform duration-300 ease-in-out`}
              ></div>
            </div>
            <label className="ml-10" htmlFor="inc">Inclusive</label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="rasm1">Image 1</label>
          <input
            id="rasm1"
            name="rasm1"
            type="file"
            // value={images}
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => setImages1(e.target.files[0])}
            className="mt-2 outline-none rounded border-solid border-2 border-gray-200 
             hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="rasm2">Image 2</label>
          <input
            id="rasm2"
            name="rasm2"
            type="file"
            // value={images}
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => setImages2(e.target.files[0])}
            className="mt-2 outline-none rounded border-solid border-2 border-gray-200 
             hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="rasm3">Image 3</label>
          <input
            id="rasm3"
            name="rasm3"
            type="file"
            // value={images}

            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => setImages3(e.target.files[0])}
            className="mt-2 outline-none rounded border-solid border-2 border-gray-200 
             hover:border-blue-400 hover:shadow-md hover:shadow-blue-300"
            required
          />
        </div>


        {/* Submit Button */}
        <div className="duration-200 transition-all text-right">
          <button
            type="button"
            onClick={handleCancelModal}
            className="py-0.5 px-4 rounded border-solid border-2 border-gray-300 
                       hover:border-blue-400 hover:text-blue-400 duration-300 transition-all"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="ml-4 py-1 px-4 rounded bg-blue-500 hover:bg-blue-400 
                       text-white duration-300 transition-all"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCars;
