import './App.css';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from "./pages/HomePage";
import {  UserPageLayout } from "./pages/UserPageLayout";
import { Logout } from "./components/Logout";
import { Info } from "./components/Info";
import { Albums } from "./components/Albums";
import { Posts } from "./components/Posts";
import { Todos } from "./components/Todos";



function App() {
  const {currentUser} = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/users/:id' element={<UserPageLayout />} >
          <Route index path='logout' element={<Logout />} />
          <Route path='info' element={<Info />} />
          <Route path='todos' element={<Todos />} />
          <Route path='albums' element={<Albums />} />
          <Route path='posts' element={<Posts />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
