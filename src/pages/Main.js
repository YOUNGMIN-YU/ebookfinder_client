import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MainText from '../assets/MainText.png';
import HeaderLogo from '../assets/HeaderLogo.png';
import { useBookStoreActions } from "../store/useBookStore";
import { Tour, Button } from 'antd';
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
        <div className={styles.buttonLayout}>
          <div className={styles.fadeinTour}>
            <Button type="primary" onClick={handleBeginTour}>
              처음 방문 했어요
            </Button>
          </div>
          <div className={styles.fadeinSearch}>
            <Button type="secondary" onClick={() => navigate('/ebooks')}>
              바로 검색 할래요
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
