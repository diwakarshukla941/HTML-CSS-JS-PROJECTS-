const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const songs = ["song1", "song2", "song3"];
let songIndex = 0;

// Load song
function loadSong(song) {
  title.innerText = song;
  audio.src = `songs/${song}.mp3`;
}
loadSong(songs[songIndex]);

// Play song
function playSong() {
  audio.play();
  playBtn.innerText = "⏸️";
}

// Pause song
function pauseSong() {
  audio.pause();
  playBtn.innerText = "▶️";
}

// Toggle play/pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Prev song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Update progress bar
audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Update time
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
  currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;

  let durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;
  if (durationMinutes || durationSeconds) {
    durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
  }
});

// Click on progress bar
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Auto play next
audio.addEventListener("ended", nextSong);
