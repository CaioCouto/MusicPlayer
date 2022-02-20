import { changePlayButtonImg, clearTrackPlayingStyle, html, mounted } from '~/utils';
import './AlbumCard.css';

function addTrackPlayingStyle(track: Element): void {
  track.classList.add('playing');
}

export function AlbumCard(album:AlbumType, albumIndex:number, player:PlayerType) {

  mounted(function() {
    const audioTracks = document.querySelectorAll(`#main__album${albumIndex}-track`);
    audioTracks.forEach(track => {
      track.addEventListener('click', () => {
        clearTrackPlayingStyle();
        
        const trackIndex = track.getAttribute('data-trackId');
        player.albumIndex = albumIndex;
        player.trackIndex = Number(trackIndex);

        changePlayButtonImg('img/pause.svg');
        addTrackPlayingStyle(track);
        player.play();
      })
    });
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
        ${
          album.tracks.map((track,index) => (
            `<p id="main__album${albumIndex}-track" class="main__album-track" data-trackId=${index}> ${track.title}</p>`
          )).join('')
        }
      </div>
    </section>
  `;
}
