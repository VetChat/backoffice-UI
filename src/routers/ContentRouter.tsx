import { Navigate, Route, Routes } from "react-router-dom";
import Case from "../pages/Case/Case";
import Layout from "../components/Layout/Layout";
import Animal from "@/pages/Animal/Animal";
import Symptom from "@/pages/Symptom/Symptom";
import Urgent from "@/pages/Urgent/Urgent";
import Summary from "@/pages/Summary/Summary";

const ContentRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<Summary />} />
        <Route path="summary/*" element={<Summary />} />
        <Route path="case/:caseId" element={<Case />} />
        <Route path="animal" element={<Animal />} />
        <Route path="symptom" element={<Symptom />} />
        <Route path="urgent" element={<Urgent />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

export default ContentRouter;
