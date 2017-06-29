
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

//item1 - narrative click
document.getElementById("item1").addEventListener("click", createNarrative, false);
document.getElementById("item2").addEventListener("click", createBlam, false);

function createBlam() {
  var blam = document.createElement("div");
  blam.setAttribute("id","blam");

  var closeButton = document.createElement("div");
  closeButton.setAttribute("class","closeButton");
  closeButton.setAttribute("style","visibility:hidden;");
  blam.appendChild(closeButton);

  var targetArea = document.getElementById("ContentArea");
  targetArea.appendChild(blam);

  blam.addEventListener("mousedown", drag, false);

  closeButton.addEventListener("click", closeParent, false);

  blam.addEventListener("mouseover", showControls, false);
  blam.addEventListener("mouseout", hideControls, false);

}

function createNarrative() {
  var narr = document.createElement("div");
  var newContent = document.createTextNode("Hi, I'm a new Narrative Box");
  narr.appendChild(newContent);
  var closeButton = document.createElement("div");
  closeButton.setAttribute("class","closeButton");
  closeButton.setAttribute("style","visibility:hidden;");
  narr.appendChild(closeButton);


  narr.setAttribute("id","narrative");
  // narr.setAttribute("contenteditable","true");

  var targetArea = document.getElementById("ContentArea");
  targetArea.appendChild(narr);

  narr.addEventListener("mousedown", drag, false);

  closeButton.addEventListener("click", closeParent, false);

  narr.addEventListener("mouseover", showControls, false);
  narr.addEventListener("mouseout", hideControls, false);
}

function closeParent() {
  this.parentElement.parentElement.removeChild(this.parentElement);
}
function showControls() {
  this.childNodes[1].setAttribute("style","visibility:visible;");
}
function hideControls(){
  this.childNodes[1].setAttribute("style","visibility:hidden;");
}

var dragObj = null;

function drag(e) {
  var xOff = e.pageX-this.getBoundingClientRect().left;
  var yOff = e.pageY-this.getBoundingClientRect().top;

  dragObj = this;
  this.style.position = "absolute";

  window.onmouseup = function(e) {
    dragObj = null;
  }

  this.onmouseup = function(e) {
    dragObj = null;
  }

  this.onmousemove = function(e) {
    var x = e.pageX;
    var y = e.pageY;
    if(dragObj==null) {
      return;
    }
    this.style.left = (x - xOff) + "px";
    this.style.top = (y - yOff) + "px";
  }



}
