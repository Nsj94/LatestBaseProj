import { Link } from "react-router-dom";
import "./index.scss";

import { useRouteError } from "react-router-dom";

export default function Page404() {
  const error: any = useRouteError();

  return (
    <section className="page_404">
      <i>{error.statusText || error.message}</i>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>

                <p>the page you are looking for not avaible!</p>

                <Link to="/" className="link_404 theme-btn">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
