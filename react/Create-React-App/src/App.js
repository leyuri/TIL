import React from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Card, Descriptions, Col, Row, Avatar  } from 'antd';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
      >
        <Menu.Item key="1"> 
        <Avatar src={require('./one.jpeg')} /> &nbsp; 
        YURI LEE 
        </Menu.Item>

      </Menu>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '55px 0' }}>
        <Breadcrumb.Item></Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      <Descriptions title="Hello 🧸">
        <Descriptions.Item label="UserName">yuri lee</Descriptions.Item>
        <Descriptions.Item label="Telephone">+82010 57200339</Descriptions.Item>
        <Descriptions.Item label="Live">Republic of Korea, Seoul</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
        Sangbongjungang-ro 8-gil, Jungnang-gu, Seoul, Republic of Korea
        </Descriptions.Item>
      </Descriptions>

      <br/>
      <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Q1. What is your favorite food?" bordered={false}>
        떡볶이
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Q2. What is your favorite color?" bordered={false}>
        Brown
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Q3. What is your best travel country?" bordered={false}>
          Turkey 
        </Card>
      </Col>
    </Row>
  </div>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>©2020 Created by yuri lee</Footer>
  </Layout>

  );
}

export default App;
 