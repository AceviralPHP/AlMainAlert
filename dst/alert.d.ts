export declare enum DisplayType {
    OVERLAY = "overlay",
    BLOCK = "block"
}
export interface Alert {
    message: string;
    class?: string;
    type?: DisplayType;
    reload?: any;
    scrollTo?: string;
    scrollTarget?: string;
    timeout?: number;
}
export declare const alertTemplate: Alert;
