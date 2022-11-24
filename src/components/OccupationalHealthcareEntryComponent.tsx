import { useContext } from "react";
import { StateContext } from "../state";
import { OccupationalHealthcareEntry } from "../types";
import WorkIcon from '@mui/icons-material/Work';
import { entriesStyle } from "../styles";


const OccupationalHealthcareEntryComponent = (entry: OccupationalHealthcareEntry) => {

  const contextState = useContext(StateContext);

  const diagnosisArray = contextState[0].diagnoses;

  const getDiagnosis = (code: string): string | undefined => {
    const diagnosisObject = diagnosisArray.find(d => d.code === code);
    const diagnosis = diagnosisObject?.name;
    return diagnosis;
  };


  return (
    <div style={entriesStyle}>
      <span>{entry.date} <WorkIcon/> {entry.employerName}</span><br></br>
      <span> {entry.description} </span><br></br>
      <span>Diagnose by: {entry.specialist}</span>

      {!entry.diagnosisCodes ?
        <></>
        : <ul>
          {entry.diagnosisCodes?.map((code) => {
            const diagnosis = getDiagnosis(code);
            return <li key={code}>{code} {diagnosis}</li>;
          }
          )}
        </ul>
      }
      {!entry.sickLeave ?
        <></>
        :<>
          <span>Sickleave start date: {entry.sickLeave?.startDate}</span><br></br>
          <span>Sickleave end date: {entry.sickLeave?.endDate}</span>
        </>}
    </div>);
};

export default OccupationalHealthcareEntryComponent;