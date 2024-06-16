import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const REST_API_BASE_URL_CUSTOMER = "http://localhost:8080/api/cust";

const PDFViewer = () => {
  const componentRef = useRef();
  const [customerData, setCustomerData] = useState([]);

  // Fetch customer data from API on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${REST_API_BASE_URL_CUSTOMER}/list`);
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Handle print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Customer List",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <React.Fragment>
      <button onClick={handlePrint}>Print this out!</button>
      <div ref={componentRef}>
        <div className="letterhead" style={styles.letterhead}>
          <div className="container1" style={styles.container1}>
            <img
              src="https://allurelaboratoriumsipil.com/wp-content/uploads/2022/10/1666716305265.png"
              alt="Left Image"
              style={styles.leftImage}
            />
            <div className="header-text" style={styles.headerText}>
              <h1 style={styles.companyName}>PT. Allure Berkah Sejahtera</h1>
              <p style={styles.companyDetails}>
                Concrete & Civil Laboratories, Investigation & Consultant
              </p>
              <p style={styles.companyDetails}>Head Office & Laboratory</p>
              <p style={styles.companyAddress}>
                Jl. Raya Serang – Cilegon KM4, Drangong,
                Kec Taktakan, Kota Serang –Banten 42162
              </p>
              <p style={styles.companyContact}>
                Email: Allure.LabSerang@gmail.com,
                Mobile: +62 852 1989 8906 / Telp. (0254) 4075 697
              </p>
            </div>
            <div style={styles.formInfo}>
              <table style={styles.formTable}>
                <thead>
                  <tr>
                    <th colSpan="2" style={styles.tableHeader}>Form No. III.C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.tableCell}>22 Agustus</td>
                    <td style={styles.tableCell}>2020 Ver. 1.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <section id="judul_uji" style={styles.judulUji}>
          <div className="title-penelitian" style={{margin: "8px"}}>
            <h3>STELL BENDING TEST</h3>
          </div>
        </section>

        <section id="data_uji">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="title-penelitian" style={{ width: '40%', marginLeft: '150px', fontSize: '10px' }}>
              <table style={{ borderCollapse: 'collapse' }}>
                <tr>
                  <td width="100" style={{ border: '0' }}>Dibuat Untuk</td>
                  <td style={{ border: '0' }}>: PT. HUTAMA KARYA</td>
                </tr>
                <tr>
                  <td style={{ border: '0' }} width="100">Proyek</td>
                  <td style={{ border: '0' }}>: PLTU JAWA 9 & 10 SURALAYA</td>
                </tr>
                <tr>
                  <td style={{ border: '0' }} width="100">Jenis Benda Uji</td>
                  <td style={{ border: '0' }}>: BESI TULANGAN BETON</td>
                </tr>
                <tr>
                  <td style={{ border: '0' }} width="100">Lokasi</td>
                  <td style={{ border: '0' }}>: CILEGON - BANTEN</td>
                </tr>
              </table>
            </div>
            <div className="title-penelitian" style={{ width: '40%', marginRight: '40px', marginBottom: '50px', fontSize: '10px'}}>
              <table style={{ borderCollapse: 'collapse' }}>
                <tr>
                  <td style={{ border: '0' }} width="150">No. Laporank</td>
                  <td style={{ border: '0' }}>: 45/VIA/ABS/VI/2023</td>
                </tr>
                <tr>
                  <td style={{ border: '0' }} width="150">Diterima Tanggal</td>
                  <td style={{ border: '0' }}>: 20/06/2023</td>
                </tr>
                <tr>
                  <td style={{ border: '0' }} width="150">Dites Oleh</td>
                  <td style={{ border: '0' }}>: ZAHRON</td>
                </tr>
                <tr>
                  <td style={{ border: '0' }} width="150">Diverifikasi Oleh</td>
                  <td style={{ border: '0' }}>: HERY. S</td>
                </tr>
              </table>
            </div>
          </div>
        </section>

        <section id="data_tabel" style={styles.dataTabel}>
          <table style={styles.dataTable}>
            <thead>
              <tr>
                <th style={styles.tableCell}>No</th>
                <th style={styles.tableCell}>Code</th>
                <th style={styles.tableCell}>GRADE</th>
                <th style={styles.tableCell}>Nominal Diameter (mm)</th>
                <th style={styles.tableCell}>Pin Diameter (mm)</th>
                <th style={styles.tableCell}>Joint Distance (mm)</th>
                <th style={styles.tableCell}>Angle of Bend (degree)</th>
                <th style={styles.tableCell}>Maximum Force (KN)</th>
                <th style={styles.tableCell}>VISUAL DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{index + 1}</td>
                  <td style={styles.tableCell}></td>
                  <td style={styles.tableCell}></td>
                  <td style={styles.tableCell}></td>
                  <td style={styles.tableCell}></td>
                  <td style={styles.tableCell}>0</td>
                  <td style={styles.tableCell}>180°</td>
                  <td style={styles.tableCell}></td>
                  <td style={styles.tableCell}>ULIR - TIDAK RETAK</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="footer" style={styles.footer}>
          <div style={styles.footerContainer}>
            <div style={styles.footerLeft}>
              <div style={styles.textCenter}>
                <p style={styles.boldText}>SNI 2052:2017</p>
                <p style={styles.boldText}>SNI 0410:2017</p>
              </div>
            </div>
            <div style={styles.footerRight}>
              <div style={styles.textCenter}>
                <p>{getCurrentDate()}</p>
                <br />
                <p style={styles.marginBottom}>TTD</p>
                <p>Herry Supriyadi, ST</p>
                <p>Kepala Laboratorium</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

// Styles
const styles = {
  letterhead: {
    width: '50%',
    margin: '0 auto',
    textAlign: 'left',
    padding: '15px',
  },
  container1: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftImage: {
    width: '120px',
    height: 'auto',
    marginLeft: '-180px',
  },
  headerText: {
    flex: '1',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'left',
    paddingLeft: '20px',
  },
  companyName: {
    margin: '5px 0',
    fontSize: '24px',
  },
  companyDetails: {
    margin: '2px 0',
    fontSize: '12px',
  },
  companyAddress: {
    margin: '2px 0',
    fontSize: '12px',
  },
  companyContact: {
    margin: '2px 0',
    fontSize: '12px',
  },
  formInfo: {
    flexShrink: '0',
    marginLeft: '-110px',
    marginRight: '-200px',
  },
  formTable: {
    borderCollapse: 'collapse',
  },
  tableHeader: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  },
  tableCell: {
    border: '1px solid black',
    padding: '1px',
    textAlign: 'center',
  },
  judulUji: {
    textAlign: 'center',
  },
  dataTabel: {
    textAlign: 'center',
  },
  dataTable: {
    margin: '-10px auto',
    width: '80%',
    borderCollapse: 'collapse',
    border: '1px solid black',
    fontSize: '10px',
  },
  footer: {
    marginTop: '20px',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
  },
  footerLeft: {
    flex: 1,
  },
  textCenter: {
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  footerRight: {
    flex: 1,
    textAlign: 'right',
  },
  marginBottom: {
    marginBottom: '40px',
  },
};

// Get current date function
const getCurrentDate = () => {
  const date = new Date();
  
  // Format the date in Bahasa Indonesia
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  // Return formatted date string
  return `Serang, ${day} ${month} ${year}`;
};

export default PDFViewer;

