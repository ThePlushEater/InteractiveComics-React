import Interfaces from './../shared/interfaces';
import Option from './option.model';
import Settings from './../shared/settings';

module OptionComponent {
  export interface IOptionComponentProps {
    parent: createjs.Container;
    option: Option.Option;
  }
  export class OptionComponent {
    public parent: createjs.Container;
    public group: createjs.Container;
    public option: Option.Option;
    public text1: createjs.Text;
    public text2: createjs.Text;
    public bitmap: createjs.Bitmap;
    constructor(props: IOptionComponentProps) {
      let self:OptionComponent = this;
      self.parent = props.parent;
      self.option = props.option;
    }
    render() {
      let self:OptionComponent = this;
      if (self.group == undefined) {
        var bounds = self.option.getBounds();
        self.group = new createjs.Container();
        self.parent.addChild(self.group);
        self.group.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

        if (self.option.getImage() != '') {
          self.bitmap = new createjs.Bitmap(Settings.uStaticImage + self.option.getImage());
          self.bitmap.set({
            x: bounds.x,
            y: bounds.y,
          });
          self.group.addChild(self.bitmap);
        }

        var font = "Bold " + self.option.getFontSize() + "px Coming Soon";
        self.text1 = new createjs.Text(self.option.getChoice1Text(), font, "#006ecc");
        self.text1.set({
          x: bounds.x + bounds.width / 2 + self.option.getChoice1Position().x,
          y: bounds.y + bounds.height / 2 + self.option.getChoice1Position().y,
          textAlign: 'left',
          lineHeight: self.option.getFontSize() * 1.35,
        });
        self.group.addChild(self.text1);
        var hit1 = new createjs.Shape();
        hit1.graphics.beginFill("#000").drawRect(0, 0, self.text1.getMeasuredWidth() * 0.5, self.text1.getMeasuredHeight());
        self.text1.hitArea = hit1;

        self.text2 = new createjs.Text(self.option.getChoice2Text(), font, "#006ecc");
        self.text2.set({
          x: bounds.x + bounds.width / 2 + self.option.getChoice2Position().x,
          y: bounds.y + bounds.height / 2 + self.option.getChoice2Position().y,
          textAlign: 'left',
          lineHeight: self.option.getFontSize() * 1.35,
        });
        self.group.addChild(self.text2);
        var hit2 = new createjs.Shape();
        hit2.graphics.beginFill("#000").drawRect(0, 0, self.text2.getMeasuredWidth() * 0.5, self.text2.getMeasuredHeight());
        self.text2.hitArea = hit2;





        /*
        var rect = new createjs.Graphics();
          rect.beginStroke("#ffffff").beginFill("#ffffff").drawRect(-2, -2, bounds.width + 4, bounds.height + 4);
        var box = new createjs.Shape(rect);
        box.set({
          x: bounds.x,
          y: bounds.y,
          alpha: 0.1,
        });
        */
        /*
        var bitmap = new createjs.Bitmap(Settings.uStaticImage + self.option.getImage());
        bitmap.set({
          x: bounds.x,
          y: bounds.y,
        });
        */

        //self.group.addChild(box);



      }
    }
  }
}

export default OptionComponent;
