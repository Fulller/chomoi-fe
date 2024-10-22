import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Title from "@components/Title";
import routes from "@app/Router/routes";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          const { path, type, element, title } = route;
          const RouteType = route.type;
          return (
            <Route
              key={path}
              path={path}
              element={
                <RouteType>
                  <Title>{title}</Title>
                  {element}
                </RouteType>
              }
            ></Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
