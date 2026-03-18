import React from 'react';
import TreeNode from './TreeNode';
import './ReferralTree.css';
import { ChevronLeft } from 'lucide-react';

const ReferralTree = ({ data, onNodeClick, isViewingSelf, onReset, onBack, canGoBack }) => {
    if (!data) return <div className="no-data">No tree data available.</div>;

    return (
        <div className="referral-tree-wrapper">
            <div className="tree-header">
                <div className="header-left">
                    <h2>Network Tree</h2>
                    <div className="tree-controls">
                        <p className="viewing-label">
                            Viewing: <strong>{data.username}</strong>
                        </p>
                        <div className="button-group">
                            {canGoBack && (
                                <button className="control-btn back-btn" onClick={onBack} title="Go back to previous node">
                                    <ChevronLeft size={14} />
                                    Back
                                </button>
                            )}
                            {!isViewingSelf && (
                                <button className="control-btn reset-btn" onClick={onReset} title="Return to your own tree">
                                    My Home
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="tree-viewport">
                <div className="tree-container">
                    <TreeNode 
                        user={data} 
                        isRoot={true} 
                        onNodeClick={onNodeClick} 
                        onReset={onReset}
                        onBack={onBack}
                        canGoBack={canGoBack}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReferralTree;
