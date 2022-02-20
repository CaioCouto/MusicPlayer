import './App.css';
import albums from '~/mocks/albums.json';
import { html } from '~/utils';
import { Header } from '../components/Header';
import { PlayerButtons } from '../components/PlayerButtons';
import { AlbumCard } from '~/components/AlbumCard';
import { Player } from '~/models/Player';


export function App() {
  const player = new Player();
  albums.forEach(album => player.playlist.addAlbum(album))
  
  return html`
    <div class="App">
      ${Header()}
      <main class="main">
        ${
          player.playlist.albums.map((album, index) => (
            AlbumCard(
              album, 
              index, 
              player
            )
          )).join('')
        }
      </main>
      ${PlayerButtons(player)}
    </div>
  `;
}
