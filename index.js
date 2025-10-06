const playBtn = document.querySelector("#playBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const volume = document.querySelector("#volumeId");
const volumeIcon = document.querySelector("#volumeIcon");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const audioPlayer = document.querySelector("#audioPlayer");
const progressDisplayText = document.querySelector("#progressDisplayText");
const progressBar = document.querySelector("#progressBar");
const progressContainer = document.querySelector("#progressContainer");
const playList = document.querySelector("#playList");
const coverArt = document.querySelector("#coverArt");
const box = document.querySelector("#box");
const errorContainer = document.querySelector("#showError");
const overlayError = document.querySelector("#overlayError");
const toggleBtn = document.querySelector("#themeToggle");
const body = document.body;
const shuffleBtn = document.querySelector("#shuffleBtn");
const repeatBtn = document.querySelector("#repeatBtn");

const songs = [
  {
    title: "SoundHelix Song 1",
    artist: "DJ Harmony",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop", // DJ vinyl
  },
  {
    title: "SoundHelix Song 2",
    artist: "Electro Vibes",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop", // neon lights
  },
  {
    title: "SoundHelix Song 3",
    artist: "Midnight Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover:
      "https://images.unsplash.com/photo-1526481280691-906f61c3965a?w=400&h=400&fit=crop", // dark city
  },
  {
    title: "SoundHelix Song 4",
    artist: "Lofi Dreams",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover:
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?w=400&h=400&fit=crop", // chill vibes
  },
  {
    title: "SoundHelix Song 5",
    artist: "The Chill Collective",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop", // nature calm
  },
  {
    title: "SoundHelix Song 6",
    artist: "Urban Flow",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    cover:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=400&h=400&fit=crop", // city night
  },
  {
    title: "SoundHelix Song 7",
    artist: "Neon Skyline",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    cover:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop", // neon skyline
  },
  {
    title: "SoundHelix Song 8",
    artist: "Groove Masters",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=400&fit=crop", // vinyl collection
  },
  {
    title: "SoundHelix Song 9",
    artist: "Cloud Nine",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    cover:
      "https://images.unsplash.com/photo-1503264116251-35a269479413?w=400&h=400&fit=crop", // dreamy clouds
  },
  {
    title: "SoundHelix Song 10",
    artist: "Rhythm Avenue",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    cover:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=400&h=400&fit=crop", // street style
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
        displayError(
          "Couldn't play audio. Check your connection and try again."
        );
      });
  } else {
    audioPlayer.pause();
    playBtn.textContent = "▶";
  }
}

let errorTimeOut;
function displayError(message) {
  clearTimeout(errorTimeOut);
  errorContainer.innerHTML = "";
  overlayError.innerHTML = "";
  const errorMesssage = document.createElement("p");
  const overlayColor = document.createElement("div");
  errorMesssage.textContent = message;
  errorContainer.classList.add("show");
  overlayError.classList.add("show");
  errorContainer.append(errorMesssage);
  overlayError.append(overlayColor);

  errorTimeOut = setTimeout(() => {
    errorContainer.classList.remove("show");
    overlayError.classList.remove("show");
  }, 2000);
}

function loadSong(index) {
  currentSongIndex = index;
  audioPlayer.src = songs[index].url;
  coverArt.src = songs[index].cover;
  audioPlayer.load();
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
  highlightCurrentSong(index);
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

function highlightCurrentSong(index) {
  playListItems.forEach((items, idx) => {
    if (idx === index) {
      playListItems[idx].classList.add("active");
    } else {
      playListItems[idx].classList.remove("active");
    }
  });
}

function changeImage(fallback) {
  let defaultImage = "error-image/error-image1.jpg";
  fallback.src = defaultImage;
  fallback.alt = "no cover";
}

function initialize() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    body.className = savedTheme;
    if (savedTheme === "dark") {
      toggleBtn.textContent = "☀️";
    } else {
      toggleBtn.textContent = "🌙";
    }
  } else {
    body.classList.add("light");
  }

  loadSong(0);
  updateVolume();
}

function songHandler() {
    if (isRepeating) {
      loadSong(currentSongIndex);
      playSong();
    } else if (isShuffling) {
      shuffleSong();
    } else {
      nextSong();
    }
}

window.addEventListener("load", initialize);

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
nextBtn.addEventListener("click", songHandler);
prevBtn.addEventListener("click", () => {
  if (isRepeating) {
    loadSong(currentSongIndex);
    playSong();
  } else if (isShuffling) {
    shuffleSong();
  } else {
    prevSong();
  }
});
audioPlayer.addEventListener("ended", () => {
 songHandler();
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
   <img class="playlistCover" src="${song.cover}" alt="Cover Photo" />
  <p class="title">${song.title}</p>
  <p class="artist">${song.artist}</p>
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

coverArt.addEventListener("error", () => {
  changeImage(coverArt);
});

document.querySelectorAll(".playlistCover").forEach((img) => {
  img.addEventListener("error", () => {
    changeImage(img);
  });
});

toggleBtn.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.replace("light", "dark");
    toggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.replace("dark", "light");
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

function shuffleSong() {
  if (songs.length === 1) {
    currentSongIndex = 0;
    loadSong(currentSongIndex);
    playSong();
    return;
  }
  let randomSong = Math.floor(Math.random() * songs.length);
  while (randomSong === currentSongIndex) {
    randomSong = Math.floor(Math.random() * songs.length);
  }

  currentSongIndex = randomSong;
  loadSong(randomSong);
  playSong();
}

let isShuffling = false;
let isRepeating = false;
shuffleBtn.addEventListener("click", () => {
  isShuffling = true;
  if (isShuffling) {
    isRepeating = false;
    shuffleBtn.classList.toggle("activeControl");
    repeatBtn.classList.remove("activeControl");
  }

  if (!shuffleBtn.classList.contains("activeControl")) {
    isShuffling = false;
  }
});

repeatBtn.addEventListener("click", () => {
  isRepeating = true;
  if (isRepeating) {
    isShuffling = false;
    repeatBtn.classList.toggle("activeControl");
    shuffleBtn.classList.remove("activeControl");
  }

  if (!repeatBtn.classList.contains("activeControl")) {
    isRepeating = false;
  }
});
