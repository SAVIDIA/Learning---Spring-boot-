import { useEffect, useState } from "react";

import Loader from "../components/Loader";
import { getCurrentUser } from "../services/authService";
import { getRole, getUsername } from "../utils/auth";

function ProfilePage() {
    const [profile, setProfile] = useState({
        username: getUsername(),
        role: getRole(),
        userId: "-"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);
                const res = await getCurrentUser();
                const data = res.data?.data || {};
                setProfile({
                    username: data.username || getUsername(),
                    role: data.role || getRole(),
                    userId: data.userId || "-"
                });
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <h2 className="mb-3">My Profile</h2>

            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <p className="mb-2"><strong>User ID:</strong> {profile.userId}</p>
                    <p className="mb-2"><strong>Username:</strong> {profile.username}</p>
                    <p className="mb-0"><strong>Role:</strong> {profile.role}</p>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;