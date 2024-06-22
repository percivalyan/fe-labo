import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { getBesiBendingBekukByHeaderId } from "../../../services/VIA/BesiBendingBekuk";
import { getHeaderVIAById } from "../../../services/VIA/HeaderVIA";

const KwitansiBesiPDF = () => {
  const componentRef = useRef();
  const [results, setResults] = useState([
    {
        bendaUji1: "Bolt A",
        jenisUjiMaterial: "Tensile Test",
        jumlah: 1,
        hargaSatuan: 100,
        hargaSatuanPPN: 110,
        totalBiaya: 110,
      },
      {
        bendaUji: "Bolt A",
        jenisUjiMaterial: "Fatigue Test",
        jumlah: 2,
        hargaSatuan: 150,
        hargaSatuanPPN: 165,
        totalBiaya: 330,
      },
      {
        bendaUji: "Bolt A",
        jenisUjiMaterial: "Fatigue Test",
        jumlah: 2,
        hargaSatuan: 150,
        hargaSatuanPPN: 165,
        totalBiaya: 330,
      },
      {
        bendaUji: "Bolt A",
        jenisUjiMaterial: "Fatigue Test",
        jumlah: 2,
        hargaSatuan: 150,
        hargaSatuanPPN: 165,
        totalBiaya: 330,
      },
      {
        bendaUji: "Bolt A",
        jenisUjiMaterial: "Fatigue Test",
        jumlah: 2,
        hargaSatuan: 150,
        hargaSatuanPPN: 165,
        totalBiaya: 330,
      },
      {
        bendaUji: "Bolt A",
        jenisUjiMaterial: "Fatigue Test",
        jumlah: 2,
        hargaSatuan: 150,
        hargaSatuanPPN: 165,
        totalBiaya: 330,
      },
      {
        bendaUji: "Bolt A",
        jenisUjiMaterial: "Fatigue Test",
        jumlah: 2,
        hargaSatuan: 150,
        hargaSatuanPPN: 165,
        totalBiaya: 330,
      },

      // {
      //   totalHargaSatuan: 333,
      //   cicilan: 335,
      //   totalSemuaBiaya: 332,
      // }
     
  ]);

  // const [datas, setDatas] = useState([   

  // ]);

  const [header, setHeader] = useState([]);
  const [kodeUji, setKodeUji] = useState("");
  const [customer, setCustomer] = useState("");
  const [project, setProject] = useState("");
  const [alamat, setAlamat] = useState("");
  const { headerVIAId } = useParams();

  
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: kodeUji,
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <React.Fragment>
      <button onClick={handlePrint}>CETAK SEKARANG</button>
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
              <p style={styles.companyDetails}>- Material Testing For Concrete, Ashphlat, Agregat</p>
              <p style={styles.companyDetails}>- Destructive & Non Destructive Testing Service</p>
              <p style={styles.companyDetails}>- JMF & Ready mix Consultant</p>
              <p style={styles.companyDetails2}>Office and laboratory :</p>
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
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      FM-PUR-01
                      A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.tableHeader}>
                      <bold>01 Februari 2024</bold>
                    </td>
                    <td style={styles.tableHeader}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ver.
                      1.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <section id="judul_uji" style={styles.judulUji}>
          <div className="title-penelitian" style={{ margin: "8px" }}>
            <hr style={styles.styleHR} />
            <h3 style={{marginTop: '10px'}}>FORM PERMINTAAN TES BESI</h3>
            <h3>NO. Order : ????/VIC/ABS/??????/2024</h3>
          </div>
        </section>

        {/* <section id="data_uji">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              className="title-penelitian"
              style={{ width: "40%", marginLeft: "150px", fontSize: "10px" }}
            >
             <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td width="150" style={{ border: "0" }}>Nama Perusahaan</td>
            <td style={{ border: "0" }}>: {data.namaPerusahaan}</td>
          </tr>
          <tr>
            <td style={{ border: "0" }} width="150">NPWP Perusahaan</td>
            <td style={{ border: "0" }}>: {data.npwpPerusahaan}</td>
          </tr>
          <tr>
            <td style={{ border: "0" }} width="150">Alamat NPWP</td>
            <td style={{ border: "0" }}>: {data.alamatNPWP}</td>
          </tr>
          <tr>
            <td style={{ border: "0" }} width="150">Proyek</td>
            <td style={{ border: "0" }}>: {data.proyek}</td>
          </tr>
          <tr>
            <td style={{ border: "0" }} width="150">Alamat Proyek</td>
            <td style={{ border: "0" }}>: {data.alamatProyek}</td>
          </tr>
          <tr>
            <td style={{ border: "0" }} width="150">Telp/Fax Proyek</td>
            <td style={{ border: "0" }}>: {data.telpFaxProyek}</td>
          </tr>
          <tr>
            <td style={{ border: "0" }} width="150">Nama Pengirim</td>
            <td style={{ border: "0" }}>: {data.namaPengirim}</td>
          </tr>
          <tr>
            <td style={{ border: "0" }} width="150">Tanggal Masuk</td>
            <td style={{ border: "0" }}>: {data.tanggalMasuk}</td>
          </tr>
          <tr>
            <td style={{ border: "0" }} width="150">Email</td>
            <td style={{ border: "0" }}>: {data.email}</td>
          </tr>
          <tr>
            <td style={{ border: "0" }} width="150">Telp/Fax Pengirim</td>
            <td style={{ border: "0" }}>: {data.telpFaxPengirim}</td>
          </tr>
        </tbody>
      </table>


            </div>

            <div
              className="title-penelitian"
              style={{
                width: "40%",
                marginRight: "40px",
                marginBottom: "180px",
                fontSize: "10px",
              }}
            >
            </div>
          </div>
        </section> */}

<section id="data_uji" style={{ padding: '10px', marginTop: '-15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Kolom kiri */}
        <div style={{ width: '45%', marginLeft: '150px', fontSize: '10px' }}>
          <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ border: '0', padding: '0px 10px' }}>Nama Perusahaan</td>
                <td style={{ border: '0', padding: '0px 10px' }}>: {data.namaPerusahaan}</td>
              </tr>
              <tr>
                <td style={{ border: '0', padding: '0px 10px' }}>NPWP Perusahaan</td>
                <td style={{ border: '0', padding: '0px 10px' }}>: {data.npwpPerusahaan}</td>
              </tr>
              <tr>
                <td style={{ border: '0', padding: '0px 10px' }}>Alamat NPWP</td>
                <td style={{ border: '0', padding: '0px 10px' }}>: {data.alamatNPWP}</td>
              </tr>
              <tr>
                <td style={{ border: '0', padding: '0px 10px' }}>Proyek</td>
                <td style={{ border: '0', padding: '0px 10px' }}>: {data.proyek}</td>
              </tr>
              <tr>
                <td style={{ border: '0', padding: '0px 10px' }}>Alamat Proyek</td>
                <td style={{ border: '0', padding: '0px 10px' }}>: {data.alamatProyek}</td>
              </tr>
              <tr>
                <td style={{ border: '0', padding: '0px 10px' }}>Telp/Fax Proyek</td>
                <td style={{ border: '0', padding: '0px 10px' }}>: {data.telpFaxProyek}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Kolom kanan */}
        <div style={{ width: '45%', marginRight: '40px', marginBottom: '180px', fontSize: '10px' }}>
          <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ border: '0', padding: '0px 10px' }}>Nama Pengirim</td>
                <td style={{ border: '0', padding: '0px 10px' }}>: {data.namaPengirim}</td>
              </tr>
              <tr>
                <td style={{ border: '0', padding: '0px 10px' }}>Email</td>
                <td style={{ border: '0', padding: '0px 10px' }}>: {data.email}</td>
              </tr>
              <tr>
                <td style={{ border: '0', padding: '0px 10px' }}>Tanggal Masuk</td>
                <td style={{ border: '0', padding: '0px 10px' }}>: {data.tanggalMasuk}</td>
              </tr>
              <tr>
                <td style={{ border: '0', padding: '0px 10px' }}>Telp/Fax Pengirim</td>
                <td style={{ border: '0', padding: '0px 10px' }}>: {data.telpFaxPengirim}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

        {/* <section id="data_tabel" style={styles.dataTabel}>
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
        </section> */}

{/* <section id="data_tabel" style={styles.dataTabel}>
      <table style={styles.dataTable}>
        <thead>
          <tr>
            <th style={styles.tableCell}>Benda Uji</th>
            <th style={styles.tableCell}>Jenis Uji Material</th>
            <th style={styles.tableCell}>Jumlah</th>
            <th style={styles.tableCell}>Harga Satuan</th>
            <th style={styles.tableCell}>Harga Satuan PPN</th>
            <th style={styles.tableCell}>Total Biaya</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>{result.bendaUji}</td>
              <td style={styles.tableCell}>{result.jenisUjiMaterial}</td>
              <td style={styles.tableCell}>{result.jumlah}</td>
              <td style={styles.tableCell}>{result.hargaSatuan}</td>
              <td style={styles.tableCell}>{result.hargaSatuanPPN}</td>
              <td style={styles.tableCell}>{result.totalBiaya}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section> */}

{/* <section id="data_tabel" style={styles.dataTabel}>
  <table style={styles.dataTable}>
    <thead>
      <tr>
        <th style={styles.tableCell}>Benda Uji</th>
        <th style={styles.tableCell}>Jenis Uji Material</th>
        <th style={styles.tableCell}>Jumlah</th>
        <th style={styles.tableCell}>Harga Satuan</th>
        <th style={styles.tableCell}>Harga Satuan PPN</th>
        <th style={styles.tableCell}>Total Biaya</th>
      </tr>
    </thead>
    <tbody>
      {results.map((result, index) => (
        <React.Fragment key={index}>
          <tr>
            <td rowSpan="2" style={styles.tableCell}>{result.bendaUji}</td>
            <td style={styles.tableCell}>{result.jenisUjiMaterial}</td>
            <td style={styles.tableCell}>{result.jumlah}</td>
            <td style={styles.tableCell}>{result.hargaSatuan}</td>
            <td style={styles.tableCell}>{result.hargaSatuanPPN}</td>
            <td style={styles.tableCell}>{result.totalBiaya}</td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>
</section> */}

{/* Fix */}
{/* <section id="data_tabel" style={styles.dataTabel}>
  <table style={styles.dataTable}>
    <thead>
      <tr>
        <th style={styles.tableCell}>Benda Uji</th>
        <th style={styles.tableCell}>Jenis Uji Material</th>
        <th style={styles.tableCell}>Jumlah</th>
        <th style={styles.tableCell}>Harga Satuan</th>
        <th style={styles.tableCell}>Harga Satuan PPN</th>
        <th style={styles.tableCell}>Total Biaya</th>
      </tr>
    </thead>
    <tbody>
      {results.map((result, index) => (
        <React.Fragment key={index}>
          <tr>
            {index === 0 && (
              <td rowSpan={results.length} style={styles.tableCell}>
                {result.bendaUji}
              </td>
            )}
            <td style={styles.tableCell}>{result.jenisUjiMaterial}</td>
            <td style={styles.tableCell}>{result.jumlah}</td>
            <td style={styles.tableCell}>{result.hargaSatuan}</td>
            <td style={styles.tableCell}>{result.hargaSatuanPPN}</td>
            <td style={styles.tableCell}>{result.totalBiaya}</td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>
</section> */}
{/* Fix */}

<section id="data_tabel" style={styles.dataTabel}>
  <table style={styles.dataTable}>
    <thead>
      <tr>
        <th style={styles.tableCell}>Benda Uji</th>
        <th style={styles.tableCell}>Jenis Uji Material</th>
        <th style={styles.tableCell}>Jumlah</th>
        <th style={styles.tableCell}>Harga Satuan</th>
        <th style={styles.tableCell}>Harga Satuan PPN</th>
        <th style={styles.tableCell}>Total Biaya</th>
      </tr>
    </thead>
    <tbody>
      {results.map((result, index) => (
        <React.Fragment key={index}>
          {/* Render the main row */}
          <tr>
            {/* Only render "Benda Uji" for the first row of each group */}
            {index === 0 && (
              <td rowSpan={results.length * 4} style={styles.tableCell}>
                {result.bendaUji1}
              </td>
            )}
              {/* <td style={styles.tableCell}>s</td> */}
            <td style={styles.tableCell}>{result.jenisUjiMaterial}</td>
            <td style={styles.tableCell}>{result.jumlah}</td>
            <td style={styles.tableCell}>{result.hargaSatuan}</td>
            <td style={styles.tableCell}>{result.hargaSatuanPPN}</td>
            <td style={styles.tableCell}>{result.totalBiaya}</td>
          </tr>        
        </React.Fragment>
      ))}
    </tbody>

    <tbody>

          {/* Render the main row */}
          <tr>
            <th style={styles.tableCell2}></th>
          <th style={styles.tableCell2}></th>
           <th style={styles.tableCell3}></th>
           <th style={styles.tableCell4}>Total</th>
            <th style={styles.tableCell4}>your data</th>
            <th style={styles.tableCell4}>your data</th>
            {/* <th style={styles.tableCell}>{result.totalHargaSatuan}</th>
            <th style={styles.tableCell}>{result.cicilan}</th>
            <th style={styles.tableCell}>{result.totalSemuaBiaya}</th> */}
          </tr>        
       
    </tbody>
    <tbody>

          {/* Render the main row */}
          <tr>
            <th style={styles.tableCell2}></th>
          <th style={styles.tableCell2}></th>
           <th style={styles.tableCell3}></th>
           <th style={styles.tableCell4}></th>
            <th style={styles.tableCell4}>your data</th>
            <th style={styles.tableCell4}>your data</th>
            {/* <th style={styles.tableCell}>{result.totalHargaSatuan}</th>
            <th style={styles.tableCell}>{result.cicilan}</th>
            <th style={styles.tableCell}>{result.totalSemuaBiaya}</th> */}
          </tr>        
       
    </tbody>
    <tbody>

          {/* Render the main row */}
          <tr>
            <th style={styles.tableCell2}></th>
          <th style={styles.tableCell2}></th>
           <th style={styles.tableCell3}></th>
           <th style={styles.tableCell4}>Sub Total</th>
            <th style={styles.tableCell4}>your data</th>
            <th style={styles.tableCell4}>your data</th>
            {/* <th style={styles.tableCell}>{result.totalHargaSatuan}</th>
            <th style={styles.tableCell}>{result.cicilan}</th>
            <th style={styles.tableCell}>{result.totalSemuaBiaya}</th> */}
          </tr>        
       
    </tbody>
    
  </table>
  

  {/* <table style={styles.dataTable2}>
    <thead>
      <tr>
        <th style={styles.tableCell}>Benda Uji</th>
      </tr>

      <tr>
        
      </tr>
     </thead>



     <thead>
      
    </thead>
    <tbody>
      {results.map((result, index) => (
        <React.Fragment key={index}>
         
          <tr>
            <td style={styles.tableCell}>{result.hargaSatuan}</td>
            <td style={styles.tableCell}>{result.hargaSatuanPPN}</td>
            <td style={styles.tableCell}>{result.totalBiaya}</td>
          </tr>       
           
        </React.Fragment>
      ))}
    </tbody>
  </table> */}


</section>



{/* 
<section id="data_tabel" style={styles.dataTabel}>
    <table style={styles.dataTable}>
      <thead>
        <tr>
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
            <td style={styles.tableCell}>Besi Dingin</td>
            <td style={styles.tableCell}>{results.grade}</td>
            <td style={styles.tableCell}>{results.nominalDiameter}</td>
            <td style={styles.tableCell}>{results.pinDiameter}</td>
            <td style={styles.tableCell}>{results.joinDistance}</td>
            <td style={styles.tableCell}>{results.angleOfBend}°</td>
            <td style={styles.tableCell}>{results.maxForce}</td>
            <td style={styles.tableCell}>{results.visualDescription}</td>
         </tr>
        ))} 
      </tbody>
    </table>
  </section> */}

        {/* <section id="footer" style={styles.footer}>
          <div style={styles.footerContainer}>
            <div style={styles.footerLeft}>
              <div style={styles.textCenter}>
                <p style={styles.text}>Noted: Untuk Pengujian Tarik Besi harga sama dengan Harga Pengujian Tekuk Besi</p>
              </div>
            </div>
           <table>
            <tbody>
              <tr>
              <div style={styles.footerRight}>
              <div style={styles.textCenter}>
                <p>{getCurrentDate()}</p>
                <br />
                <p style={styles.marginBottom}>TTD</p>
                <p>Herry Supriyadi, ST</p>
                <p>Kepala Laboratorium</p>
              </div>
            </div>
              </tr>
            </tbody>
           </table>


           <table>
            <tbody>
              <tr>
              <div style={styles.footerRight}>
              <div style={styles.textCenter}>
                <p>{getCurrentDate()}</p>
                <br />
                <p style={styles.marginBottom}>TTD</p>
                <p>Herry Supriyadi, ST</p>
                <p>Kepala Laboratorium</p>
              </div>
            </div>
              </tr>
            </tbody>
           </table>
          </div>
        </section>
         */}
           <div style={{marginLeft: '100px', marginTop: '20px', fontSize: '12px'}}>
            <p style={styles.text}>Noted: Untuk Pengujian Tarik Besi harga sama dengan Harga Pengujian Tekuk Besi</p>
          </div>


<section id="footer" style={styles.footer}>
      <div style={styles.footerContainer}>
        <div style={styles.footerLeft}>
          {/* <div style={styles.textCenter}>
            <p style={styles.text}>Noted: Untuk Pengujian Tarik Besi harga sama dengan Harga Pengujian Tekuk Besi</p>
          </div> */}
        </div>
        <div style={styles.footerRight}>
          <div style={styles.textCenter2}>
            <p style={{marginBottom: '-30px'}}>{getCurrentDate()}</p>
            <br />
            <p style={styles.marginBottom}>Yang Menerima</p>
            <p style={{marginTop: '40px'}}>(................................)</p>
           
       
          </div>
        </div>
        <div style={styles.footerRight}>
          <div style={styles.textCenter2}>
            <p style={{color: 'white', marginBottom: '-30px'}}>{getCurrentDate()}</p>
            <br />
            <p style={styles.marginBottom}>Yang Menyerahkan</p>
            <p style={{marginTop: '40px'}}>(................................)</p>
          </div>
        </div>
      </div>
    </section>

    
        <div style={styles.footerCenterBottom}>
          <div style={styles.textCenter}>
            {/* <hr style={styles.styleHR} /> */}
            <small>
              <p style={styles.marginBottom}>
                PT.Allure Berkah Sejahtera-Concrete & Civil Laboratories,
                Invetigation & Consultant
                {/* <hr style={styles.styleHR} /> */}
              </p>
            </small>
          </div>
        </div>
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
  companyDetails2: {
    margin: "2px 0",
    fontSize: "12px",
    fontStyle: "italic",
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
  tableCell2: {
    border: "1px solid white",
    borderTop: "1px solid black",
    padding: "1px",
    textAlign: "center",
  },
  tableCell3: {
    border: "1px solid white",
    borderTop: "1px solid white",
    borderRight: "1px solid black",
    padding: "1px",
    textAlign: "center",
  },
  tableCell4: {
    border: "1px solid black",
    // borderTop: "1px solid black",
    // borderleft: "1px solid black",
    // borderRight: "1px solid black",
    padding: "1px",
    textAlign: "center",
  },
  judulUji: {
    textAlign: "center",
    fontSize: "10px",
  },
  dataTabel: {
    textAlign: "center",
    marginTop: "-150px",
  },
  dataTable: {
    margin: "-10px auto",
    width: "80%",
    borderCollapse: "collapse",
    border: "1px solid black",
    fontSize: "10px",
  },
  dataTable2: {
    margin: "9.25px auto",
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
  textCenter2: {
    textAlign: "center",
    marginTop: "-25px",
  },
  boldText: {
    fontWeight: "bold",
  },
  footerRight: {
    flex: 1,
    textAlign: "right",
  },
  marginBottom: {
    marginBottom: "50px",
  },
  footerCenterBottom: {
    flex: 1,
    bottom: "0",
    marginTop: "15px",
  },
  styleHR: {
    width: "100%",
    height: "2px",
    backgroundColor: "black",
    border: "none",
    margin: "0 auto" 
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
  // return `Serang, ${day} ${month} ${year}`;
  return `Serang,`;
};

const data = {
    namaPerusahaan: "PT Maju Jaya",
    npwpPerusahaan: "01.234.567.8-901.000",
    alamatNPWP: "Jl. Sudirman No. 1, Jakarta",
    proyek: "Pembangunan Gedung Perkantoran",
    alamatProyek: "Jl. Gatot Subroto No. 2, Jakarta",
    telpFaxProyek: "021-1234567",
    namaPengirim: "John Doe",
    tanggalMasuk: "2022-01-01",
    email: "2EwKl@example.com",
    telpFaxPengirim: "021-9876543"
  };
  
  
export default KwitansiBesiPDF;
