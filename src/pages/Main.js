import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainText from '../assets/MainText.png';
import HeaderLogo from '../assets/HeaderLogo.png';
import { useBookStoreActions } from "../store/useBookStore";
import styles from '../styles/main.module.css';

export default function Main() {
  const navigate = useNavigate();
  const { setTourOpen } = useBookStoreActions();

  const handleBeginTour = () => {
    navigate('/ebooks');
    setTourOpen(true);
  };

  return (
    <>
      <div className={styles.layout}>
        <div>
          <img className={styles.fadeinHeader} src={HeaderLogo} />
        </div>
        <div>
          <img className={styles.fadeinMain} src={MainText} />
        </div>
        <div className={styles.fadeinButtonTour} onClick={handleBeginTour}>
          <span><b>처음</b> 방문 했어요</span>
        </div>
        <div className={styles.fadeinButtonSearch} onClick={() => navigate("/ebooks")}>
          <span>바로 <b>검색</b> 할래요</span>
        </div>
      </div>
    </>
  );
}
