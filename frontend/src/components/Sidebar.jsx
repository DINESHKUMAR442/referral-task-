import React from 'react';
import { LogOut, LayoutDashboard, Users, X } from 'lucide-react';

const Sidebar = ({ user, logout, onNavigateToSelf, isOpen, onClose }) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <LayoutDashboard size={24} />
                    <h2 className="sidebar-title">referral_task</h2>
                </div>
                <button className="mobile-close-btn" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>

            <nav className="sidebar-nav">
                <button className="nav-item active" onClick={onClose}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </button>
                <button className="nav-item" onClick={onNavigateToSelf}>
                    <Users size={20} />
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
