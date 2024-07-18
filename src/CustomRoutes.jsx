import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/landing";
import Schedule from "./pages/schedule";
import Layout from "./layout";
import Document from "./pages/document";
import Issues from "./pages/issues";
import Assets from "./pages/assets";
import FormRegister from "./pages/form/form-register";
import FormBuilder from "./pages/form/form-builder";

function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/calendar" element={<Schedule />} />
        <Route path="/site/issues" element={<Issues />} />
        <Route path="/site/assets" element={<Assets />} />
        <Route path="/qshe/permits">
          <Route index element={<FormRegister />} />
          <Route path="/qshe/permits/builder/:id" element={<FormBuilder />} />
        </Route>
        <Route path="/qshe/inspections">
          <Route index element={<FormRegister />} />
          <Route
            path="/qshe/inspections/builder/:id"
            element={<FormBuilder />}
          />
        </Route>
        <Route path="/qshe/violations">
          <Route index element={<FormRegister />} />
          <Route
            path="/qshe/violations/builder/:id"
            element={<FormBuilder />}
          />
        </Route>
        <Route path="/qshe/incidents">
          <Route index element={<FormRegister />} />
          <Route path="/qshe/incidents/builder/:id" element={<FormBuilder />} />
        </Route>
        <Route path="/drawings/transmittals">
          <Route index element={<FormRegister />} />
          <Route
            path="/drawings/transmittals/builder/:id"
            element={<FormBuilder />}
          />
        </Route>
        <Route path="/drawings/technical_queries">
          <Route index element={<FormRegister />} />
          <Route
            path="/drawings/technical_queries/builder/:id"
            element={<FormBuilder />}
          />
        </Route>
        <Route path="/drawings/register" element={<Document />} />
      </Route>
    </Routes>
  );
}

export default CustomRoutes;
