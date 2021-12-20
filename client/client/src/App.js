import logo from './logo.svg';
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

function App() {
  
  return (

    <Router>
      <div>
      
        <nav>
          <ul id='ul'>
            <li id='li'>
              <Link to="/sample">Home</Link>
            </li>
            <li id='li'>
              <Link to="/sign-up">SignUp</Link>
            </li>
            <li id='li'>
              <Link to="/log-in">LogIn</Link>
            </li>
            <li id='li'>
              <Link to="/opinion">Opinion</Link>
            </li>
            <li id='li'>
              <Link to="/massages">Massages</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>

          <Route path="/sample" element={<Sample />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/opinion" element={<Opinion />} />
          <Route path="/massages" element={<Chats />} />
        </Routes>
        <SwipeableTextMobileStepper/>
      </div>
    </Router>

  );
}

export default App;
