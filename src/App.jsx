import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logo from "./components/Logo";
import MenuList from "./components/MenuList";
import ToggleThemeButton from "./components/ToggleThemeButton";

// Import CSS
import "./App.css";

import "./assets/css/Kwitansi.css";

import "./assets/css/Master.css";

import "./assets/css/BesiBending.css";
import "./assets/css/KwitansiBesi.css";
import "./assets/css/Request.css";
import "./assets/css/Transaksi.css";
import "./assets/css/landscape.css";
import "./assets/css/print.css";
// Import CSS

// Import Pages
import Dashboard from "./pages/Dashboard";
import Kwitansi from "./pages/Kwitansi";
import Request from "./pages/Request";
import Transaksi from "./pages/Transaksi";
import TransaksiDetails from "./pages/TransaksiDetails.jsx";
import BesiBending from "./pages/VIA/BesiBending";
import BesiBendingHasil from "./pages/VIA/BesiBendingHasil";
import ListBesiBendingHasil from "./pages/VIA/ListBesiBendingHasil.jsx";
import Kategori from "./pages/master/Kategori";
import Layanan from "./pages/master/Layanan";
import Pelanggan from "./pages/master/Pelanggan";
import Projek from "./pages/master/Projek";
import PDFViewer from "./pages/pdf/PDFViewer";
import KwitansiBesi from "./pages/template/kwitansibesi/KwitansiBesi.jsx";
import KwitansiBesiHasil from "./pages/template/kwitansibesi/KwitansiBesiHasil.jsx";
import KwitansiBesiPDF from "./pages/template/kwitansibesi/KwitansiBesiPDF.jsx";
// Import Pages

// import BesiBendingPDF from './pages/pdf/BesiBendingPDF';

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

    window.addEventListener("resize", handleResize); // Listen for window resize event

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup listener on component unmount
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
          width={250} //Mengatur jarak sidebar
          theme={darkTheme ? "dark" : "light"}
          className="sidebar"
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
          <Header
            className="header"
            style={{ padding: 0, background: colorBgContainer }}
          >
            <Button
              type="text"
              className="toggle"
              onClick={toggleCollapse}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: colorBgContainer,
            }}
          >
            <Routes>
              {/* Master */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/layanan" element={<Layanan />} />
              <Route
                path="/layanan/:serviceId/kategori"
                element={<Kategori />}
              />
              <Route path="/kategori/list" element={<Kategori />} />
              <Route path="/pelanggan" element={<Pelanggan />} />
              <Route path="/projek" element={<Projek />} />
              {/* Master */}

              {/* Pengujian */}
              <Route path="/besi-bending" element={<BesiBending />} />
              <Route
                path="/:requestId/besi-bending"
                element={<BesiBending />}
              />
              <Route
                path="/:headerVIAId/besi-bending-hasil"
                element={<BesiBendingHasil />}
              />
              <Route
                path="/besi-bending/:headerVIAId/hasil-list"
                element={<ListBesiBendingHasil />}
              />
              {/* Pengujian */}

              {/* PDF */}
              {/* <Route path='/besi-bending-pdf' element={<BesiBendingPDF />} /> */}
              {/* PDF */}

              {/* Transaksi */}
              <Route path="/request" element={<Request />} />
              <Route path="/transaksi" element={<Transaksi />} />
              <Route
                path="/transaksi/:requestId"
                element={<TransaksiDetails />}
              />
              <Route path="/kwitansi" element={<Kwitansi />} />
              <Route
                path="/transaksi/:requestId/kwitansi"
                element={<Kwitansi />}
              />
              {/* Transaksi */}

              <Route path="/pdf/:headerVIAId/print" element={<PDFViewer />} />

              {/* FUTUREUI */}
              <Route path="kwitansi-besi" element={<KwitansiBesi />}></Route>
              <Route
                path="kwitansi-besi-hasil"
                element={<KwitansiBesiHasil />}
              ></Route>
              <Route
                path="kwitansi-besi-pdf"
                element={<KwitansiBesiPDF />}
              ></Route>

              {/* FUTUREUI */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
