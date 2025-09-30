const playBtn = document.querySelector("#playBtn");
const audioPlayer = document.querySelector("#audioPlayer");
const progressDisplayText = document.querySelector("#progressDisplayText");
const progressBar = document.querySelector("#progressBar");
const progressContainer = document.querySelector("#progressContainer");

function convertSecondstoMinsSecs(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return ` ${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

audioPlayer.addEventListener("timeupdate", () => {
  const currentTime = convertSecondstoMinsSecs(audioPlayer.currentTime);
  const durationTime = convertSecondstoMinsSecs(audioPlayer.duration);
  progressDisplayText.textContent = `${currentTime} / ${durationTime}`;

  if (audioPlayer.duration) {
    const progressPercent =
      (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }
});

playBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer
      .play()
      .then(() => {
        playBtn.textContent = "⏸";
      })
      .catch((error) => {
        console.log("❌Play failed:", error);
      });
  } else {
    audioPlayer.pause();
    playBtn.textContent = "▶";
  }
});

progressContainer.addEventListener("click", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audioPlayer.currentTime = percent * audioPlayer.duration;
});
