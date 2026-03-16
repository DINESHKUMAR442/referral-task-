import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import apiClient from '../api/apiClient';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [referralUid, setReferralUid] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
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
            title="Create Account"
            subtitle="Join the referral network"
            footer={<span>Already have an account? <Link to="/login">Sign in</Link></span>}
        >
            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="reg-username">Username</label>
                    <input
                        id="reg-username"
                        type="text"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reg-password">Password</label>
                    <input
                        id="reg-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="referral-uid">Referral ID</label>
                    <input
                        id="referral-uid"
                        type="text"
                        placeholder="Optional - enter referrer's UID"
                        value={referralUid}
                        onChange={(e) => setReferralUid(e.target.value)}
                    />
                </div>
                <button type="submit" className="auth-btn">
                    Create Account
                </button>
            </form>
        </AuthLayout>
    );
};

export default Register;
