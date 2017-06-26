// var inputElement = document.getElementById("input");
// inputElement.addEventListener("change", handleFiles, false);
// function handleFiles() {
//   if(this.files){
//     let fileList = this.files[0];
//     let previewElement = document.querySelector("#preview");
//     previewElement.setAttribute("src",URL.createObjectURL(fileList));
//   }
// }

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
