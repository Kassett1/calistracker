import Calendar from "../components/Calendar";
import NextSession from "../components/NextSession";
import Goals from "../components/Goals";
import Menu from "../components/Menu";
import ProtectedRoute from "../components/ProtectedRoute";
import PropTypes from "prop-types";

function Home({ refreshCount, onSessionAdded }) {
  return (
    <>
      <ProtectedRoute>
        <Calendar refreshCount={refreshCount} />
        <NextSession onSessionAdded={onSessionAdded} />
        <Goals refreshCount={refreshCount} onSessionAdded={onSessionAdded}/>
        <Menu />
      </ProtectedRoute>
    </>
  );
}

Home.propTypes = {
  refreshCount: PropTypes.number.isRequired,
  onSessionAdded: PropTypes.func.isRequired,
};

export default Home;
