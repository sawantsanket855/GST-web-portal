// ResetToHome.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetToHome() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/homepage", { replace: true }); // wipes out reset-home
  }, [navigate]);

  return null;
}