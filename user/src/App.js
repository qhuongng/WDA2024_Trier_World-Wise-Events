import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppContainer from "./AppContainer";

const router = createBrowserRouter([
  { path: "*", element: <Root /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <AppContainer />
  );
}
