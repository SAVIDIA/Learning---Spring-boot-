import { useEffect, useState } from "react";

import Loader from "../components/Loader";
import { getDashboardStats } from "../services/dashboardService";

function DashboardPage() {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        activeEmployees: 0,
        inactiveEmployees: 0,
        departmentsCount: 0
    });
    const [loading, setLoading] = useState(true);
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        const loadStats = async () => {
            try {
                setLoading(true);
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                setErrorText(
                    error?.response?.data?.message ||
                        "Failed to load dashboard stats."
                );
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Dashboard</h2>
            </div>

            {errorText && <div className="alert alert-danger">{errorText}</div>}

            <div className="row g-3">
                <div className="col-12 col-md-6 col-xl-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-muted mb-1">Total Employees</p>
                            <h3 className="mb-0">{stats.totalEmployees}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-xl-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-muted mb-1">Active Employees</p>
                            <h3 className="mb-0 text-success">{stats.activeEmployees}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-xl-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-muted mb-1">Inactive Employees</p>
                            <h3 className="mb-0 text-warning">{stats.inactiveEmployees}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-xl-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-muted mb-1">Departments</p>
                            <h3 className="mb-0">{stats.departmentsCount}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;