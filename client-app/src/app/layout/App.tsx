import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import NavBar from "./navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<Activity|undefined>(undefined);
  const [editmode,setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  function handleSelectActivity(id:string){
     setSelectedActivity(activities.find(x=>x.id ===id))
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id?:string){
    id? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity:Activity){
    activity.id
    ? setActivities([...activities.filter(x=>x.id !== activity.id),activity]) // filter the activities and then add the new activity
    : setActivities([...activities,{...activity,id:uuid()}]);// spread operator - adding new activity
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x=>x.id !== id)]);
  }
  return (
    <>
      <NavBar  openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
       <ActivityDashboard 
       activities={activities} 
       selectedActivity={selectedActivity}
       selectActivity={handleSelectActivity}
       cancelSelectActivity={handleCancelSelectActivity}
       editMode={editmode}
       openForm={handleFormOpen}
       closeForm={handleFormClose}
       createOrEdit={handleCreateOrEditActivity}
       deleteActivity={handleDeleteActivity}
       />       
      </Container>
    </>
  );
}

export default App;
