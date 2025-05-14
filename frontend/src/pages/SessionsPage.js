import SessionList from "../components/SessionsList";
import Menu from "../components/Menu";
import ProtectedRoute from "../components/ProtectedRoute";
import PropTypes from "prop-types";

function SessionsList({ refreshCount, onSessionAdded }) {
  return (
    <>
      <ProtectedRoute>
        {/* <CreateSession onSessionAdded={onSessionAdded} /> */}
        <SessionList refreshCount={refreshCount} onSessionAdded={onSessionAdded}/>
        <Menu />
      </ProtectedRoute>
    </>
  );
}

SessionsList.propTypes = {
  refreshCount: PropTypes.number.isRequired,
  onSessionAdded: PropTypes.func.isRequired,
};

export default SessionsList;
