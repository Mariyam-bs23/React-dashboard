import './output.css';
import LoginPage from './pages/login-page';
import Dashboard from './pages/dashboard';
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import ProfilePage from './pages/profile-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route 
            path="/" 
            element={<LoginPage />}/>
          <Route 
            path="login" 
            element={<LoginPage />}/>
          <Route
            path="dashboard"
            element={<Dashboard/>}>
          </Route>
            <Route
              path="profile"
              element={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
