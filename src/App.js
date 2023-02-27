import './App.css';
import Navbar from './components/Navbar';
import NewsBody from './components/NewsBody';
import React from 'react';
import { Outlet, BrowserRouter, Routes, Route } from "react-router-dom";
import Spinner from './components/Spinner';



export default function App(){

    return (
      <BrowserRouter>
        <div className='container-fluid'>
          <Navbar />
          <Routes>
            {["/", "business", "entertainment", "general", "health", "science", "sports", "technology"].map((e) => {
              return (
                <Route key={e} path={`${e}`} element={<NewsBody category={e} apikey='23e585f3c5fa421cb2ffb8cdce3b0ea0' pagesize={{ pagesize: [5, 3] }} />} />
              )
            })}
            <Route path="about" element={<Spinner/>}/>
          </Routes>
          <Outlet />
        </div>
      </BrowserRouter>
    )
  }