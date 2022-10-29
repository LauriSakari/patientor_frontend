import { useContext } from "react";
import { Entry } from "../types";
import { StateContext } from "../state";
import React from "react";

type EntriesProps = Entry[];

const Entries = (props: EntriesProps) => {
  if (!props || props.length < 1)return <>No entries</>;


  const propsArray = (Object.values(props));

  const contextState = useContext(StateContext);

  const diagnosisArray = contextState[0].diagnosis;

  const getDiagnosis = (code: string): string | undefined=> {
    const diagnosisObject = diagnosisArray.find(d => d.code === code);
    const diagnosis = diagnosisObject?.name;
    return diagnosis;
  };


  return (
<div>
  {propsArray.map(entry => 
  <div key={entry.id + entry.date}>
    <span key={entry.id}> {entry.date} {entry.description}</span>
    <ul>
      {entry.diagnosisCodes?.map((code) => {
        const diagnosis = getDiagnosis(code);
      return <li key={code}>{code} {diagnosis}</li>;
      }
      )}
    </ul> 
  </div>
  )}
</div>
  );
};

export default Entries;