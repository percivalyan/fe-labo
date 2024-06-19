import {
  ApartmentOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
  FileSearchOutlined,
  ProjectOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

import { Link } from "react-router-dom";

const MenuList = ({ darkTheme }) => {
  const [openKeys, setOpenKeys] = useState([]);
  const onOpenChange = (keys) => {
    setOpenKeys(keys.length === 0 ? [] : [keys[keys.length - 1]]);
  };
  const items = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "sub_data_master",
      icon: <DatabaseOutlined />,
      label: "Master",
      children: [
        {
          key: "2",
          icon: <AppstoreOutlined />,
          label: <Link to="/layanan">Layanan</Link>,
        },
        {
          key: "3",
          icon: <ApartmentOutlined />,
          label: <Link to="/kategori/list">Kategori</Link>,
        },
        {
          key: "4",
          icon: <UserOutlined />,
          label: <Link to="/pelanggan">Pelanggan</Link>,
        },
        {
          key: "5",
          icon: <ProjectOutlined />,
          label: <Link to="/projek">Projek</Link>,
        },
      ],
    },
    {
      key: "sub_data_pengujian",
      icon: <ExperimentOutlined />,
      label: "Pengujian",
      children: [
        {
          key: "6",
          icon: <FileSearchOutlined />,
          label: <Link to="/besi-bending">Besi Bending</Link>,
        },
        {
          key: "beton",
          icon: <FileSearchOutlined />,
          label: "Beton",
        },
        {
          key: "lainnya-1",
          icon: <FileSearchOutlined />,
          label: "Lainnya 1",
        },
        {
          key: "lainnya-2",
          icon: <FileSearchOutlined />,
          label: "Lainnya 2",
        },
        {
          key: "lainnya-3",
          icon: <FileSearchOutlined />,
          label: "Lainnya 3",
        },
      ],
    },
    {
      key: "sub_data_transaksi",
      icon: <ToolOutlined />,
      label: "Transaksi",
      children: [
        {
          key: "7",
          icon: <ShoppingCartOutlined />,
          label: <Link to="/request">Permintaan</Link>,
        },
        {
          key: "8",
          icon: <ShoppingCartOutlined />,
          label: <Link to="/kwitansi">Kwitansi</Link>,
        },
      ],
    },
    {
      key: "pengaturan",
      icon: <SettingOutlined />,
      label: "Pengaturan",
    },
  ];

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu-bar"
      items={items}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    />
  );
};

MenuList.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
};

export default MenuList;
