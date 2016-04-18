import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as underscore from 'underscore';
import * as Backbone from 'backbone';

import './app.css';
import Interfaces from './shared/interfaces';
import Utils from './shared/utils';
import Home from './home/home.component';
import Dashboard from './dashboard/dashboard.component';
import ComicPlay from './comic-play/comic-play.component';
import Locale from './locale/locale';
import Settings from './shared/settings';
import RouterHandler from './shared/router.handler';
import NavigationHandler from './shared/navigation.handler';

module App {
  export class AppComponent extends React.Component<Interfaces.IAppProps, {}> {
    constructor(props : Interfaces.IAppProps) {
      super(props);
      this.state = {
      };
    }
    public componentDidMount() {
      this.setState(this.state);
    }
  }

  export class InterfaceComponent extends React.Component<Interfaces.InterfaceComponentProps, {}> {
    callback: Function;
    componentWillMount() {
      let self = this;
      self.callback = (function() {
        self.forceUpdate();
      }).bind(self);

      self.props.router.on("route", self.callback);
    }
    componentWillUnmount() {
      let self = this;
      self.props.router.off("route", self.callback);
    }
    render() {
      if (this.props.router.current == "home") {
        return <Home.HomeComponent description={Locale.sApplicaitonDescription} image={Settings.uStaticImage + Settings.sApplicationLogoImage} />;
      } else if (this.props.router.current == "dashboard") {
        return <Dashboard.DashboardComponent />;
      } else if (this.props.router.current == "comic") {
        return <ComicPlay.ComicPlayComponent cid={parseInt(this.props.router.arguments[0])}/>;
      }
      return <div />;
    }
  }
  export function init() {
    var Router: RouterHandler = new RouterHandler();
    NavigationHandler.Router = Router;
    ReactDOM.render((
      <App.InterfaceComponent router={Router} />
    ), document.querySelector('#app'));
    Backbone.history.start();
  }
}

App.init();

export default App;
