import React, { useState } from 'react';

const TreeNode = ({ user, position, isRoot = false, onNodeClick, onReset, onBack, canGoBack, depth = 0, branch = null }) => {
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
                        <div className="node-cell">
                            <div
                                className={`node-circle ${isRoot ? 'root-circle' : ''} ${currentBranch ? `branch-${currentBranch.toLowerCase()}` : ''} ${hasChildren ? 'expandable' : ''}`}
                                onClick={handleClick}
                                title={hasChildren ? (expanded ? 'Click to collapse' : 'Click to expand') : ''}
                            >
                                <span className="node-username">{user.username}</span>
                            </div>
                            <div className="node-uid">{user.uid}</div>
                        </div>
                    </td>
                </tr>

                {hasChildren && expanded && (
                    <>
                        {/* Row 2: Converged SVG Connector (Vertical + Branches) */}
                        <tr className="connector-row">
                            <td colSpan={childPositions.length} className="radiating-connector-cell">
                                <svg className="radiating-svg" viewBox="0 0 300 100" preserveAspectRatio="none">
                                    {/* Vertical core line from parent down to the split point */}
                                    <line x1="150" y1="0" x2="150" y2="40" className="branch-line" />
                                    
                                    {/* Straight Line to A (Left) */}
                                    <line x1="150" y1="40" x2="50" y2="100" className="branch-line branch-a" />
                                    {/* Vertical Line to B (Middle) */}
                                    <line x1="150" y1="40" x2="150" y2="100" className="branch-line branch-b" />
                                    {/* Straight Line to C (Right) */}
                                    <line x1="150" y1="40" x2="250" y2="100" className="branch-line branch-c" />
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
