import * as $ from 'jquery';
import Comic from './../comic/comic.model';
import Panel from './../panel/panel.model';
import Option from './../panel/option.model';
import Settings from './../shared/settings';

module NetworkHandler {
  let xhrPool: Array<JQueryXHR>;
  function pushXHR(xhr: JQueryXHR) {
    if (xhrPool == undefined) {
      xhrPool = new Array<JQueryXHR>();
    }
    xhrPool.push(xhr);
  }
  function removeXHR(xhr: JQueryXHR) {
    let index = xhrPool.indexOf(xhr);
    if (index > -1) {
      xhrPool.splice(index, 1);
    }
  }
  export function abortAllXHR() {
    $.each(xhrPool, function (index: number, xhr: JQueryXHR) {
      if (xhr != undefined) {
        xhr.abort();
      }
    });
    xhrPool = new Array<JQueryXHR>();
  }
  export function getComicsAll(success?: any, error?: any) {
    let comics: Comic.Comics = new Comic.Comics();
    let xhr1: JQueryXHR = fetchComicsAll(comics);
    pushXHR(xhr1);
    $.when(
        xhr1
    ).then(function () {
        removeXHR(xhr1);
        while (comics.models.length < 6) {
          let comic: Comic.Comic = new Comic.Comic({
            id: null,
            name: "Coming Soon",
            issue: null,
            thumbnail: "",
            description: "",
            publisher: "",
            available: false,
          })
          comics.add(comic);
        }
        if (success) {
            success(comics);
        }
    }, function () {
        removeXHR(xhr1);
        if (error) {
          error();
        }
    });
  }

  export function getComicFromId(cid: number, success?: any, error?: any) {
    let comics: Comic.Comics = new Comic.Comics();
    let xhr1: JQueryXHR = fetchComicFromId(comics, cid);
    pushXHR(xhr1);
    $.when(
        xhr1
    ).then(function () {
        removeXHR(xhr1);
        let comic: Comic.Comic;
        if (comics.models.length == 1) {
          comic = comics.models[0];
        }
        if (success) {
            success(comic);
        }
    }, function () {
        removeXHR(xhr1);
        if (error) {
          error();
        }
    });
  }

  function fetchComicsAll(comics: Comic.Comics) {
    return comics.fetch({
      data: {},
      url: Settings.uServer + 'comics.php'
    });
  }
  function fetchComicFromId(comics: Comic.Comics, cid: number) {
    return comics.fetch({
      data: {
        id: cid,
      },
      url: Settings.uServer + 'comic.php'
    });
  }

  export function getPanelsAllFromCId(cid: number, success?: any, error?: any) {
    let panels: Panel.Panels = new Panel.Panels();
    let xhr1: JQueryXHR = fetchPanelsAllFromCId(panels, cid);
    pushXHR(xhr1);
    $.when(
        xhr1
    ).then(function () {
        removeXHR(xhr1);
        if (success) {
            success(panels);
        }
    }, function () {
        removeXHR(xhr1);
        if (error) {
          error();
        }
    });
  }

  function fetchPanelsAllFromCId(panels: Panel.Panels, cid: number) {
    return panels.fetch({
      data: {
        cid: cid,
      },
      url: Settings.uServer + 'panels.php'
    });
  }

  export function getOptionFromId(id: number, success?: any, error?: any) {
    let options: Option.Options = new Option.Options();
    let xhr1: JQueryXHR = fetchOptionFromId(options, id);
    pushXHR(xhr1);
    $.when(
        xhr1
    ).then(function () {
        removeXHR(xhr1);
        let option: Option.Option;
        if (options.models.length == 1) {
          option = options.models[0];
        }
        if (success) {
            success(option);
        }
    }, function () {
        removeXHR(xhr1);
        if (error) {
          error();
        }
    });
  }

  function fetchOptionFromId(options: Option.Options, id: number) {
    return options.fetch({
      data: {
        id: id,
      },
      url: Settings.uServer + 'choice.php'
    });
  }
}


export default NetworkHandler;
