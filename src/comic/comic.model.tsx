import * as _ from 'underscore';

module Comic {
  export interface IComicAttributes {
    id: number;
    name: string;
    issue: number;
    thumbnail: string;
    description: string;
    publisher: string;
    available: boolean;
  }
  export class Comic extends Backbone.Model {
    constructor(attributes?: IComicAttributes, options?: any) {
      super(attributes, options);
    }
    parse(response: any, options?: any): any {
      if (response.id != null) {
        response.id = parseInt(response.id);
      }
      response.available = parseInt(response.available);
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
    public getName(): string {
      return this.get('name');
    }
    public getIssue(): string {
      return this.get('issue');
    }
    public getThumbnail(): string {
      return this.get('thumbnail');
    }
    public getDescription(): string {
      return this.get('description');
    }
    public getPublisher(): string {
      return this.get('publisher');
    }
    public bAvailable(): boolean {
      if (this.get('available') == 1) {
        return true;
      }
      return false;
    }
  }
  export class Comics extends Backbone.Collection {
    constructor(models?: Comic[], options?: any) {
      super(models, options);
      this.model = Comic;
    }
  }
}

export default Comic;
