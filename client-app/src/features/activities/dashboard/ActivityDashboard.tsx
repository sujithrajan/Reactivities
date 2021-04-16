import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityForm from "../form/ActivityForm";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
  
  const {activityStore} = useStore();
  const {loadActivities,activityRegistry} = activityStore;

  useEffect(() => {
   if(activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size,loadActivities]);

  
  if(activityStore.loadingInitial) return <LoadingComponent content='Loading App' />
  return (
    <Grid>
      <GridColumn width="10">
        <ActivityList />
      </GridColumn>
      <Grid.Column width="6">
      <ActivityFilters />   
      </Grid.Column>
    </Grid>
  );
})
