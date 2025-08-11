import { Navigate, Routes } from "react-router";
import { Route } from "react-router";
import Home from "./pages/Home.jsx";
import ChatPage from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import Notifications from "./pages/Notifications.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Call from "./pages/Call.jsx";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader.jsx";
import useAuthUser from "./hooks/useAuthUser.jsx";
import Layout from "./components/Layout.jsx";
import useThemeStore from "./store/usethemestore.js";
import "stream-chat-react/dist/css/v2/index.css";
import "../src/index.css";
import { ChartLine } from "lucide-react";
import Chatlist from "./pages/chatlist.jsx";

function App() {
  const { isLoading, authUser } = useAuthUser();
  console.log("authUser", authUser);
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  const { theme } = useThemeStore();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onbaording"} />
            )
          }
        />

        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUp /> : <Navigate to={"/"} />}
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onbaording"} />
            )
          }
        />

        <Route
          path="/onbaording"
          element={
            isAuthenticated && !isOnboarded ? (
              <Onboarding />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout>
                <ChatPage showSideBar={false} />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/chat"} />
            )
          }
        />

        <Route
          path="/notification"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout>
                <Notifications />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onbaording"} />
            )
          }
        />

        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Call />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

<Route
          path="/chatlist"
          element={
            isAuthenticated && isOnboarded ? (
              <Chatlist />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
