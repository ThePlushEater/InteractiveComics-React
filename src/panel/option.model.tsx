import * as _ from 'underscore';

module Option {
  export interface IOptionAttributes {
    id: number;
    choice1: number;
    choice1_text: string;
    choice2: number;
    choice2_text: string;
    x: number;
    y: number;
    width: number;
    height: number;
    fontsize: number;
    image: string;
    choice1_x: number;
    choice1_y: number;
    choice2_x: number;
    choice2_y: number;
    choice1_total: number;
    choice2_total: number;
  }
  export class Option extends Backbone.Model {
    constructor(attributes?: IOptionAttributes, options?: any) {
      super(attributes, options);
    }
    parse(response: any, options?: any): any {
      if (response.id != null) {
        response.id = parseInt(response.id);
      }
      response.choice1 = parseInt(response.choice1);
      response.choice2 = parseInt(response.choice2);
      response.x = parseInt(response.x);
      response.y = parseInt(response.y);
      response.width = parseInt(response.width);
      response.height = parseInt(response.height);
      response.fontsize = parseInt(response.fontsize);
      response.choice1_x = parseInt(response.choice1_x);
      response.choice1_y = parseInt(response.choice1_y);
      response.choice2_x = parseInt(response.choice2_x);
      response.choice2_y = parseInt(response.choice2_y);
      response.choice1_total = parseInt(response.choice1_total);
      response.choice2_total = parseInt(response.choice2_total);
      return super.parse(response, options);
    }
    toJSON(options?: any): any {
      var clone = this.clone().attributes;
      if (this.id != null) {
        clone["id"] = this.id;
      }
      return clone;
    }
    public getId(): number {
      if (this.id != undefined) {
        return Math.floor(this.id);
      }
      return null;
    }
    public getChoice1Id(): number {
      return Math.floor(this.get('choice1'));
    }
    public getChoice2Id(): number {
      return Math.floor(this.get('choice2'));
    }
    public getChoice1Percentage(): string {
      if ((this.get('choice1_total') + this.get('choice2_total')) == 0) {
        return '0';
      }
      return (100 * this.get('choice1_total') / (this.get('choice1_total') + this.get('choice2_total'))).toFixed(2);
    }
    public getChoice2Percentage(): string {
      if ((this.get('choice1_total') + this.get('choice2_total')) == 0) {
        return '0';
      }
      return (100 * this.get('choice2_total') / (this.get('choice1_total') + this.get('choice2_total'))).toFixed(2);
    }
    public getChoice1Total(): number {
      return this.get('choice1_total');
    }
    public getChoice2Total(): number {
      return this.get('choice2_total');
    }
    public getChoice1Text(): string {
      var list = this.get('choice1_text').split('\\n');
      var text = '';
      list.forEach(function(line: string, index: number) {
        text += line + '\n';
      });
      return text;
    }
    public getChoice2Text(): string {
      var list = this.get('choice2_text').split('\\n');
      var text = '';
      list.forEach(function(line: string, index: number) {
        text += line + '\n';
      });
      return text;
    }
    public getChoice1TextOneLine(): string {
      return this.get('choice1_text').split('\\n').join(' ').split('   ').join(' ').split('  ').join(' ').trim();
    }
    public getChoice2TextOneLine(): string {
      return this.get('choice2_text').split('\\n').join(' ').split('   ').join(' ').split('  ').join(' ').trim();
    }
    public getBounds(): createjs.Rectangle {
      return new createjs.Rectangle(this.get('x'), this.get('y'), this.get('width'), this.get('height'))
    }
    public getFontSize(): number {
      return Math.floor(this.get('fontsize'));
    }
    public getImage(): string {
      return this.get('image');
    }
    public getChoice1Position(): createjs.Point {
      return new createjs.Point(Math.floor(this.get('choice1_x')), Math.floor(this.get('choice1_y')));
    }
    public getChoice2Position(): createjs.Point {
      return new createjs.Point(Math.floor(this.get('choice2_x')), Math.floor(this.get('choice2_y')));
    }
  }
  export class Options extends Backbone.Collection {
    constructor(models?: Option[], options?: any) {
      super(models, options);
      this.model = Option;
    }
  }
}

export default Option;
