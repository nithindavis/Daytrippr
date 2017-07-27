$(function() {

  $("input[type=file]").on("change", function() {
    // assuming there will only be a single file.
    var file = this.files[0];       // Q: can you do something with the other attributes ?

    $(this).parent().css({
      // URL object support - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
      "background-image": "url("+ URL.createObjectURL(file) +")"
    });
  });

  $(".item").on("click", function() {
    var asset = $("<div>", {
      id: "asset" + Math.floor(Math.random() * 1000),
      class: "asset " + $(this).data("type")
    }).css({
      "top": Math.floor(Math.random() * 200),
      "left": Math.floor(Math.random() * 500)
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
      asset.append("<p>").attr("contenteditable", "true")
        .addClass("asset_txt");

      var btn_edit = $("<div>", {
        class: "btn_edit btn_action"
      }).appendTo(action_btns);
    }

    asset.append(action_btns);
    asset.appendTo($("section#content"));
    asset.draggable({ containment: "section#content", scroll: false });
    asset.hover(function() {
      action_btns.toggle();
    })
  });

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
    //

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

}

function editTextNode(obj) {
  obj.setAttribute("contenteditable","true");

}
