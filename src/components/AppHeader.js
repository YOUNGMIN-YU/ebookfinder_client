import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderLogo from '../assets/HeaderLogo.png'
import useSnackbar from '../hooks/useSnackbar';
import { useBookStoreActions } from "../store/useBookStore";
import { Input, Col, Row, Image, Drawer, Button, Typography } from 'antd';
import { AlignRightOutlined, CloseCircleFilled } from '@ant-design/icons';
import styles from '../styles/appheader.module.css'
import styled from "styled-components";

const { Search } = Input;
const { Text } = Typography;

export default function AppHeader() {
    const { setSearchKeyword } = useBookStoreActions();
    const [showSnackbar, SnackbarComponent] = useSnackbar();
    const [tempKeyword, setTempKeyword] = useState('');
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [showSuffix, setShowSuffix] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const handleSearch = (tempKeyword) => {
        //FIXME: 스낵바 노출 후 지속적인 유저의 타이핑 시 스낵바 재노출 이슈
        setIsSearchLoading(true);

        if (tempKeyword.length < 2) {
            showSnackbar('최소 2글자 이상의 검색어를 입력하세요.', 'error');
            setIsSearchLoading(false);
            return;
        }

        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(tempKeyword);

        if (hasSpecialChar) {
            showSnackbar('특수문자는 사용할 수 없습니다.', 'error');
            setIsSearchLoading(false);
            return;
        }

        const sanitizedTerm = tempKeyword.replace(/[^a-zA-Z0-9가-힣\s]/g, '');

        if (sanitizedTerm.trim().length < 2) {
            showSnackbar('최소 2글자 이상의 검색어를 입력하세요.', 'error');
            setIsSearchLoading(false);
            return;
        }

        setSearchKeyword(tempKeyword);
        setIsSearchLoading(false);
    };

    const handleOnChange = (e) => {
        setTempKeyword(e);
        setShowSuffix(e !== ''); // input 값이 비어있지 않으면 suffix를 보여줌
    }

    const handleSuffixClick = () => {
        setTempKeyword('');
        setShowSuffix(false); // input 값이 지워질 때 suffix를 숨김
    };

    return (
        <HeadrowWrapper >
            <Row justify="space-between" align="middle" wrap={false} style={{ width: '100%', maxWidth: '972px', maxHeight: '50px' }}>
                <Col >
                    <Link to="/">
                        <Image
                            src={HeaderLogo}
                            alt="ebookfinder"
                            preview={false}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                width: '100px',
                                height: 'auto',
                            }}
                        />
                    </Link>
                </Col>
                <Col>
                    <Button type="secondary" icon={<AlignRightOutlined style={{ fontSize: '24px' }} />} onClick={showDrawer} />
                    <Drawer onClose={onClose} open={open} style={{ maxHeight: '100dvh' }}>
                        <Text strong>로그인/회원가입</Text>
                    </Drawer>
                </Col>
            </Row>
            <Row justify="center" align="middle" wrap={false} style={{ width: '100%', maxWidth: '972px', maxHeight: '50px', }}>
                <Col flex="auto" style={{ display: 'flex', alignItems: 'center', }}>
                    <Search
                        placeholder="검색어를 입력해주세요"
                        size="large"
                        value={tempKeyword}
                        loading={isSearchLoading}
                        onSearch={handleSearch}
                        onChange={(e) => handleOnChange(e.target.value)}
                        suffix={
                            <CloseCircleFilled
                                className={styles.suffix}
                                onClick={handleSuffixClick}
                                data-isshow={showSuffix}
                            />
                        }
                    />
                </Col>
            </Row>
            <Row justify="space-evenly" align="middle" wrap={false} style={{ width: '100%', maxWidth: '972px', maxHeight: '40px', textAlign: 'center', }}>
                <Col span={8} style={{ lineHeight: '40px' }}>
                    <Link to={'/ebooks'}><Text style={{ color: '#777', fontSize: '16px', }}>전자책 검색</Text></Link>
                </Col>
                <Col span={8} style={{ lineHeight: '40px' }}>
                    <Link to={'/elibs'}><Text style={{ color: '#777', fontSize: '16px', }}>전자도서관 목록</Text></Link>
                </Col>
                <Col span={8} style={{ lineHeight: '40px' }}>
                    <Link to={'/elibs/settings'}><Text style={{ color: '#777', fontSize: '16px', }}>전자도서관 설정</Text></Link>
                </Col>
            </Row>
            <SnackbarComponent />
        </HeadrowWrapper>
    )
}

const HeadrowWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100dvw;
    max-width: 972px;
    height: 130px;
    padding: 2.5px 10px;
    border-bottom: 1px solid #d8dfe6;
`
