import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AppLayout() {
    return (
        <div className="min-vh-100 bg-light">
            <Navbar />

            <div className="container-fluid">
                <div className="row">
                    <aside className="col-12 col-lg-2 border-end bg-white p-0">
                        <Sidebar />
                    </aside>

                    <main className="col-12 col-lg-10 p-3 p-md-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AppLayout;