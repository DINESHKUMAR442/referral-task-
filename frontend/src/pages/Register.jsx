import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import apiClient from '../api/apiClient';

import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
                    <div className="password-input-wrapper">
                        <input
                            id="reg-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
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
