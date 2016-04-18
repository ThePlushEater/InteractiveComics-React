import Interfaces from './../shared/interfaces';
import Panel from './panel.model';
import Settings from './../shared/settings';

module PanelComponent {
  export interface IPanelComponentProps {
    parent: createjs.Container;
    panel: Panel.Panel;
  }
  export class PanelComponent {
    public parent: createjs.Container;
    public group: createjs.Container;
    public panel: Panel.Panel;
    public bitmap: createjs.Bitmap;
    public boundary: createjs.Shape;
    constructor(props: IPanelComponentProps) {
      let self:PanelComponent = this;
      self.parent = props.parent;
      self.panel = props.panel;
    }
    render() {
      let self:PanelComponent = this;
      if (self.group == undefined) {
        var bounds = self.panel.getBounds();
        self.group = new createjs.Container();
        self.parent.addChild(self.group);
        self.group.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

        var rect = new createjs.Graphics();
        rect.beginStroke("#E63C41").beginFill("#E63C41").drawRect(-4, -4, bounds.width + 8, bounds.height + 8);
        self.boundary = new createjs.Shape(rect);
        self.boundary.set({
          x: bounds.x,
          y: bounds.y,
          alpha: 0,
        });

        self.bitmap = new createjs.Bitmap(Settings.uStaticImage + self.panel.getImage());
        self.bitmap.set({
          x: bounds.x,
          y: bounds.y,
        });

        self.group.addChild(self.boundary);
        self.group.addChild(self.bitmap);

        self.parent.setChildIndex(self.group, 0);
      }
    }
  }
}

export default PanelComponent;
