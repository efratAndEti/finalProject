import logo from './logo.svg';
import { useEffect, useState } from 'react';

import './App.css';
import Sample from './components/Sample/Sample'
import SignUp from './components/SignUp/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LOgIn from './components/LogIn/LogIn';
import Opinion from './components/Opinion/Opinion';
import Chats from './components/Massages/Chat';
import SwipeableTextMobileStepper from './components/Image';
import LogIn from './components/LogIn/LogIn';
import EmployeeBar from './components/Employee/Emploee';
import Page404 from './components/PageNotFound';
import About from './components/About/about';
import AboutTheWeb from './components/About/about';
import ClientBar from './components/Client/Client';
import SearchEmp from './components/Search/Search';
import EmployeeForm from './components/Employee/EmployeeForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr);
    if (user != null)
      setIsLoggedIn(true);
  }, []);
  const changeLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  }

  return (

    <Router>
      <div>

        <nav>
          <ul id='ul'>
            <li id='li'>
              <Link to="/sample">Home</Link>
            </li>
            {
              isLoggedIn == false ?
                <><li id='li'>
                  <Link to="/sign-up">SignUp</Link>
                </li>
                  <li id='li'>
                    <Link to="/log-in">LogIn</Link>
                  </li>
                  <li id='li'>
                    <Link to="/about">About</Link>
                  </li></>
                : <>
                  <li id='li'>
                    <Link to="/employee-bar">Employee Bar</Link>
                  </li>
                </>
            }

          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>

          <Route path="/sample" element={<Sample />} />
          <Route path="/sign-up" element={<SignUp onSignUp={changeLogin} />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/opinion" element={<Opinion />} />
          <Route path="/massages" element={<Chats />} />
          <Route path="/employee-bar" element={<EmployeeBar />} />
          <Route path="/client-bar" element={<ClientBar />} />
          <Route path="/search" element={<SearchEmp />} />
          <Route path="/about" element={<AboutTheWeb />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route path="/" element={<Sample />} />

          <Route path="*" element={<Page404 />} />

        </Routes>
        <SwipeableTextMobileStepper />
      </div>
    </Router>

  );
}

export default App;
