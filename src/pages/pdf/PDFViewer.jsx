import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { getBesiBendingBekukByHeaderId } from "../../services/BesiBendingBekuk";
import { getHeaderVIAById } from "../../services/HeaderVIA";

const PDFViewer = () => {
  const componentRef = useRef();
  const [results, setResults] = useState([]);
  const [header, setHeader] = useState([]);
  const [kodeUji, setKodeUji] = useState("");
  const [customer, setCustomer] = useState("");
  const [project, setProject] = useState("");
  const [alamat, setAlamat] = useState("");
  const { requestId, headerVIAId } = useParams();

  // Fetch customer data from API on component mount
  useEffect(() => {
    if (headerVIAId) {
      getBesiBendingBekukByHeaderId(headerVIAId)
        .then((response) => {
          setResults(response);
        })
        .catch((error) => {
          console.error("Error fetching hasil data:", error);
        });

      getHeaderVIAById(headerVIAId)
        .then((response) => {
          setKodeUji(response.kodeUji);
          setCustomer(response.request.customer.namaPelanggan);
          setProject(response.request.project.namaProjek);
          setAlamat(response.request.customer.alamat);
          setHeader(response);
        })
        .catch((error) => {
          console.error("Error fetching header data:", error);
        });
    }
  }, [headerVIAId]);

  // useEffect(() => {
  //   if (headerVIAId) {

  //   }
  // }, [headerVIAId]);
  // Handle print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: kodeUji,
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
                Jl. Raya Serang – Cilegon KM4, Drangong, Kec Taktakan, Kota
                Serang –Banten 42162
              </p>
              <p style={styles.companyContact}>
                Email: Allure.LabSerang@gmail.com, Mobile: +62 852 1989 8906 /
                Telp. (0254) 4075 697
              </p>
            </div>
            <div style={styles.formInfo}>
              <table style={styles.formTable}>
                <thead>
                  <tr>
                    <th colSpan="2" style={styles.tableHeader}>
                      Form No. III.C
                    </th>
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
          <div className="title-penelitian" style={{ margin: "8px" }}>
            <h3>STELL BENDING TEST</h3>
          </div>
        </section>

        <section id="data_uji">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              className="title-penelitian"
              style={{ width: "40%", marginLeft: "150px", fontSize: "10px" }}
            >
              <table style={{ borderCollapse: "collapse" }}>
                <tr>
                  <td width="100" style={{ border: "0" }}>
                    Dibuat Untuk
                  </td>
                  <td style={{ border: "0" }}>: {customer}</td>
                </tr>
                <tr>
                  <td style={{ border: "0" }} width="100">
                    Proyek
                  </td>
                  <td style={{ border: "0" }}>: {project}</td>
                </tr>
                <tr>
                  <td style={{ border: "0" }} width="100">
                    Jenis Benda Uji
                  </td>
                  <td style={{ border: "0" }}>: {header.jenisBenda}</td>
                </tr>
                <tr>
                  <td style={{ border: "0" }} width="100">
                    Lokasi
                  </td>
                  <td style={{ border: "0" }}>: {alamat}</td>
                </tr>
              </table>
            </div>
            <div
              className="title-penelitian"
              style={{
                width: "40%",
                marginRight: "40px",
                marginBottom: "50px",
                fontSize: "10px",
              }}
            >
              <table style={{ borderCollapse: "collapse" }}>
                <tr>
                  <td style={{ border: "0" }} width="150">
                    No. Laporan
                  </td>
                  <td style={{ border: "0" }}>: {kodeUji}</td>
                </tr>
                <tr>
                  <td style={{ border: "0" }} width="150">
                    Diterima Tanggal
                  </td>
                  <td style={{ border: "0" }}>: 20/06/2023</td>
                </tr>
                <tr>
                  <td style={{ border: "0" }} width="150">
                    Dites Oleh
                  </td>
                  <td style={{ border: "0" }}>: {header.tester}</td>
                </tr>
                <tr>
                  <td style={{ border: "0" }} width="150">
                    Diverifikasi Oleh
                  </td>
                  <td style={{ border: "0" }}>: {header.verifikator}</td>
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
                <th style={styles.tableCell}>Join Distance (mm)</th>
                <th style={styles.tableCell}>Angle of Bend (degree)</th>
                <th style={styles.tableCell}>Maximum Force (KN)</th>
                <th style={styles.tableCell}>VISUAL DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{index + 1}</td>
                  <td style={styles.tableCell}>{result.code}</td>
                  <td style={styles.tableCell}>{result.grade}</td>
                  <td style={styles.tableCell}>{result.nominalDiameter}</td>
                  <td style={styles.tableCell}>{result.pinDiameter}</td>
                  <td style={styles.tableCell}>{result.joinDistance}</td>
                  <td style={styles.tableCell}>{result.angleOfBend}°</td>
                  <td style={styles.tableCell}>{result.maxForce}</td>
                  <td style={styles.tableCell}>{result.visualDescription}</td>
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
    width: "50%",
    margin: "0 auto",
    textAlign: "left",
    padding: "15px",
  },
  container1: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftImage: {
    width: "120px",
    height: "auto",
    marginLeft: "-180px",
  },
  headerText: {
    flex: "1",
    fontFamily: "Arial, sans-serif",
    textAlign: "left",
    paddingLeft: "20px",
  },
  companyName: {
    margin: "5px 0",
    fontSize: "24px",
  },
  companyDetails: {
    margin: "2px 0",
    fontSize: "12px",
  },
  companyAddress: {
    margin: "2px 0",
    fontSize: "12px",
  },
  companyContact: {
    margin: "2px 0",
    fontSize: "12px",
  },
  formInfo: {
    flexShrink: "0",
    marginLeft: "-110px",
    marginRight: "-200px",
  },
  formTable: {
    borderCollapse: "collapse",
  },
  tableHeader: {
    border: "1px solid black",
    padding: "8px",
    textAlign: "center",
  },
  tableCell: {
    border: "1px solid black",
    padding: "1px",
    textAlign: "center",
  },
  judulUji: {
    textAlign: "center",
  },
  dataTabel: {
    textAlign: "center",
  },
  dataTable: {
    margin: "-10px auto",
    width: "80%",
    borderCollapse: "collapse",
    border: "1px solid black",
    fontSize: "10px",
  },
  footer: {
    marginTop: "20px",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 20px",
  },
  footerLeft: {
    flex: 1,
  },
  textCenter: {
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  footerRight: {
    flex: 1,
    textAlign: "right",
  },
  marginBottom: {
    marginBottom: "40px",
  },
};

// Get current date function
const getCurrentDate = () => {
  const date = new Date();

  // Format the date in Bahasa Indonesia
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Return formatted date string
  return `Serang, ${day} ${month} ${year}`;
};

export default PDFViewer;
