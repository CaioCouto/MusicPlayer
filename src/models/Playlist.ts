import { Album } from "./Album";

export class Playlist implements PlaylistType {
  readonly albums: AlbumType[];
  
  constructor() {
    this.albums = [];
  }

  public addAlbum(data: AlbumData) {
    const album = new Album({
      title: data.title,
      artist: data.artist,
      cover: data.cover,
      tracks: data.tracks
    } as AlbumType);

    this.albums.push(album);
  }
  
  private compareAlbuns(album1: AlbumData, album2: AlbumData): boolean {
    if(!album1 || !album2) return false
    const sameArtist = album1.artist === album2.artist
    const sameCover = album1.cover === album2.cover
    return sameArtist && sameCover
  }

  public isFirstAlbum(index: number): boolean {
    const firstAlbum = this.albums[0];
    const consultedAlbum = this.albums[index]; 
    return this.compareAlbuns(firstAlbum, consultedAlbum);
  }
  public isLastAlbum(index: number): boolean {
    const lastAlbum = this.albums[this.albums.length - 1];
    const consultedAlbum = this.albums[index];
    return this.compareAlbuns(lastAlbum, consultedAlbum);
  }
}
