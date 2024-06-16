import React, { useState, useEffect } from 'react';
// Import CSS
import './App.css';
import './assets/css/Layanan.css';
import './assets/css/Kategori.css';
import './assets/css/Pelanggan.css';
import './assets/css/Projek.css';
import './assets/css/Request.css';
import './assets/css/Transaksi.css';
import './assets/css/Kwitansi.css';
import './assets/css/print.css';
import './assets/css/landscape.css';
// Import CSS
import './assets/css/BesiBending.css';
import { Layout, Button, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Logo from './components/Logo';
import MenuList from './components/MenuList';
import ToggleThemeButton from './components/ToggleThemeButton';
import Dashboard from './pages/Dashboard';
import Layanan from './pages/Layanan';
import Kategori from './pages/Kategori';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pelanggan from './pages/Pelanggan';
import Projek from './pages/Projek';
import Request from './pages/Request';
import Transaksi from './pages/Transaksi';
import Kwitansi from './pages/Kwitansi';
import BesiBending from './pages/pengujian/BesiBending';
import BesiBendingHasil from './pages/pengujian/BesiBendingHasil';
import PDFViewer from './pages/pdf/PDFViewer';
// import BesiBendingPDF from './pages/pdf/BesiBendingPDF';


// dummy data
import Siswa from './assets/dummy_data/Siswa.jsx';

const { Header, Sider, Content } = Layout;

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Define mobile width threshold

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Update isMobile state based on window width
    };

    window.addEventListener('resize', handleResize); // Listen for window resize event

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener on component unmount
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true); // Automatically collapse sidebar on mobile
    }
  }, [isMobile]);

  const { token } = theme.useToken();
  const { colorBgContainer } = token;

  return (
    <BrowserRouter>
      <Layout>
        <Sider
          theme={darkTheme ? 'dark' : 'light'}
          className='sidebar'
          collapsed={collapsed}
          collapsible
          trigger={null} // Remove default trigger button
          breakpoint="md"
          onBreakpoint={(broken) => setIsMobile(broken)} // Update isMobile state on breakpoint change
        >
          <Logo />
          <MenuList darkTheme={darkTheme} />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Sider>
        <Layout>
          <Header className='header' style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type='text'
              className='toggle'
              onClick={toggleCollapse}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: colorBgContainer }}>
            <Routes>
              {/* Master */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path='/layanan' element={<Layanan />} />
              <Route
                path="/layanan/:serviceId/kategori"
                element={<Kategori />}
              />
              <Route path="/kategori/list" element={<Kategori />} />
              <Route path='/pelanggan' element={<Pelanggan />} />
              <Route path='/projek' element={<Projek />} />
              {/* Master */}

              {/* Pengujian */}
              <Route path='/besi-bending' element={<BesiBending />} />
              <Route path='/besi-bending-hasil' element={<BesiBendingHasil />} />
              {/* Pengujian */}

              {/* PDF */}
              {/* <Route path='/besi-bending-pdf' element={<BesiBendingPDF />} /> */}
              {/* PDF */}

              {/* Transaksi */}
              <Route path='/request' element={<Request />} />
              <Route path='/transaksi' element={<Transaksi />} />
              <Route path='/kwitansi' element={<Kwitansi />} />
              {/* Transaksi */}

              <Route path='/pdf' element={<PDFViewer />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
      
    </BrowserRouter>
  );
}

export default App;