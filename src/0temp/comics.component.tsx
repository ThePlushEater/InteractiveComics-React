import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as FontAwesome from 'react-fontawesome'
import './../../node_modules/font-awesome/css/font-awesome.css';

import Interfaces from './../shared/interfaces';
import * as styles from './comics.component.css';

import Settings from './../shared/settings';
import NavigationHandler from './../shared/navigation.handler';
import ENUMS from './../shared/enums';

module Comics {
  export interface IComicsProps {
    image: string;
  }
  export interface IComicsStatus {
    image: string;
  }
  export class ComicsComponent extends React.Component<IComicsProps, IComicsStatus> {
    constructor(props : IComicsProps) {
      super(props);
      this.state = {
        image: props.image
      };
    }
    public componentDidMount() {
      this.setState(this.state);
    }
    onClick() {
      //NavigationHandler.handle(ENUMS.VIEWS.COMIC);
    }
    render() {
      let self = this;
      return (
        <div className={styles.wrapper} >
          <div className={styles.title} >INTERACTIVE COMICS </div>
          <FontAwesome className='' name='camera-retro' />
        </div>
      );
    }
  }
}

export default Comics;
