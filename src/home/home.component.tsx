import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Interfaces from './../shared/interfaces';
import * as styles from './home.component.css';
import Settings from './../shared/settings';
import NavigationHandler from './../shared/navigation.handler';
import ENUMS from './../shared/enums';


module Home {
  export interface IHomeProps {
    description: string;
    image: string;
  }
  export interface IHomeStatus {
    description: string;
    image: string;
  }
  export class HomeComponent extends React.Component<IHomeProps, IHomeStatus> {
    constructor(props : IHomeProps) {
      super(props);
      this.state = {
        description: props.description,
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
        <div className={styles.wrapper} onClick={self.onClick} >
          <div className={styles.logo}>
            <img src={self.state.image} />
            <div className={styles.title}>
              {self.state.description}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
