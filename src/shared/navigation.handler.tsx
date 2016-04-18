import App from './../app';
import NetworkHandler from './network.handler';
import ENUMS from './enums';
import RouterHandler from './router.handler'

module NavigationHandler {
  export var Router: RouterHandler;
  export function handle(view: ENUMS.VIEW_LIST, options?: any) {
    NetworkHandler.abortAllXHR();
    switch(view) {
      case ENUMS.VIEW_LIST.HOME:
        Router.navigate("/", {trigger : true});
        break;
      case ENUMS.VIEW_LIST.COMIC:
        if (options != undefined && options.cid != undefined) {
          Router.navigate("/comic/" + options.cid, {trigger : true});
        }
        break;
    }
  }
}

export default NavigationHandler;
