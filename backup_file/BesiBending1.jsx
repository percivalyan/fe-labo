// import React, { useEffect, useState } from "react";

// import {
//   createBesiBending,
//   deleteBesiBending,
//   getBesiBending,
//   listBesiBendings,
//   updateBesiBending,
// } from "../services/BesiBending";

// const BesiBending = () => {
//   const [besiBendings, setBesiBendings] = useState([]);
//   const [besiBendingId, setBesiBendingId] = useState("");
//   const [selectedBesiBending, setSelectedBesiBending] = useState("");
//   const [namaBesiBending, setNamaBesiBending] = useState("");
//   const [telp, setTelp] = useState("");
//   const [fax, setFax] = useState("");
//   const [email, setEmail] = useState("");
//   const [errors, setErrors] = useState({
//     namaBesiBending: "",
//     telp: "",
//   });

//   function validateForm() {
//     let valid = true;
//     const errorsCopy = { ...errors };

//     if (namaBesiBending.trim()) {
//       errorsCopy.namaBesiBending = "";
//     } else {
//       errorsCopy.namaBesiBending = "Nama Projek wajib diisi";
//       valid = false;
//     }

//     if (telp.trim()) {
//       errorsCopy.telp = "";
//     } else {
//       errorsCopy.telp = "Telepon / WhatsApp wajib diisi";
//       valid = false;
//     }

//     setErrors(errorsCopy);
//     return valid;
//   }

//   function saveOrUpdateBesiBending(e) {
//     e.preventDefault();

//     if (validateForm()) {
//       const besiBending = { namaBesiBending, telp, fax, email };

//       if (besiBendingId) {
//         updateBesiBending(besiBendingId, besiBending)
//           .then((response) => {
//             console.log(response.data);
//             setBesiBendingId("");
//             setUpdatePopupOpen(false);
//             getAllBesiBendings();
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       } else {
//         createBesiBending(besiBending)
//           .then((response) => {
//             console.log(response.data);
//             setCreatePopupOpen(false);
//             getAllBesiBendings();
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       }
//     }
//   }

//   function getAllBesiBendings() {
//     listBesiBendings()
//       .then((response) => {
//         setBesiBendings(response.data || []);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   useEffect(() => {
//     if (selectedBesiBending) {
//       getBesiBending(selectedBesiBending)
//         .then((response) => {
//           setNamaBesiBending(response.data.namaBesiBending);
//           setTelp(response.data.telp);
//           setFax(response.data.fax);
//           setEmail(response.data.email);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     } else {
//       getAllBesiBendings();
//     }
//   }, [selectedBesiBending]);

//   const removeBesiBending = (id) => {
//     deleteBesiBending(id)
//       .then(() => {
//         setDeletePopupOpen(false);
//         getAllBesiBendings();
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleEdit = (id) => {
//     const selectedBesiBending = besiBendings.find((besiBending) => besiBending.idBesiBending === id);
//     if (selectedBesiBending) {
//       setNamaBesiBending(selectedBesiBending.namaBesiBending);
//       setTelp(selectedBesiBending.telp);
//       setFax(selectedBesiBending.fax);
//       setEmail(selectedBesiBending.email);
//       setBesiBendingId(id);
//       setUpdatePopupOpen(true);
//     } else {
//       console.error(`BesiBending with id ${id} not found.`);
//     }
//   };

//   const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
//   const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
//   const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

//   return (
//     <div className="besiBending">
//       <h2>Besi Bending</h2>

//       <div>
//         <button
//           onClick={() => {
//             setCreatePopupOpen(true);
//             setBesiBendingId("");
//           }}
//           className="btn btn-primary mx-2"
//         >
//           Create Besi Bending
//         </button>
//       </div>

//       {isCreatePopupOpen && (
//         <div className="popup-box">
//           <div className="popup">
//             <h3>Create Besi Bending</h3>
//             <input
//               type="text"
//               name="namaBesiBending"
//               placeholder="Nama Besi Bending"
//               className={` ${errors.namaBesiBending ? "is-invalid" : ""}`}
//               onChange={(e) => setNamaBesiBending(e.target.value)}
//             ></input>
//             {errors.namaBesiBending && (
//               <div className="invalid-feedback"> {errors.namaBesiBending} </div>
//             )}
//             <input
//               type="text"
//               name="telp"
//               placeholder="Telepon / WhatsApp"
//               className={` ${errors.telp ? "is-invalid" : ""}`}
//               onChange={(e) => setTelp(e.target.value)}
//             ></input>
//             {errors.telp && (
//               <div className="invalid-feedback"> {errors.telp} </div>
//             )}
//             <input
//               type="text"
//               name="fax"
//               onChange={(e) => setFax(e.target.value)}
//               placeholder="Fax"
//             />
//             <input
//               type="email"
//               name="email"
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//             />
//             <button onClick={saveOrUpdateBesiBending}>Create</button>
//             <button onClick={() => setCreatePopupOpen(false)}>Cancel</button>

//           </div>
//         </div>
//       )}

//       {isUpdatePopupOpen && (
//         <div className="popup-box">
//           <div className="popup">
//             <h3>Edit Besi Bending</h3>
//             <input
//               type="text"
//               name="namaBesiBending"
//               value={namaBesiBending}
//               className={` ${errors.namaBesiBending ? "is-invalid" : ""}`}
//               onChange={(e) => setNamaBesiBending(e.target.value)}
//             ></input>
//             {errors.namaBesiBending && (
//               <div className="invalid-feedback"> {errors.namaBesiBending} </div>
//             )}
//             <input
//               type="text"
//               name="telp"
//               value={telp}
//               className={` ${errors.telp ? "is-invalid" : ""}`}
//               onChange={(e) => setTelp(e.target.value)}
//             ></input>
//             {errors.telp && (
//               <div className="invalid-feedback"> {errors.telp} </div>
//             )}
//             <input
//               type="text"
//               name="fax"
//               value={fax}
//               onChange={(e) => setFax(e.target.value)}
//               placeholder="Fax"
//             />
//             <input
//               type="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//             />
//             <button onClick={saveOrUpdateBesiBending}>Update</button>
//             <button
//               onClick={() => {
//                 setUpdatePopupOpen(false);
//                 setBesiBendingId("");
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <table>
//         <thead>
//           <tr>
//             <th>Kode Besi Bending</th>
//             <th>Nama Besi Bending</th>
//             <th>Telp/Fax</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {besiBendings.map((besiBending) => (
//             <tr key={besiBending.idBesiBending}>
//               <td>{besiBending.namaBesiBending}</td>
//               <td>{besiBending.telp}</td>
//               <td>{besiBending.fax}</td>
//               <td>{besiBending.email}</td>
//               <td>
//                 <button onClick={() => handleEdit(besiBending.idBesiBending)}>
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => {
//                     setDeletePopupOpen(true);
//                   }}
//                 >
//                   Delete
//                 </button>
//                 {isDeletePopupOpen && (
//                   <div className="popup-box">
//                     <div className="popup">
//                       <h3>Delete Besi Bending</h3>
//                       <p>Are you sure you want to delete this project?</p>
//                       <button onClick={() => removeBesiBending(besiBending.idBesiBending)}>
//                         Yes
//                       </button>
//                       <button
//                         onClick={() => {
//                           setBesiBendingId("");
//                           setDeletePopupOpen(false);
//                         }}
//                       >
//                         No
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BesiBending;

import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

// Dummy data to simulate Besi Bending records
const dummyBesiBendings = [
  {
    idBesiBending: 1,
    dibuatUntuk: "Dibuat Untuk 1",
    proyek: "Proyek 1",
    jenisBendaUji: "Jenis Benda Uji 1",
    lokasi: "Lokasi 1",
    noLaporan: "Laporan 1",
    diterimaTanggal: "2024-06-11",
    ditestOleh: "Tester 1",
    diVerifikasi: "Verifier 1"
  },
  {
    idBesiBending: 2,
    dibuatUntuk: "Dibuat Untuk 2",
    proyek: "Proyek 2",
    jenisBendaUji: "Jenis Benda Uji 2",
    lokasi: "Lokasi 2",
    noLaporan: "Laporan 2",
    diterimaTanggal: "2024-06-12",
    ditestOleh: "Tester 2",
    diVerifikasi: "Verifier 2"
  },
];

const BesiBending = () => {
  const [besiBendings, setBesiBendings] = useState(dummyBesiBendings);
  const [besiBendingId, setBesiBendingId] = useState("");
  const [selectedBesiBending, setSelectedBesiBending] = useState("");
  const [dibuatUntuk, setDibuatUntuk] = useState("");
  const [proyek, setProyek] = useState("");
  const [jenisBendaUji, setJenisBendaUji] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [noLaporan, setNoLaporan] = useState("");
  const [diterimaTanggal, setDiterimaTanggal] = useState("");
  const [ditestOleh, setDitestOleh] = useState("");
  const [diVerifikasi, setDiVerifikasi] = useState("");
  const [errors, setErrors] = useState({
    dibuatUntuk: "",
    proyek: "",
    jenisBendaUji: "",
    lokasi: "",
    noLaporan: "",
    diterimaTanggal: "",
    ditestOleh: "",
    diVerifikasi: ""
  });
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (dibuatUntuk.trim()) {
      errorsCopy.dibuatUntuk = "";
    } else {
      errorsCopy.dibuatUntuk = "Kolom Dibuat Untuk wajib diisi";
      valid = false;
    }

    // Add similar validations for other fields...

    setErrors(errorsCopy);
    return valid;
  }

  function saveOrUpdateBesiBending(e) {
    e.preventDefault();

    if (validateForm()) {
      const besiBending = { dibuatUntuk, proyek, jenisBendaUji, lokasi, noLaporan, diterimaTanggal, ditestOleh, diVerifikasi };

      // Simulating API call for creating or updating Besi Bending
      if (besiBendingId) {
        // Update operation
        console.log("Updating Besi Bending:", besiBending);
      } else {
        // Create operation
        console.log("Creating Besi Bending:", besiBending);
      }
    }
  }

  useEffect(() => {
    // Simulating API call to fetch Besi Bendings
    console.log("Fetching Besi Bendings...");
  }, []);

  const removeBesiBending = (id) => {
    // Simulating API call for deleting Besi Bending
    console.log("Deleting Besi Bending with ID:", id);
  };

  const handleEdit = (id) => {
    const selectedBesiBending = besiBendings.find(
      (besiBending) => besiBending.idBesiBending === id
    );
    if (selectedBesiBending) {
      setDibuatUntuk(selectedBesiBending.dibuatUntuk);
      setProyek(selectedBesiBending.proyek);
      setJenisBendaUji(selectedBesiBending.jenisBendaUji);
      setLokasi(selectedBesiBending.lokasi);
      setNoLaporan(selectedBesiBending.noLaporan);
      setDiterimaTanggal(selectedBesiBending.diterimaTanggal);
      setDitestOleh(selectedBesiBending.ditestOleh);
      setDiVerifikasi(selectedBesiBending.diVerifikasi);
      setBesiBendingId(id);
      setUpdatePopupOpen(true);
    } else {
      console.error(`BesiBending with id ${id} not found.`);
    }
  };

  return (
    <div className="besiBending">
      <h2>Besi Bending</h2>

      <button
        onClick={() => {
          setCreatePopupOpen(true);
          setBesiBendingId("");
        }}
        className="btn btn-primary mx-2"
      >
        Create Besi Bending
      </button>

      {isCreatePopupOpen && (
  <div className="popup-box">
    <div className="popup">
      <h3>Create Besi Bending</h3>
      <form onSubmit={saveOrUpdateBesiBending}>
        <label htmlFor="dibuatUntuk">Dibuat Untuk:</label>
        <input
          type="text"
          id="dibuatUntuk"
          name="dibuatUntuk"
          value={dibuatUntuk}
          onChange={(e) => setDibuatUntuk(e.target.value)}
          required
        />

        <label htmlFor="proyek">Proyek:</label>
        <input
          type="text"
          id="proyek"
          name="proyek"
          value={proyek}
          onChange={(e) => setProyek(e.target.value)}
          required
        />

        <label htmlFor="jenisBendaUji">Jenis Benda Uji:</label>
        <input
          type="text"
          id="jenisBendaUji"
          name="jenisBendaUji"
          value={jenisBendaUji}
          onChange={(e) => setJenisBendaUji(e.target.value)}
          required
        />

        <label htmlFor="lokasi">Lokasi:</label>
        <input
          type="text"
          id="lokasi"
          name="lokasi"
          value={lokasi}
          onChange={(e) => setLokasi(e.target.value)}
          required
        />

        <label htmlFor="noLaporan">No. Laporan:</label>
        <input
          type="text"
          id="noLaporan"
          name="noLaporan"
          value={noLaporan}
          onChange={(e) => setNoLaporan(e.target.value)}
          required
        />

        <label htmlFor="diterimaTanggal">Diterima Tanggal:</label>
        <input
          type="date"
          id="diterimaTanggal"
          name="diterimaTanggal"
          value={diterimaTanggal}
          onChange={(e) => setDiterimaTanggal(e.target.value)}
          required
        />

        <label htmlFor="ditestOleh">Ditest Oleh:</label>
        <input
          type="text"
          id="ditestOleh"
          name="ditestOleh"
          value={ditestOleh}
          onChange={(e) => setDitestOleh(e.target.value)}
          required
        />

        <label htmlFor="diVerifikasi">Di Verifikasi:</label>
        <input
          type="text"
          id="diVerifikasi"
          name="diVerifikasi"
          value={diVerifikasi}
          onChange={(e) => setDiVerifikasi(e.target.value)}
          required
        />

        <button type="submit">Create</button>
        <button type="button" onClick={() => setCreatePopupOpen(false)}>Cancel</button>
      </form>
    </div>
  </div>
)}

{isUpdatePopupOpen && (
  <div className="popup-box">
    <div className="popup">
      <h3>Edit Besi Bending</h3>
      <form onSubmit={saveOrUpdateBesiBending}>
        <label htmlFor="dibuatUntuk">Dibuat Untuk:</label>
        <input
          type="text"
          id="dibuatUntuk"
          name="dibuatUntuk"
          value={dibuatUntuk}
          onChange={(e) => setDibuatUntuk(e.target.value)}
          required
        />

        <label htmlFor="proyek">Proyek:</label>
        <input
          type="text"
          id="proyek"
          name="proyek"
          value={proyek}
          onChange={(e) => setProyek(e.target.value)}
          required
        />

        <label htmlFor="jenisBendaUji">Jenis Benda Uji:</label>
        <input
          type="text"
          id="jenisBendaUji"
          name="jenisBendaUji"
          value={jenisBendaUji}
          onChange={(e) => setJenisBendaUji(e.target.value)}
          required
        />

        <label htmlFor="lokasi">Lokasi:</label>
        <input
          type="text"
          id="lokasi"
          name="lokasi"
          value={lokasi}
          onChange={(e) => setLokasi(e.target.value)}
          required
        />

        <label htmlFor="noLaporan">No. Laporan:</label>
        <input
          type="text"
          id="noLaporan"
          name="noLaporan"
          value={noLaporan}
          onChange={(e) => setNoLaporan(e.target.value)}
          required
        />

        <label htmlFor="diterimaTanggal">Diterima Tanggal:</label>
        <input
          type="date"
          id="diterimaTanggal"
          name="diterimaTanggal"
          value={diterimaTanggal}
          onChange={(e) => setDiterimaTanggal(e.target.value)}
          required
        />

        <label htmlFor="ditestOleh">Ditest Oleh:</label>
        <input
          type="text"
          id="ditestOleh"
          name="ditestOleh"
          value={ditestOleh}
          onChange={(e) => setDitestOleh(e.target.value)}
          required
        />

        <label htmlFor="diVerifikasi">Di Verifikasi:</label>
        <input
          type="text"
          id="diVerifikasi"
          name="diVerifikasi"
          value={diVerifikasi}
          onChange={(e) => setDiVerifikasi(e.target.value)}
          required
        />

        <button type="submit">Update</button>
        <button type="button" onClick={() => {setUpdatePopupOpen(false); setBesiBendingId("");}}>Cancel</button>
      </form>
    </div>
  </div>
)}




      <table>
        <thead>
          <tr>
            <th>Dibuat Untuk</th>
            <th>Proyek</th>
            <th>Jenis Benda Uji</th>
            <th>Lokasi</th>
            <th>No. Laporan</th>
            <th>Diterima Tanggal</th>
            <th>Ditest Oleh</th>
            <th>Di Verifikasi</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {besiBendings.map((besiBending) => (
            <tr key={besiBending.idBesiBending}>
              <td>{besiBending.dibuatUntuk}</td>
              <td>{besiBending.proyek}</td>
              <td>{besiBending.jenisBendaUji}</td>
              <td>{besiBending.lokasi}</td>
              <td>{besiBending.noLaporan}</td>
              <td>{besiBending.diterimaTanggal}</td>
              <td>{besiBending.ditestOleh}</td>
              <td>{besiBending.diVerifikasi}</td>
              <td>
                <button onClick={() => handleEdit(besiBending.idBesiBending)}>
                  Edit
                </button>
                <button onClick={() => removeBesiBending(besiBending.idBesiBending)}>
                  Delete
                </button>
                {/* Tolong ini buatkan agar bisa ambil id dari idBesiBending */}
                <button>
                  <Link to='/besi-bending-hasil'>Hasil</Link>
                </button>
                 {/* Tolong ini buatkan agar bisa ambil id dari idBesiBending */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDeletePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Delete Besi Bending</h3>
            <p>Are you sure you want to delete this record?</p>
            <button onClick={() => removeBesiBending(besiBendingId)}>Yes</button>
            <button onClick={() => setDeletePopupOpen(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BesiBending;

