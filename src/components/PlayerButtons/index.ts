import { changePlayButtonImg, clearTrackPlayingStyle, html, mounted } from '~/utils';
import './PlayerButtons.css';

function addTrackPlayingStyle(player:PlayerType): void {
  const tracks = document.querySelectorAll(`#main__album${player.albumIndex}-track`);
  tracks.forEach(track => {
    const trackId = track.getAttribute('data-trackId') as string;
    if(Number(trackId) == player.trackIndex){
      track.classList.add('playing');
    }
  })
}

function handleAudioChange(player:PlayerType, next:boolean) {
  if (!player.trackUrl) return;

  clearTrackPlayingStyle();
  if (next) player.nextTrack();
  else player.prevTrack();
  addTrackPlayingStyle(player);
  
  player.play();
  changePlayButtonImg('img/pause.svg');
}

export function PlayerButtons(player:PlayerType) {

  mounted(function() {
    const playPauseBtn = document.querySelector('.main__player-playPause');
    const prevBtn = document.querySelector('.main__player-prev');
    const nextBtn = document.querySelector('.main__player-next');

    prevBtn?.addEventListener('click', () => handleAudioChange(player, false));
    nextBtn?.addEventListener('click', () => handleAudioChange(player, true));
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
        <img class="main__player-prev" src="img/prev.svg" />
        <img class="main__player-playPause" src="img/play.svg" />
        <img class="main__player-next" src="img/next.svg" />
    </section>
  `;
}
