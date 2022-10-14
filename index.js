// import data from "./data.js";


const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");

const progressContainer = document.getElementById("progress-container");

const title = document.getElementById("title");
const cover = document.getElementById("cover");

const progressText = document.getElementById("progressText");
const currTime = document.getElementById("currTime");
const durTime = document.getElementById("durTime");

// Song titles
const songs = [
  "shes-on-fire",
  "out-of-touch",
  "tears-for-fears",
  "boys-dont-cry",
  "dont-stop-me-now",
  "never-gonna-give-you-up",
  "rasputin",
  "take-on-me",
  "west-end-girls",
  "what-is-love",
  "where-is-my-mind",
];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

let shuffle = false;
let repeat = 0;

function roll(min, max, floatFlag) {
  let r = Math.random() * (max - min) + min;
  return floatFlag ? r : Math.floor(r);
}

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `album_covers/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

function randomSong() {
  let current = songIndex;
  songIndex = roll(0, songs.length, 0);
  if (current === songIndex) {
    randomSong();
  }
}

// Previous song
function prevSong() {
  if (repeat != 2) {
    shuffle ? randomSong() : songIndex--;
  }

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  if (repeat != 2) {
    shuffle ? randomSong() : songIndex++;
  }
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime(e) {
  const { duration, currentTime } = e.srcElement;
  var sec;
  var sec_d;

  // define minutes currentTime
  let min = currentTime == null ? 0 : Math.floor(currentTime / 60);
  min = min < 10 ? "0" + min : min;

  // define seconds currentTime
  function get_sec(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec = Math.floor(x) - 60 * i;
          sec = sec < 10 ? "0" + sec : sec;
        }
      }
    } else {
      sec = Math.floor(x);
      sec = sec < 10 ? "0" + sec : sec;
    }
  }

  get_sec(currentTime, sec);

  // define minutes duration
  let min_d = isNaN(duration) === true ? "0" : Math.floor(duration / 60);
  min_d = min_d < 10 ? "0" + min_d : min_d;

  function get_sec_d(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec_d = Math.floor(x) - 60 * i;
          sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
        }
      }
    } else {
      sec_d = isNaN(duration) === true ? "0" : Math.floor(x);
      sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
    }
  }

  // define seconds duration

  get_sec_d(duration);

  // change currentTime DOM
  // currTime.innerHTML = min +':'+ sec;
  // change duration DOM
  // durTime.innerHTML = min_d +':'+ sec_d;
  progressText.innerText = `${min + ":" + sec} / ${min_d + ":" + sec_d}`;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function shuffleSongs() {
  shuffle = !shuffle;
  shuffleBtn.style.color = shuffle == true ? "cyan" : "#ddd1e0";
}

// ) is off, 1 is repeat, and 2 is repeat-1
function repeatSongs() {
  repeat++;
  console.log(repeat);
  if (repeat > 2) {
    repeat = 0;
  }

  if (repeat == 0) {
    repeatBtn.style.color = "#ddd1e0";
  } else if (repeat == 1) {
    repeatBtn.style.color = "cyan";
  } else {
    repeatBtn.style.color = "red";
  }
}

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

repeatBtn.addEventListener("click", repeatSongs);
shuffleBtn.addEventListener("click", shuffleSongs);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

// Time of song
audio.addEventListener("timeupdate", DurTime);

// Add Shuffle
// Add Repeat
// Add Volume Control / Mute
