import { useState } from "react";
import React from "react";
import "./assets/tailwind.css";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Loading from "./components/Loading";

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
import GuestLayout from './layouts/GuestLayout';
import Guest from './pages/guest';

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Job = React.lazy(() => import("./pages/Job"));
const NotFound = React.lazy(() => import("./pages/Notfound"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
      <Route path="*" element={<NotFound />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/job" element={<Job />} />
        </Route>

        // GuestLayout
        <Route element={<GuestLayout />}>
          <Route path="/guest" element={<Guest />} />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;
