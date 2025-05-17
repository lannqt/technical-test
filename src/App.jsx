import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/auth/Login";
import AddUser from "./pages/users/AddUser";
import UsersPage from "./pages/users/IndexUsers";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import EditUser from "./pages/users/EditUser";
import ShowUser from "./pages/users/ShowUser";
import { Toaster } from "sonner";

NProgress.configure({ showSpinner: false });

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/addUsers" element={<AddUser />} />
      <Route path="/users/edit/:id" element={<EditUser />} />
      <Route path="/users/show/:id" element={<ShowUser />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
      <Toaster richColors position="top-right" />
    </Router>
  );
}

export default App;
