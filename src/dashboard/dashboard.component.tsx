import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Interfaces from './../shared/interfaces';
import * as styles from './dashboard.component.css';
import Settings from './../shared/settings';
import NavigationHandler from './../shared/navigation.handler';
import ENUMS from './../shared/enums';
import ComicList from './../comic-list/comic-list.component';
import ComicDetail from './../comic-detail/comic-detail.component';
import NetworkHandler from './../shared/network.handler';
import Comic from './../comic/comic.model';

module Dashboard {
  export interface IDashboardProps {
  }
  export interface IDashboardStatus {
    comic: Comic.Comic;
    comics: Comic.Comics;
  }
  export class DashboardComponent extends React.Component<IDashboardProps, IDashboardStatus> {
    constructor(props : IDashboardProps) {
      super(props);
      this.state = {
        comic: null,
        comics: null,
      };
    }
    public componentDidMount() {
      let self: DashboardComponent = this;
      NetworkHandler.getComicsAll(function(comics) {
        console.log(comics);
        self.setState({comic: comics.models[0], comics: comics});
      }, function() {

      });
    }
    public selectComic = (comic: Comic.Comic) => {
      let self: DashboardComponent = this;
      self.setState({comic: comic, comics: self.state.comics});
    }
    public startComic = (comic: Comic.Comic) => {
      let self: DashboardComponent = this;
      NavigationHandler.handle(ENUMS.VIEW_LIST.COMIC, {cid: comic.getId()});
    }
    render() {
      let self: DashboardComponent = this;
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
          <ComicDetail.ComicDetailComponent comic={self.state.comic} onClick={self.startComic} />
          <ComicList.ComicListComponent comic={self.state.comic} comics={self.state.comics} onClick={self.selectComic} />
          <div className={styles.copyright}>© 2015 CaptainWhale.</div>
        </div>
      );
    }
  }
}

export default Dashboard;
