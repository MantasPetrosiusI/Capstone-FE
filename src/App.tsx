import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomNavbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Cookies from "js-cookie";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import UserProfile from "./components/UserProfile";

function App() {
  const accessToken = Cookies.get("accessToken");
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <CustomNavbar isLoggedIn={accessToken ? true : false} />
          <Routes>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
