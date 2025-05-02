import Calendar from "../components/Calendar";
import Sessions from "../components/Sessions";
import Goals from "../components/Goals";
import Menu from "../components/Menu";
import ProtectedRoute from "../components/ProtectedRoute";

function Home() {
  return (
    <>
      <ProtectedRoute>
      <Calendar />
      <Sessions />
      <Goals />
      <Menu />
      </ProtectedRoute>
    </>
  );
}

export default Home;
