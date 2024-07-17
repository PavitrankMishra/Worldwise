import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const isAuthenicated = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenicated) navigate("/app");
    },
    [isAuthenicated, navigate]
  );
}

export default ProtectedRoute;
