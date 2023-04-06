import { getAssignments } from "../entity/assignment/getAssignment";
import { Settings } from "../setting/types";
import { getStoredSettings } from "../setting/getSetting";
import { PostMessage } from "./type";
import { getSakaiCourses } from "../course/getCourse";

export const exportAssignmentLists = async (hostname: string) => {

    const storedAssignments = await getAssignments(hostname, getSakaiCourses(), false);
    const setting = await getStoredSettings(hostname);
    const message :PostMessage = {
      data: storedAssignments,
      url: setting.appInfo.apiServerURL,
    }

    if (setting.appInfo.useIntegrationModule){
      chrome.runtime.sendMessage(
        message,
        (response) => {
          console.log(response);
        }
      );
    }

};
