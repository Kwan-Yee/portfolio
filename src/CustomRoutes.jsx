import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/landing";
import Schedule from "./pages/schedule";
import Layout from "./layout";
import Form from "./pages/form";
import Document from "./pages/document";
import Communications from "./pages/communications";

function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/form" element={<Form />} />
        <Route path="/document" element={<Document />} />
        <Route path="/communications" element={<Communications />} />
      </Route>
    </Routes>
  );
}

export default CustomRoutes;
