// src/mocks/albums.json
var albums_default = [
  {
    title: "Symphony Collection",
    artist: "Ludwig van Beethoven",
    cover: "/img/beethoven.png",
    tracks: [
      {
        title: "Moolight Sonata",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/beethoven_moonlight_sonata.mp3"
      },
      {
        title: "F\xFCr Elise",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/beethoven_fur_elise-para-elise.mp3"
      },
      {
        title: "Sinfonia No. 5",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/03-01-Symphony-No.-5-in-C-minor-Op.-67-1.-Allegro-Con-Brio.mp3"
      }
    ]
  },
  {
    title: "Preludes Collection",
    artist: "Fr\xE9d\xE9ric Chopin",
    cover: "/img/chopin.png",
    tracks: [
      {
        title: "Nocturne in E flat major Op. 9",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/1-Nocturne-in-E-flat-major-Op.-9-No.-2.mp3"
      },
      {
        title: "Minute Waltz",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/10-Minute-Waltz.mp3"
      },
      {
        title: "Grande valse brillante in E flat major",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/5-Grande-valse-brillante-in-E-flat-major.mp3"
      }
    ]
  }
];

// src/utils/html.ts
var html = String.raw;

// src/utils/mounted.ts
var mounted = function(callback) {
  setTimeout(callback, 10);
};

// src/utils/clearTrackPlayingStyle.ts
function clearTrackPlayingStyle() {
  const playingAudioTracks = document.querySelectorAll(`.playing`);
  if (playingAudioTracks.length > 0) {
    playingAudioTracks.forEach((playingTrack) => playingTrack.classList.remove("playing"));
  }
}

// src/utils/changePlayButtonImg.ts
function changePlayButtonImg(imgPath) {
  const playPauseBtn = document.querySelector(".main__player-playPause");
  playPauseBtn == null ? void 0 : playPauseBtn.setAttribute("src", imgPath);
}

// src/components/Header/index.ts
function Header() {
  mounted(function() {
    const h1 = document.querySelector(".Header");
    h1 == null ? void 0 : h1.addEventListener("click", function() {
      alert("Clicked");
    });
  });
  return html`<h1 class="Header">Music Player</h1>`;
}

// src/components/PlayerButtons/index.ts
function addTrackPlayingStyle(player) {
  const tracks = document.querySelectorAll(`#main__album${player.albumIndex}-track`);
  tracks.forEach((track) => {
    const trackId = track.getAttribute("data-trackId");
    if (Number(trackId) == player.trackIndex) {
      track.classList.add("playing");
    }
  });
}
function handleAudioChange(player, next) {
  if (!player.trackUrl)
    return;
  clearTrackPlayingStyle();
  if (next)
    player.nextTrack();
  else
    player.prevTrack();
  addTrackPlayingStyle(player);
  player.play();
  changePlayButtonImg("img/pause.svg");
}
function PlayerButtons(player) {
  mounted(function() {
    const volumeSlider = document.querySelector(".main__player-volume");
    const slideWrapper = document.querySelector(".main__player-slideWrapper");
    const playPauseBtn = document.querySelector(".main__player-playPause");
    const prevBtn = document.querySelector(".main__player-prev");
    const nextBtn = document.querySelector(".main__player-next");
    const muteBtn = document.querySelector(".main__player-mute");
    prevBtn == null ? void 0 : prevBtn.addEventListener("click", () => handleAudioChange(player, false));
    nextBtn == null ? void 0 : nextBtn.addEventListener("click", () => handleAudioChange(player, true));
    slideWrapper == null ? void 0 : slideWrapper.addEventListener("click", () => {
      player.unmute();
      muteBtn == null ? void 0 : muteBtn.setAttribute("src", "img/mute.svg");
      volumeSlider.disabled = false;
    });
    muteBtn == null ? void 0 : muteBtn.addEventListener("click", () => {
      if (player.muted()) {
        player.unmute();
        muteBtn == null ? void 0 : muteBtn.setAttribute("src", "img/mute.svg");
      } else {
        player.mute();
        muteBtn == null ? void 0 : muteBtn.setAttribute("src", "img/unmute.svg");
      }
      volumeSlider.disabled = !volumeSlider.disabled;
    });
    volumeSlider == null ? void 0 : volumeSlider.addEventListener("change", () => {
      const volume = Number(volumeSlider.value) / 100;
      player.changeVolume(volume);
    });
    playPauseBtn == null ? void 0 : playPauseBtn.addEventListener("click", () => {
      if (player.playing) {
        player.pause();
        changePlayButtonImg("img/play.svg");
      } else {
        player.play();
        changePlayButtonImg("img/pause.svg");
      }
      addTrackPlayingStyle(player);
    });
  });
  return html`
    <section class="main__player-btns">
        <img class="main__player-mute" src="img/mute.svg" />
        <img class="main__player-prev" src="img/prev.svg" />
        <img class="main__player-playPause" src="img/play.svg" />
        <img class="main__player-next" src="img/next.svg" />
        <div class="main__player-slideWrapper">
          <input class="main__player-volume" type="range" min="0" max="100" value="100">
        </div>
    </section>
  `;
}

// src/components/AlbumCard/index.ts
function applyEventListenerToTrack(track, player, albumIndex) {
  track.addEventListener("click", () => {
    clearTrackPlayingStyle();
    const trackIndex = track.getAttribute("data-trackId");
    player.albumIndex = albumIndex;
    player.trackIndex = Number(trackIndex);
    player.play();
    changePlayButtonImg("img/pause.svg");
    track.classList.add("playing");
  });
}
function AlbumCard(album, albumIndex, player) {
  mounted(function() {
    const audioTracks = document.querySelectorAll(`#main__album${albumIndex}-track`);
    audioTracks.forEach((track) => applyEventListenerToTrack(track, player, albumIndex));
  });
  return html`
    <section class="main__section">
      <div class="main__album-information">
        <img class="main__album-cover" src="${album.cover}"/>            
        <div>
          <p class="main__album-title">${album.title}</p>
          <p class="main__album-artist">${album.artist}</p>
        </div>
      </div>

      <div class="main__album-tracks">
        ${album.tracks.map((track, index) => `<p id="main__album${albumIndex}-track" class="main__album-track" data-trackId=${index}> ${track.title}</p>`).join("")}
      </div>
    </section>
  `;
}

// src/models/Album.ts
var Album = class {
  constructor(album) {
    this.title = album.title;
    this.artist = album.artist;
    this.cover = album.cover;
    this.tracks = album.tracks;
  }
  compareTracksUrl(track1, track2) {
    return track1 && track2 ? track1.url === track2.url : false;
  }
  getUrlFromIndex(index) {
    const track = this.tracks[index];
    return track ? track.url : null;
  }
  isFirstTrack(index) {
    const firstTrack = this.tracks[0];
    const consultedTrack = this.tracks[index];
    return this.compareTracksUrl(firstTrack, consultedTrack);
  }
  isLastTrack(index) {
    const lastTrack = this.tracks[this.tracks.length - 1];
    const consultedTrack = this.tracks[index];
    return this.compareTracksUrl(lastTrack, consultedTrack);
  }
};

// src/models/Playlist.ts
var Playlist = class {
  constructor() {
    this.albums = [];
  }
  addAlbum(data) {
    const album = new Album({
      title: data.title,
      artist: data.artist,
      cover: data.cover,
      tracks: data.tracks
    });
    this.albums.push(album);
  }
  compareAlbuns(album1, album2) {
    if (!album1 || !album2)
      return false;
    const sameArtist = album1.artist === album2.artist;
    const sameCover = album1.cover === album2.cover;
    return sameArtist && sameCover;
  }
  isFirstAlbum(index) {
    const firstAlbum = this.albums[0];
    const consultedAlbum = this.albums[index];
    return this.compareAlbuns(firstAlbum, consultedAlbum);
  }
  isLastAlbum(index) {
    const lastAlbum = this.albums[this.albums.length - 1];
    const consultedAlbum = this.albums[index];
    return this.compareAlbuns(lastAlbum, consultedAlbum);
  }
};

// src/models/Player.ts
var Player = class {
  constructor() {
    this._albumIndex = 0;
    this._trackIndex = 0;
    this.playlist = new Playlist();
    this._playing = false;
    this.album = null;
    this.trackUrl = null;
    this._audioElement = new Audio();
    this._audioElementCurrentSrc = null;
    this._audioElementCurrentTime = 0;
  }
  returnsAudioSourceAndCurrentTime() {
    const isTheSameMusic = this.trackUrl === this._audioElementCurrentSrc;
    if (isTheSameMusic)
      return [this._audioElementCurrentSrc, this._audioElementCurrentTime];
    else
      return [this.trackUrl, 0];
  }
  set albumIndex(albumIndex) {
    const albumIndexIsValid = albumIndex <= this.playlist.albums.length - 1;
    if (albumIndexIsValid) {
      this._albumIndex = albumIndex;
    }
  }
  set trackIndex(trackIndex) {
    const albumExists = this.album;
    if (albumExists) {
      const trackIsValid = trackIndex <= this.album.tracks.length - 1;
      this._trackIndex = trackIsValid ? trackIndex : this._trackIndex;
    }
  }
  get albumIndex() {
    return this._albumIndex;
  }
  get trackIndex() {
    return this._trackIndex;
  }
  get playing() {
    return this._playing;
  }
  play() {
    this.album = this.playlist.albums[this._albumIndex];
    this.trackUrl = this.album.tracks[this._trackIndex].url;
    [this._audioElement.src, this._audioElement.currentTime] = this.returnsAudioSourceAndCurrentTime();
    this._audioElement.load();
    this._audioElement.play();
    this._playing = true;
  }
  pause() {
    this._audioElementCurrentTime = this._audioElement.currentTime;
    this._audioElementCurrentSrc = this._audioElement.currentSrc;
    this._audioElement.pause();
    this._playing = false;
  }
  nextTrack() {
    var _a;
    if ((_a = this.album) == null ? void 0 : _a.isLastTrack(this._trackIndex)) {
      if (this.playlist.isLastAlbum(this._albumIndex)) {
        this._albumIndex = 0;
      } else {
        this._albumIndex += 1;
      }
      this._trackIndex = 0;
    } else {
      this._trackIndex += 1;
    }
  }
  prevTrack() {
    var _a;
    const lastSongOfPreviousAlbumIndex = (index) => this.playlist.albums[index].tracks.length - 1;
    if ((_a = this.album) == null ? void 0 : _a.isFirstTrack(this._trackIndex)) {
      if (this.playlist.isFirstAlbum(this._albumIndex)) {
        this._albumIndex = this.playlist.albums.length - 1;
      } else {
        this._albumIndex -= 1;
      }
      this._trackIndex = lastSongOfPreviousAlbumIndex(this._albumIndex);
    } else {
      this._trackIndex -= 1;
    }
  }
  changeVolume(volume) {
    this._audioElement.volume = volume;
  }
  mute() {
    this._audioElement.muted = true;
  }
  unmute() {
    this._audioElement.muted = false;
  }
  muted() {
    return this._audioElement.muted;
  }
};

// src/views/App.ts
function App() {
  const player = new Player();
  albums_default.forEach((album) => player.playlist.addAlbum(album));
  return html`
    <div class="App">
      ${Header()}
      <main class="main">
        ${player.playlist.albums.map((album, index) => AlbumCard(album, index, player)).join("")}
      </main>
      ${PlayerButtons(player)}
    </div>
  `;
}

// src/index.ts
var root = document.querySelector("#root");
root.innerHTML = App();
