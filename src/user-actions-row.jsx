import React from 'react';

const UserActionsRow = ({createUser}) => {
    return (
        <button onClick={createUser}>Create New User</button>
    )
};

export default UserActionsRow; 