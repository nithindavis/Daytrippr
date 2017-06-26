var inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  if(this.files){
    var fileList = this.files[0];
    var previewElement = document.querySelector("#preview");
    previewElement.setAttribute("src",URL.createObjectURL(fileList));
  }
}
