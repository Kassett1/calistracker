import SessionList from "../components/SessionsList";
import Menu from "../components/Menu";
import ProtectedRoute from "../components/ProtectedRoute";
import PropTypes from "prop-types";
import NewSessionButton from "../components/NewSessionButton";

function SessionsList({ refreshCount, onSessionAdded, serverBaseUrl }) {
  return (
    <>
      <ProtectedRoute>
        {/* <CreateSession onSessionAdded={onSessionAdded} /> */}
        <SessionList refreshCount={refreshCount} onSessionAdded={onSessionAdded} serverBaseUrl={serverBaseUrl}/>
        <NewSessionButton onSessionAdded={onSessionAdded} serverBaseUrl={serverBaseUrl}/>
        <Menu />
      </ProtectedRoute>
    </>
  );
}

SessionsList.propTypes = {
  refreshCount: PropTypes.number.isRequired,
  onSessionAdded: PropTypes.func.isRequired,
  serverBaseUrl: PropTypes.string.isRequired,
};

export default SessionsList;
