import { useContext } from "react";
import { StateContext } from "../state";
import { entriesStyle } from "../styles";
import { HospitalEntry } from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntryComponent = (entry: HospitalEntry) => {

    const contextState = useContext(StateContext);

    const diagnosisArray = contextState[0].diagnoses;

    const getDiagnosis = (code: string): string | undefined=> {
        const diagnosisObject = diagnosisArray.find(d => d.code === code);
        const diagnosis = diagnosisObject?.name;
        return diagnosis;
      };

    return (  
        <div style={entriesStyle}>
        <span> {entry.date} <LocalHospitalIcon/><br></br> {entry.description}</span>
        <span>Doctor: {entry.specialist}</span>
        <ul>
          {entry.diagnosisCodes?.map((code) => {
            const diagnosis = getDiagnosis(code);
          return <li key={code}>{code} {diagnosis}</li>;
          }
          )}
        </ul> 
        <span>Discharge: {entry.discharge.date}</span> <br></br>
        <span>Criteria: {entry.discharge.criteria}</span>
      </div>
      );
};

export default HospitalEntryComponent;