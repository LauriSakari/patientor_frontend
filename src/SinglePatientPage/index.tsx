import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { addNewEntry, useStateValue } from "../state";
import { StateContext, setSinglePatient } from "../state";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Entries from "../components/Entries";
import { Button } from "@material-ui/core";
import { noEntries } from "../styles";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { Patient } from "../types";


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
    
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
      try {
      const {data: patientWithAddedEntry} = await axios.post<Patient>
      (`${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch(addNewEntry(patientWithAddedEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
    };
    

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
        {patient[id].entries.length === 0 ?
        <div style={noEntries}><>No entries</><br></br></div>
        : <Entries {...patient[id].entries}/>}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />

      <Button variant="contained" color="primary" onClick={openModal}>
        Add New Entry
      </Button>
       </div>;
  };


export default SinglePatientPage;