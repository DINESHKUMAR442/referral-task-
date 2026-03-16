import React from 'react';
import { LogOut } from 'lucide-react';

const Sidebar = ({ user, logout, onNavigateToSelf }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2 className="sidebar-title">Referral</h2>
            </div>

            <nav className="sidebar-nav">
                <button className="nav-item active">
                    Network Tree
                </button>
                <button className="nav-item" onClick={onNavigateToSelf}>
                    My Position
                </button>
            </nav>

            <div className="sidebar-footer">
                <div className="user-snippet">
                    <div className="user-avatar">{user?.username?.[0].toUpperCase()}</div>
                    <div className="user-details">
                        <span className="user-name">{user?.username}</span>
                        <span className="user-uid">{user?.uid}</span>
                    </div>
                </div>
                <button className="logout-btn" onClick={logout}>
                    <LogOut size={16} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
