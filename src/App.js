import './output.css';
import LoginPage from './pages/login-page';
import Dashboard from './pages/dashboard';
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import ProfilePage from './pages/profile-page';
import DashboardLayout from './layout/layout';
import ProductPage from './pages/product-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="login" 
          element={<LoginPage />}/>
        <Route 
          path="/" 
          element={<LoginPage />}/>
        <Route path="/dashboard" element={<DashboardLayout/>}>    
          <Route
            path="/dashboard"
            element={<Dashboard/>}>
          </Route>
          <Route
          path="profile"
          element={<ProfilePage/>}/>
          <Route
          path="product"
          element={<ProductPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
