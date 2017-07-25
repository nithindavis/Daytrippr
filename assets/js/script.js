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

    var btn_close = $("<div>", {
      class: "closeButton"
    }).css("visibility", "hidden");

    var btn_edit = $("<div>", {
      class: "editButton"
    }).css("visibility", "hidden");

    asset.append(btn_close, btn_edit);
    asset.appendTo($("section#content"));
  });

  // make assset draggable
  // make asset editable
});

var dragObj = null;

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

    asset.addEventListener("mouseover", function(){showControls(editButton);}, false);
    asset.addEventListener("mouseout", function(){hideControls(editButton);}, false);

    editButton.addEventListener("click", function(){editMode=true;editTextNode(textContent);}, false);
  }

  var targetArea = document.getElementById("ContentArea");
  targetArea.appendChild(asset);


  asset.addEventListener("mousedown", function(){drag(window.event,this,editMode);}, false);

  closeButton.addEventListener("click", closeParent, false);

  asset.addEventListener("mouseover", function(){showControls(closeButton);}, false);
  asset.addEventListener("mouseout", function(){hideControls(closeButton);}, false);
}

function editTextNode(obj) {
  obj.setAttribute("contenteditable","true");

}

function closeParent() {
  this.parentElement.parentElement.removeChild(this.parentElement);
}

function showControls(control) {
  control.setAttribute("style","visibility:visible;");
}
function hideControls(control){
  control.setAttribute("style","visibility:hidden;");
}



function drag(e,obj,editMODE) {
  var xOff = e.pageX-obj.getBoundingClientRect().left;
  var yOff = e.pageY-obj.getBoundingClientRect().top;

  dragObj = obj;
  obj.style.position = "absolute";

  window.onmouseup = function(e) {
    dragObj = null;
    return;
  }

  if(editMODE==true) {
    dragObj = null;
    return;
  }

  obj.onmousemove = function(e) {
    var x = e.pageX;
    var y = e.pageY;
    if(dragObj==null) {
      return;
    }
    obj.style.left = (x - xOff) + "px";
    obj.style.top = (y - yOff) + "px";
  }



}
