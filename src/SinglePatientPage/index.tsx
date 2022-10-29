import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { StateContext, setSinglePatient } from "../state";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Entries from "../components/Entries";


const genderIs = (gender: string) => {
    if (gender === "male") {
        return <MaleIcon/>;
    } 
    if (gender === "female") {
        return <FemaleIcon/>;
    }
    if (gender === "other") {
        return <></>;
    }
  };

const isString = (id: unknown): id is string => {
    return typeof id === 'string' || id instanceof String;
  };

const SinglePatientPage = () => {
    
    const { id } = useParams<{ id: string }>();
    if (!id || !isString(id)) {
        throw new Error('Error: no patient found');
    }
    const [, dispatch] = useStateValue();

    const contextState = useContext(StateContext);

    const patient = contextState[0].singlePatient;

    

    useEffect(() => {
        if (!contextState[0].singlePatient[id] ) {
        void fetchPatient(id);
        }
    },[]);

        const fetchPatient = async (id: string) => {
            try {
              const { data: patientFromApi } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
              );
              dispatch(setSinglePatient(patientFromApi));
            } catch (e) {
              console.error(e);
              //setError("Error fetching patient info");
            }
          };

    if (Object.values(patient).length === 0 || !patient[id]) {
        return <p>loading...</p>;
    }
    

    return <div>
        <h1>Name: {patient[id].name} {genderIs(patient[id].gender)}</h1> 
        <span>Ssn: {patient[id].ssn}</span> <br></br>
        <span>Occupation: {patient[id].occupation}</span>
        <h2>Entries</h2>
        {patient[id].entries.length == 0 ?
        <>No entries</>
        : <Entries {...patient[id].entries}/>}
       </div>;
  };


export default SinglePatientPage;