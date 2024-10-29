import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../pages/Layout";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";

const isAllowed = false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={isAllowed} redirectPath="/login">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute isAllowed={!isAllowed} redirectPath="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute isAllowed={!isAllowed} redirectPath="/login">
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
