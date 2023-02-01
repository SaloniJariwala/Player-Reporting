import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import PrivateRoute from "./components/PrivateRoute";
import { PrivateRouteData } from "./components/PrivateRoute/PrivateRouteData";
// import DashBoard from "./pages/Dashboard";

const App = () => {
    const [sideBar, setSideBar] = useState(false);
    const [mobileHeader, setMobileHeader] = useState(false);

    // const userdata = localStorage.getItem("userLogin");

    // const getWithExpiry = (key) => {
    //     const itemStr = localStorage.getItem(key);

    //     // if the item doesn't exist, return null
    //     if (!itemStr) {
    //         return null;
    //     }

    //     const item = JSON.parse(itemStr);
    //     const now = new Date();

    //     if (now.getTime() > item.expiry) {
    //         // If the item is expired, delete the item from storage
    //         // and return null
    //         localStorage.removeItem(key);
    //         var userLogin = false;
    //     }
    //     // return item.value;
    // };

    const sideBarButton = () => {
        setSideBar(!sideBar);
    };

    const header_menu_button = () => {
        setMobileHeader(!mobileHeader);
    };

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    {PrivateRouteData.map((data) => {
                        return (
                            <React.Fragment key={data.menu_num}>
                                <Route
                                    path={data.path}
                                    element={
                                        <PrivateRoute>
                                            <div
                                                className={
                                                    sideBar
                                                        ? `page_wrapper sidebar_collapsed ${
                                                              mobileHeader ? "sidebar_collapsed" : ""
                                                          }`
                                                        : `page_wrapper ${
                                                              mobileHeader ? "sidebar_collapsed" : ""
                                                          }`
                                                }>
                                                <SideBar
                                                    sideBar={sideBar}
                                                    mobileHeader={mobileHeader}
                                                    sideBarButton={sideBarButton}
                                                />
                                                <main className="main_content">
                                                    <Header
                                                        mobileHeader={mobileHeader}
                                                        header_menu_button={header_menu_button}
                                                    />
                                                    <div className="page_content">{data.components}</div>
                                                </main>
                                            </div>
                                        </PrivateRoute>
                                    }
                                />
                            </React.Fragment>
                        );
                    })}

                    <Route path="*" element={<p>Not Found</p>} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
