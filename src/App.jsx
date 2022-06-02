import React, {Profiler, useEffect, useState} from "react";
import './App.scss';
import Auth from "./components/Auth/Auth";
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Create from "./components/Create/Create";
import YourResume from "./components/Resume/YourResume";
import VacationsWrapper from "./components/VacationsWrapper/VacationsWrapper";
import VacationView from "./components/VacationsWrapper/VacationView/VacationView";
import VacationSearch from "./components/VacationSearch/VacationSearch";
import VacationViewInSearch from "./components/VacationSearch/VacationViewInSearch/VacationViewInSearch";
import ResumeSearch from "./components/ResumeSearch/ResumeSearch";
import ResumeView from "./components/ResumeSearch/ResumeView/ResumeView";
import OfferedResume from "./components/VacationsWrapper/VacationView/OfferedResume/OfferedResume";
import OfferedResumeView from "./components/VacationsWrapper/VacationView/OfferedResume/OfferedResumeView/OfferedResumeView";
import VacationOffered from "./components/Resume/VacationOffered/VacationOffered";
import VacationOfferedView from "./components/Resume/VacationOffered/VacationOfferedView/VacationOfferedView";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={JSON.parse(localStorage.getItem("user")) === null ? <Navigate to="/login" /> : <Navigate to="/profile"/> }/>
                <Route path="/login" element={JSON.parse(localStorage.getItem("user")) !== null ? <Navigate to="/profile" />  : <Auth/>} exact/>
                <Route path="/profile" element={JSON.parse(localStorage.getItem("user")) !== null ? <Profile/> : <Navigate to="/login"/>} exact/>
                <Route path="/register" element={JSON.parse(localStorage.getItem("user")) !== null ? <Navigate to="/profile" /> : <Register/>} exact/>
                <Route path="/create" element={JSON.parse(localStorage.getItem("user")) === null ? <Navigate to="/login" /> : <Create/>} exact/>
                <Route path="/your-resume" element={JSON.parse(localStorage.getItem("user")) === null ? <Navigate to="/login" /> : <YourResume/>} exact/>
                <Route path="/your-resume/:resumeId/vacation-offered" element={<VacationOffered/>} exact/>
                <Route path="/your-resume/:resumeId/vacation-offered/:vacationId" element={<VacationOfferedView/>} exact/>
                <Route path="/vacation-wrapper" element={JSON.parse(localStorage.getItem("user")) === null ? <Navigate to="/login" /> : <VacationsWrapper/>} exact/>
                <Route path="/vacation/:vacationId" element={<VacationView/>} exact/>
                <Route path="/vacation/:vacationId/resume-offered" element={<OfferedResume/>} exact/>
                <Route path="/vacation/:vacationId/resume-offered/:resumeId" element={<OfferedResumeView/>} exact/>
                <Route path="/vacation-search" element={JSON.parse(localStorage.getItem("user")) === null ? <Navigate to="/login" /> : <VacationSearch/>} exact/>
                <Route path="/vacation-search/:vacationId" element={<VacationViewInSearch/>} exact/>
                <Route path="/resume-search" element={JSON.parse(localStorage.getItem("user")) === null ? <Navigate to="/login" /> : <ResumeSearch/>} exact/>
                <Route path="/resume-search/:resumeId" element={<ResumeView/>} exact/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
