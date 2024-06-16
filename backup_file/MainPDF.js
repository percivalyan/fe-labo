import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const Letterhead = () => (
    <div className="letterhead" style={{ width: '50%', margin: '0 auto', textAlign: 'left', padding: '15px' }}>
        <div className="container1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src="https://allurelaboratoriumsipil.com/wp-content/uploads/2022/10/1666716305265.png" alt="Left Image" style={{ width: '120px', height: 'auto', marginLeft: '-180px'  }} />
            <div className="header-text" style={{ flex: '1', fontFamily: 'Arial, sans-serif', textAlign: 'left', paddingLeft: '20px' }}>
                <h1 style={{ margin: '5px 0', fontSize: '24px' }}>PT. Allure Berkah Sejahtera</h1>
                <p style={{ margin: '2px 0', fontSize: '12px' }}>Concrete & Civil Laboratories, Investigation & Consultant</p>
                <p style={{ margin: '2px 0', fontSize: '12px' }}>Head Office & Laboratory</p>
                <p style={{ margin: '2px 0', fontSize: '12px' }}>Jl. Raya Serang – Cilegon KM4, Drangong, <br />Kec Taktakan, Kota Serang –Banten 42162</p>
                <p style={{ margin: '2px 0', fontSize: '12px' }}>Email: Allure.LabSerang@gmail.com, <br />Mobile: +62 852 1989 8906 / Telp. (0254) 4075 697</p>
            </div>
            <div style={{ flexShrink: '0', marginLeft: '-110px', marginRight: '-200px' }}>
                <table style={{ borderCollapse: 'collapse' }}>
                    <tr>
                        <th colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Form No. III.C</th>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '1px', textAlign: 'left' }}>22 Agustus</td>
                        <td style={{ border: '1px solid black', padding: '1px', textAlign: 'left' }}>2020 Ver. 1.0</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
);

const TitleSection = () => (
    <section id="judul_uji">
        <div className="title-penelitian" style={{ textAlign: 'center' }}>
           <br /> <h3>STELL BENDING TEST</h3><br />
            {/* <hr style={{ border: '1px solid black', width: '20%', marginTop: '-18px' }} />
            <h5 style={{ marginTop: '-2px' }}>HASIL TEST LENTUR BALOK BETON</h5> */}
        </div>
    </section>
);

const DataSection = () => (
    <section id="data_uji">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="title-penelitian" style={{ width: '40%', marginLeft: '60px', marginBottom: '40px', fontSize: '10px' }}>
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
                    {/* <tr>
                        <td style={{ border: '0' }} width="200">Lokasi</td>
                        <td style={{ border: '0' }}>: CILEGON - BANTEN</td>
                    </tr> */}
                </table>
            </div>
            <div className="title-penelitian" style={{ width: '40%', marginRight: '80px', marginBottom: '40px', fontSize: '10px'}}>
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
);

const DataTableSection = () => (
    <section id="data_tabel" style={{ textAlign: 'center' }}>
        <table style={{ margin: '0 auto', width: '80%', borderCollapse: 'collapse', border: '1px solid black', fontSize: '10px' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>No</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Code</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>GRADE</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Nominal Diameter (mm)</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Pin Diameter (mm)</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Joint Distance (mm)</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Angle of Bend (degree)</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Maximum Force (KN)</th>
                    <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>VISUAL DESCRIPTION</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>1</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>0</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>180°</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>ULIR -  TIDAK RETAK</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>2</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>0</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>180°</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>ULIR -  TIDAK RETAK</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>3</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>0</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>180°</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>ULIR -  TIDAK RETAK</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>4</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>0</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>180°</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>ULIR -  TIDAK RETAK</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>5</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>0</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>180°</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>ULIR -  TIDAK RETAK</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>6</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>0</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>180°</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>ULIR -  TIDAK RETAK</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>7</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>0</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>180°</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>ULIR -  TIDAK RETAK</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>8</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>0</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>180°</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>ULIR -  TIDAK RETAK</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>9</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>0</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>180°</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>ULIR -  TIDAK RETAK</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>10</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>0</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>180°</td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}></td>
                    <td style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>ULIR -  TIDAK RETAK</td>
                </tr>
            </tbody>
        </table>
    </section>
);

const FooterSection = () => {
    // Function to get the current date in the desired format
    const getCurrentDate = () => {
        const months = [
            'Januari', 'Februari', 'Maret', 'April',
            'Mei', 'Juni', 'Juli', 'Agustus',
            'September', 'Oktober', 'November', 'Desember'
        ];

        const currentDate = new Date();
        const day = currentDate.getDate();
        const monthIndex = currentDate.getMonth();
        const year = currentDate.getFullYear();

        return `Serang, ${day} ${months[monthIndex]} ${year}`;
    };

    return (
        <section id="footer" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ textAlign: 'center' }}>
                        {/* <p style={{ fontStyle: 'italic' }}>Catatan: </p> */}
                        <p style={{ fontWeight: 'bold' }}>SNI 2052:2017</p>
                        <p style={{ fontWeight: 'bold' }}>SNI 0410:2017</p>
                    </div>
                </div>
                {/* <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ marginTop: '10px' }}>Detail Gambar: </p>
                        <img src="" alt="Center Image" style={{ width: '150px', height: 'auto' }} />
                    </div>
                </div> */}
                <div style={{ flex: 1, textAlign: 'right' }}>
                    <div style={{ textAlign: 'center' }}>
                        <p>{getCurrentDate()}</p>
                        {/* <p>Laboratorium Beton</p> */}
                        <br />
                        <p style={{ marginBottom: '40px' }}>TTD</p>
                        <p>Herry Supriyadi, ST</p>
                        <p>Kepala Laboratorium</p>
                    </div>
                </div>
            </div>
            {/* <h6 style={{ marginTop: "12px", textAlign: "center", fontSize: "8px" }}>
                PT.Allure Berkah Sejahtera-Concrete & Civil Laboratories, Investigation & Consultant
            </h6> */}
        </section>
    );
};

const Report = () => (
    
    <div>
        <Letterhead />
        <hr style={{ border: '1px solid black', width: '100%' }} />
        <TitleSection />
        <DataSection />
        <DataTableSection />
        <FooterSection />
    </div>
);

function PDFViewer({ pdfUrl }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function handlePrint() {
        window.print();
    }

    return (
        <div className='print'>
            <Report />
            {/* <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document> */}
            {/* <h6>
                Page {pageNumber} of {numPages}
                PT.Allure Berkah Sejahtera-Concrete & Civil  Laboratories, Invetigation & Consultant
            </h6> */}
            <button onClick={handlePrint}>Print</button>
        </div>
    );
}

export default PDFViewer;
