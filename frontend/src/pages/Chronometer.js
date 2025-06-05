import Chrono from "../components/Chrono";
import Menu from "../components/Menu";
import ProtectedRoute from "../components/ProtectedRoute";
import PropTypes from "prop-types";

function Chronometer({ currentPage, setCurrentPage }) {
  setCurrentPage("chrono");

  return (
    <>
      <ProtectedRoute>
        <Chrono />
        <Menu currentPage={currentPage} />
      </ProtectedRoute>
    </>
  );
}

Chronometer.propTypes = {
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Chronometer;
