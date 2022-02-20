import { Player } from '~/models/Player';
import { changeAudioElementVolume, clearTrackPlayingStyle, html, mounted, muteAudioElement, pauseAudioElement, playAudioElement, unmuteAudioElement } from '~/utils';
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

function handleAudioChange(player:Player, next:boolean, audioElement:HTMLAudioElement) {
  if (!player.trackUrl) return;

  clearTrackPlayingStyle();
  if (next) player.nextTrack();
  else player.prevTrack();
  addTrackPlayingStyle(player);
  player.play();

  playAudioElement(audioElement, player.trackUrl);
}

export function PlayerButtons(player:Player, audioElement:HTMLAudioElement) {

  mounted(function() {
    let currentTime: number;

    const volumeSlider = document.querySelector('.main__player-volume') as HTMLInputElement;
    const slideWrapper = document.querySelector('.main__player-slideWrapper');
    const playPauseBtn = document.querySelector('.main__player-playPause');
    const prevBtn = document.querySelector('.main__player-prev');
    const nextBtn = document.querySelector('.main__player-next');
    const muteBtn = document.querySelector('.main__player-mute');

    prevBtn?.addEventListener('click', () => handleAudioChange(player, false, audioElement));
    nextBtn?.addEventListener('click', () => handleAudioChange(player, true, audioElement));
    volumeSlider?.addEventListener('change', () => changeAudioElementVolume(audioElement, Number(volumeSlider.value)));

    slideWrapper?.addEventListener('click', () => {
      unmuteAudioElement(audioElement, muteBtn!);
      volumeSlider.disabled = false;
    });

    muteBtn?.addEventListener('click', () => {
      if(audioElement.muted) unmuteAudioElement(audioElement, muteBtn);
      else muteAudioElement(audioElement, muteBtn);
      volumeSlider.disabled = !volumeSlider.disabled
    });

    playPauseBtn?.addEventListener('click', () => {
      if (!player.trackUrl) {
        player.play();
        addTrackPlayingStyle(player);
        playAudioElement(audioElement, player.trackUrl, currentTime);
      }
      else if(player.playing) {
        player.pause();
        currentTime = audioElement.currentTime;
        pauseAudioElement(audioElement);
      }
      else {
        player.play();
        playAudioElement(audioElement, null, currentTime);
      }      
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
