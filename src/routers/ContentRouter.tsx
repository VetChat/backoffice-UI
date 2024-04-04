import { Route, Routes } from "react-router-dom";
import Case from "../pages/Case/Case";
import Layout from "../components/Layout/Layout";
import Animal from "@/pages/Animal/Animal";

const ContentRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Case />} />
        <Route path="/items/animal" element={<Animal />} />
      </Routes>
    </Layout>
  );
};

export default ContentRouter;
