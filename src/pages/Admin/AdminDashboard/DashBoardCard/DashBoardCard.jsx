import React from 'react'
import styles from './DashBoardCard.module.css'
import { CiEdit } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

export const DashBoardCard = ({Title, Contents}) => {
  
  const navigate = useNavigate();


  return (
    <div className={styles.DashBoardCard}>
      <h2>{Title}</h2>
      <div className={styles.Components}>

        {Contents?.map ((Content) => 
          <div onClick={() => {
            navigate(`${Content[2]}`);
          }} ><span>{Content[0]}</span><span> {Content[1]}</span></div>
        )}

      </div>

    </div>
  )
}
