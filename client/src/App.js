import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate } from "react-router-dom";
import './App.css';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import MainpageLayout from "./Layouts/MainpageLayout/MainpageLayout";
import HomePage from "./Pages/HomePage/HomePage";
import ProductPage from './Pages/ProductPage/ProductPage'
import Wishlist from "./Pages/Wishlist/Wishlist";
import SignUp from "./Pages/Authentication/SignUp/SignUp";
import Login from "./Pages/Authentication/Login/Login";
import Cart from './Pages/Cart/Cart'
import Order from "./Pages/Order/Order";
import Payment from "./Pages/Payment/Payment";
const router = createBrowserRouter(

    createRoutesFromElements(
    <>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/' element={<MainpageLayout />}>
            <Route path="/" element={<HomePage/>}/>
            <Route path={`/product/:id`} element={<ProductPage/>}/>
            <Route path={`/wishlist`} element={<Wishlist/>}/>
            <Route path={`/:userId/Cart`} element={<Cart/>}/>
            <Route path={`/order`} element={<Order/>}/>
            <Route path={`/order/:orderId/payment`} element={<Payment/>}/>
        </Route>
    </>
    )
);

function App() {

    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router = {router} />
        </QueryClientProvider>
    );
}

export default App;
