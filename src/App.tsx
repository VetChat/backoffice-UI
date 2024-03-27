import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContentRouter from "./routers/ContentRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<ContentRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
