import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/landing";
import Schedule from "./pages/schedule";

function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  );
}

export default CustomRoutes;
