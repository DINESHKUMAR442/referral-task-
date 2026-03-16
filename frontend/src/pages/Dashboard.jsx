import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import ReferralTree from '../components/ReferralTree';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import apiClient from '../api/apiClient';
import { Users, Compass, User } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewUid, setViewUid] = useState(null);

    const fetchData = useCallback(async (uid) => {
        try {
            const targetUid = uid || user?.uid;
            const [profileRes, treeRes] = await Promise.all([
                apiClient.get('/user/profile'),
                apiClient.get(`/tree/subtree/${targetUid}`)
            ]);
            setProfile(profileRes.data);
            setTreeData(treeRes.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching dashboard data', err);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchData(viewUid);
        }
    }, [user, fetchData, viewUid]);

    const handleNavigateToSelf = () => {
        setViewUid(user.uid);
    };

    const handleNavigateToUser = (uid) => {
        setViewUid(uid);
    };

    if (loading) return (
        <div className="loading-screen">
            <div className="loader"></div>
        </div>
    );

    return (
        <div className="dashboard-container">
            <Sidebar
                user={user}
                logout={logout}
                onNavigateToSelf={handleNavigateToSelf}
            />

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h1 className="dashboard-title">Welcome back, {user?.username}</h1>
                    <p className="dashboard-subtitle">Manage your hierarchical network and referrals.</p>
                </header>

                <section className="tree-section">
                    {treeData && (
                        <ReferralTree
                            data={treeData}
                            onNodeClick={handleNavigateToUser}
                            isViewingSelf={viewUid === user?.uid || !viewUid}
                            onReset={handleNavigateToSelf}
                        />
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
