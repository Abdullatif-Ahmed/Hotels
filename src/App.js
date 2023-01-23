import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Footer from "./ComPonents/Footer/Footer";
import Header from "./ComPonents/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./Sass/main.scss";
import logo from "./Assets/logo.webp";
import { ThreeDots } from "react-loader-spinner";
import { ErrorBoundary } from "react-error-boundary";

import { lazy, Suspense } from "react";
import ErrorFallback from "./ComPonents/Error Fallback";
import AuthProvider from "./firebaseContext";
const Home = lazy(() => import("./Pages/Home"));
const Search = lazy(() => import("./Pages/Search"));
const Property = lazy(() => import("./Pages/Property"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const SignUp = lazy(() => import("./Pages/SignUp"));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense
            fallback={
              <div
                className="d-flex align-items-center justify-content-center flex-column"
                style={{ height: "100vh" }}
              >
                <img src={logo} alt="logo" width="110" height="33" />
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#fc4c4c"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            }
          >
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/:id/:name" element={<Property />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
