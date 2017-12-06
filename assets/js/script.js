$(function() {
  // localStorage.clear();

  // initially re-load from cache
  loadFromCache();

  $("input[type=file]").on("change", function() {
    // assuming there will only be a single file.
    var file = this.files[0];       // Q: can you do something with the other attributes ?

    $(this).parent().css({
      // URL object support - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
      "background-image": "url("+ URL.createObjectURL(file) +")"
    });
  });

  $(".item").on("click", function() {

    // generate properties
    var assetProps = {
      "id": "asset" + Math.floor(Math.random() * 1000),
      "data-type": $(this).data("type"),
      "left": Math.floor(Math.random() * 500),
      "top": Math.floor(Math.random() * 200),
      "class": "asset " + $(this).data("type")
    };

    // create the asset with assigned properties
    var asset = $("<div>", {
      id: assetProps['id'],
      class: assetProps['class'],
      "data-type": assetProps['data-type']
    }).css({
      "top": assetProps['top'],
      "left": assetProps['left']
    });

    var action_btns = $("<div>", {
      class: "btn_action_container",
    }).hide();

    var btn_close = $("<div>", {
      class: "btn_close btn_action"
    }).on("click", function() {
      $(this).closest(".asset").remove();
    }).appendTo(action_btns);

    if($(this).data("editable")) {
      assetProps['editable'] = true;
      asset.append("<p>").attr("contenteditable", "true")
        .addClass("asset_txt");

      var btn_edit = $("<div>", {
        class: "btn_edit btn_action"
      }).appendTo(action_btns);
    }


    asset.append(action_btns);
    asset.appendTo($("section#content"));
    asset.draggable({
      containment: "section#content",
      scroll: false,
      drag: function(evt) {
      },
      stop: function(evt) {
        // update cache
        var currElem = $(this);
        updateCache(currElem.attr("id"), {
          id: currElem.attr('id'),
          left: currElem.offset()['left'],
          top: currElem.offset()['top'],
          class: currElem.attr('class'),
          'data-type': currElem.data('type')
        })
      }
    });
    asset.hover(function() {
      action_btns.toggle();
    });

    updateCache(assetProps.id, assetProps);
  });


  function updateCache(id, elemObj) {
    if(localStorage[id]) {
      // console.log("yes =======>>>", localStorage[id]);
      localStorage[id] = JSON.stringify(elemObj);
    }
    else
      localStorage.setItem(id, JSON.stringify(elemObj));
  }

  function loadFromCache() {
    var cache = localStorage;
    var contentDiv = $("#content");
    if(cache.length > 0) {
      for(elem in cache) {
        var elemProps = JSON.parse(cache[elem])
        var elem = $("<div>", elemProps)
        elem.offset({ "left": elemProps["left"], "top": elemProps["top"] })
        console.log(elem);
        contentDiv.append(elem);
      }
    }
  }
});

function createAsset(assetName, withTextNode) {
  var editMode = false;

  var asset = document.createElement("div");
  asset.setAttribute("id", assetName);

  var closeButton = document.createElement("div");
  closeButton.setAttribute("class","closeButton");
  closeButton.setAttribute("style","visibility:hidden;");
  asset.appendChild(closeButton);

  if(withTextNode) {
    //text content area
    // var newContent = document.createTextNode("Hi, I'm a new Narrative Box");
    // asset.appendChild(newContent);

    var textContent = document.createElement("p");
    textContent.setAttribute("class","assetText");
    var actualContent = document.createTextNode("Art though wearing your mother's drapes?");
    textContent.appendChild(actualContent);
    asset.appendChild(textContent);

    //edit button
    var editButton = document.createElement("div");
    editButton.setAttribute("class","editButton");
    editButton.setAttribute("style","visibility:hidden");
    asset.appendChild(editButton);


    editButton.addEventListener("click", function(){editMode=true;editTextNode(textContent);}, false);
  }

  function editTextNode(obj) {
    obj.setAttribute("contenteditable","true");

  }
}
