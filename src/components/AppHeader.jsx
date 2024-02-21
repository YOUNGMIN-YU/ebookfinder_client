import React, { useState } from "react";
import Logo from '../assets/Logo.png';
import styles from '../styles/appheader.module.css';
import useSnackbar from '../hooks/useSnackbar';
import { Box, ThemeProvider, Grid } from '@mui/material';
import { Input, ConfigProvider } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const { Search } = Input;

const defaultTheme = createTheme({
    typography: {
        fontFamily: 'Dovemayo_gothic',
    },
});

export default function AppHeader() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showSnackbar, SnackbarComponent] = useSnackbar();
    const [searching, setSearching] = useState(false);

    const handleSearch = (value) => {
        console.log("----------handleSearch 함수 호출------------")
        if (value.length < 2) {
            showSnackbar('최소 2글자 이상의 검색어를 입력하세요.', 'error');
            return;
        }

        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);

        if (hasSpecialChar) {
            showSnackbar('특수문자는 사용할 수 없습니다.', 'error');
            return;
        }

        const sanitizedTerm = value.replace(/[^a-zA-Z0-9가-힣\s]/g, '');

        if (sanitizedTerm.trim().length < 2) {
            showSnackbar('최소 2글자 이상의 검색어를 입력하세요.', 'error');
            return;
        }

        setSearching(true);

        // TODO: API 생성 후 검색어 호출 로직 구현
        setTimeout(() => {
            setSearching(false);
        }, 2000);
    };

    const handleClear = (e) => {
        setSearchTerm("");
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Dovemayo_gothic',
                },
            }}
        >
            <ThemeProvider theme={defaultTheme}>
                <Box className={styles.AppHeader} sx={{}} >
                    <Grid className={styles.Grid} >
                        <Grid item xs={2} className={styles.Logo}>
                            <Link to="/">
                                <img src={Logo} alt="로고" className={styles.LogoImage} />
                            </Link>
                        </Grid>
                        <Grid item xs={10} className={styles.SearchArea} >
                            <Search
                                placeholder="검색어를 입력해주세요"
                                size="large"
                                value={searchTerm}
                                loading={searching}
                                onSearch={handleSearch}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                suffix={
                                    <CloseCircleFilled onClick={handleClear} style={{ color: 'rgba(0,0,0,.45)' }} />
                                }
                            />
                        </Grid>
                        <SnackbarComponent />
                    </Grid>
                </Box>
            </ThemeProvider>
        </ConfigProvider>
    );
}