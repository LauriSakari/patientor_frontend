
import { Entry } from "../types";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareEntryComponent";
import HealthCheckEntry from "./HealthCheckEntryComponent";
import HospitalEntryComponent from "./HospitalEntryComponent";


type EntriesProps =  Entry[];

const Entries = (props: EntriesProps) => {
  if (!props || props.length < 1)return <>No entries</>;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent  {...entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComponent {...entry}/>;
    case "HealthCheck":
      return <HealthCheckEntry {...entry}/>;
    default:
      return assertNever(entry);
    }
  };

  const propsArray = (Object.values(props));

  return (
    <div>
      {propsArray.map(entry =>
        <EntryDetails key={entry.id} entry={entry} />
      )}
    </div>
  );
};

export default Entries;