import React from 'react';
import styles from './users-header.module.css';

const UsersHeader = ({handleCreateUser, count}) => {
    return (
        <>
            <h1>Total Users: {count}</h1>
            <button onClick={handleCreateUser} className={styles.create}>Create New User</button>
        </>
    )
};

export default UsersHeader; 