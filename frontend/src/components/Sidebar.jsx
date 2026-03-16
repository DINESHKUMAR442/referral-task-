import React from 'react';
import { Compass, User, LogOut } from 'lucide-react';

const Sidebar = ({ user, logout, onNavigateToSelf }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">▲</div>
                <h2 className="sidebar-title">Genesis<span>Network</span></h2>
            </div>

            <nav className="sidebar-nav">
                <button className="nav-item active">
                    <Compass size={20} />
                    <span>Network Tree</span>
                </button>
                <button className="nav-item" onClick={onNavigateToSelf}>
                    <User size={20} />
                    <span>My Position</span>
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
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
