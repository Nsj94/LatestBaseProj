import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import AdminLayout from "shared/components/layout/AdminLayout/AdminLayout";

type Props = {};

const AdminRoutes: React.FunctionComponent<Props> = ({ children }: any) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleMenuClick(route: string) {
    if (route !== pathname) {
      navigate(route);
    }
  }

  const AppLayout = AdminLayout;

  React.useEffect(() => {
    document.title = "Milano Admin";
  }, []);

  return (
    <AppLayout
      onMenuClick={handleMenuClick}
      pagination={undefined}
      filters={undefined}
    >
      <Outlet />
    </AppLayout>
  );
};

export default AdminRoutes;
