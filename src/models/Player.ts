import { Playlist } from '~/models/Playlist';
export class Player implements PlayerType {
  public album: AlbumType | null;
  readonly playlist: PlaylistType;
  public trackUrl: string | null;
  private _playing: boolean;
  private _albumIndex: number;
  private _trackIndex: number;

  constructor() {
    this._albumIndex = 0;
    this._trackIndex = 0;
    this.playlist = new Playlist();
    this._playing = false;
    this.album = null;
    this.trackUrl = null;
  }

  public set albumIndex(albumIndex: number) {
    const albumIndexIsValid = albumIndex <= (this.playlist.albums.length - 1);
    if(albumIndexIsValid) {
      this._albumIndex = albumIndex;
    }
  }

  public set trackIndex(trackIndex: number) {
    const album = this.playlist.albums[this._albumIndex]; 
    if(album){
      const trackIsValid = trackIndex <= (album.tracks.length - 1);
      this._trackIndex = trackIsValid ? trackIndex : this._trackIndex;
    }
  }
  
  public get albumIndex(): number {
    return this._albumIndex;
  }

  public get trackIndex(): number {
    return this._trackIndex;
  }  
  
  public get playing(): boolean {
    return this._playing;
  }

  public play(): void {
    this.album = this.playlist.albums[this._albumIndex];
    this.trackUrl = this.album.tracks[this._trackIndex].url;
    this._playing = true;
  }

  public pause(): void {
    this._playing = false;
  }

  public nextTrack(): void {
    if(this.album?.isLastTrack(this._trackIndex)) {
      if(this.playlist.isLastAlbum(this._albumIndex)) {
        this._albumIndex = 0;
      }
      else {
        this._albumIndex += 1;
      }
      this._trackIndex = 0;
    }
    else {
      this._trackIndex += 1;
    }
  }

  public prevTrack(): void {
    const lastSongOfPreviousAlbumIndex = (index:number): number => this.playlist.albums[index].tracks.length - 1;
    if(this.album?.isFirstTrack(this._trackIndex)) {
      if(this.playlist.isFirstAlbum(this._albumIndex)) {
        this._albumIndex = this.playlist.albums.length - 1;
      }
      else {
        this._albumIndex -= 1;
      }
      this._trackIndex = lastSongOfPreviousAlbumIndex(this._albumIndex);
    }
    else {
      this._trackIndex -= 1;
    }
  }
}
