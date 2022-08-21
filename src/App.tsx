import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import Nav from './components/Navigation/Nav';
import Test1 from './components/Test1/Test1';
import Test2 from './components/Test2/Test2';
import { GlobalStyle } from './GlobalStyles';


const App = () => (
  <div className='App'>
    <Nav/>

    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/test1' element={<Test1 />}></Route>
      <Route path='/test2' element={<Test2 />}></Route>
    </Routes>

    <GlobalStyle />
  </div>
);

export default App;
