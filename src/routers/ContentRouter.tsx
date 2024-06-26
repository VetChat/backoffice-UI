import { Route, Routes } from "react-router-dom";
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
        <Route path="/" element={<Summary />} />
        <Route path="/case/:caseId" element={<Case />} />
        <Route path="/items/animal" element={<Animal />} />
        <Route path="/items/symptom" element={<Symptom />} />
        <Route path="/knowledge/urgent" element={<Urgent />} />
      </Routes>
    </Layout>
  );
};

export default ContentRouter;
