import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import PrivateRoute from "./privateRoutes";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function App() {

  const token = Cookies.get("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  
  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    window.location.reload();
    navigate('/login')
  }


  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    }
  }, [token]);

 return (
    <div className="bg-blue-200 h-[700px]">
      <header className="bg-lime-50 py-6 px-20">
        <nav className="h-full">
          <div className="container mx-auto flex justify-between items-center">
            <h3 className="text-2xl font-bold -ml-12"><span>Gabi</span> Notes</h3>
            <ul className="hidden md:flex space-x-6 -mr-16">
              <li>
              <Link to="/" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</Link>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                  <Link to="/add" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Add note</Link>

                  </li>
                  <li>
                    <Link to="/profile"                        class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent">

                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => handleLogout()}
                       class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent">
                      Logout
                    </Link>
                  </li>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <li>
                  <Link to="/login" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Login</Link>

                  </li>
                  <li>
                  <Link to="/register" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Register</Link>

                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<PrivateRoute />}>
          <Route path="/edit/:id" element={<EditNote />} />
        </Route>
        <Route path="/add" element={<PrivateRoute />}>
          <Route path="/add" element={<AddNote />} />
        </Route>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
