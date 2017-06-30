var dragObj = null;

//upload and display background images for the frames locally
document.getElementById("input1").addEventListener("change", setImage, false);
document.getElementById("input2").addEventListener("change", setImage, false);
document.getElementById("input3").addEventListener("change", setImage, false);
document.getElementById("input4").addEventListener("change", setImage, false);
document.getElementById("input5").addEventListener("change", setImage, false);

function setImage() {
  if(this.files){
    this.parentElement.setAttribute("style",("background-image: url(" + (URL.createObjectURL(this.files[0])) + ");"));
  }
}

//on click on sidebar - create Assets
document.getElementById("item1").addEventListener("click", function(){createAsset("narrative",true);}, false);
document.getElementById("item2").addEventListener("click", function(){createAsset("blam", false);}, false);
document.getElementById("item3").addEventListener("click", function(){createAsset("speachBubble", true);}, false);
document.getElementById("item4").addEventListener("click", function(){createAsset("trollFace", false);}, false);
document.getElementById("item5").addEventListener("click", function(){createAsset("bitchPlease", false);}, false);


function createAsset(assetName, withTextNode) {
  var editMode = false;

  var asset = document.createElement("div");
  asset.setAttribute("id",assetName);

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

  obj.onmouseup = function(e) {
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
