import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import fallBack from '../assets/fallback.png';
import CustomSkeleton from './CustomSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider, List, Typography, Row, Col, Collapse, Image, FloatButton, Spin } from 'antd';
import { useEbookSortBy, useSearchedBooks } from '../store/useBookStore';

const { Text, Title } = Typography;

export default function BookList({ data, fetchNextPage, hasNextPage, }) {
    const { status : searchedBooksStatus } = useSearchedBooks();
    const [ellipsis] = useState(true);
    const ebookSortBy = useEbookSortBy();

    const sortData = (data, ebookSortBy) => {
        const pages = data?.pages;
        if (Array.isArray(pages)) {
            if (ebookSortBy === 'ebookDate') {
                pages.sort((a, b) => {
                    const dateA = new Date(...a.ebookDate);
                    const dateB = new Date(...b.ebookDate);
                    return dateB - dateA;
                });

                return pages;

            } else if (ebookSortBy === 'ebookTitle') {
                pages.sort((a, b) => (a.ebookTitle.localeCompare(b.ebookTitle)));

                return pages;

            }
        }
    };

    const renderElibs = (bookItems) => {
        const elibNameArray = bookItems.elibName;
        const elibUrlArray = bookItems.elibUrl;
        const ebookPlacedEnumArray = bookItems.ebookPlacedEnum;

        return elibNameArray.map((item, index) => (
            <Row key={index}>
                <Col span={16}>
                    <Link to={elibUrlArray[index]} target="_blank" rel="noopener noreferrer" title="도서관으로 이동">
                        <Text>{elibNameArray[index]}</Text>
                    </Link>
                </Col>
                <Col span={2}>
                    <Divider type='vertical' style={{ height: '2em' }} />
                </Col>
                <Col span={6}>
                    <Link to={elibUrlArray[index]} target="_blank" rel="noopener noreferrer" title="도서관으로 이동">
                        <Text>{ebookPlacedEnumArray[index]}</Text>
                    </Link>
                </Col>
                {index + 1 === elibNameArray.length ? null : <Divider style={{ margin: '6px 0' }} />}
            </Row>
        ));
    };

    const bookData = sortData(data, ebookSortBy);

    return (
        <InfiniteScroll
            dataLength={bookData?.length ?? 20}
            next={fetchNextPage}
            hasMore={hasNextPage}
            scrollThreshold={0.9}
            loader={<CustomSkeleton />}
            endMessage={searchedBooksStatus !== 'success' ? <Spin size='large' fullscreen /> : <Divider plain style={{ marginBottom: '32px' }}>더이상 찾을 수 있는 전자책이 없어요. 🤐</Divider>}
            style={{
                padding: '0 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <List
                style={{
                    width: '100%',
                    maxWidth: '972px',
                }}
                grid={{
                    column: 1,
                    xs: 1, sm: 1,
                    md: 2, lg: 2, xl: 2, xxl: 2,
                }}
                dataSource={bookData}
                renderItem={(item) => (
                    <List.Item
                        key={item.ebookBarcode}
                        style={{
                            width: '100%',
                            maxWidth: 972,
                        }}
                    >
                        <List.Item.Meta
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                margin: '5px 0',
                            }}
                            avatar={
                                <Image
                                    src={item.ebookCover}
                                    alt={item.ebookTitle}
                                    preview={false}
                                    fallback={fallBack}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        width: '120px',
                                        height: 'auto',
                                        boxShadow: '5px 5px 10px black',
                                        borderRadius: '5%',
                                    }}
                                />
                            }
                            description={
                                <>
                                    <Row >
                                        <Title level={5}
                                            ellipsis={
                                                ellipsis ? { tooltip: `${item.ebookTitle}` } : false
                                            }
                                            style={{ marginRight: '20px', marginTop: '8px' }}
                                        >
                                            {item.ebookTitle}
                                        </Title>
                                    </Row>
                                    <Row >
                                        <Text
                                            ellipsis={
                                                ellipsis ? { tooltip: `${item.ebookAuthor}` } : false
                                            }
                                            style={{ marginRight: '20px' }}
                                        >
                                            저자: {item.ebookAuthor}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Text
                                            ellipsis={
                                                ellipsis ? { tooltip: `${item.ebookPublisher}` } : false
                                            }
                                            style={{ marginRight: '20px' }}
                                        >
                                            출판: {item.ebookPublisher}
                                        </Text>
                                    </Row>
                                    <Row >
                                        <Text
                                            ellipsis={
                                                ellipsis ? { tooltip: `${item.ebookDate[0]}년 ${item.ebookDate[1]}월 ${item.ebookDate[2]}일` } : false
                                            }
                                            style={{ marginRight: '20px' }}
                                        >
                                            출간: {item.ebookDate[0]}년 {item.ebookDate[1]}월 {item.ebookDate[2]}일
                                        </Text>
                                    </Row>
                                    <Collapse
                                        expandIconPosition={'end'}
                                        bordered={true}
                                        style={{
                                            background: 'white',
                                            marginTop: '15px',
                                            marginRight: '30px',
                                        }}
                                        items={[{
                                            key: `${item.ebookBarcode}`,
                                            label: <Text >보유 도서관 확인 및 이동</Text>,
                                            children: renderElibs(item)
                                        }]}
                                    />
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
            <FloatButton.BackTop shape="circle" tooltip={<div>맨 위로</div>} />
        </InfiniteScroll>
    )
}
