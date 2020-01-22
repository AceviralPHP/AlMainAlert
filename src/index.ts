import { DisplayType } from "./alert";
import Controller from "./controller";

(function($: any) {
    $.alMainAlert = function(options: any) {
        Controller.push(options);
    };
})(jQuery);

export {
    Controller as AlMainAlert
};
