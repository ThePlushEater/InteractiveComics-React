import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Interfaces from './../shared/interfaces';
import * as styles from './comic-list.component.css';
import Settings from './../shared/settings';
import NavigationHandler from './../shared/navigation.handler';
import ENUMS from './../shared/enums';
import Comic from './../comic/comic.model';

module ComicList {
  export interface IComicListProps {
    comic: Comic.Comic;
    comics: Comic.Comics;
    onClick: Function;
  }
  export interface IComicListStatus {

  }
  export class ComicListComponent extends React.Component<IComicListProps, IComicListStatus> {
    constructor(props : IComicListProps) {
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
      let self: ComicListComponent = this;
      let comics: string = "";
      if (self.props.comics != undefined) {
        comics = this.props.comics.models.slice(0,6).map(function(comic: Comic.Comic, i: number) {
          if (self.props.comic == comic) {
            if (comic.getId() != undefined) {
              if (comic.bAvailable()) {
                return (
                  <div onClick={()=> {self.props.onClick(comic);}} key={i} className={styles.comicselected}>
                    <img className={styles.thumbnail} src={Settings.uStaticImage + comic.getThumbnail()} />
                    <div className={styles.name}>{comic.getName() + " Episode " + comic.getIssue()}</div>
                  </div>
                );
              } else {
                return (
                  <div key={i} className={styles.comicselected}>
                    <img className={styles.thumbnail} src={Settings.uStaticImage + comic.getThumbnail()} />
                    <div className={styles.name}>{comic.getName()}</div>
                  </div>
                );
              }
            } else {
              return (
                <div key={i} className={styles.comicselected}>
                  <img className={styles.thumbnail} />
                  <div className={styles.name}>{comic.getName()}</div>
                </div>
              );
            }
          } else {
            if (comic.getId() != undefined) {
              if (comic.bAvailable()) {
                return (
                  <div onClick={()=> {self.props.onClick(comic);}} key={i} className={styles.comicnormal}>
                    <img className={styles.thumbnail} src={Settings.uStaticImage + comic.getThumbnail()} />
                    <div className={styles.name}>{comic.getName() + " #" + comic.getIssue()}</div>
                  </div>
                );
              } else {
                return (
                  <div key={i} className={styles.comicnormal}>
                    <img className={styles.thumbnail} src={Settings.uStaticImage + comic.getThumbnail()} />
                    <div className={styles.name}>{comic.getName()}</div>
                  </div>
                );
              }

            } else {
              return (
                <div key={i} className={styles.comicnormal}>
                  <img className={styles.thumbnail} />
                  <div className={styles.name}>{comic.getName()}</div>
                </div>
              );
            }

          }
        });
      }
      return (
        <div className={styles.wrapper}>
          <div className={styles.comics}>
            {comics}
          </div>
        </div>
      );
    }
  }
}

export default ComicList;
