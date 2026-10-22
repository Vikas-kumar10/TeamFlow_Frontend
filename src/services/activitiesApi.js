import { activities as defaultActivities } from "../data/memberDashboard";
import { getStored, setStored, wait } from "./storage";

const ACTIVITIES_KEY = "teamflow_activities_data";

// Read saved activity history.
async function getActivities() {
  await wait();
  return getStored(ACTIVITIES_KEY, defaultActivities);
}

// Add a new activity item to the start of the history.
function addActivity(activityData) {
  const activities = getStored(ACTIVITIES_KEY, defaultActivities);

  const newActivity = {
    id: Date.now(),
    kind: activityData.kind || "status",
    text: activityData.text,
    subject: activityData.subject,
    project: activityData.project,
    time: "Just now",
    timestamp: new Date().toISOString(),
    color: activityData.color || "bg-indigo-100 text-indigo-600",
    user: activityData.user || "Marcus Vance",
  };

  const updatedActivities = [newActivity, ...activities];
  setStored(ACTIVITIES_KEY, updatedActivities);
  return updatedActivities;
}

export const activitiesApi = {
  getActivities,
  addActivity,
};
