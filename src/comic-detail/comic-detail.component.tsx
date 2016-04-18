import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Interfaces from './../shared/interfaces';
import * as styles from './comic-detail.component.css';
import Settings from './../shared/settings';
import NavigationHandler from './../shared/navigation.handler';
import ENUMS from './../shared/enums';
import Comic from './../comic/comic.model';

module ComicDetail {
  export interface IComicDetailProps {
    comic: Comic.Comic;
    onClick: Function;
  }
  export interface IComicDetailStatus {
  }
  export class ComicDetailComponent extends React.Component<IComicDetailProps, IComicDetailStatus> {
    constructor(props : IComicDetailProps) {
      super(props);
      this.state = {
      };
    }
    public componentDidMount() {
      this.setState(this.state);
    }
    public componentWillReceiveProps (nextProps) {

    }
    render() {
      let self: ComicDetailComponent = this;
      if (self.props.comic) {
        return (
          <div className={styles.wrapper}>
            <div className={styles.thumbnail}>
              <img className={styles.thumbnail} src={Settings.uStaticImage + self.props.comic.getThumbnail()} />
            </div>
            <div className={styles.title}>
              <div className={styles.publisher}>{self.props.comic.getPublisher() + "'s"}</div>
              <div className={styles.name}>{self.props.comic.getName()}</div>
              <div className={styles.issue}>{"Episode " + self.props.comic.getIssue()}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.description}>{self.props.comic.getDescription()}</div>
              <div className={styles.play} onClick={()=> {self.props.onClick(self.props.comic);}}>Play Comic >>></div>
            </div>
          </div>
        );
      } else {
        return (
          <div className={styles.wrapper}>

          </div>
        );
      }
    }
  }
}

export default ComicDetail;
