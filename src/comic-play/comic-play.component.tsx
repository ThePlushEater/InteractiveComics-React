import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Interfaces from './../shared/interfaces';
import * as styles from './comic-play.component.css';
import Settings from './../shared/settings';
import NavigationHandler from './../shared/navigation.handler';
import ENUMS from './../shared/enums';
import Comic from './../comic/comic.model';
import Panel from './../panel/panel.model';
import Canvas from './../canvas/canvas.component';
import NetworkHandler from './../shared/network.handler';
import Option from './../panel/option.model';

module ComicPlay {
  export interface IComicPlayProps {
    cid: number;
  }
  export interface IComicPlayStatus {
    comic: Comic.Comic;
    panels: Panel.Panels;
    option: Option.Option;
    width: number;
    height: number;
  }
  export class ComicPlayComponent extends React.Component<IComicPlayProps, IComicPlayStatus> {
    constructor(props : IComicPlayProps) {
      super(props);
      this.state = {
        comic: null,
        panels: null,
        option: null,
        width: 0,
        height: 0,
      };
    }
    public componentDidMount() {
      let self: ComicPlayComponent = this;
      let canvas = ReactDOM.findDOMNode(this.refs['canvas']);
      if (canvas) {
        NetworkHandler.getComicFromId(self.props.cid, function(comic: Comic.Comic) {
          self.setState({comic: comic, panels: self.state.panels, option: self.state.option, width: canvas.clientWidth, height: canvas.clientHeight});
        });
        NetworkHandler.getOptionFromId(1, function(option: Option.Option) {
          NetworkHandler.getPanelsAllFromCId(self.props.cid, function(panels: Panel.Panels) {
            self.setState({comic: self.state.comic, panels: panels.filterByOId(option.getId()), option: option, width: self.state.width, height: self.state.height});
          });
        });
      }
    }
    public selectOption = (oid) => {
      let self: ComicPlayComponent = this;
      if (oid == 0) {
        NavigationHandler.handle(ENUMS.VIEW_LIST.HOME, {});
      } else {
        NetworkHandler.getOptionFromId(oid, function(option: Option.Option) {
          if (option) {
            NetworkHandler.getPanelsAllFromCId(self.props.cid, function(panels: Panel.Panels) {
              //console.log(panels.filterByOId(option.getId()));
              self.setState({comic: self.state.comic, panels: panels.filterByOId(option.getId()), option: option, width: self.state.width, height: self.state.height});
            });
          }
        });
      }
    }

    public componentWillReceiveProps (nextProps) {
      //this.setState({cid: nextProps.cid});
    }
    private handleNaviation(view: ENUMS.VIEW_LIST) {
      NavigationHandler.handle(ENUMS.VIEW_LIST.HOME);
    }
    render() {
      let self: ComicPlayComponent = this;
      if (self.state.comic != undefined) {
        return (
          <div className={styles.wrapper}>
            <div className={styles.title}>Interactive Comics</div>
            <hr className={styles.hr}/>
            <nav className={styles.nav}>
              <div>
                <a onClick={()=> {self.handleNaviation(ENUMS.VIEW_LIST.HOME);}}>Home</a>
                <span> > </span>
                <span>{self.state.comic.getName() + " - Episode " + self.state.comic.getIssue()}</span>
              </div>
              <div>
                <a>About</a>
              </div>
            </nav>
            <hr className={styles.hr}/>
            <div ref="canvas" className={styles.canvas}>
              <Canvas.CanvasComponent select={self.selectOption} comic={self.state.comic} panels={self.state.panels} option={self.state.option} width={self.state.width} height={self.state.height}/>
            </div>
            <div className={styles.copyright}>© 2015 CaptainWhale.</div>
          </div>
        );
      } else {
        return (
          <div className={styles.wrapper}>
            <div className={styles.title}>Interactive Comics</div>
            <hr className={styles.hr}/>
            <nav className={styles.nav}>
              <div>
                <a>Home</a>
              </div>
              <div>
                <a>About</a>
              </div>
            </nav>
            <hr className={styles.hr}/>
            <div ref="canvas" className={styles.canvas}>
              <Canvas.CanvasComponent select={self.selectOption} comic={self.state.comic} panels={self.state.panels} option={self.state.option} width={self.state.width} height={self.state.height}/>
            </div>
            <div className={styles.copyright}>© 2015 CaptainWhale.</div>
          </div>
        );
      }
    }
  }
}

export default ComicPlay;
