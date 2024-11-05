import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate } from "react-router-dom";
import './App.css';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import MainpageLayout from "./Layouts/MainpageLayout/MainpageLayout";
import HomePage from "./Pages/HomePage/HomePage";
import ProductPage from './Pages/ProductPage/ProductPage'

const router = createBrowserRouter(

    createRoutesFromElements(
    <>
        <Route path='/' element={<MainpageLayout />}>
            <Route path="/" element={<HomePage/>}/>
            <Route path={`/product/:id`} element={<ProductPage/>}/>
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
