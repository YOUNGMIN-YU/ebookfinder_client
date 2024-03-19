import React from 'react'
import fallBack from '../assets/fallback.png';
import CustomSkeleton from './CustomSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider, List, Typography, Row, Collapse, Image, } from 'antd';

const { Text, Title } = Typography;

export default function BookList({ data, fetchNextPage, hasNextPage, }) {
    const bookData = data;

    return (
        <InfiniteScroll
            dataLength={bookData?.pages?.length ?? 20}
            next={fetchNextPage}
            hasMore={hasNextPage}
            scrollThreshold={0.9}
            loader={<CustomSkeleton />}
            endMessage={<Divider plain style={{ marginBottom: '32px'}}>더이상 찾을 수 있는 전자책이 없어요. 🤐</Divider>}
            style={{
                padding: '0 10px',
            }}
        >
            <List
                style={{
                    width: '100%',
                    maxWidth: 972,
                }}
                grid={{
                    column: 1,
                    xs: 1, sm: 1,
                    md: 2, lg: 2, xl: 2, xxl: 2,
                }}
                dataSource={bookData?.pages}
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
                                        objectFit: 'cover', // 이미지가 부모 요소에 맞게 비율 유지
                                        width: '120px',
                                        height: 'auto',
                                        filter: 'drop-shadow(5px 5px 5px black)',
                                        borderRadius: '5%',
                                    }}
                                />
                            }
                            description={
                                <>
                                    <Row >
                                        <Title level={5} ellipsis={true} style={{ marginRight: '20px', marginTop: '8px', }}>
                                            {item.ebookTitle}
                                        </Title>
                                    </Row>
                                    <Row >
                                        <Text ellipsis={true} style={{ marginRight: '20px' }}>
                                            저자: {item.ebookAuthor}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Text ellipsis={true} style={{ marginRight: '20px' }}>
                                            출판: {item.ebookPublisher}
                                        </Text>
                                    </Row>
                                    <Row >
                                        <Text ellipsis={true} style={{ marginRight: '20px' }}>
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
                                        items={[{ key: `${item.ebookBarcode}`, label: <Text ellipsis={true} >보유 전자도서관 보기</Text>, children: <p>{item.ebookElibId}</p> }]}
                                    />
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        </InfiniteScroll>
    )
}
