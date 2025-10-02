const playBtn = document.querySelector("#playBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const volume = document.querySelector("#volumeId");
const volumeIcon = document.querySelector("#volumeIcon");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const audioPlayer = document.querySelector("#audioPlayer");
const progressDisplayText = document.querySelector("#progressDisplayText");
const progressBar = document.querySelector("#progressBar");
const progressContainer = document.querySelector("#progressContainer");

const songs = [
  {
    title: "SoundHelix Song 1",
    artist: "SoundHelix",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "SoundHelix Song 2",
    artist: "SoundHelix",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "SoundHelix Song 3",
    artist: "SoundHelix",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "SoundHelix Song 4",
    artist: "SoundHelix",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    title: "SoundHelix Song 5",
    artist: "SoundHelix",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
];

let currentSongIndex = 0;

function convertSecondstoMinsSecs(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return ` ${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function playSong() {
  audioPlayer.play();
  playBtn.textContent = "⏸";
}

function loadSong(index) {
  currentSongIndex = index;
  audioPlayer.src = songs[index].url;
  audioPlayer.load();
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

function prevSong() {
  currentSongIndex =
    currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
  loadSong(currentSongIndex);
  playSong();
}

function updateVolume() {
  audioPlayer.volume = volume.value;

  if (audioPlayer.volume === 0) {
    volumeIcon.textContent = "🔇";
  } else if (audioPlayer.volume < 0.29) {
    volumeIcon.textContent = "🔈";
  } else if (audioPlayer.volume < 0.69) {
    volumeIcon.textContent = "🔉";
  } else {
    volumeIcon.textContent = "🔊";
  }
}

window.addEventListener("load", () => {
  loadSong(0);

  updateVolume();
});

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

volume.addEventListener("input", updateVolume);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audioPlayer.addEventListener("ended", nextSong);

progressContainer.addEventListener("click", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audioPlayer.currentTime = percent * audioPlayer.duration;
});
