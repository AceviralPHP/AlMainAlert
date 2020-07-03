import { Alert, alertTemplate, DisplayType } from './alert';

export default class Controller
{
    public static TYPE = DisplayType;

    /**
     * Initialize the alert system for page load
     *
     * @static
     * @return {void}
     */
    public static onLoad()
    {
        if (!window.localStorage) {
            return;
        }

        let alert;
        while (alert = Controller.pop()) {
            // TODO display the message
            Controller._process(alert);
        }
    }

    /**
     * Pop an alert of the end of the storage array
     *
     * @static
     * @return {Alert}
     */
    public static pop(): Alert
    {
        if (!window.localStorage) {
            return null;
        }

        try {
            let data = Controller._get();
            let alert = data.pop();

            Controller._set(data);
            return alert;
        } catch (e) {}

        return null;
    }

    /**
     * Push an alert onto the end of the storage array
     *
     * @static
     * @param {Alert}
     */
    public static push(alert: Alert): void 
    {
        alert = {
            ...alertTemplate,
            ...alert
        };

        if (alert.reload) {
            try {
                let data = Controller._get() || [];
                data.push(alert);
                Controller._set(data);

                if ("string" === typeof alert.reload) {
                    window.location.href = alert.reload;
                } else {
                    window.location.href = window.location.href.split('#')[0];
                }
            } catch (e) {console.log(e)}

            return;
        }

        Controller._process(alert);
    }

    private static _get(): Array<Alert>
    {
        try {
            let data = window.localStorage.alMainAlert;
            let array = JSON.parse(data);

            return array instanceof Array ? array : null;
        } catch (e) {}

        return null;
    }

    private static _set(data: Array<Alert>): void
    {
        try {
            window.localStorage.alMainAlert = JSON.stringify(data);
        } catch (e) {}
    }

    private static _process(alert: Alert): void
    {
        Controller._initContainers();

        let $element = Controller._generateJqueryElement(alert);

        if (DisplayType.OVERLAY == alert.type) {
            $("#alSiteAlert-overlay").append($element);
        } else {
            $("#alSiteAlert-block").append($element);
        }

        if (alert.scrollTo) {
            let offset = "number" == typeof alert.scrollTo 
                ? alert.scrollTo 
                : $(alert.scrollTo).offset().top;

            $(alert.scrollTarget || "document, body").animate({
                scrollTop: offset
            }, 200);
        }

        if (alert.timeout) {
            setTimeout(() => {
                $element.fadeOut(300, function() { $(this).remove() });
            }, alert.timeout);
        }
    }

    private static _initContainers(): void
    {
        if (!$("alSiteAlert-overlay").length) {
            $("<div/>", {
                id: "alSiteAlert-overlay",
                css: {
                    position: "fixed",
                    top: 0,
                    right: 0,
                    left: 0
                }
            }).appendTo("body");
        }

        if (!$("alSiteAlert-block").length) {
            $("<div/>", {
                id: "alSiteAlert-block",
                css: {
                    position: "relative"
                }
            }).prependTo("body");
        }
    }

    private static _generateJqueryElement(alert: Alert): JQuery<HTMLElement>
    {
        return $("<div/>", {
            class: alert.class,
            html: alert.message
        }).append(
            $("<div/>", {
                class: "alMainAlertClose",
                html: "X",
                click: function() {
                    $(this).parent().remove();
                }
            })
        );
    }
}
