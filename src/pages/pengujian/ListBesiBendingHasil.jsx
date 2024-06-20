import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBesiBendingBekukByHeaderId } from "../../services/BesiBendingBekuk";

const ListBesiBendingHasil = () => {
  const [results, setResults] = useState([]);

  const { headerVIAId } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (headerVIAId) {
      getBesiBendingBekukByHeaderId(headerVIAId)
        .then((response) => {
          console.log(response);
          setResults(response);
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    }
  }, [headerVIAId]);

  function printPDF(id) {
    navigator(`/pdf/${id}/print`);
  }

  return (
    <div className="besiBending">
      <table>
        <thead>
          <tr>
            {/* <th>No</th> */}
            <th>Code</th>
            <th>GRADE</th>
            <th>Nominal Diameter (mm)</th>
            <th>Pin Diameter (mm)</th>
            <th>Join Distance (mm)</th>
            <th>Angle of Bend (degree)</th>
            <th>Maximum Force (KN)</th>
            <th>VISUAL DESCRIPTION</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results &&
            results.map((besiBending, index) => (
              <tr key={index}>
                {/* <td>{besiBending.index}</td> */}
                <td>{besiBending.code}</td>
                <td>{besiBending.grade}</td>
                <td>{besiBending.nominalDiameter}</td>
                <td>{besiBending.pinDiameter}</td>
                <td>{besiBending.joinDistance}</td>
                <td>{besiBending.angleOfBend}</td>
                <td>{besiBending.maxForce}</td>
                <td>{besiBending.visualDescription}</td>
                <td>
                  {/* <button onClick={() => handleEdit(besiBending.No)}>
                  Edit
                </button>
                <button onClick={() => setDeletePopupOpen(true)}>
                  Delete
                </button> */}
                  {/* Tolong ini buatkan agar bisa ambil id dari idBesiBending */}
                  <button onClick={printPDF(headerVIAId)}>Hasil</button>
                  {/* Tolong ini buatkan agar bisa ambil id dari idBesiBending */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* {isDeletePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Delete Besi Bending</h3>
            <p>Are you sure you want to delete this record?</p>
            <button onClick={() => removeBesiBending(besiBendingId)}>Yes</button>
            <button onClick={() => setDeletePopupOpen(false)}>No</button>
          </div>
        </div>
      )} */}
    </div>
  );
};
export default ListBesiBendingHasil;
