import { Alert, DisplayType } from './alert';
export default class Controller {
    static TYPE: typeof DisplayType;
    /**
     * Initialize the alert system for page load
     *
     * @static
     * @return {void}
     */
    static onLoad(): void;
    /**
     * Pop an alert of the end of the storage array
     *
     * @static
     * @return {Alert}
     */
    static pop(): Alert;
    /**
     * Push an alert onto the end of the storage array
     *
     * @static
     * @param {Alert}
     */
    static push(alert: Alert): void;
    private static _get;
    private static _set;
    private static _process;
    private static _initContainers;
    private static _generateJqueryElement;
}
