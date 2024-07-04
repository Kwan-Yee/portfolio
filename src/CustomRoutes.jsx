import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/landing";
import Schedule from "./pages/schedule";
import Layout from "./layout";
import Document from "./pages/document";

import FormRegister from "./pages/form/form-register";
import FormBuilder from "./pages/form/form-builder";

function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/permits">
          <Route index element={<FormRegister />} />
          <Route path="/permits/builder/:id" element={<FormBuilder />} />
        </Route>
        <Route path="/inspections">
          <Route index element={<FormRegister />} />
          <Route path="/inspections/builder/:id" element={<FormBuilder />} />
        </Route>
        <Route path="/violations">
          <Route index element={<FormRegister />} />
          <Route path="/violations/builder/:id" element={<FormBuilder />} />
        </Route>
        <Route path="/transmittals">
          <Route index element={<FormRegister />} />
          <Route path="/transmittals/builder/:id" element={<FormBuilder />} />
        </Route>
        <Route path="/incidents">
          <Route index element={<FormRegister />} />
          <Route path="/incidents/builder/:id" element={<FormBuilder />} />
        </Route>
        <Route path="/technical-queries">
          <Route index element={<FormRegister />} />
          <Route
            path="/technical-queries/builder/:id"
            element={<FormBuilder />}
          />
        </Route>
        <Route path="/document" element={<Document />} />
      </Route>
    </Routes>
  );
}

export default CustomRoutes;
