import { Route, Routes } from "react-router-dom";
import Case from "../pages/Case/Case";
import Layout from "../components/Layout/Layout";

const ContentRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Case />} />
      </Routes>
    </Layout>
  );
};

export default ContentRouter;
