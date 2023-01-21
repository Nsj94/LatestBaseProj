import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthConsumer } from "shared/contexts/AuthContext";
import { ADMIN, DEALER } from "../constants/RouteConstants";

export default function ProtectedRoute(props: any) {
  const location = useLocation();

  return (
    <AuthConsumer>
      {({ isAuth, user }) =>
        isAuth ? (
          user.roles[0].id === 3 ? (
            location.pathname.startsWith("/dealer") ? (
              <Outlet />
            ) : (
              <Navigate to={DEALER} />
            )
          ) : location.pathname.startsWith("/admin") ? (
            <Outlet />
          ) : (
            <Navigate to={ADMIN} />
          )
        ) : (
          <Navigate to={"/"} />
        )
      }
    </AuthConsumer>
  );

  // return (
  //   <Route
  //     {...rest}
  //     render={(props: JSX.IntrinsicAttributes) => (
  //       <AuthConsumer>
  //         {({ isAuth, user }) =>
  //           isAuth ? (
  //             rest.path.startsWith("/admin") ? (
  //               <Component {...props} />
  //             ) : (
  //               <Navigate
  //                 to={{
  //                   pathname: ADMIN_DASHBOARD,
  //                 }}
  //                 replace
  //               />
  //             )
  //           ) : (
  //             <Navigate to={"/"} replace />
  //           )
  //         }
  //       </AuthConsumer>
  //     )}
  //   />
  // );
}
