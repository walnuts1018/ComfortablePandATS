import { getStoredAssignments } from "../entity/assignment/getAssignment";
import { saveAssignmentEntry } from "../entity/assignment/saveAssignment";
import { AssignmentEntry } from "../entity/assignment/types";

const exportAssignmentLists = (hostname: string) => {
    const storedAssignments = getStoredAssignments(hostname);
};
export default exportAssignmentLists;
