export enum DisplayType {
    OVERLAY = "overlay",
    BLOCK = "block"
};

export interface Alert {
    message: string;
    class?: string;
    type?: DisplayType
    reload?: boolean;
    scrollTo?: string;
    timeout?: number;
}

export const alertTemplate: Alert = {
    message: "Default Message",
    class: "alMainAlert",
    type: DisplayType.OVERLAY,
    reload: false,
    scrollTo: "",
    timeout: 0
};
