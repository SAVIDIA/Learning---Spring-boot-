import { useEffect, useState } from "react";

import Loader from "../components/Loader";
import { getAuditLogs } from "../services/auditService";

function AuditLogPage() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        const loadLogs = async () => {
            try {
                setLoading(true);
                const data = await getAuditLogs();
                setLogs(data);
            } catch (error) {
                setErrorText(
                    error?.response?.data?.message ||
                        "Failed to load audit logs."
                );
            } finally {
                setLoading(false);
            }
        };

        loadLogs();
    }, []);

    return (
        <div>
            <h2 className="mb-3">Audit Logs</h2>

            {loading && <Loader />}

            {errorText && <div className="alert alert-danger">{errorText}</div>}

            {!loading && !errorText && logs.length === 0 && (
                <div className="alert alert-secondary">No audit logs found.</div>
            )}

            {!loading && logs.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Audit ID</th>
                                <th>User</th>
                                <th>Action</th>
                                <th>Entity</th>
                                <th>Description</th>
                                <th>Created Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.auditId}>
                                    <td>{log.auditId}</td>
                                    <td>{log.username || "SYSTEM"}</td>
                                    <td>{log.action}</td>
                                    <td>{log.entityName}</td>
                                    <td>{log.description}</td>
                                    <td>{String(log.createdDate || "")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AuditLogPage;