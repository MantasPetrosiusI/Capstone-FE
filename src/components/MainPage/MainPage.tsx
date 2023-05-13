import { Container } from "react-bootstrap";
import Hero from "./Hero";
import MostHelpful from "./MostHelpful";
import RecentQuestions from "./RecentQuestions";

const MainPage = () => {
  return (
    <Container className="fluid mt-4">
      <Hero />
      <MostHelpful />
      <div>
        <span id="recentQuestions__titlespan">Recent questions</span>
      </div>
      <RecentQuestions />
    </Container>
  );
};
export default MainPage;
