import React from "react";
import { useTranslation, useTranslationArgsDeps, useTranslationDeps } from "./helper";
import { Settings } from "../features/setting/types";

export type SettingsChange =
    | {
          type: "number";
          id: string;
          newValue: number;
      }
    | {
          type: "string";
          id: string;
          newValue: string;
      }
    | {
          type: "boolean";
          id: string;
          newValue: boolean;
      }
    | {
          type: "reset-color";
      };

export function SettingsTab(props: { onSettingsChange: (change: SettingsChange) => void; settings: Settings }) {
    const settings = props.settings;

    const topColorDangerDesc = useTranslationArgsDeps("settings_colors_hour", ["Tab Bar", "24"], []);
    const topColorWarningDesc = useTranslationArgsDeps("settings_colors_day", ["Tab Bar", "5"], []);
    const topColorSuccessDesc = useTranslationArgsDeps("settings_colors_day", ["Tab Bar", "14"], []);
    const topColorOtherDesc = useTranslationArgsDeps("settings_colors_day_more", ["Tab Bar", "14"], []);

    const miniColorDangerDesc = useTranslationArgsDeps("settings_colors_hour", ["miniPandA", "24"], []);
    const miniColorWarningDesc = useTranslationArgsDeps("settings_colors_day", ["miniPandA", "5"], []);
    const miniColorSuccessDesc = useTranslationArgsDeps("settings_colors_day", ["miniPandA", "14"], []);
    const miniColorOtherDesc = useTranslationArgsDeps("settings_colors_day_more", ["miniPandA", "14"], []);

    return (
        <div className="cs-settings-tab">
            <TranslatedBooleanItem
                descriptionTag="settings_enable_dark_theme"
                value={settings.appInfo.useDarkTheme}
                onChange={(v) =>
                    props.onSettingsChange({
                        type: "boolean",
                        id: "appInfo.useDarkTheme",
                        newValue: v
                    })
                }
            />

            <TranslatedBooleanItem
                descriptionTag="settings_color_checked_item"
                value={settings.miniSakaiOption.showCompletedEntry}
                onChange={(v) =>
                    props.onSettingsChange({
                        type: "boolean",
                        id: "miniSakaiOption.showCompletedEntry",
                        newValue: v
                    })
                }
            />
            <TranslatedBooleanItem
                descriptionTag="settings_display_late_submit_assignment"
                value={settings.miniSakaiOption.showLateAcceptedEntry}
                onChange={(v) =>
                    props.onSettingsChange({
                        type: "boolean",
                        id: "miniSakaiOption.showLateAcceptedEntry",
                        newValue: v
                    })
                }
            />
            <TranslatedNumberItem
                descriptionTag="settings_assignment_cache"
                value={settings.cacheInterval.assignment}
                onChange={(v) =>
                    props.onSettingsChange({
                        type: "number",
                        id: "cacheInterval.assignment",
                        newValue: v
                    })
                }
            />
            <TranslatedNumberItem
                descriptionTag="settings_quizzes_cache"
                value={settings.cacheInterval.quiz}
                onChange={(v) =>
                    props.onSettingsChange({
                        type: "number",
                        id: "cacheInterval.quiz",
                        newValue: v
                    })
                }
            />

            <ColorItem
                description={topColorDangerDesc}
                value={settings.color.topDanger}
                onChange={(v) =>
                    props.onSettingsChange({
                        type: "string",
                        id: "color.topDanger",
                        newValue: v
                    })
                }
            />
            <ColorItem
                description={topColorWarningDesc}
                value={settings.color.topWarning}
                onChange={(v) =>
                    props.onSettingsChange({
                        type: "string",
                        id: "color.topWarning",
                        newValue: v
                    })
                }
            />
            <ColorItem
                description={topColorSuccessDesc}
                value={settings.color.topSuccess}
                onChange={(v) =>
                    props.onSettingsChange({
                        type: "string",
                        id: "color.topSuccess",
                        newValue: v
                    })
                }
            />
            <ColorItem
                description={topColorOtherDesc}
                value={settings.color.topOther}
                onChange={(v) =>
                    props.onSettingsChange({
                        type: "string",
                        id: "color.topOther",
                        newValue: v
                    })
                }
            />

            <ColorItem
                description={miniColorDangerDesc}
                value={settings.color.miniDanger}
                onChange={(v) =>
                    props.onSettingsChange({
                        type: "string",
                        id: "color.miniDanger",
                        newValue: v
                    })
                }
            />
            <ColorItem
                description={miniColorWarningDesc}
                value={settings.color.miniWarning}
                onChange={(v) =>
                    props.onSettingsChange({
                        type: "string",
                        id: "color.miniWarning",
                        newValue: v
                    })
                }
            />
            <ColorItem
                description={miniColorSuccessDesc}
                value={settings.color.miniSuccess}
                onChange={(v) =>
                    props.onSettingsChange({
                        type: "string",
                        id: "color.miniSuccess",
                        newValue: v
                    })
                }
            />
            <ColorItem
                description={miniColorOtherDesc}
                value={settings.color.miniOther}
                onChange={(v) =>
                    props.onSettingsChange({
                        type: "string",
                        id: "color.miniOther",
                        newValue: v
                    })
                }
            />

            <ResetColorButton
                onClick={() =>
                    props.onSettingsChange({
                        type: "reset-color"
                    })
                }
            />
            <details>
                <summary>{useTranslationDeps("settings_open_dev_setting",["settings_open_dev_setting"])}</summary>
                <TranslatedBooleanItem
                    descriptionTag="settings_enable_integration_module"
                    value={settings.appInfo.useIntegrationModule}
                    onChange={(v) =>
                        props.onSettingsChange({
                            type: "boolean",
                            id: "appInfo.useIntegrationModule",
                            newValue: v
                        })
                    }
                />

                <TranslatedUrlItem
                    descriptionTag="settings_enable_integration_module_url"
                    value={settings.appInfo.apiServerURL}
                    onChange={(v) =>
                        props.onSettingsChange({
                            type: "string",
                            id: "appInfo.apiServerURL",
                            newValue: v
                        })
                    }
                />
            </details>
        </div>
    );
}

function SettingsItem(props: {
    description: string;
    display: boolean;
    children: React.ReactNode;
    labelClass?: string;
}) {
    if (!props.display) return null;

    return (
        <div className="cp-settings">
            <p className="cp-settings-text">{props.description}</p>
            <label className={props.labelClass ?? ""}>{props.children}</label>
        </div>
    );
}

function BooleanItem(props: {
    description: string;
    display?: boolean;
    value: boolean;
    onChange: (newValue: boolean) => void;
}) {
    return (
        <SettingsItem description={props.description} display={props.display ?? true} labelClass="cs-toggle-btn">
            <input type="checkbox" checked={props.value} onChange={(ev) => props.onChange(ev.target.checked)}></input>
            <span className="cs-toggle-slider round"></span>
        </SettingsItem>
    );
}

function TranslatedBooleanItem(props: {
    descriptionTag: string;
    display?: boolean;
    value: boolean;
    onChange: (newValue: boolean) => void;
}) {
    const description = useTranslationDeps(props.descriptionTag, [props.descriptionTag]);
    return (
        <BooleanItem description={description} display={props.display} value={props.value} onChange={props.onChange} />
    );
}

function NumberItem(props: {
    description: string;
    display?: boolean;
    value: number;
    onChange: (newValue: number) => void;
}) {
    return (
        <SettingsItem description={props.description} display={props.display ?? true}>
            <input
                type="number"
                className="cp-settings-inputbox"
                value={props.value}
                onChange={(ev) => props.onChange(parseInt(ev.target.value))}
            ></input>
        </SettingsItem>
    );
}

function TranslatedNumberItem(props: {
    descriptionTag: string;
    display?: boolean;
    value: number;
    onChange: (newValue: number) => void;
}) {
    const description = useTranslationDeps(props.descriptionTag, [props.descriptionTag]);
    return (
        <NumberItem description={description} display={props.display} value={props.value} onChange={props.onChange} />
    );
}

function ColorItem(props: {
    description: string;
    display?: boolean;
    value: string;
    onChange: (newValue: string) => void;
}) {
    return (
        <SettingsItem description={props.description} display={props.display ?? true}>
            <input
                type="color"
                className="cp-settings-inputbox"
                value={props.value}
                onChange={(ev) => props.onChange(ev.target.value)}
            ></input>
        </SettingsItem>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TranslatedColorItem(props: {
    descriptionTag: string;
    display?: boolean;
    value: string;
    onChange: (newValue: string) => void;
}) {
    const description = useTranslationDeps(props.descriptionTag, [props.descriptionTag]);
    return (
        <ColorItem description={description} display={props.display} value={props.value} onChange={props.onChange} />
    );
}

function ResetColorButton(props: { onClick: () => void }) {
    const desc = useTranslation("settings_reset_colors");

    return (
        <div className="cp-settings">
            <p className="cp-settings-text">{desc}</p>
            <label>
                <input type="button" value="reset" onClick={props.onClick}></input>
            </label>
        </div>
    );
}

function UrlItem(props: {
    description: string;
    display?: boolean;
    value: string;
    onChange: (newValue: string) => void;
}) {
    return (
        <SettingsItem description={props.description} display={props.display ?? true}>
            <input
                type="url"
                className="cp-settings-inputbox-wide"
                value={props.value}
                onChange={(ev) => props.onChange(ev.target.value)}
            ></input>
        </SettingsItem>
    );
}

function TranslatedUrlItem(props: {
    descriptionTag: string;
    display?: boolean;
    value: string;
    onChange: (newValue: string) => void;
}) {
    const description = useTranslationDeps(props.descriptionTag, [props.descriptionTag]);
    return (
        <UrlItem description={description} display={props.display} value={props.value} onChange={props.onChange} />
    );
}