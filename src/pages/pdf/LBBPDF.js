import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const Letterhead = () => (
    <div className="letterhead" style={{ width: '60%', margin: '0 auto', textAlign: 'left', padding: '20px' }}>
        <div className="container1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src="https://allurelaboratoriumsipil.com/wp-content/uploads/2022/10/1666716305265.png" alt="Left Image" style={{ width: '150px', height: 'auto', marginLeft: '-200px'  }} />
            <div className="header-text" style={{ flex: '1', fontFamily: 'Arial, sans-serif', textAlign: 'left', paddingLeft: '20px' }}>
                <h1 style={{ margin: '5px 0', fontSize: '24px' }}>PT. Allure Berkah Sejahtera</h1>
                <p style={{ margin: '2px 0', fontSize: '12px' }}>Concrete & Civil Laboratories, Investigation & Consultant</p>
                <p style={{ margin: '2px 0', fontSize: '12px' }}>Head Office & Laboratory</p>
                <p style={{ margin: '2px 0', fontSize: '12px' }}>Jl. Raya Serang – Cilegon KM4, Drangong, Kec Taktakan, Kota Serang –Banten 42162</p>
                <p style={{ margin: '2px 0', fontSize: '12px' }}>Email: Allure.LabSerang@gmail.com, Mobile: +62 852 1989 8906 / Telp. (0254) 4075 697</p>
            </div>
            <div style={{ flexShrink: '0', marginLeft: '-110px', marginRight: '-200px' }}>
                <table style={{ borderCollapse: 'collapse' }}>
                    <tr>
                        <th colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Form No. III.C</th>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '2px', textAlign: 'left' }}>1 November</td>
                        <td style={{ border: '1px solid black', padding: '2px', textAlign: 'left' }}>2020 Ver. 1.0</td>
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
            <div className="title-penelitian" style={{ width: '30%', marginLeft: '50px', marginBottom: '40px' }}>
                <table style={{ borderCollapse: 'collapse' }}>
                    <tr>
                        <td width="200" style={{ border: '0' }}>Dibuat Untuk</td>
                        <td style={{ border: '0' }}>: PT. HUTAMA KARYA</td>
                    </tr>
                    <tr>
                        <td style={{ border: '0' }} width="200">Proyek</td>
                        <td style={{ border: '0' }}>: PLTU JAWA 9 & 10 SURALAYA</td>
                    </tr>
                    <tr>
                        <td style={{ border: '0' }} width="200">Jenis Benda Uji</td>
                        <td style={{ border: '0' }}>: BESI TULANGAN BETON</td>
                    </tr>
                    <tr>
                        <td style={{ border: '0' }} width="200">Lokasi</td>
                        <td style={{ border: '0' }}>: CILEGON - BANTEN</td>
                    </tr>
                    {/* <tr>
                        <td style={{ border: '0' }} width="200">Lokasi</td>
                        <td style={{ border: '0' }}>: CILEGON - BANTEN</td>
                    </tr> */}
                </table>
            </div>
            <div className="title-penelitian" style={{ width: '30%', marginRight: '50px', marginBottom: '40px'}}>
                <table style={{ borderCollapse: 'collapse' }}>
                    <tr>
                        <td style={{ border: '0' }} width="200">No. Laporank</td>
                        <td style={{ border: '0' }}>: 45/VIA/ABS/VI/2023</td>
                    </tr>
                    <tr>
                        <td style={{ border: '0' }} width="200">Diterima Tanggal</td>
                        <td style={{ border: '0' }}>: 20/06/2023</td>
                    </tr>
                    <tr>
                        <td style={{ border: '0' }} width="200">Dites Oleh</td>
                        <td style={{ border: '0' }}>: ZAHRON</td>
                    </tr>
                    <tr>
                        <td style={{ border: '0' }} width="200">Diverifikasi Oleh</td>
                        <td style={{ border: '0' }}>: HERY. S</td>
                    </tr>
                </table>
            </div>
        </div>
    </section>
);

const DataTableSection = () => (
    <section id="data_tabel" style={{ textAlign: 'center' }}>
        <table style={{ margin: '0 auto', width: '80%', borderCollapse: 'collapse', border: '1px solid black' }}>
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




const FooterSection = () => (
    <section id="footer" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
            <div style={{ flex: 1 }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontStyle: 'italic' }}>Catatan: </p>
                </div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ marginTop: '10px' }}>Detail Gambar: </p>
                    <img src="https://akupintar.id/documents/portlet_file_entry/20143/2+%284%29.png/d8907cd9-a23e-b777-4594-f3355af498cb?imagePreview=1" alt="Center Image" style={{ width: '150px', height: 'auto' }} />
                </div>
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{ textAlign: 'center' }}>
                    <p>Kota, Jakarta, 9 Juni 2024</p>
                    <p>Laboratorium Beton</p>
                    <br />
                    <p style={{ marginBottom: '40px' }}>TTD</p>
                    <p>Nama</p>
                    <p>Kepala Lab</p>
                </div>
            </div>
        </div>
    </section>
);

const Report = () => (
    <div className="container">
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
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p> */}
            <button onClick={handlePrint}>Print</button>
        </div>
    );
}

export default PDFViewer;
