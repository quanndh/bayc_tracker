import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  useEffect(() => {}, []);

  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
      <ToastContainer theme="dark" />
    </ErrorBoundary>
  );
}

export default App;
