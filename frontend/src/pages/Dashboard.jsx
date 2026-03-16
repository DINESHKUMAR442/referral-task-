import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import ReferralTree from '../components/ReferralTree';
import Sidebar from '../components/Sidebar';
import apiClient from '../api/apiClient';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewUid, setViewUid] = useState(null);

    const fetchData = useCallback(async (uid) => {
        try {
            const targetUid = uid || user?.uid;
            const treeRes = await apiClient.get(`/tree/subtree/${targetUid}`);
            setTreeData(treeRes.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data', err);
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
                    <h1 className="dashboard-title">Welcome, {user?.username}</h1>
                    <p className="dashboard-subtitle">Your referral network overview</p>
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
