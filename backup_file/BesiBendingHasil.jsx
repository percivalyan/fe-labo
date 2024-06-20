import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createBesiBendingBekuk } from "../../services/BesiBendingBekuk";

const BesiBendingHasil = () => {
  const [besiBendings, setBesiBendings] = useState([]);
  const [besiBendingId, setBesiBendingId] = useState("");
  const [code, setCode] = useState("");
  const [grade, setGrade] = useState("");
  const [nominalDiameter, setNominalDiameter] = useState("");
  const [pinDiameter, setPinDiameter] = useState("");
  const [joinDistance, setJoinDistance] = useState("");
  const [angleOfBend, setAngleOfBend] = useState("");
  const [maxForce, setMaxForce] = useState("");
  const [visualDescription, setVisualDescription] = useState("");

  const { headerVIAId } = useParams();
  // const [errors, setErrors] = useState({
  //   no: "",
  //   code: "",
  //   grade: "",
  //   nominalDiameter: "",
  //   pinDiameter: "",
  //   joinDistance: "",
  //   angleOfBend: "",
  //   maxForce: "",
  //   visualDescription: ""
  // });

  // const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  // const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  // function validateForm() {
  //   let valid = true;
  //   const errorsCopy = { ...errors };

  //   if (no.trim()) {
  //     errorsCopy.no = "";
  //   } else {
  //     errorsCopy.no = "No wajib diisi";
  //     valid = false;
  //   }

  //   // Add similar validations for other fields...

  //   setErrors(errorsCopy);
  //   return valid;
  // }

  function saveData(e) {
    e.preventDefault();
    if (besiBendingBekuks.length === 0) {
      alert("Data Request tidak boleh kosong!");
      return;
    }
    const besiBendingBekuk = [
      {
        code,
        grade,
        nominalDiameter: parseFloat(nominalDiameter),
        pinDiameter: parseFloat(pinDiameter),
        joinDistance: parseFloat(joinDistance),
        angleOfBend: parseFloat(angleOfBend),
        maxForce: parseFloat(maxForce),
        visualDescription,
      },
    ];
    if (headerVIAId) {
      createBesiBendingBekuk(headerVIAId, besiBendingBekuk)
        .then((response) => {
          console.log(response.data);
          navigator("/pdf");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("Error");
    }
  }

  const [besiBendingBekuks, setBesiBendingBekuks] = useState([]);
  let [inputData, setInputData] = useState({
    code,
    grade,
    nominalDiameter: parseFloat(nominalDiameter),
    pinDiameter: parseFloat(pinDiameter),
    joinDistance: parseFloat(joinDistance),
    angleOfBend: parseFloat(angleOfBend),
    maxForce: parseFloat(maxForce),
    visualDescription,
  });
  //Tombol Add Dynamic Input
  const addData = () => {
    setBesiBendingBekuks([
      ...besiBendingBekuks,
      {
        code,
        grade,
        nominalDiameter: parseFloat(nominalDiameter),
        pinDiameter: parseFloat(pinDiameter),
        joinDistance: parseFloat(joinDistance),
        angleOfBend: parseFloat(angleOfBend),
        maxForce: parseFloat(maxForce),
        visualDescription,
      },
    ]);
    setInputData({
      code: "",
      grade: "",
      nominalDiameter: "",
      pinDiameter: "",
      joinDistance: "",
      angleOfBend: "",
      maxForce: "",
      visualDescription: "",
    });
    // setSelectedMyService("");
    // setSelectedServiceType("");
  };
  const handleDelete = (i) => {
    console.log(i, "this index row want to be delete");
    const deleteVal = [...besiBendingBekuks];
    deleteVal.splice(i, 1);
    setBesiBendingBekuks(deleteVal);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let validValue = value;

    setInputData({ ...inputData, [name]: validValue });
  };

  // const handleEdit = (id) => {
  //   const selectedBesiBending = besiBendings.find(
  //     (besiBending) => besiBending.No === id
  //   );
  //   if (selectedBesiBending) {
  //     setNo(selectedBesiBending.No);
  //     setCode(selectedBesiBending.Code);
  //     setGrade(selectedBesiBending.GRADE);
  //     setNominalDiameter(selectedBesiBending["Nominal Diameter (mm)"]);
  //     setPinDiameter(selectedBesiBending["Pin Diameter (mm)"]);
  //     setJoinDistance(selectedBesiBending["Joint Distance (mm)"]);
  //     setAngleOfBend(selectedBesiBending["Angle of Bend (degree)"]);
  //     setMaxForce(selectedBesiBending["Maximum Force (KN)"]);
  //     setVisualDescription(selectedBesiBending["VISUAL DESCRIPTION"]);
  //     setBesiBendingId(id);
  //     setUpdatePopupOpen(true);
  //   } else {
  //     console.error(`BesiBending with id ${id} not found.`);
  //   }
  // };

  return (
    <div className="besiBending">
      <div className="form-container">
        <h2>Hasil Besi Bending</h2>
        <form onSubmit={addData}>
          <fieldset>
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

            <label htmlFor="joinDistance">Join Distance (mm):</label>
            <input
              type="number"
              id="joinDistance"
              name="joinDistance"
              value={joinDistance}
              onChange={(e) => setJoinDistance(e.target.value)}
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

            <label htmlFor="maxForce">Maximum Force (KN):</label>
            <input
              type="number"
              id="maxForce"
              name="maxForce"
              value={maxForce}
              onChange={(e) => setMaxForce(e.target.value)}
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

            <button type="submit">ADD DATA</button>
          </fieldset>
        </form>
      </div>

      {/* {isUpdatePopupOpen && (
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

          <label htmlFor="joinDistance">Joint Distance (mm):</label>
          <input
            type="number"
            id="joinDistance"
            name="joinDistance"
            value={joinDistance}
            onChange={(e) => setJoinDistance(e.target.value)}
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

          <label htmlFor="maxForce">Maximum Force (KN):</label>
          <input
            type="number"
            id="maxForce"
            name="maxForce"
            value={maxForce}
            onChange={(e) => setMaxForce(e.target.value)}
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
  )} */}

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
          {besiBendingBekuks &&
            besiBendingBekuks.map((besiBending, index) => (
              <tr key={index}>
                {/* <td>{besiBending.index}</td> */}
                <td>{besiBending.Code}</td>
                <td>{besiBending.GRADE}</td>
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
                  <button>
                    <Link to="/pdf">Hasil</Link>
                  </button>
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
export default BesiBendingHasil;
