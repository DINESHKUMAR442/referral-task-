import React from 'react';

const TreeNode = ({ user, position, isRoot = false, onNodeClick, depth = 0, branch = null }) => {
    if (!user) {
        return (
            <div className={`node-placeholder ${branch ? `branch-${branch.toLowerCase()}` : position ? `pos-${position.toLowerCase()}` : ''}`}>
                <div className="node-circle-placeholder">
                    <span className="pos-text">{position}</span>
                </div>
            </div>
        );
    }

    // Determine branch (A, B, or C) for children to inherit
    const currentBranch = depth === 0 ? null : (depth === 1 ? position : branch);

    // Calculate label as per reference image
    // Level 0: ROOT
    // Level 1: A, B, or C
    // Level 2: A1, B1, C1 (under A), A2, B2, C2 (under B)...
    let displayLabel = '';
    if (isRoot) {
        displayLabel = 'ROOT';
    } else if (depth === 1) {
        displayLabel = position;
    } else if (depth === 2) {
        const branchNum = branch === 'A' ? '1' : branch === 'B' ? '2' : '3';
        displayLabel = `${position}${branchNum}`;
    } else {
        displayLabel = position;
    }

    return (
        <div className={`tree-node ${isRoot ? 'root-node' : ''} ${currentBranch ? `branch-${currentBranch.toLowerCase()}` : ''} pos-${position?.toLowerCase()}`}>
            <div className="node-bubble-wrapper">
                <div className="node-circle" onClick={() => !isRoot && onNodeClick(user.uid)}>
                    <span className="pos-text">{user.username}</span>
                </div>
                <div className="node-uid">{user.uid}</div>
                {!isRoot && <div className="node-hint">Click to expand</div>}
            </div>

            {depth < 2 && (
                <div className="children-container">
                    <div className="connector-vertical"></div>
                    <div className="children-grid">
                        {['A', 'B', 'C'].map((label) => {
                            const child = user.children
                                ? user.children.find(c => c.position === label)
                                : null;
                            return (
                                <TreeNode
                                    key={label}
                                    user={child}
                                    position={label}
                                    onNodeClick={onNodeClick}
                                    depth={depth + 1}
                                    branch={currentBranch}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TreeNode;
