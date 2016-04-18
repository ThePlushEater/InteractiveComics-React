import App from './../app';
import RouterHandler from './router.handler';

module Interfaces {
  export interface IAppProps {
    title: string;
  }

  export interface InterfaceComponentProps {
    router: RouterHandler;
  }
}

export default Interfaces;
