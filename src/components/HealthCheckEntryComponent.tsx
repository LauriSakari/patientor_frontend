import { entriesStyle } from "../styles";
import { HealthCheckEntry } from "../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';


const HealthCheckEntryComponent = (entry: HealthCheckEntry) => {

  console.log(entry.healthCheckRating);

const checkHealthRating = (rating: number) => {
  switch (rating) {
    case 0: return <FavoriteIcon color={"success"}/>;
    case 1: return <FavoriteIcon sx={{color: "#FFFF00"}}/>;
    case 2: return <FavoriteIcon color={"warning"}/>;
    case 3: return <FavoriteIcon/>;
  }
};

return (
  <div style={entriesStyle}>
    <span> {entry.date} <MedicalInformationIcon/> <br></br> {entry.description}</span><br></br>
    <span>{checkHealthRating(entry.healthCheckRating)} </span><br></br>
    <span>Diagnose by: {entry.specialist}</span>
  </div>);
};

export default HealthCheckEntryComponent;