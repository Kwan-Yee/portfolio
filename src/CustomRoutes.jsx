import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/landing";
import Schedule from "./pages/schedule";
import Layout from "./layout";
import FormLanding from "./pages/form";
import Document from "./pages/document";
import Communications from "./pages/communications";
import FormRegister from "./pages/form/form-register";
import FormBuilder from "./pages/form/form-builder";
import TemplateRegister from "./pages/form/form-template-register";

function CustomRoutes() {
  //TODO: error fallback page
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/form" element={<FormLanding />}>
          <Route index path="/form/register" element={<FormRegister />} />
          <Route path="/form/builder" element={<TemplateRegister />} />
          <Route path="/form/builder/id/:id" element={<FormBuilder />} />
        </Route>
        <Route path="/document" element={<Document />} />
        <Route path="/communications" element={<Communications />} />
      </Route>
    </Routes>
  );
}

export default CustomRoutes;
