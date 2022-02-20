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
import Opinion from './components/Chats/Massage';
import Chats from './components/Massages/Chat';
import SwipeableTextMobileStepper from './components/Home/Image';
import LogIn from './components/LogIn/LogIn';
import EmployeeBar from './components/Employee/Emploee';
import Page404 from './components/PageNotFound';
import About from './components/About/about';
import AboutTheWeb from './components/About/about';
import ClientBar from './components/Client/Client';
import SearchEmp from './components/Search/Search';
import EmployeeForm from './components/Employee/EmployeeForm';
import SignOut from './components/SignOut/SignOut';
import Home from './components/Home/Home';
import ClientForm from './components/Client/ClientForm';
import OpinionNew from './components/OpinoinNew/OpinionNew';
import ClientPage from './components/UserPages/ClientPage';
import Manager from './components/Manager/Manager';
import ManagerBar from './components/Manager/Manager';
import ManagerOpinion from './components/Manager/ManagerOpinoin';
import UpdatePages from './components/UpdateEmp/UpdatePage';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr);
    if (user != null)
    {
      setIsLoggedIn(true);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr);
    setUser(user);
  }, [isLoggedIn])

  const changeLogin = () => {
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr);
    setUser(user);
    setIsLoggedIn(!isLoggedIn);
    
  }


  return (

    <Router>
      <div>

        <nav dir='rtl'>
          <ul id='ul' dir='rtl'>
            <li id='li' >
              <Link to="/">בית</Link>
            </li>
            <li id='li'>
              <Link to="/about">אודות</Link>
            </li>
            {
              isLoggedIn == false ?
                <><li id='li'>
                  <Link to="/sign-up">הרשם</Link>
                </li>
                  <li id='li'>
                    <Link to="/log-in">הכנס</Link>
                  </li></>

                : user.user_kind == 1 ? <>
                  <li id='li'>
                    <Link to="/client-bar">לקוח</Link>
                  </li>
                  <li><SignOut onSignOut={changeLogin} /></li>
                </> :user.user_kind == 0?
                  <>
                    <li id='li'>
                      <Link to="/employee-bar">עובד</Link>
                    </li>
                    <li><SignOut onSignOut={changeLogin} /></li>
                  </>
                  :
                  <>
                   <li id='li'>
                      <Link to="/manager-bar">מנהל</Link>
                    </li>
                    <li><SignOut onSignOut={changeLogin} /></li>
                  </>
            }

          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>

          <Route path="/sample" element={<Sample />} />
          <Route path="/sign-up" element={<SignUp onSignUp={changeLogin} />} />
          <Route path="/sign-out" element={<SignOut onSignOut={changeLogin} />} />
          <Route path="/log-in" element={<LogIn onLogin={changeLogin} />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/opinion" element={<Opinion />} />
          <Route path="/opinion-new" element={<OpinionNew />} />

          <Route path="/massages" element={<Chats />} />
          <Route path="/employee-bar/*" element={<EmployeeBar />} />
          <Route path="/client-bar/*" element={<ClientBar />} />
          <Route path="/manager-bar/*" element={<ManagerBar />} />

          <Route path="/update" element={<UpdatePages />} />
          <Route path="/search" element={<SearchEmp />} />
          <Route path="/about" element={<AboutTheWeb />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route path="/client-form" element={<ClientForm />} />
          <Route path="/client-page" element={<ClientPage />} />
          <Route path="/man-op" element={<ManagerOpinion />} />
          <Route path="/" element={<Home />} />

          <Route path="*" element={<Page404 />} />

        </Routes>

      </div>
    </Router>

  );
}

export default App;
