import React from 'react';
import { Menu } from 'antd';
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
import { Link } from 'react-router-dom';


const MenuList = ({ darkTheme }) => {
  return (
    <Menu theme={darkTheme ? 'dark' : 'light'} mode='inline' className='menu-bar'>
      <Menu.Item key='/dashboard' icon={<DashboardOutlined />}>
        <Link to='/dashboard'>Dashboard</Link>
      </Menu.Item>

      <Menu.SubMenu key='sub_data_master' icon={<DatabaseOutlined />} title='Master'>
        <Menu.Item key='/layanan' icon={<AppstoreOutlined />}>
          <Link to='/layanan'>Layanan</Link>
        </Menu.Item>
        <Menu.Item key='/kategori' icon={<ApartmentOutlined />}>
          <Link to='/kategori/list'>Kategori</Link>
        </Menu.Item>
        <Menu.Item key='pelanggan' icon={<UserOutlined />}>
        <Link to='/pelanggan'>Pelanggan</Link>
        </Menu.Item>
        <Menu.Item key='projek' icon={<ProjectOutlined />}>
        <Link to='/projek'>Projek</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key='sub_data_pengujian' icon={<ExperimentOutlined />} title='Pengujian'>
        <Menu.Item key='besi_bending' icon={<FileSearchOutlined />}>
          <Link to='/besi-bending'>Besi Bending</Link>
        </Menu.Item>
        <Menu.Item key='beton' icon={<FileSearchOutlined />}>Beton</Menu.Item>
        <Menu.Item key='lainnya-1' icon={<FileSearchOutlined />}>Lainnya 1</Menu.Item>
        <Menu.Item key='lainnya-2' icon={<FileSearchOutlined />}>Lainnya 2</Menu.Item>
        <Menu.Item key='lainnya-3' icon={<FileSearchOutlined />}>Lainnya 3</Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key='sub_data_transaksi' icon={<ToolOutlined />} title='Transaksi'>
        <Menu.Item key='permintaan' icon={<ShoppingCartOutlined />}>
          <Link to='/request'>Permintaan</Link>
        </Menu.Item>
        <Menu.Item key='kwitansi' icon={<ShoppingCartOutlined />}>
          <Link to='/kwitansi'>Kwitansi</Link>
        </Menu.Item>
      </Menu.SubMenu>

      {/* <Menu.SubMenu key='transaksi' icon={<ShoppingCartOutlined />}>
        Transaksi
      </Menu.SubMenu > */}

      <Menu.Item key='pengaturan' icon={<SettingOutlined />}>
        Pengaturan
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
