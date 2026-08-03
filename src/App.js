import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Student/Dashboard/Dashboard'
import Login from './pages/Login/Login';
import EventDetail from './pages/Student/EventDetails/EventDetail';
import Scanner from './pages/Student/Scanner/Scanner';
import Attendance from './pages/Student/Attendance/Attendance'
import { useEffect } from 'react';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import AdminLayout from './pages/Admin/AdminLayout';
import StudentLayout from './pages/Student/StudentLayout';
import ManageEvent from './pages/Admin/ManageEvent/ManageEvent';
import LanAttendance from './pages/Admin/Attendance/LanAttendance/QrAttendance';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/"} element={<StudentLayout> <Dashboard /></StudentLayout>}></Route>
        <Route path={"/event-details/:eventId/:attendance_type"} element={<StudentLayout><EventDetail /></StudentLayout>}></Route>
        <Route path={"/scanner/:event_id"} element={<Scanner />}></Route>
        <Route path={"/attendance"} element={<StudentLayout><Attendance /></StudentLayout>}></Route>
        <Route path={"/admin/dashboard"} element={<AdminLayout><AdminDashboard /></AdminLayout>}></Route>
        <Route path={"/admin/event-details/:eventId"} element={<AdminLayout><ManageEvent /></AdminLayout>}></Route>
        <Route path={"/admin/:eventId/:attendance_type"} element={<LanAttendance />}></Route>
      </Routes>
    </div>
  );
}

export default App;
