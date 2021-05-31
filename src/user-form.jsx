import React from 'react';

const UserForm = ( {onSubmit, currentUser, cancel} ) => {
    const {firstname, lastname, email } = currentUser;

    console.log( firstname, lastname, email );
    return (
        <>
        <form  onSubmit={onSubmit}>
            <label htmlFor="fname">First Name:</label>
            <input id="fname" type="text" value={firstname} />

            <label htmlFor="lname">Last Name:</label>
            <input id="lname" type="text" value={lastname} />

            <label htmlFor="email">Email:</label>
            <input id="email" type="text" value={email} />

            <button type="submit">Create/Update User</button>
        </form>
        <button onClick={cancel}>Cancel</button>
        </>
    )
};

export default UserForm;