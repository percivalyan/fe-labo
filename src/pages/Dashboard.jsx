import React from 'react';
import { Row, Col, Card } from 'antd';
import {
  DashboardOutlined,
  ToolOutlined,
  DatabaseOutlined,
  CreditCardOutlined,
  SettingOutlined,
  BarsOutlined,
  UserOutlined,
  ProjectOutlined,
  ExperimentOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  FileSearchOutlined
} from '@ant-design/icons';

const Dashboard = ({ darkTheme }) => {
  // Define feature items with their respective icons and titles
  const featureItems = [
    { icon: <DashboardOutlined />, title: 'Dashboard', color: '#1890ff' },
    { icon: <ToolOutlined />, title: 'Layanan', color: '#36cfc9' },
    { icon: <DatabaseOutlined />, title: 'Master', color: '#ff7a45' },
    { icon: <ExperimentOutlined />, title: 'Pengujian', color: '#73d13d' },
    { icon: <ShoppingCartOutlined />, title: 'Transaksi', color: '#eb2f96' },
    { icon: <SettingOutlined />, title: 'Pengaturan', color: '#722ed1' }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {featureItems.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{ background: item.color }}
              hoverable
              cover={<div style={{ textAlign: 'center', fontSize: '48px', margin: '20px 0' }}>{item.icon}</div>}
            >
              <Card.Meta title={item.title} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
