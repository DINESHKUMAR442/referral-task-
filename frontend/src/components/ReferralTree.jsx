import React from 'react';
import TreeNode from './TreeNode';
import './ReferralTree.css';

const ReferralTree = ({ data, onNodeClick, isViewingSelf, onReset }) => {
    if (!data) return <div className="no-data">No tree data available.</div>;

    return (
        <div className="referral-tree-wrapper">
            <div className="tree-header">
                <div className="header-left">
                    <h2>Network Architecture</h2>
                    <p className="viewing-label">
                        Currently viewing: <strong>{data.username}</strong>
                        {!isViewingSelf && (
                            <button className="reset-btn" onClick={onReset}>
                                Return to My Position
                            </button>
                        )}
                    </p>
                </div>
                <div className="legend">
                    <div className="legend-item"><span className="dot root"></span> Root</div>
                    <div className="legend-item"><span className="dot a"></span> Position A</div>
                    <div className="legend-item"><span className="dot b"></span> Position B</div>
                    <div className="legend-item"><span className="dot c"></span> Position C</div>
                </div>
            </div>
            <div className="tree-viewport">
                <div className="tree-container">
                    <TreeNode user={data} isRoot={true} onNodeClick={onNodeClick} />
                </div>
            </div>
        </div>
    );
};

export default ReferralTree;
