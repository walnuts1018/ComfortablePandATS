import { getStoredAssignments } from "../entity/assignment/getAssignment";
import { Settings } from "../setting/types";

export const exportAssignmentLists = (hostname: string) => {

    const storedAssignments = getStoredAssignments(hostname);

    chrome.runtime.sendMessage(
        {
          contentScriptQuery: 'post',
          endpoint: 'https://httpbssin.org/post'
        },
        (response) => {
          console.log(response);
        }
      );
};

