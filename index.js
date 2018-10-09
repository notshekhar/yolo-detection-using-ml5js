let video = document.querySelector(".yolo")
let output = document.querySelector(".output")
let spin = document.querySelector(".spin")
let wrap = document.querySelector(".wrap")
const classifier = ml5.imageClassifier('MobileNet', loaded);

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream){
    video.src = window.URL.createObjectURL(stream)
    video.play()
  })
}
function loaded(){
  spin.style.display = "none"
  wrap.style.display = "block"
  output.style.top = `${video.getBoundingClientRect().height}px`

  video.onprogress = () => {
    let canva = document.createElement("canvas")
    canva.height = video.getBoundingClientRect().height
    canva.width = video.getBoundingClientRect().width
    let ctx = canva.getContext("2d")
    ctx.drawImage(video, 0, 0, video.getBoundingClientRect().height, video.getBoundingClientRect().height)
    let url = canva.toDataURL()
    let image = new Image()
    image.height = video.getBoundingClientRect().height
    image.width = video.getBoundingClientRect().width
    image.src = url
    classifier.predict(image, function(err, result){
      output.innerHTML = `This video my be containing ${result[0].className}, ${result[1].className}, ${result[2].className}, I'm ${result[0].probability*100}% sure.`
    })
  }
}
