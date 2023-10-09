import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedPage from "./components/ProtectedPage";
import Profile from "./pages/profiles";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                {" "}
                <HomePage />{" "}
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                {" "}
                <Profile />{" "}
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
