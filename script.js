const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songArtist = document.getElementById("song-artist");
const songName = document.getElementById("song-name");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playlistButton = document.getElementById("playlist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playlistContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playlistSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");

let index;

let loop = true;

const songList = [
  {
    name: "Universo",
    link: "music/BK - Universo.mp3",
    artist: "BK",
    image: "image/universo.jpg",
  },
  {
    name: "Ela sabe",
    link: "music/Sidoka - Ela Sabe.mp3",
    artist: "Sidoka",
    image: "image/elasabe.jpg",
  },
  {
    name: "Autumn Ring Mini",
    link: "music/Yung Buda - Autumn Ring Mini.mp3",
    artist: "Yung Buda",
    image: "image/autumn.jpg",
  },
  {
    name: "Regras da Loja Part. BK",
    link: "music/niLL - Regras da Loja.mp3",
    artist: "niLL",
    image: "image/loja.jpg",
  },
  {
    name: "Popeye (part. The Boy)",
    link: "music/Mc Igu - Popeye.mp3",
    artist: "MC Igu",
    image: "image/popeye.jpg",
  },
];

let events = {
  mouse: {
    click: "click",
  },
  touch: {
    click: "touchstart",
  },
};

let deviceType = "";

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;
  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
};

const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
    console.log("repeat off");
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
    console.log("repeat on");
  }
});

const nextSong = () => {
  if (loop) {
    if (index == songList.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    setSong(index);
    playAudio();
  } else {
    let randIndex = Math.floor(Math.random() * songList.length);
    console.log(randIndex);
    setSong(randIndex);
    playAudio;
  }
};

const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

playButton.addEventListener("click", playAudio);

nextButton.addEventListener("click", nextSong);

pauseButton.addEventListener("click", pauseAudio);

window.onload = () => {
  index = 0;
  setSong(index);
};
