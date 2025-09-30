const playBtn = document.querySelector("#playBtn");
const audioPlayer = document.querySelector("#audioPlayer");
const progressDisplayText = document.querySelector("#progressDisplayText");

function convertSecondstoMinsSecs(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  mins = Math.floor(seconds / 60);
  secs = Math.floor(seconds % 60);
  return ` ${mins}: ${secs < 10 ? "0" : ""}${secs}`;
}

audioPlayer.addEventListener("timeupdate", () => {
  const currentTime = convertSecondstoMinsSecs(audioPlayer.currentTime);
  const durationTime = convertSecondstoMinsSecs(audioPlayer.duration);
  progressDisplayText.textContent = `${currentTime} / ${durationTime}`;
});

playBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = "⏸";
  } else {
    audioPlayer.pause();
    playBtn.textContent = "▶";
  }
});
