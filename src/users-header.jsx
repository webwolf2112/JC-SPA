import React from 'react';

const UsersHeader = ({handleCreateUser, count}) => {
    return (
        <>
            <h1>Total Users: {count}</h1>
            <button onClick={handleCreateUser}>Create New User</button>
        </>
    )
};

export default UsersHeader; 