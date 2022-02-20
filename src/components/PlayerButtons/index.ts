import { Player } from '~/models/Player';
import { changePlayButtonImg, clearTrackPlayingStyle, html, mounted } from '~/utils';
import './PlayerButtons.css';

function addTrackPlayingStyle(player:Player): void {
  const tracks = document.querySelectorAll(`#main__album${player.albumIndex}-track`);
  tracks.forEach(track => {
    const trackId = track.getAttribute('data-trackId') as string;
    if(Number(trackId) == player.trackIndex){
      track.classList.add('playing');
    }
  })
}

function handleAudioChange(player:Player, next:boolean) {
  if (!player.trackUrl) return;

  clearTrackPlayingStyle();
  if (next) player.nextTrack();
  else player.prevTrack();
  addTrackPlayingStyle(player);
  
  player.play();
  changePlayButtonImg('img/pause.svg');
}

export function PlayerButtons(player:Player) {

  mounted(function() {
    const volumeSlider = document.querySelector('.main__player-volume') as HTMLInputElement;
    const slideWrapper = document.querySelector('.main__player-slideWrapper');
    const playPauseBtn = document.querySelector('.main__player-playPause');
    const prevBtn = document.querySelector('.main__player-prev');
    const nextBtn = document.querySelector('.main__player-next');
    const muteBtn = document.querySelector('.main__player-mute');

    prevBtn?.addEventListener('click', () => handleAudioChange(player, false));
    nextBtn?.addEventListener('click', () => handleAudioChange(player, true));

    slideWrapper?.addEventListener('click', () => {
      player.unmute();
      muteBtn?.setAttribute('src', 'img/mute.svg');
      volumeSlider.disabled = false;
    });

    muteBtn?.addEventListener('click', () => {
      if(player.muted()) {
        player.unmute();
        muteBtn?.setAttribute('src', 'img/mute.svg');
      }
      else {
        player.mute();
        muteBtn?.setAttribute('src', 'img/unmute.svg');
      }
      volumeSlider.disabled = !volumeSlider.disabled
    });

    volumeSlider?.addEventListener('change', () => {
      const volume = Number(volumeSlider.value) / 100;
      player.changeVolume(volume);
    });

    playPauseBtn?.addEventListener('click', () => {
      if(player.playing) {
        player.pause();
        changePlayButtonImg('img/play.svg');
      }
      else {
        player.play();
        changePlayButtonImg('img/pause.svg');
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
