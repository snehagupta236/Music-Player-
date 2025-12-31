const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const songs = ["ukulele", "summer", "hey"];
let songIndex = 2;


function loadSong(song) {
  title.innerText = song;
  audio.src = `songs/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

loadSong(songs[songIndex]);

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i").className = "fa-solid fa-pause";
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i").className = "fa-solid fa-play";
  audio.pause();
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

function updateProgress(e) {
  const { duration, currentTime } = e.target;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
}

audio.addEventListener("timeupdate", updateProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

