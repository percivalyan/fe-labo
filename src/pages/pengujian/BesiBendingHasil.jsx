import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const dummyBesiBendings = [
  {
    "No": 1,
    "Code": "Code 1",
    "GRADE": "GRADE 1",
    "Nominal Diameter (mm)": 10,
    "Pin Diameter (mm)": 5,
    "Joint Distance (mm)": 15,
    "Angle of Bend (degree)": 90,
    "Maximum Force (KN)": 20,
    "VISUAL DESCRIPTION": "Description 1"
  },
  {
    "No": 2,
    "Code": "Code 2",
    "GRADE": "GRADE 2",
    "Nominal Diameter (mm)": 15,
    "Pin Diameter (mm)": 7,
    "Joint Distance (mm)": 20,
    "Angle of Bend (degree)": 120,
    "Maximum Force (KN)": 30,
    "VISUAL DESCRIPTION": "Description 2"
  },
];

const BesiBendingHasil = () => {
  const [besiBendings, setBesiBendings] = useState(dummyBesiBendings);
  const [besiBendingId, setBesiBendingId] = useState("");
  const [no, setNo] = useState("");
  const [code, setCode] = useState("");
  const [grade, setGrade] = useState("");
  const [nominalDiameter, setNominalDiameter] = useState("");
  const [pinDiameter, setPinDiameter] = useState("");
  const [jointDistance, setJointDistance] = useState("");
  const [angleOfBend, setAngleOfBend] = useState("");
  const [maximumForce, setMaximumForce] = useState("");
  const [visualDescription, setVisualDescription] = useState("");
  const [errors, setErrors] = useState({
    no: "",
    code: "",
    grade: "",
    nominalDiameter: "",
    pinDiameter: "",
    jointDistance: "",
    angleOfBend: "",
    maximumForce: "",
    visualDescription: ""
  });
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (no.trim()) {
      errorsCopy.no = "";
    } else {
      errorsCopy.no = "No wajib diisi";
      valid = false;
    }

    // Add similar validations for other fields...

    setErrors(errorsCopy);
    return valid;
  }

  function saveOrUpdateBesiBending(e) {
    e.preventDefault();

    if (validateForm()) {
      const besiBending = { no, code, grade, "Nominal Diameter (mm)": nominalDiameter, "Pin Diameter (mm)": pinDiameter, "Joint Distance (mm)": jointDistance, "Angle of Bend (degree)": angleOfBend, "Maximum Force (KN)": maximumForce, "VISUAL DESCRIPTION": visualDescription };

      // Simulating API call for creating or updating Besi Bending
      if (besiBendingId) {
        // Update operation
        const updatedBesiBendings = besiBendings.map(besiBending => {
          if (besiBending.No === besiBendingId) {
            return besiBending;
          }
          return besiBending;
        });
        setBesiBendings(updatedBesiBendings);
        setUpdatePopupOpen(false);
        setBesiBendingId("");
      } else {
        // Create operation
        const newBesiBendings = [...besiBendings, besiBending];
        setBesiBendings(newBesiBendings);
        setCreatePopupOpen(false);
      }

      // Reset form fields
      setNo("");
      setCode("");
      setGrade("");
      setNominalDiameter("");
      setPinDiameter("");
      setJointDistance("");
      setAngleOfBend("");
      setMaximumForce("");
      setVisualDescription("");
    }
  }

  useEffect(() => {
    // Simulating API call to fetch Besi Bendings
    console.log("Fetching Besi Bendings...");
  }, []);

  const removeBesiBending = (id) => {
    // Simulating API call for deleting Besi Bending
    console.log("Deleting Besi Bending with ID:", id);
    const updatedBesiBendings = besiBendings.filter(besiBending => besiBending.No !== id);
    setBesiBendings(updatedBesiBendings);
    setDeletePopupOpen(false);
  };

  const handleEdit = (id) => {
    const selectedBesiBending = besiBendings.find(
      (besiBending) => besiBending.No === id
    );
    if (selectedBesiBending) {
      setNo(selectedBesiBending.No);
      setCode(selectedBesiBending.Code);
      setGrade(selectedBesiBending.GRADE);
      setNominalDiameter(selectedBesiBending["Nominal Diameter (mm)"]);
      setPinDiameter(selectedBesiBending["Pin Diameter (mm)"]);
      setJointDistance(selectedBesiBending["Joint Distance (mm)"]);
      setAngleOfBend(selectedBesiBending["Angle of Bend (degree)"]);
      setMaximumForce(selectedBesiBending["Maximum Force (KN)"]);
      setVisualDescription(selectedBesiBending["VISUAL DESCRIPTION"]);
      setBesiBendingId(id);
      setUpdatePopupOpen(true);
    } else {
      console.error(`BesiBending with id ${id} not found.`);
    }
  };

  return (
    <div className="besiBending">
      <h2>Hasil  Besi Bending</h2>

      <button
        onClick={() => {
          setCreatePopupOpen(true);
          setBesiBendingId("");
          }}
          className="btn btn-primary mx-2"
          >
          Create Hasil Pengujian
          </button>
          {isCreatePopupOpen && (
    <div className="popup-box">
      <div className="popup">
        <h3>Create Hasil Pengujian</h3>
        <form onSubmit={saveOrUpdateBesiBending}>
          <label htmlFor="no">No:</label>
          <input
            type="text"
            id="no"
            name="no"
            value={no}
            onChange={(e) => setNo(e.target.value)}
            required
          />

          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <label htmlFor="grade">GRADE:</label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />

          <label htmlFor="nominalDiameter">Nominal Diameter (mm):</label>
          <input
            type="number"
            id="nominalDiameter"
            name="nominalDiameter"
            value={nominalDiameter}
            onChange={(e) => setNominalDiameter(e.target.value)}
            required
          />

          <label htmlFor="pinDiameter">Pin Diameter (mm):</label>
          <input
            type="number"
            id="pinDiameter"
            name="pinDiameter"
            value={pinDiameter}
            onChange={(e) => setPinDiameter(e.target.value)}
            required
          />

          <label htmlFor="jointDistance">Joint Distance (mm):</label>
          <input
            type="number"
            id="jointDistance"
            name="jointDistance"
            value={jointDistance}
            onChange={(e) => setJointDistance(e.target.value)}
            required
          />

          <label htmlFor="angleOfBend">Angle of Bend (degree):</label>
          <input
            type="number"
            id="angleOfBend"
            name="angleOfBend"
            value={angleOfBend}
            onChange={(e) => setAngleOfBend(e.target.value)}
            required
          />

          <label htmlFor="maximumForce">Maximum Force (KN):</label>
          <input
            type="number"
            id="maximumForce"
            name="maximumForce"
            value={maximumForce}
            onChange={(e) => setMaximumForce(e.target.value)}
            required
          />

          <label htmlFor="visualDescription">Visual Description:</label>
          <input
            type="text"
            id="visualDescription"
            name="visualDescription"
            value={visualDescription}
            onChange={(e) => setVisualDescription(e.target.value)}
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
          <label htmlFor="no">No:</label>
          <input
            type="text"
            id="no"
            name="no"
            value={no}
            onChange={(e) => setNo(e.target.value)}
            required
          />

          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <label htmlFor="grade">GRADE:</label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />

          <label htmlFor="nominalDiameter">Nominal Diameter (mm):</label>
          <input
            type="number"
            id="nominalDiameter"
            name="nominalDiameter"
            value={nominalDiameter}
            onChange={(e) => setNominalDiameter(e.target.value)}
            required
          />

          <label htmlFor="pinDiameter">Pin Diameter (mm):</label>
          <input
            type="number"
            id="pinDiameter"
            name="pinDiameter"
            value={pinDiameter}
            onChange={(e) => setPinDiameter(e.target.value)}
            required
          />

          <label htmlFor="jointDistance">Joint Distance (mm):</label>
          <input
            type="number"
            id="jointDistance"
            name="jointDistance"
            value={jointDistance}
            onChange={(e) => setJointDistance(e.target.value)}
            required
          />

          <label htmlFor="angleOfBend">Angle of Bend (degree):</label>
          <input
            type="number"
            id="angleOfBend"
            name="angleOfBend"
            value={angleOfBend}
            onChange={(e) => setAngleOfBend(e.target.value)}
            required
          />

          <label htmlFor="maximumForce">Maximum Force (KN):</label>
          <input
            type="number"
            id="maximumForce"
            name="maximumForce"
            value={maximumForce}
            onChange={(e) => setMaximumForce(e.target.value)}
            required
          />

          <label htmlFor="visualDescription">Visual Description:</label>
          <input
            type="text"
            id="visualDescription"
            name="visualDescription"
            value={visualDescription}
            onChange={(e) => setVisualDescription(e.target.value)}
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
        <th>No</th>
        <th>Code</th>
        <th>GRADE</th>
        <th>Nominal Diameter (mm)</th>
        <th>Pin Diameter (mm)</th>
        <th>Joint Distance (mm)</th>
        <th>Angle of Bend (degree)</th>
        <th>Maximum Force (KN)</th>
        <th>VISUAL DESCRIPTION</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {besiBendings.map((besiBending, index) => (
        <tr key={index}>
          <td>{besiBending.No}</td>
          <td>{besiBending.Code}</td>
          <td>{besiBending.GRADE}</td>
          <td>{besiBending["Nominal Diameter (mm)"]}</td>
          <td>{besiBending["Pin Diameter (mm)"]}</td>
              <td>{besiBending["Joint Distance (mm)"]}</td>
              <td>{besiBending["Angle of Bend (degree)"]}</td>
              <td>{besiBending["Maximum Force (KN)"]}</td>
              <td>{besiBending["VISUAL DESCRIPTION"]}</td>
              <td>
                <button onClick={() => handleEdit(besiBending.No)}>
                  Edit
                </button>
                <button onClick={() => setDeletePopupOpen(true)}>
                  Delete
                </button>
                 {/* Tolong ini buatkan agar bisa ambil id dari idBesiBending */}
                 <button>
                 <Link to='/pdf'>Hasil</Link>
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

export default BesiBendingHasil;
