import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login';
import EventDetail from './pages/EventDetails/EventDetail';
import Scanner from './pages/Scanner/Scanner';
import Attendance from './pages/Attendance/Attendance'
import { useEffect } from 'react';
import { useMsal } from "@azure/msal-react";

function App() {
  const { instance } = useMsal();

    useEffect(() => {

        instance.handleRedirectPromise()
            .then((response) => {

                if (response) {

                    console.log(response.account);

                }

            })
            .catch(console.error);

    }, []);

  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Dashboard />}></Route>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/event-details"} element={<EventDetail />}></Route>
        <Route path={"/scanner"} element={<Scanner />}></Route>
        <Route path={"/attendance"} element={<Attendance />}></Route>
      </Routes>
    </div>
  );
}

export default App;
