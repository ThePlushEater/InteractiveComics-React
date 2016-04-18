import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Interfaces from './../shared/interfaces';
import * as styles from './canvas.component.css';
import Settings from './../shared/settings';
import NavigationHandler from './../shared/navigation.handler';
import ENUMS from './../shared/enums';
import Comic from './../comic/comic.model';
import Utils from './../shared/utils';
import Panel from './../panel/panel.model';
import PanelComponent from './../panel/panel.component';
import Option from './../panel/option.model';
import OptionComponent from './../panel/option.component';
import NetworkHandler from './../shared/network.handler';

module Canvas {
  export interface ICanvasProps {
    select: Function;
    comic: Comic.Comic;
    panels: Panel.Panels;
    option: Option.Option;
    width: number;
    height: number;
  }
  export interface ICanvasStatus {
  }
  export class CanvasComponent extends React.Component<ICanvasProps, ICanvasStatus> {
    private stage: createjs.Stage;
    private parent: createjs.Container;
    private panelComponents: PanelComponent.PanelComponent[];
    private optionComponent: OptionComponent.OptionComponent;
    private center: createjs.Rectangle;
    private zoom: number;
    private maxZoom: number;
    private minZoom: number;
    private bMouseDown: boolean;
    private optionIds: Array<number>;
    private choiceIds: Array<number>;
    constructor(props : ICanvasProps) {
      super(props);
      let self: CanvasComponent = this;
      this.state = {
      };
      self.zoom = 1;
      self.maxZoom = 10;
      self.minZoom = 0.1;
      self.bMouseDown = false;
      self.panelComponents = new Array<PanelComponent.PanelComponent>();
      self.optionIds = new Array<number>();
      self.choiceIds = new Array<number>();
    }
    public componentDidMount() {
      let self: CanvasComponent = this;
      var canvas = ReactDOM.findDOMNode(this.refs['canvas']);
      self.stage = new createjs.Stage(canvas);
      self.stage.enableMouseOver(10);
      self.stage.set({
        scaleX: 1,
        scaleY: 1,
      });
      self.parent = new createjs.Container();
      //self.parent.setBounds(0, 0, 2048, 2048);
      self.stage.addChild(self.parent);
      self.center = new createjs.Rectangle(0, 0, 0, 0);

      createjs.Ticker.addEventListener('tick', self.stage);
      createjs.Ticker.on("tick", self.tick);
      createjs.Ticker.setFPS(50);

      self.stage.addEventListener("stagemousedown", self.mouseDownHandler);

      canvas.addEventListener("mousewheel", self.mouseWheelHandler, false);
      canvas.addEventListener("DOMMouseScroll", self.mouseWheelHandler, false);
    }
    public componentWillReceiveProps (nextProps) {
      let self: CanvasComponent = this;
      if (nextProps.panels) {
        var canvas = ReactDOM.findDOMNode(this.refs['canvas']);
        nextProps.panels.models.forEach(function(panel: Panel.Panel, index: number) {
          /*
          var bFound: boolean = false;
          self.panelComponents.forEach(function(PanelComponent: PanelComponent.PanelComponent, index: number) {
            if(PanelComponent.panel.getId() == panel.getId()) {
              bFound = true;
            }
          });
          if (!bFound) {

          }
          */
          var time = index * 250;
          setTimeout(function() {
            var newPanelComponent: PanelComponent.PanelComponent = new PanelComponent.PanelComponent({parent: self.parent, panel: panel});
            newPanelComponent.render();
            newPanelComponent.group.addEventListener("click", function(event) {
              if (!self.bMouseDown) {
                var scale = Math.min(canvas.clientWidth / newPanelComponent.group.getBounds().width, canvas.clientHeight / newPanelComponent.group.getBounds().height) * 0.8;
                self.center.x = newPanelComponent.group.getBounds().x;
                self.center.y = newPanelComponent.group.getBounds().y;
                self.center.width = Math.floor(canvas.clientWidth / 2) - Math.floor(newPanelComponent.group.getBounds().width * scale / 2);
                self.center.height = Math.floor(canvas.clientHeight / 2) - Math.floor(newPanelComponent.group.getBounds().height * scale / 2);
                self.zoom = scale;
              }
            });
            newPanelComponent.group.addEventListener("mouseover", function(event) {
              newPanelComponent.boundary.set({
                alpha: 1,
              });
            });
            newPanelComponent.group.addEventListener("mouseout", function(event) {
              newPanelComponent.boundary.set({
                alpha: 0,
              });
            });

            if (index == 0) {
              var scale = Math.min(canvas.clientWidth/ newPanelComponent.group.getBounds().width, canvas.clientHeight / newPanelComponent.group.getBounds().height) * 0.8;
              self.center.x = newPanelComponent.group.getBounds().x;
              self.center.y = newPanelComponent.group.getBounds().y;
              self.center.width = Math.floor(canvas.clientWidth / 2) - Math.floor(newPanelComponent.group.getBounds().width * scale / 2);
              self.center.height = Math.floor(canvas.clientHeight / 2) - Math.floor(newPanelComponent.group.getBounds().height * scale / 2);
              self.zoom = scale;
            }
            //self.panelComponents.push(newPanelComponent);
          }, time);
        });


      }
      if (nextProps.option) {
        if (self.optionComponent) {
          self.optionComponent.text1.removeAllEventListeners();
          self.optionComponent.text2.removeAllEventListeners();
        }
        self.optionComponent = new OptionComponent.OptionComponent({parent: self.parent, option: nextProps.option});
        self.optionComponent.render();
        self.optionComponent.text1.addEventListener("click", function(event) {
          self.optionIds.push(self.optionComponent.option.getId());
          self.choiceIds.push(1);
          self.props.select(self.optionComponent.option.getChoice1Id());
          self.optionComponent.option.save(
            {
              'choice1_total': self.optionComponent.option.getChoice1Total() + 1,
            },
            {
              url: Settings.uServer + 'choice.php',
            }
          );
          if (self.optionComponent.option.getChoice1Id() == 8) {
            self.generateResult();
          }
        });
        self.optionComponent.text1.addEventListener("mouseover", function(event) {
          self.optionComponent.text1.set({
            color: '#E63C41'
          });
        });
        self.optionComponent.text1.addEventListener("mouseout", function(event) {
          self.optionComponent.text1.set({
            color: '#006ECC'
          });
        });
        self.optionComponent.text2.addEventListener("click", function(event) {
          self.optionIds.push(self.optionComponent.option.getId());
          self.choiceIds.push(2);
          self.props.select(self.optionComponent.option.getChoice2Id());
          self.optionComponent.option.save(
            {
              'choice2_total': self.optionComponent.option.getChoice2Total() + 1,
            },
            {
              url: Settings.uServer + 'choice.php',
            }
          );
          if (self.optionComponent.option.getChoice2Id() == 8) {
            self.generateResult();
          }
        });
        self.optionComponent.text2.addEventListener("mouseover", function(event) {
          self.optionComponent.text2.set({
            color: '#E63C41'
          });
        });
        self.optionComponent.text2.addEventListener("mouseout", function(event) {
          self.optionComponent.text2.set({
            color: '#006ECC'
          });
        });
      }

      //this.setState({cid: nextProps.cid});
    }

    private generateResult() {
      let self: CanvasComponent = this;
      console.log(self.optionIds);
      var c = 1;
      var i = 0;
      var row = 1;
      var group = new createjs.Container();
      self.parent.addChild(group);

      var title = new createjs.Text("Episode 1 Result", "Bold 48px Coming Soon", "#E63C41");
      title.set({
        x: -400,
        y: -540,
        textAlign: 'left',
      });
      group.addChild(title);

      self.optionIds.forEach(function(id: number, index: number) {
        NetworkHandler.getOptionFromId(id, function(option: Option.Option) {
          if (option.getId() != 1 && option.getId() != 3 && option.getId() != 8 && option.getId() != 13) {
            if (option.getChoice1TextOneLine() != '' && option.getChoice2TextOneLine() != '') {
              var title = new createjs.Text("- Choice " + (c) + " -", "Bold 24px Coming Soon", "#006ECC");
              title.set({
                x: -640,
                y: -412 + row * 20,
                textAlign: 'left',
              });
              group.addChild(title);
              row++;
              var color: string = "#006ECC";
              if (self.choiceIds[i] == 1) {
                color = "#E63C41";
              }
              var text1 = new createjs.Text(option.getChoice1TextOneLine() + " ( " + option.getChoice1Percentage() + "% )", "Bold 16px Coming Soon", color);
              if (self.choiceIds[i] == 1) {
                text1 = new createjs.Text(option.getChoice1TextOneLine() + " (v) ( " + option.getChoice1Percentage() + "% )", "Bold 16px Coming Soon", color);
              }
              text1.set({
                x: -640,
                y: -400 + row * 20,
                textAlign: 'left',
              });
              group.addChild(text1);
              row++;

              color = "#006ECC";
              if (self.choiceIds[i] == 2) {
                color = "#E63C41";
              }
              var text2 = new createjs.Text(option.getChoice2TextOneLine() + " ( " + option.getChoice2Percentage() + "% )", "Bold 16px Coming Soon", color);
              if (self.choiceIds[i] == 2) {
                text2 = new createjs.Text(option.getChoice2TextOneLine() + " (v) ( " + option.getChoice2Percentage() + "% )", "Bold 16px Coming Soon", color);
              }
              text2.set({
                x: -640,
                y: -400 + row * 20,
                textAlign: 'left',
              });
              group.addChild(text2);
              row++;
              row++;
              c++;
            }
          }
          i++;
        });
      });

    }

    private tick = (event) => {
      let self: CanvasComponent = this;
      self.zoom = Math.min(Math.max(self.zoom, self.minZoom), self.maxZoom);
      //self.parent.regX = Utils.lerp(self.parent.regX, self.center.x, 1/createjs.Ticker.framerate * 10);
      //self.parent.regY = Utils.lerp(self.parent.regY, self.center.y, 1/createjs.Ticker.framerate * 10);
      //self.parent.x = Utils.lerp(self.parent.x, self.center.width, 1/createjs.Ticker.framerate * 10);
      //self.parent.y = Utils.lerp(self.parent.y, self.center.height, 1/createjs.Ticker.framerate * 10);
      //self.parent.scaleX = Utils.lerp(self.parent.scaleX, self.zoom, 1/createjs.Ticker.framerate * 10);
      //self.parent.scaleY = Utils.lerp(self.parent.scaleY, self.zoom, 1/createjs.Ticker.framerate * 10);
      self.parent.regX = Utils.lerp(self.parent.regX, self.center.x, 0.25);
      self.parent.regY = Utils.lerp(self.parent.regY, self.center.y, 0.25);
      self.parent.x = Utils.lerp(self.parent.x, self.center.width, 0.25);
      self.parent.y = Utils.lerp(self.parent.y, self.center.height, 0.25);
      self.parent.scaleX = Utils.lerp(self.parent.scaleX, self.zoom, 0.25);
      self.parent.scaleY = Utils.lerp(self.parent.scaleY, self.zoom, 0.25);
      self.stage.update(event);
    }
    private mouseDownHandler = (evt1) => {
      let self: CanvasComponent = this;
      var offset={
        x: self.parent.x - evt1.stageX,
        y: self.parent.y - evt1.stageY
      };
      self.stage.addEventListener("stagemousemove",function(evt2: any) {
        if (self.center.width == evt2.stageX + offset.x && self.center.height == evt2.stageY + offset.y) {
          self.bMouseDown = false;
        } else {
          self.bMouseDown = true;
        }
        self.center.width = evt2.stageX + offset.x;
        self.center.height = evt2.stageY + offset.y;
      });
      self.stage.addEventListener("stagemouseup", function(){
        self.stage.removeAllEventListeners("stagemousemove");
        setTimeout(function() {
          self.bMouseDown = false;
        }, 100);
      });
    }
    private mouseWheelHandler = (evt) => {
      let self: CanvasComponent = this;
      var scale: number = 1;
      if (Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail))) > 0) {
        scale=1.15;
      } else {
        scale=1/1.15;
      }
      var local = self.parent.globalToLocal(self.stage.mouseX, self.stage.mouseY);
      self.center.x = local.x;
      self.center.y = local.y;
      self.center.width = self.stage.mouseX;
      self.center.height = self.stage.mouseY;
      self.zoom *= scale;

      //self.parent.regX = local.x;
      //self.parent.regY = local.y;
      //self.parent.x = self.stage.mouseX;
      //self.parent.y = self.stage.mouseY;

      //self.zoom = Utils.lerp(self.zoom, 1, 1/createjs.Ticker.framerate * 1000);
    }
    render() {
      let self: CanvasComponent = this;
      return (
        <div className={styles.wrapper}>
          <canvas ref="canvas" width={this.props.width} height={this.props.height}></canvas>
        </div>
      );
    }
  }
}

export default Canvas;
