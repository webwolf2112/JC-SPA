import React from 'react';
import styles from './error-modal.module.css';

const ErrorModal = ( { errorMessage, dismissError } ) => {
    //close the modal after 2 seconds
    setTimeout(() => {
        dismissError();
      }, 1000);

    return (
        <div className={styles.modal}> {errorMessage} </div>
    )

};

export default ErrorModal;
