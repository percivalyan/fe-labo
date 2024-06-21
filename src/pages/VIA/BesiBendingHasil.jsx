import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createBesiBendingBekuk } from "../../services/VIA/BesiBendingBekuk";

const BesiBendingHasil = () => {
  const { headerVIAId } = useParams();

  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const navigator = useNavigate();

  function saveData(e) {
    e.preventDefault();
    if (besiBendingBekuks.length === 0) {
      alert("Data Request tidak boleh kosong!");
      return;
    }
    const dataToSave = besiBendingBekuks.map((item) => ({
      code: item.code,
      grade: item.grade,
      nominalDiameter: item.nominalDiameter,
      pinDiameter: item.pinDiameter,
      joinDistance: item.joinDistance,
      angleOfBend: item.angleOfBend,
      maxForce: item.maxForce,
      visualDescription: item.visualDescription,
    }));
    if (headerVIAId) {
      createBesiBendingBekuk(headerVIAId, dataToSave)
        .then((response) => {
          console.log(response.data);
          navigator(`/${headerVIAId}/besi-bending`);
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
    code: "",
    grade: "",
    nominalDiameter: "",
    pinDiameter: "",
    joinDistance: "",
    angleOfBend: "",
    maxForce: "",
    visualDescription: "",
  });
  let {
    code,
    grade,
    nominalDiameter,
    pinDiameter,
    joinDistance,
    angleOfBend,
    maxForce,
    visualDescription,
  } = inputData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  //Tombol Add Dynamic Input
  const handleClick = () => {
    setBesiBendingBekuks([
      ...besiBendingBekuks,
      {
        code: inputData.code,
        grade: inputData.grade,
        nominalDiameter: parseFloat(inputData.nominalDiameter),
        pinDiameter: parseFloat(inputData.pinDiameter),
        joinDistance: parseFloat(inputData.joinDistance),
        angleOfBend: parseFloat(inputData.angleOfBend),
        maxForce: parseFloat(inputData.maxForce),
        visualDescription: inputData.visualDescription,
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
  };
  const handleDelete = (i) => {
    console.log(i, "this index row want to be delete");
    const deleteVal = [...besiBendingBekuks];
    deleteVal.splice(i, 1);
    setBesiBendingBekuks(deleteVal);
  };

  return (
    <div className="besiBending">
      <div className="form-container">
        <h2>Hasil Besi Bending</h2>
        <form>
          <fieldset>
            <label htmlFor="code">Code:</label>
            <input
              type="text"
              id="code"
              name="code"
              value={code || inputData.code}
              onChange={handleChange}
              className="form-control"
              required
            />

            <label htmlFor="grade">GRADE:</label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={grade || inputData.grade}
              onChange={handleChange}
              className="form-control"
              required
            />

            <label htmlFor="nominalDiameter">Nominal Diameter (mm):</label>
            <input
              type="number"
              id="nominalDiameter"
              name="nominalDiameter"
              value={nominalDiameter || inputData.nominalDiameter}
              onChange={handleChange}
              className="form-control"
              required
            />

            <label htmlFor="pinDiameter">Pin Diameter (mm):</label>
            <input
              type="number"
              id="pinDiameter"
              name="pinDiameter"
              value={pinDiameter || inputData.pinDiameter}
              onChange={handleChange}
              className="form-control"
              required
            />

            <label htmlFor="joinDistance">Join Distance (mm):</label>
            <input
              type="number"
              id="joinDistance"
              name="joinDistance"
              value={joinDistance || inputData.joinDistance}
              onChange={handleChange}
              className="form-control"
              required
            />

            <label htmlFor="angleOfBend">Angle of Bend (degree):</label>
            <input
              type="number"
              id="angleOfBend"
              name="angleOfBend"
              value={angleOfBend || inputData.angleOfBend}
              onChange={handleChange}
              className="form-control"
              required
            />

            <label htmlFor="maxForce">Maximum Force (KN):</label>
            <input
              type="number"
              id="maxForce"
              name="maxForce"
              value={maxForce || inputData.maxForce}
              onChange={handleChange}
              required
              className="form-control"
            />

            <label htmlFor="visualDescription">Visual Description:</label>
            <input
              type="text"
              id="visualDescription"
              name="visualDescription"
              value={visualDescription || inputData.visualDescription}
              onChange={handleChange}
              className="form-control"
              required
            />

            <button onClick={handleClick}>ADD DATA</button>
          </fieldset>
        </form>
      </div>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {besiBendingBekuks &&
            besiBendingBekuks.map((besiBending, index) => (
              <tr key={index}>
                <td>{besiBending.index}</td>
                <td>{besiBending.code}</td>
                <td>{besiBending.grade}</td>
                <td>{besiBending.nominalDiameter}</td>
                <td>{besiBending.pinDiameter}</td>
                <td>{besiBending.joinDistance}</td>
                <td>{besiBending.angleOfBend}</td>
                <td>{besiBending.maxForce}</td>
                <td>{besiBending.visualDescription}</td>
                <td>
                  <button onClick={() => setDeletePopupOpen(true)}>
                    Delete
                  </button>
                  <button>
                    <Link to="/pdf">Hasil</Link>
                  </button>
                  {isDeletePopupOpen && (
                    <div className="popup-box">
                      <div className="popup">
                        <h3>Delete Besi Bending</h3>
                        <p>Are you sure you want to delete this record?</p>
                        <button onClick={() => handleDelete(index)}>Yes</button>
                        <button onClick={() => setDeletePopupOpen(false)}>
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={saveData}>SIMPAN DATA</button>
    </div>
  );
};
export default BesiBendingHasil;
