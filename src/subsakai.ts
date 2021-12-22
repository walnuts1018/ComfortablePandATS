import { Assignment, CourseSiteInfo } from "./model";
import { getKeys, loadFromLocalStorage2 } from "./storage";
import { convertArrayToAssignment, mergeIntoAssignmentList, sortAssignmentList } from "./utils";
import { createMiniSakaiGeneralized } from "./minisakai";

const subSakaiRoot = document.querySelector("#sub-sakai");

async function updateSubSakai(root: Element) {
  const hostname = (await getKeys())[0];
  let mergedAssignmentList: Array<Assignment>;

  const assignmentList = convertArrayToAssignment(await loadFromLocalStorage2(hostname, "CS_AssignmentList"));
  const quizList = convertArrayToAssignment(await loadFromLocalStorage2(hostname, "CS_QuizList"));
  const assignmentMemoList = convertArrayToAssignment(await loadFromLocalStorage2(hostname, "CS_MemoList"));
  const courseIDs = (await loadFromLocalStorage2(hostname, "CS_CourseInfo")) as Array<CourseSiteInfo>;
  mergedAssignmentList = mergeIntoAssignmentList(assignmentList, quizList);
  mergedAssignmentList = mergeIntoAssignmentList(mergedAssignmentList, assignmentMemoList);
  mergedAssignmentList = sortAssignmentList(mergedAssignmentList);

  createMiniSakaiGeneralized(root, mergedAssignmentList, courseIDs, true, (rendered) => {
    console.log(rendered);
    root.innerHTML = rendered;
  });
}

function addSubSakaiToPopup(): Element | null {
  if (subSakaiRoot == null) return null;
  console.log(subSakaiRoot);
  return subSakaiRoot;
}

async function initSubSakai() {
  const root = addSubSakaiToPopup();
  root && (await updateSubSakai(root));
}

initSubSakai();
