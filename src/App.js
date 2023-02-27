import './App.css';
import Navbar from './components/Navbar';
import NewsBody from './components/NewsBody';
import React, { Component } from 'react';
import { Outlet, BrowserRouter, Routes, Route } from "react-router-dom";
import Spinner from './components/Spinner';



export default class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <div className='container-fluid'>
          <Navbar />
          <Routes>
            {["/", "business", "entertainment", "general", "health", "science", "sports", "technology"].map((e) => {
              return (
                <Route key={e} path={`${e}`} element={<NewsBody category={e} apikey='45e0d53979f34696a0c1bededb19956c' pagesize={{ pagesize: [5, 3] }} />} />
              )
            })}
            <Route path="about" element={<Spinner/>}/>
          </Routes>
          <Outlet />
        </div>
      </BrowserRouter>
    )
  }
}

