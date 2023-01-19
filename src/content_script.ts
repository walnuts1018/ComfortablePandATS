import { saveHostName } from "./features/storage";
import { createMiniSakai, createMiniSakaiBtn } from "./minisakai";
import { isLoggedIn, miniSakaiReady } from "./utils";
import submitDetect from "./features/submitDetect";
import addTweetButton from "./features/tweet";

async function main() {
    if (isLoggedIn()) {
        createMiniSakaiBtn();
        const hostname = window.location.hostname;
        createMiniSakai(hostname);

        miniSakaiReady();
        await saveHostName(hostname);
        submitDetect(hostname);
        addTweetButton();
    }
}

main();
