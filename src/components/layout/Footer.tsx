import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login"];
  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  return <div>Footer</div>;
}
