import { Link } from "react-router-dom";

function NotFoundPage() {

    return (

        <div
            className="container mt-5 text-center"
        >

            <h1>
                404
            </h1>

            <h3>
                Page Not Found
            </h3>

            <div className="mt-3">
                <Link className="btn btn-primary" to="/dashboard">
                    Go to Dashboard
                </Link>
            </div>

        </div>

    );

}

export default NotFoundPage;