import React from 'react';
import { Col, Row, Skeleton } from 'antd';

const CustomSkeletonComponent = () => {
    const isMobileView = window.innerWidth < 768;
    const isTabletView = window.innerWidth >= 768;

    return (
        <div style={{ width: '100%', maxWidth: '972px' }}>
            {isMobileView && (
                <div className='mobileView'>
                    <Col style={{ display: 'flex' }}>
                        <Skeleton.Image active size='large' style={{ marginTop: '25px', marginBottom: '25px', marginLeft: '5px', marginRight: '15px' }} />
                        <Skeleton active size='large' title={{ width: "50%" }} paragraph={{ rows: 2, width: ["60%", "70%"] }} style={{ marginTop: '15px' }} />
                    </Col>
                </div>
            )}
            {isTabletView && (
                <div className='tabletView'>
                    <Row>
                        <Col span={12} style={{ display: 'flex' }} >
                            <Skeleton.Image active size='large' style={{ marginTop: '25px', marginBottom: '25px', marginRight: '15px' }} />
                            <Skeleton active size='large' title={{ width: "50%" }} paragraph={{ rows: 2, width: ["60%", "70%"] }} style={{ marginTop: '15px' }} />
                        </Col>
                        <Col span={12} style={{ display: 'flex' }} >
                            <Skeleton.Image active size='large' style={{ marginTop: '25px', marginBottom: '25px', marginRight: '15px' }} />
                            <Skeleton active size='large' title={{ width: "50%" }} paragraph={{ rows: 2, width: ["60%", "70%"] }} style={{ marginTop: '15px' }} />
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default CustomSkeletonComponent;
