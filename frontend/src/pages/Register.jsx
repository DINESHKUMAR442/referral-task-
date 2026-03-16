import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import apiClient from '../api/apiClient';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [referralUid, setReferralUid] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/auth/register', {
                username,
                password,
                referralUid
            });
            login({ username: response.data.username, uid: response.data.uid }, response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <AuthLayout
            title="Join the Network"
            subtitle="Create your hierarchical account"
            footer={<span>Already have an account? <Link to="/login">Login here</Link></span>}
        >
            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Referral ID (UID)</label>
                    <input
                        type="text"
                        value={referralUid}
                        onChange={(e) => setReferralUid(e.target.value)}
                        placeholder="Optional"
                    />
                </div>
                <button type="submit" className="auth-btn">
                    <UserPlus size={18} />
                    <span>Submit Registration</span>
                </button>
            </form>
        </AuthLayout>
    );
};

export default Register;
