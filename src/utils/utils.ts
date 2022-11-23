import { useContext } from "react";
import { StateContext } from "../state";


    const contextState = useContext(StateContext);

    const diagnosisArray = contextState[0].diagnoses;

  const getDiagnosis = (code: string): string | undefined=> {
    const diagnosisObject = diagnosisArray.find(d => d.code === code);
    const diagnosis = diagnosisObject?.name;
    return diagnosis;
  };


export default getDiagnosis;