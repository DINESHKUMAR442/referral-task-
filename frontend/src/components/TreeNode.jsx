import React, { useState } from 'react';
import { User } from 'lucide-react';


const TreeNode = ({ user, position, isRoot = false, onNodeClick, onReset, onBack, canGoBack, depth = 0, branch = null, parentUid = null }) => {
    const [expanded, setExpanded] = useState(depth < 1); // Root + first level (A,B,C) always visible
    const currentBranch = depth === 0 ? null : (depth === 1 ? position : branch);
    const hasChildren = depth < 2;

    // Empty placeholder for unfilled positions
    if (!user) {
        return (
            <div className="node-cell">
                <div className="node-circle-placeholder">
                    <span>{position}</span>
                </div>
            </div>
        );
    }
    
    const childPositions = ['A', 'B', 'C'];

    const handleClick = () => {
        if (isRoot) {
            if (canGoBack && onBack) {
                onBack();
            } else if (onReset) {
                onReset();
            }
            return;
        }
        // Depth 1 (A, B, C): navigate into this node's subtree
        if (depth === 1 && onNodeClick) {
            onNodeClick(user.uid);
            return;
        }
        // Deeper nodes: toggle expand/collapse
        if (hasChildren) {
            setExpanded(!expanded);
        }
    };

    return (
        <table className="tree-table">
            <tbody>
                {/* Row 1: The node itself */}
                <tr>
                    <td colSpan={childPositions.length} className="node-td">
                        <div className="node-cell-wrapper">
                            {/* UID Badge above the node */}
                            {isRoot && (
                                <div className="node-uid-badge">
                                    UID: {user.uid}
                                </div>
                            )}
                            
                            <div className="node-cell">
                                <div
                                    className={`node-card ${isRoot ? 'root-card' : ''} ${currentBranch ? `branch-${currentBranch.toLowerCase()}` : ''} ${hasChildren ? 'expandable' : ''}`}
                                    onClick={handleClick}
                                >
                                    <div className="node-icon-wrapper">
                                        <User size={24} className="node-icon" strokeWidth={1.5} />
                                    </div>
                                    <span className="node-username">{user.username}</span>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>

                        {hasChildren && expanded && (
                            <>
                                {/* Row 2: Rectilinear Connector */}
                                <tr className="connector-row">
                                    <td colSpan={childPositions.length} className="rectilinear-connector-cell">
                                        <svg className="rectilinear-svg" viewBox="0 0 300 100" preserveAspectRatio="none">
                                            {/* Vertical line from parent */}
                                            <path d="M 150 0 L 150 50" className="connector-path" />
                                            
                                            {/* Horizontal crossbar */}
                                            <path d="M 50 50 L 250 50" className="connector-path" />
                                            
                                            {/* Vertical lines to children */}
                                            <path d="M 50 50 L 50 100" className="connector-path" />
                                            <path d="M 150 50 L 150 100" className="connector-path" />
                                            <path d="M 250 50 L 250 100" className="connector-path" />
                                            
                                            {/* Anchor dots */}
                                            <circle cx="150" cy="0" r="3" className="connector-dot" />
                                            <circle cx="50" cy="100" r="3" className="connector-dot" />
                                            <circle cx="150" cy="100" r="3" className="connector-dot" />
                                            <circle cx="250" cy="100" r="3" className="connector-dot" />
                                        </svg>
                                    </td>
                                </tr>

                                {/* Row 3: Child nodes */}
                        <tr>
                            {childPositions.map((label) => {
                                const child = user.children
                                    ? user.children.find(c => c.position === label)
                                    : null;
                                return (
                                    <td key={label} className="child-td">
                                        <TreeNode
                                            user={child}
                                            position={label}
                                            onNodeClick={onNodeClick}
                                            onReset={onReset}
                                            onBack={onBack}
                                            canGoBack={canGoBack}
                                            depth={depth + 1}
                                            branch={currentBranch || label}
                                            parentUid={user.uid}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    </>
                )}
            </tbody>
        </table>
    );
};

export default TreeNode;
