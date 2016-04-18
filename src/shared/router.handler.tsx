export default class RouterHandler extends Backbone.Router {
  public current: string;
  public arguments: Array<string>;
  constructor(options?: Backbone.RouterOptions) {
    super(options);
    this.route("", "dashboard");
    this.route("comic/:id", "comic");
  }
  dashboard() {
    this.current = "dashboard";
      //EventHandler.handleNavigate(VIEW_STATUS.HOME);
  }
  comic(cid: string) {
    this.current = "comic";
    this.arguments = new Array<string>();
    this.arguments.push(cid);
      //EventHandler.handleNavigate(VIEW_STATUS.TREES, { id: id });
  }
}
