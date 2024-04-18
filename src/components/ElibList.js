import React from 'react'
import { Link } from 'react-router-dom';
import { List, Row, Typography, FloatButton } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

export default function ElibList(data) {

    return (
        <div
            style={{
                textAlign: 'center',
                padding: '0 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <List
                style={{
                    width: '100%',
                    maxWidth: '972px',
                    marginBottom: '24px'
                }}
                grid={{
                    column: 1,
                    xs: 1, sm: 1,
                    md: 2, lg: 2, xl: 2, xxl: 2,
                }}
                pagination={{
                    defaultPageSize: 10,
                    defaultCurrent: 1,
                    showSizeChanger: true,
                    align: 'center',
                }}
                dataSource={data?.data?.datas}
                renderItem={(item) => (
                    <List.Item
                        key={item.elibId}
                        style={{
                            width: '100%',
                            maxWidth: '972px',
                            borderBottom: '1px solid #d8dfe6',
                        }}
                    >
                        <List.Item.Meta
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                margin: '5px',
                            }}
                            description={
                                <div style={{ marginBottom: '16px' }}>
                                    <Row >
                                        <Link to={`${item.elibUrl}`} target="_blank" rel="noopener noreferrer" title="도서관으로 이동" >
                                            <Title level={5} ellipsis={true} style={{ marginRight: '20px', marginTop: '4px', }}>
                                                {item.elibName}
                                            </Title>
                                        </Link>
                                    </Row>
                                    <Row >
                                        <Text ellipsis={true} style={{ marginRight: '20px' }}>
                                            소장 권수 : 총 {item.elibEbookCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}권 보유 
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Text ellipsis={true} style={{ marginRight: '20px' }}>
                                            분류 : {item.elibClass}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Link to={`/ebooks?elibNum=${item.elibId}`}>
                                            <Text ellipsis={true} style={{ marginRight: '10px' }}>
                                                보유 전자책 보러가기
                                            </Text>
                                            <RightOutlined style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.88)', marginRight: '20px'}}/>
                                        </Link>
                                    </Row>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
            <FloatButton.BackTop shape="circle" tooltip={<div>맨 위로</div>} />
        </div>
    )
}
