let songs = [
    {
        title: "Kesariya",
        artist: "Arjit Singh",
        src: "Kesariya Brahmastra 128 Kbps.mp3",
        image: "kesariya-brahmastra.jpg"
    },

    {
        title: "tera-mera-rishta",
        artist: "Saaj Bhatt, Subodhh Sharma",
        src: "Tera Mera Rishta Awarapan 2 128 Kbps.mp3",
        image: "tera-mera-rishta-awarapan.jpg"
    },

    {
        title: "Sahiba",
        artist: "Stebin Ben, Jasleen Royal",
        src: "Sahiba Priya Saraiya 128 Kbps.mp3",
        image: "Sahiba.jpg"
    }

];

let currentSong = 0;

let audio = document.getElementById("audio");

let songTitle = document.getElementById("songTitle");
let artist = document.getElementById("artist");
let songImage = document.getElementById("songImage");

let playBtn = document.getElementById("playBtn");

let progress = document.getElementById("progress");

let currentTime = document.getElementById("currentTime");
let duration = document.getElementById("duration");

let volume = document.getElementById("volume");

let playlist = document.getElementById("playlist");


// Load song
function loadSong() {

    let song = songs[currentSong];

    songTitle.innerText = song.title;

    artist.innerText = song.artist;

    songImage.src = song.image;

    audio.src = song.src;

    createPlaylist();
}


// Play / Pause
function playPause() {

    if (audio.paused) {

        audio.play();

        playBtn.innerText = "⏸";

    } else {

        audio.pause();

        playBtn.innerText = "▶";
    }
}


// Next song
function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong();

    audio.play();

    playBtn.innerText = "⏸";
}


// Previous song
function previousSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong();

    audio.play();

    playBtn.innerText = "⏸";
}


// Update progress bar
audio.addEventListener("timeupdate", function () {

    if (audio.duration) {

        progress.value =
            (audio.currentTime / audio.duration) * 100;
    }

    currentTime.innerText =
        formatTime(audio.currentTime);

});


// Show duration
audio.addEventListener("loadedmetadata", function () {

    duration.innerText =
        formatTime(audio.duration);

});


// Click progress bar
progress.addEventListener("input", function () {

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});


// Volume control
volume.addEventListener("input", function () {

    audio.volume = volume.value;

});


// When song ends
audio.addEventListener("ended", function () {

    nextSong();

});


// Format time
function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}


// Create playlist
function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach(function (song, index) {

        let div = document.createElement("div");

        div.className = "song";

        div.innerText =
            song.title + " - " + song.artist;

        div.onclick = function () {

            currentSong = index;

            loadSong();

            audio.play();

            playBtn.innerText = "⏸";
        };

        playlist.appendChild(div);

    });
}


// Load first song
loadSong();