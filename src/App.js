import './output.css';
import LoginPage from './pages/login-page';
import Dashboard from './pages/dashboard';
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}>
          <Route
            path="dashboard"
            element={<Dashboard/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
