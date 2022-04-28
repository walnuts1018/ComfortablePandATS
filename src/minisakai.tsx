import { DueCategory } from "./model";
import { getDaysUntil, getSakaiTheme, nowTime } from "./utils";
import { hamburger, miniSakai } from "./dom";
// @ts-ignore
import { loadConfigs } from "./settings";
import React from "react";
import { createRoot } from "react-dom/client";
import { MiniSakaiRoot } from "./components/main";
import { EntityProtocol, EntryProtocol } from "./features/entity/type";

/**
 * Create a button to open miniSakai
 */
export function createMiniSakaiBtn(): void {
    const topbar = document.getElementById("mastLogin");
    try {
        topbar?.appendChild(hamburger);
    } catch (e) {
        console.log("could not launch miniSakai.");
    }
}

/**
 * Insert miniSakai into Sakai.
 */
export function createMiniSakai() {
    const parent = document.getElementById("pageBody");
    const ref = document.getElementById("toolMenuWrap");
    parent?.insertBefore(miniSakai, ref);
    const root = createRoot(miniSakai);
    root.render(<MiniSakaiRoot subset={false} />);
}

const dueCategoryClassMap: { [key in DueCategory]: string } = {
    "due24h": "cs-tab-danger",
    "due5d": "cs-tab-warning",
    "due14d": "cs-tab-success",
    "dueOver14d": "cs-tab-other",
    "duePassed": ""
};

/**
 * Add notification badge for new Assignment/Quiz
 */
export async function createFavoritesBarNotification(entities: EntityProtocol[]): Promise<void> {
    const config = await loadConfigs();
    const defaultTab = document.querySelectorAll(".Mrphs-sitesNav__menuitem");
    const defaultTabCount = Object.keys(defaultTab).length;

    const courseMap = new Map<string, {
        entries: EntryProtocol[],
        isRead: boolean
    }>(); // courseID => {EntryProtocol[], isRead}
    for (const entity of entities) {
        let entries = courseMap.get(entity.course.id);
        if (entries === undefined) {
            entries = {
                entries: [],
                isRead: true
            };
            courseMap.set(entity.course.id, entries);
        }

        entries.entries.push(...entity.entries);
        entries.isRead = entries.isRead && entity.isRead;
    }

    const dueMap = new Map<string, {
        due: DueCategory,
        isRead: boolean
    }>(); // courseID => DueCategory, isRead
    for (const [courseID, entries] of courseMap.entries()) {
        if (entries.entries.length === 0) continue;
        const closestTime =
            entries.entries
                .filter(e => {
                    return config.CSsettings.displayCheckedAssignment || !e.hasFinished;
                })
                .reduce((prev, e) => Math.min(e.dueTime, prev), Number.MAX_SAFE_INTEGER);
        const daysUntilDue = getDaysUntil(nowTime, closestTime * 1000);
        dueMap.set(courseID, {
            due: daysUntilDue,
            isRead: entries.isRead
        });
    }

    for (let j = 2; j < defaultTabCount; j++) {
        const courseID: string | undefined = (defaultTab[j].getElementsByClassName("link-container")[0] as any).href.match("(https?://[^/]+)/portal/site-?[a-z]*/([^/]+)")[2];
        if (courseID === undefined) continue;
        const courseInfo = dueMap.get(courseID);
        if (courseInfo === undefined) continue;

        if (!courseInfo.isRead) {
            defaultTab[j].classList.add("cs-notification-badge");
        }

        const tabClass = dueCategoryClassMap[courseInfo.due];
        const aTagCount = defaultTab[j].getElementsByTagName("a").length;
        for (let i = 0; i < aTagCount; i++) {
            defaultTab[j].getElementsByTagName("a")[i].classList.add(tabClass);
        }
        defaultTab[j].classList.add(tabClass);
    }

    await overrideCSSColor();
    overrideCSSDarkTheme();
}

const overwriteborder = function(className: string, color: string | undefined) {
    const element = document.getElementsByClassName(className);
    for (let i = 0; i < element.length; i++) {
        const elem = element[i] as HTMLElement;
        const attr = "solid 2px " + color;
        (elem.style as any)["border-top"] = attr;
        (elem.style as any)["border-left"] = attr;
        (elem.style as any)["border-bottom"] = attr;
        (elem.style as any)["border-right"] = attr;
    }
};
const overwritebackground = function(className: string, color: string | undefined) {
    const element = document.getElementsByClassName(className);
    for (let i = 0; i < element.length; i++) {
        const elem = element[i] as HTMLElement;
        elem.setAttribute("style", "background:" + color + "!important");
    }
};
const overwritecolor = function(className: string, color: string | undefined) {
    const element = document.getElementsByClassName(className);
    for (let i = 0; i < element.length; i++) {
        const elem = element[i] as HTMLElement;
        elem.setAttribute("style", elem.getAttribute("style") + ";color:" + color + "!important");
    }
};

/**
 * Override CSS of favorites bar and miniSakai.
 */
async function overrideCSSColor() {
    const config = await loadConfigs();

    // Overwrite colors
    overwritebackground("cs-course-danger", config.CSsettings.getMiniColorDanger);
    overwritebackground("cs-course-warning", config.CSsettings.getMiniColorWarning);
    overwritebackground("cs-course-success", config.CSsettings.getMiniColorSuccess);
    overwritebackground("cs-tab-danger", config.CSsettings.getTopColorDanger);
    overwritebackground("cs-tab-warning", config.CSsettings.getTopColorWarning);
    overwritebackground("cs-tab-success", config.CSsettings.getTopColorSuccess);

    overwriteborder("cs-assignment-danger", config.CSsettings.getMiniColorDanger);
    overwriteborder("cs-assignment-warning", config.CSsettings.getMiniColorWarning);
    overwriteborder("cs-assignment-success", config.CSsettings.getMiniColorSuccess);
    overwriteborder("cs-tab-danger", config.CSsettings.getTopColorDanger);
    overwriteborder("cs-tab-warning", config.CSsettings.getTopColorWarning);
    overwriteborder("cs-tab-success", config.CSsettings.getTopColorSuccess);

}

function overrideCSSDarkTheme() {
    if (getSakaiTheme() == "dark") {
        let foregroundColorDark = "#D4D4D4";
        let backgroundColorDark = "#555555";
        let dateColorDark = "#e07071";
        overwritebackground("cs-minisakai", backgroundColorDark);
        overwritecolor("cs-assignment-time", foregroundColorDark);
        overwritecolor("cs-assignment-date", dateColorDark);
        overwritecolor("cs-quiz-time", foregroundColorDark);
        overwritecolor("cs-minipanda", foregroundColorDark);
        overwritecolor("cs-settings-tab", foregroundColorDark);
        overwritecolor("cs-memo-item", foregroundColorDark);
        overwritecolor("cs-minisakai-list", foregroundColorDark);
        overwritecolor("cs-assignment-title", foregroundColorDark);
        overwritecolor("cs-noassignment-p", foregroundColorDark);
        overwritecolor("cs-tab-danger", backgroundColorDark);
        overwritecolor("cs-tab-warning", backgroundColorDark);
        overwritecolor("cs-tab-success", backgroundColorDark);
    }
}
