import React from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login"];
  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  return <div>Navbar</div>;
}
