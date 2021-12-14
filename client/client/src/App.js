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


function App() {
  return (

    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/sample">Home</Link>
            </li>
            <li>
              <Link to="/sign-up">Home</Link>
            </li>
            <li>
              <Link to="/log-in">LogIn</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>

          <Route path="/sample" element={<Sample />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LOgIn />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
