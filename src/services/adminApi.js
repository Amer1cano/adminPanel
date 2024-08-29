import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API service with middleware
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://autoapi.dezinfeksiyatashkent.uz/api/',
    prepareHeaders: (headers) => {
      // Retrieve token from localStorage
      const token = localStorage.getItem('tokenbek');
      
      // If token exists, add it to the Authorization header
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // POST method for login
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/signin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
    }),
    
    // GET method example: fetching user details
    getCategoryDetails: builder.query({
      query: () => `categories`,  // Adjust the URL based on your API endpoint
    }),

    // POST method to add a new category
    addCategory: builder.mutation({
      query: (formData) => ({
        url: '/categories', // Endpoint to add a new category
        method: 'POST',    // HTTP method
        body: formData,    // Attach the FormData object as the request body
      }),
    }),

    // DELETE method to remove a category
    deleteCategory: builder.mutation({
        query: (id) => ({
          url: `categories/${id}`, // Endpoint to delete a category
          method: 'DELETE',       // HTTP method
        }),
      }),

       // PUT method to edit an existing category
    editCategory: builder.mutation({
        query: ({ id, formData }) => ({
          url: `categories/${id}`, // Endpoint to edit a category
          method: 'PUT',          // HTTP method
          body: formData,         // Attach the updated FormData object as the request body
          // 'Content-Type' is not needed for FormData; the browser will set it automatically
        }),
      }),

      //GET method example: fetching user Brand details
      getBrandsDetails:builder.query({
        query:()=>`brands`,
      }),

      // POST method to add a new brand
    addBrands: builder.mutation({
      query: (formData) => ({
        url: 'brands', // Endpoint to add a new category
        method: 'POST',    // HTTP method
        body: formData,    // Attach the FormData object as the request body
      }),
    }),

    // DELETE method to remove a brand
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `brands/${id}`, // Endpoint to delete a category
        method: 'DELETE',       // HTTP method
      }),
    }),

    // PUT method to edit an existing brand
    editBrand: builder.mutation({
      query: ({ id, formData }) => ({
        url: `brands/${id}`, // Endpoint to edit a category
        method: 'PUT',          // HTTP method
        body: formData,         // Attach the updated FormData object as the request body
        // 'Content-Type' is not needed for FormData; the browser will set it automatically
      }),
    }),


    //GET method example: fetching user Modeldetails
    getModelsDetails:builder.query({
      query:()=>`models`,
    }),

    // POST method to add a new model
  addModels: builder.mutation({
    query: (formData) => ({
      url: `/models`, // Endpoint to add a new model
      method: 'POST',    // HTTP method
      // headers: {
      //   'Content-Type': 'formData',
      // },
      body:formData  // Attach the FormData object as the request body
    }),
  }),

  // DELETE method to remove a model
  deleteModel: builder.mutation({
    query: (id) => ({
      url: `models/${id}`, // Endpoint to delete a category
      method: 'DELETE',       // HTTP method
    }),
  }),

  // PUT method to edit an existing model
  editModel: builder.mutation({
    query: ({ id, formData }) => ({
      url: `models/${id}`, // Endpoint to edit a category
      method: 'PUT',          // HTTP method
      body: formData,         // Attach the updated FormData object as the request body
      // 'Content-Type' is not needed for FormData; the browser will set it automatically
    }),
  }),

  // GET method example: fetching location details
  getLocationDetails: builder.query({
    query: () => `locations`,  // Adjust the URL based on your API endpoint
  }),

  // POST method to add a new location
  addLocation: builder.mutation({
    query: (formData) => ({
      url: '/locations', // Endpoint to add a new location
      method: 'POST',    // HTTP method
      body: formData,    // Attach the FormData object as the request body
    }),
  }),

  // DELETE method to remove a location
  deleteLocation: builder.mutation({
      query: (id) => ({
        url: `locations/${id}`, // Endpoint to delete a location
        method: 'DELETE',       // HTTP method
      }),
    }),

     // PUT method to edit an existing location
  editLocation: builder.mutation({
      query: ({ id, formData }) => ({
        url: `locations/${id}`, // Endpoint to edit a category
        method: 'PUT',          // HTTP method
        body: formData,         // Attach the updated FormData object as the request body
        // 'Content-Type' is not needed for FormData; the browser will set it automatically
      }),
    }),

    // GET method example: fetching city details
    getCityDetails: builder.query({
      query: () => `cities`,  // Adjust the URL based on your API endpoint
    }),

    // POST method to add a new city
    addCity: builder.mutation({
      query: (formData) => ({
        url: '/cities', // Endpoint to add a new city
        method: 'POST',    // HTTP method
        body: formData,    // Attach the FormData object as the request body
      }),
    }),

    // DELETE method to remove a city
    deleteCity: builder.mutation({
        query: (id) => ({
          url: `cities/${id}`, // Endpoint to delete a city
          method: 'DELETE',       // HTTP method
        }),
      }),

       // PUT method to edit an existing city
    editCity: builder.mutation({
        query: ({ id, formData }) => ({
          url: `cities/${id}`, // Endpoint to edit a city
          method: 'PUT',          // HTTP method
          body: formData,         // Attach the updated FormData object as the request body
          // 'Content-Type' is not needed for FormData; the browser will set it automatically
        }),
      }),

      // GET method example: fetching car details
    getCarDetails: builder.query({
      query: () => `cars`,  // Adjust the URL based on your API endpoint
    }),

    // POST method to add a new car
    addCar: builder.mutation({
      query: (formData) => ({
        url: '/cars', // Endpoint to add a new car
        method: 'POST',    // HTTP method
        body: formData,    // Attach the FormData object as the request body
        // headers: {
        //   'Content-Type': 'multipart/form-data', // Ensure the Content-Type is set correctly
        // },
      }),
    }),

    // DELETE method to remove a car
    deleteCar: builder.mutation({
        query: (id) => ({
          url: `cars/${id}`, // Endpoint to delete a car
          method: 'DELETE',       // HTTP method
        }),
      }),

       // PUT method to edit an existing car
    editCar: builder.mutation({
        query: ({ id, formData }) => ({
          url: `cars/${id}`, // Endpoint to edit a car
          method: 'PUT',          // HTTP method
          body: formData,         // Attach the updated FormData object as the request body
          // 'Content-Type' is not needed for FormData; the browser will set it automatically
        }),
      }),

  }),
});

// Export the hooks for usage in functional components
export const {
   useLoginMutation,
   useGetCategoryDetailsQuery,
    useAddCategoryMutation,
     useDeleteCategoryMutation,
      useEditCategoryMutation,
      useGetBrandsDetailsQuery,
      useAddBrandsMutation,
      useDeleteBrandMutation,
      useEditBrandMutation,
      useGetModelsDetailsQuery,
      useAddModelsMutation,
      useEditModelMutation,
      useDeleteModelMutation,
      useGetLocationDetailsQuery,
      useAddLocationMutation,
      useDeleteLocationMutation,
      useEditLocationMutation,
      useGetCityDetailsQuery,
      useAddCityMutation,
      useEditCityMutation,
      useDeleteCityMutation,
      useGetCarDetailsQuery,
      useEditCarMutation,
      useDeleteCarMutation,
      useAddCarMutation
     } = authApi;
