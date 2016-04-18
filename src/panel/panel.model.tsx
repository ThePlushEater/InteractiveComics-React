import * as _ from 'underscore';

module Panel {
  export interface IPanelAttributes {
    id: number;
    cid: number;
    oid: number;
    x: number;
    y: number;
    width: number;
    height: number;
    image: string;
  }
  export class Panel extends Backbone.Model {
    constructor(attributes?: IPanelAttributes, options?: any) {
      super(attributes, options);
    }
    parse(response: any, options?: any): any {
      if (response.id != null) {
        response.id = parseInt(response.id);
      }
      response.cid = parseInt(response.cid);
      response.oid = parseInt(response.oid);
      response.x = parseInt(response.x);
      response.y = parseInt(response.y);
      response.width = parseInt(response.width);
      response.height = parseInt(response.height);
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
    public getCId(): number {
      return Math.floor(this.get('cid'));
    }
    public getOId(): number {
      return Math.floor(this.get('oid'));
    }
    public getBounds(): createjs.Rectangle {
      return new createjs.Rectangle(this.get('x'), this.get('y'), this.get('width'), this.get('height'))
    }
    public getImage(): string {
      return this.get('image');
    }

  }
  export class Panels extends Backbone.Collection {
    constructor(models?: Panel[], options?: any) {
      super(models, options);
      this.model = Panel;
    }
    public filterByOId(oid: number): Panels {
      var self: Panels = this;
      var result: Panel[] = self.filter(function (panel: Panel, index: number) {
        if (oid == panel.getOId()) {
            return true;
        }
        return false;
      }) as Panel[];
      return new Panels(result);
      //return trees.reset(_.map(idArray, function (id) { return this.get(id); }, this));
    }
  }
}

export default Panel;
