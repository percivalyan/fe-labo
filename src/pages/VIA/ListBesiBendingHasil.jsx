import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBesiBendingBekukByHeaderId } from "../../services/VIA/BesiBendingBekuk";

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
    } else {
      console.log("Error");
    }
  }, [headerVIAId]);

  function printPDF(id) {
    navigator(`/pdf/${id}/print`);
  }

  return (
    <div className="besiBending">
      <h2>LIST HASIL DATA PENGUJIAN</h2>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Code</th>
            <th>GRADE</th>
            <th>Nominal Diameter (mm)</th>
            <th>Pin Diameter (mm)</th>
            <th>Join Distance (mm)</th>
            <th>Angle of Bend (degree)</th>
            <th>Maximum Force (KN)</th>
            <th>VISUAL DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          {results &&
            results.map((besiBending, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{besiBending.code}</td>
                <td>{besiBending.grade}</td>
                <td>{besiBending.nominalDiameter}</td>
                <td>{besiBending.pinDiameter}</td>
                <td>{besiBending.joinDistance}</td>
                <td>{besiBending.angleOfBend}</td>
                <td>{besiBending.maxForce}</td>
                <td>{besiBending.visualDescription}</td>
              </tr>
            ))}
        </tbody>
        <button onClick={() => printPDF(headerVIAId)}>Cetak</button>
      </table>
    </div>
  );
};
export default ListBesiBendingHasil;
