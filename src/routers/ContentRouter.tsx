import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Animal from "@/pages/Animal/Animal";
import Symptom from "@/pages/Symptom/Symptom";
import Urgent from "@/pages/Urgent/Urgent";
import Summary from "@/pages/Summary/Summary";
import QuestionSet from "@/pages/QuestionSet/QuestionSet";
import CreateQuestionSet from "@/pages/CreateQuestionSet/CreateQuestionSet";

const ContentRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<Summary />} />
        <Route path="summary/*" element={<Summary />} />
        <Route path="animal" element={<Animal />} />
        <Route path="symptom" element={<Symptom />} />
        <Route path="urgent" element={<Urgent />} />
        <Route path="questionSet" element={<QuestionSet />}>
          {/* Nested routes under /questionSet */}
        </Route>
        <Route path="create/:questionSetId" element={<CreateQuestionSet />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

export default ContentRouter;
