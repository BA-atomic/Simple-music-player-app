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
const playList = document.querySelector("#playList");

const songs = [
  {
    title: "SoundHelix Song 1",
    artist: "DJ Harmony",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "SoundHelix Song 2",
    artist: "Electro Vibes",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "SoundHelix Song 3",
    artist: "Midnight Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "SoundHelix Song 4",
    artist: "Lofi Dreams",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    title: "SoundHelix Song 5",
    artist: "The Chill Collective",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    title: "SoundHelix Song 6",
    artist: "Urban Flow",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    title: "SoundHelix Song 7",
    artist: "Neon Skyline",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    title: "SoundHelix Song 8",
    artist: "Groove Masters",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
  {
    title: "SoundHelix Song 9",
    artist: "Cloud Nine",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  },
  {
    title: "SoundHelix Song 10",
    artist: "Rhythm Avenue",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
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

function isPlaying() {
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
}

function loadSong(index) {
  currentSongIndex = index;
  audioPlayer.src = songs[index].url;
  audioPlayer.load();
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
  highlightCurrentSong(index);
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  highlightCurrentSong(currentSongIndex);
  playSong();
}

function prevSong() {
  currentSongIndex =
    currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
  loadSong(currentSongIndex);
  highlightCurrentSong(currentSongIndex);
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

function highlightCurrentSong(index) {
  playListItems.forEach((items, idx) => {
    if (idx === index) {
      playListItems[idx].classList.add("active");
    } else {
      playListItems[idx].classList.remove("active");
    }
  });
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

playBtn.addEventListener("click", isPlaying);
volume.addEventListener("input", updateVolume);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audioPlayer.addEventListener("ended", () => {
  nextSong();
  highlightCurrentSong(currentSongIndex);
});

progressContainer.addEventListener("click", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audioPlayer.currentTime = percent * audioPlayer.duration;
});

const playListItems = [];

songs.forEach((song, idx) => {
  const playListDiv = document.createElement("div");
  playListDiv.innerHTML = `
  <div id="songBox"></div>
  <p id="songName">${song.title}</p>
  <p id="songArtist">${song.artist}</p>
`;
  playListDiv.classList.add("playListSong");
  playList.append(playListDiv);
  playListItems.push(playListDiv);

  playListDiv.addEventListener("click", () => {
    highlightCurrentSong(idx);
    loadSong(idx);
    playSong();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    isPlaying();
  } else if (event.code === "ArrowLeft") {
    prevSong();
  } else if (event.code === "ArrowRight") {
    nextSong();
  }
});
