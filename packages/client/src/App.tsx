import { ConfigProvider } from "antd";
import "./i18n";
import "./App.scss";

import enUS from "antd/es/locale/en_US";

import { AuthProvider } from "shared/contexts/AuthContext";

import { RouterProvider } from "react-router-dom";
import { router } from "views/AllRoutes";

function App() {
  return (
    <ConfigProvider locale={enUS}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
