$(function() {
  // localStorage.clear();
  $("#clear-cache").on("click", function() {
    localStorage.clear();
    // remove all existing assets & bgimages which are already set.
  });

  // initially re-load from cache
  loadFromCache();

  $("input[type=file]").on("change", function() {
    // assuming there will only be a single file.
    var file = this.files[0];       // Q: can you do something with the other attributes ?
    var reader = new FileReader();
    var $imgcontainer = $(this).parent();
    reader.addEventListener("load", function(evt) {
      // `reader.result` is the same as `evt.target.result`
      createBackgrounds({
        "type": "bg",
        "id": $imgcontainer.attr("id"),
        "file": file,
        "blob": reader.result
      });
      // $imgcontainer.css("background-image", "url("+ reader.result +")");
      // localStorage.setItem($imgcontainer.attr("id"), reader.result);
    });
    // this line will trigger the "load" and "loadend" event
    reader.readAsDataURL(file);
  });

  $(".item").on("click", function() {
    var selectedType = $(this).data("type");
    var isEditable = ($(this).data("editable")) ? true : false;
    createAssets({
      type: selectedType,
      editable: isEditable
    });
  });

  function removeFromCache(id) {
    if(localStorage[id]) {
      delete localStorage[id];
    }
  }

  function updateCache(id, elemObj) {
    if(localStorage[id]) {
      localStorage[id] = JSON.stringify(elemObj);
    }
    else {
      localStorage.setItem(id, JSON.stringify(elemObj));
    }
  }

  function getFromCache(id) {
    return JSON.parse(localStorage[id]);
  }

  function loadFromCache() {
    var cache = localStorage;
    var contentDiv = $("#content");
    if(cache.length > 0) {
      for(elem in cache) {
        var elemProps = JSON.parse(cache[elem]);
        if(elemProps.type === "bg")
          createBackgrounds(elemProps);
        else
          createAssets(elemProps);
      }
    }
  }

  function createBackgrounds(config) {
    if(!config.type) {
      console.error("You have to specify a background image.");
      return 0;
    }
    var bgProps = {
      "type": config.type,
      "id": config.id,
      "file": config.file,
      "blob": config.blob
    };
    $("#"+ bgProps.id).css("background-image", "url("+ bgProps.blob +")");
    updateCache(config.id, bgProps);
  }

  /* given a set of properties, returns an array of jquery elems */
  function createAssets(config) {
    if(!config.type) {
      console.error("You have to specify a type of element to create.");
      return 0;
    }
    // merge config with assetProps
    var assetProps = {
      "type": config.type,
      "editable": config.editable,
      "id": config.id || "asset" + Math.floor(Math.random() * 1000),
      "left": config.left || Math.floor(Math.random() * 500),
      "top": config.top || Math.floor(Math.random() * 200),
      "class": config.class || "asset " + config.type,
      "text": config.text || ""
    };

    // create the asset with assigned properties
    var asset = $("<div>", {
      id: assetProps['id'],
      class: assetProps['class'],
      "data-type": assetProps['type'],
      "data-editable": assetProps['editable']
    }).offset({
      "left": assetProps['left'],
      "top": assetProps['top']
    });

    var action_btns = $("<div>", {
      class: "btn_action_container",
    }).hide();

    var btn_close = $("<div>", {
      class: "btn_close btn_action"
    }).on("click", function() {
      var asset = $(this).closest(".asset");
      asset.remove();
      removeFromCache(asset.attr("id"));
    }).appendTo(action_btns);

    if(config.editable) {
      assetProps['editable'] = true;
      asset.append($("<p>")
        .on("blur", function() {
          // update the cache with the content
          var currAssetID = $(this).closest(".asset").attr("id");
          var currAssetProp = getFromCache(currAssetID);
          currAssetProp.text = $(this).text();
          updateCache(currAssetID, currAssetProp);
        })
        .text(assetProps["text"])
        .attr("contenteditable", "true")
        .addClass("asset_txt"));
      var btn_edit = $("<div>", {
        class: "btn_edit btn_action"
      }).appendTo(action_btns);
    }

    asset.append(action_btns);
    asset.appendTo($("section#content"));
    asset.draggable({
      containment: "section#content",
      scroll: false,
      stop: function(evt) {
        // update cache
        var currElem = $(this);
        var updatedAssetProps = {
          id: currElem.attr('id'),
          left: currElem.offset()['left'],
          top: currElem.offset()['top'],
          class: currElem.attr('class'),
          type: currElem.data('type'),
          editable: (currElem.data('editable')) ? true : false,
          text: currElem.text()
        };
        // update cache after element is moved around
        updateCache(currElem.attr("id"), updatedAssetProps);
      }
    });
    asset.hover(function() {
      action_btns.toggle();
    });

    // update cache after element is loaded
    updateCache(assetProps.id, assetProps);
  }
});
