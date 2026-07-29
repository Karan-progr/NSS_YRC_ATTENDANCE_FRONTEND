import React from 'react'
import styles from './Login.module.css'
import API_URL from '../../config';


const Login = () => {


    const login = () => {
        window.location.href =
            `${API_URL}/auth/microsoft`;
    };


  return (
    <div className={styles.Login}>
        <div className={styles.Header}>
            <img src="banner.png" alt="Shiv Nadar University Chennai" />
        </div>
        <div className={styles.Box}>
            <div className={styles.InputGroup}>
                <h1>Email</h1>
                <input />
            </div>
            <div className={styles.InputGroup}>
                <h1>Password</h1>
                <input />
            </div>
            <h1 className={styles.Or}>or</h1>
            <h1 className={styles.Microsoft} onClick={()=>{
                login();
            }}>Continue With Microsoft <img src='microsoft.png' alt="Logo"></img></h1>
        </div>
    </div>
  )
}

export default Login