import "./App.css";
import Header from "./layout/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Login from "./components/Login/Login";
import UserDashboard from "./components/Admin/UserDashboard/UserDashboard";
import Home from "./components/Home/Home";
import PostInside from "./components/Post/PostInside";
import Register from "./components/Register/Register";

const App = () => {
  const [state, dispatch] = useStateValue();

  return (
    <Router>
      <div className="app-wrapper">
        <div className="app">
          <Header />

          {!state.authenticated ? (
            <Routes>
              <Route path="/login" exact element={<Login />} />
              <Route path="/register" exact element={<Register />} />
              <Route
                path="/:category/:id/:slug"
                exact
                element={
                  <div className="mt-4">
                    <PostInside />
                  </div>
                }
              />
              <Route path="/" element={<Home />} />
            </Routes>
          ) : (
            <UserDashboard />
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
