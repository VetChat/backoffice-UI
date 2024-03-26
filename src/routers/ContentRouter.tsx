import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Case from "../pages/Case/Case";

const ContentRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Case />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ContentRouter;
