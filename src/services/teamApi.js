import {
  tasks as defaultTasks,
  teamMembers as defaultTeamMembers,
} from "../data/memberDashboard";
import { getStored, wait } from "./storage";

const TEAM_KEY = "teamflow_team_members_data";
const TASKS_KEY = "teamflow_tasks_data";

// Get team members and count each person's tasks.
async function getTeamMembers() {
  await wait();

  const members = getStored(TEAM_KEY, defaultTeamMembers);
  const tasks = getStored(TASKS_KEY, defaultTasks);
  const today = new Date().toISOString().split("T")[0];

  return members.map(function (member) {
    const memberTasks = tasks.filter(function (task) {
      return task.assignee === member.name;
    });

    const completedTasks = memberTasks.filter(function (task) {
      return task.status === "Done";
    });

    const activeTasks = memberTasks.filter(function (task) {
      return task.status === "In Progress" || task.status === "In Review";
    });

    const overdueTasks = memberTasks.filter(function (task) {
      return task.due < today && task.status !== "Done";
    });

    return {
      ...member,
      assignedTasks: memberTasks.length,
      completedTasks: completedTasks.length,
      inProgressTasks: activeTasks.length,
      overdueTasks: overdueTasks.length,
    };
  });
}

// Get tasks assigned to one team member.
async function getMemberTasks(memberName) {
  await wait(50);

  const tasks = getStored(TASKS_KEY, defaultTasks);
  return tasks.filter(function (task) {
    return task.assignee === memberName;
  });
}

export const teamApi = {
  getTeamMembers,
  getMemberTasks,
};
