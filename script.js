let timeBegan = null; // did the clock start?
let timeStopped = null; // at what time was the timer stopped?
let stoppedDuration = 0; // how long was the timer stopped?
let startInterval = null; // this is needed to stop the startInterval() method
let flag = false; // to control the start/stop of the timer

const time = document.querySelector("#time")
const startBtn = document.querySelector("#start")
const resetBtn = document.querySelector("#reset")

let hour = document.querySelector("#hour")
let minute = document.querySelector("#minute")
let second = document.querySelector("#second")
let millisecond = document.querySelector("#millisecond")


startBtn.addEventListener("click", () => {
  if(!flag){
    start()
    flag = true
    startBtn.innerHTML = "Pause"
  } else {
    stop()
    flag = false
    startBtn.innerHTML = "Start"
  }
})

resetBtn.addEventListener("click", () => {
  reset()
  startBtn.innerHTML = "Start"
})

function start() {
  if(timeBegan === null)
    timeBegan = new Date()

  if(timeStopped !== null)
    stoppedDuration += (new Date() - timeStopped)
  // setInterval runs the timeRunning function continuously
  // startInterval in needed to clear the interval
  startInterval = setInterval(timeRunning)
}

function reset() {
  clearInterval(startInterval)
  timeBegan = null
  timeStopped = null
  stoppedDuration = 0
  flag = false
  hour.innerHTML = "00"
  minute.innerHTML = "00"
  second.innerHTML = "00"
  millisecond.innerHTML = "00"
}

function stop() {
  timeStopped = new Date()
  clearInterval(startInterval)
}

function timeRunning() {
  const currentTime = new Date()
  const timeElapsed = new Date(currentTime - timeBegan - stoppedDuration)

  let hours = timeElapsed.getUTCHours()
  let minutes = timeElapsed.getUTCMinutes()
  let seconds = timeElapsed.getUTCSeconds()
  let milliseconds = timeElapsed.getUTCMilliseconds()

  milliseconds = Math.floor(milliseconds/10)

  hour.innerHTML = (hours = hours < 10 ? '0' + hours:hours)
  minute.innerHTML = (minutes = minutes < 10 ? '0' + minutes:minutes)
  second.innerHTML = (seconds = seconds < 10 ? '0' + seconds:seconds)
  millisecond.innerHTML = (milliseconds = milliseconds < 10 ? '0' + milliseconds:milliseconds)
}