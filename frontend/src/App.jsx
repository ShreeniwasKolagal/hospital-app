import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
// import EntryPage from "./components/EntryPage.jsx";
import Home from "./components/Home.jsx";
import DoctorHome from "./components/DoctorHome.jsx";
import PatientHome from "./components/PatientHome.jsx";
import NurseHome from "./components/NurseHome.jsx";
import UpdatePatientDetails from "./components/UpdatePatientDetails.jsx";
import AddPatient from "./components/AddPatient.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/doctor-home" element={<DoctorHome />} />
            <Route path="/nurse-home" element={<NurseHome />} />
            <Route path="/patient-home" element={<PatientHome />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route
              path="/update-patient-details"
              element={<UpdatePatientDetails />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
