import Calendar from "../components/Calendar";
import NextSession from "../components/NextSession";
import Goals from "../components/Goals";
import Menu from "../components/Menu";
import ProtectedRoute from "../components/ProtectedRoute";
import PropTypes from "prop-types";

function Home({ refreshCount, onSessionAdded, serverBaseUrl }) {
  return (
    <>
      <ProtectedRoute>
        <Calendar refreshCount={refreshCount} serverBaseUrl={serverBaseUrl}/>
        <NextSession onSessionAdded={onSessionAdded} serverBaseUrl={serverBaseUrl}/>
        <Goals refreshCount={refreshCount} onSessionAdded={onSessionAdded} serverBaseUrl={serverBaseUrl}/>
        <Menu />
      </ProtectedRoute>
    </>
  );
}

Home.propTypes = {
  refreshCount: PropTypes.number.isRequired,
  onSessionAdded: PropTypes.func.isRequired,
  serverBaseUrl: PropTypes.string.isRequired,
};

export default Home;
