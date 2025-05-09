import Chrono from "../components/Chrono";
import Menu from "../components/Menu";
import ProtectedRoute from "../components/ProtectedRoute";

function Chronometer() {
  return (
    <>
      <ProtectedRoute>
        <Chrono />
        {/* <Menu /> */}
      </ProtectedRoute>
    </>
  );
}

export default Chronometer;
