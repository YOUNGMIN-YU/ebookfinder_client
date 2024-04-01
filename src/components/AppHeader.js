import React, { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import HeaderLogo from '../assets/HeaderLogo.png'
import useSnackbar from '../hooks/useSnackbar';
import { useBookStoreActions } from "../store/useBookStore";
import { Input, Col, Row, Image, Drawer, Button, Typography } from 'antd';
import { AlignRightOutlined, CloseCircleFilled } from '@ant-design/icons';
import styled from "styled-components";

const { Search } = Input;
const { Text } = Typography;

export default function AppHeader() {
    const { setSearchKeyword, setSearchElibKeyword } = useBookStoreActions();
    const [showSnackbar, SnackbarComponent] = useSnackbar();
    const [tempKeyword, setTempKeyword] = useState('');
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [showSuffix, setShowSuffix] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const inputElement = document.getElementById('searchInput');


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

        if (location.pathname === '/ebooks') {
            setSearchKeyword(tempKeyword);
            setSearchEbookKeywordParams(tempKeyword);
        }

        if (location.pathname === '/elibs') {
            setSearchElibKeyword(tempKeyword);
            setSearchElibKeywordParams(tempKeyword);
        }
        setIsSearchLoading(false);
        handleSuffixClick();
        inputElement.blur()
    };

    const setSearchEbookKeywordParams = (tempKeyword) => {
        searchParams.set('searchEbookKeyword', tempKeyword);
        setSearchParams(searchParams);
    };

    const setSearchElibKeywordParams = (tempKeyword) => {
        searchParams.set('searchElibKeyword', tempKeyword);
        setSearchParams(searchParams);
    };

    const handleOnChange = (value) => {
        setTempKeyword(value);
        setShowSuffix(value !== ''); // input 값이 비어있지 않으면 suffix를 보여줌
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
                        id="searchInput"
                        placeholder={location.pathname === '/ebooks' ? "제목 또는 저자를 입력해주세요" : "도서관 이름을 입력해주세요"}
                        size="large"
                        value={tempKeyword}
                        loading={isSearchLoading}
                        onSearch={handleSearch}
                        onChange={(e) => handleOnChange(e.target.value)}
                        suffix={<SuffixIcon $showSuffix={showSuffix} onClick={handleSuffixClick} />}
                    />
                </Col>
            </Row>
            <Row justify="space-evenly" align="middle" wrap={false}style={{ width: '100%', maxWidth: '972px', maxHeight: '40px', textAlign: 'center', }}>
                <Col
                    span={8}
                    style={{
                        lineHeight: '40px',
                        borderBottom: location.pathname === '/ebooks' ? '3px solid #3e3e3e' : 'none',
                    }}
                >
                    <Link to={'/ebooks'}>
                        <Text
                            style={{
                                color: location.pathname === '/ebooks' ? '#3e3e3e' : '#777',
                                fontSize: '16px',
                            }}
                        >전자책 검색
                        </Text>
                    </Link>
                </Col>
                <Col span={8}
                    style={{
                        lineHeight: '40px',
                        borderBottom: location.pathname === '/elibs' ? '3px solid #3e3e3e' : 'none',
                    }}
                >
                    <Link to={'/elibs'}>
                        <Text
                            style={{
                                color: location.pathname === '/elibs' ? '#3e3e3e' : '#777',
                                fontSize: '16px',
                            }}
                        >전자도서관 목록
                        </Text>
                    </Link>
                </Col>
                <Col span={8}
                    style={{
                        lineHeight: '40px',
                        borderBottom: location.pathname === '/elibs/settings' ? '3px solid #3e3e3e' : 'none',
                    }}
                >
                    <Link to={'/elibs/settings'}>
                        <Text
                            style={{
                                color: location.pathname === '/elibs/settings' ? '#3e3e3e' : '#777',
                                fontSize: '16px',
                            }}
                        >전자도서관 설정
                        </Text>
                    </Link>
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
    max-width: 992px;
    height: 130px;
    padding: 2.5px 10px;
    border-bottom: 1px solid #d8dfe6;
`

const SuffixIcon = styled(CloseCircleFilled)`
    position: absolute;
    top: 50%;
    right: 10px;
    color: rgba(0, 0, 0, .25);
    opacity: ${props => props.$showSuffix ? 1 : 0};
    transition: opacity 0.3s ease-in-out;
    transform: translateY(-50%);
    pointer-events: ${props => props.$showSuffix ? 'unset' : 'none'};
    z-index: 1;
`;