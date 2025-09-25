import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import CarDetails from "./pages/CarDetails";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import ManageBooking from "./pages/owner/ManageBooking";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";


const App = () => {
    const { showLogin } = useAppContext();

    const isOwnerPath = useLocation().pathname.startsWith('/owner');


    return (
        <>  
            <Toaster />

            {/* Login */}
            { showLogin && <Login /> }
            {/* Navbar */}
            { !isOwnerPath && <Navbar /> }

            {/* Pages */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/car-details/:id" element={<CarDetails />} />  
                <Route path="/cars" element={<Cars />} />
                <Route path="/my-bookings" element={<MyBookings />} />

                {/* owner */}
                <Route path="/owner" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="add-car" element={<AddCar />} />
                    <Route path="manage-cars" element={<ManageCars />} />
                    <Route path="manage-bookings" element={<ManageBooking />} />
                </Route>
            </Routes>

            {/* Footer */}
            { !isOwnerPath && <Footer /> }
        </>
    );
};

export default App;
