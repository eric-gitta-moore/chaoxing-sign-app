"use client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import React from "react";

const router = createHashRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

export default function AppShell() {
  return (
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  );
}
