import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import ReferralTree from '../components/ReferralTree';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';
import apiClient from '../api/apiClient';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewUid, setViewUid] = useState(null);
    const [history, setHistory] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        setHistory([]);
        setViewUid(user.uid);
    };

    const handleNavigateToUser = (uid) => {
        if (uid === viewUid) return;
        setHistory(prev => [...prev, viewUid || user?.uid]);
        setViewUid(uid);
        setMobileMenuOpen(false); // Close menu on navigation
    };

    const handleNavigateBack = () => {
        if (history.length === 0) return;
        const newHistory = [...history];
        const prevUid = newHistory.pop();
        setHistory(newHistory);
        setViewUid(prevUid);
    };

    if (loading) return (
        <div className="loading-screen">
            <div className="loader"></div>
        </div>
    );

    return (
        <div className="dashboard-container">
            <header className="mobile-header">
                <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
                    <Menu size={24} />
                </button>
                <div className="mobile-logo">referral_task</div>
                <div style={{ width: 24 }}></div> {/* Balance spacer */}
            </header>

            <Sidebar
                user={user}
                logout={logout}
                onNavigateToSelf={() => {
                    handleNavigateToSelf();
                    setMobileMenuOpen(false);
                }}
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
            
            {mobileMenuOpen && <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)}></div>}

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
                            onBack={handleNavigateBack}
                            canGoBack={history.length > 0}
                        />
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
