import { Playlist } from '~/models/Playlist';
export class Player implements PlayerType {
  public album: AlbumType | null;
  public playing: boolean;
  readonly playlist: PlaylistType;
  public trackUrl: string | null;
  private _albumIndex: number;
  private _trackIndex: number;

  constructor() {
    this._albumIndex = 0;
    this._trackIndex = 0;
    this.playlist = new Playlist();
    this.playing = false;
    this.album = null;
    this.trackUrl = null;
  }

  public set albumIndex(albumIndex: number) {
    const albumIndexIsValid = albumIndex <= (this.playlist.albums.length - 1); 
    if(albumIndexIsValid){
      this._albumIndex = albumIndex;
    }
  }

  public set trackIndex(trackIndex: number) {
    const albumExists = this.album; 
    if(albumExists){
      const trackIsValid = trackIndex <= (this.album!.tracks.length - 1);
      this._trackIndex = trackIsValid ? trackIndex : this._trackIndex;
    }
  }
  
  public get albumIndex(): number {
    return this._albumIndex
  }

  public get trackIndex(): number {
    return this._trackIndex
  }  
  

  public play(): void {
    this.album = this.playlist.albums[this._albumIndex];
    this.trackUrl = this.album.tracks[this._trackIndex].url;
    this.playing = true;
  }

  public pause(): void {
    this.playing = false;
  }

  public nextTrack(): void {
    this.pause();
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
    this.play();
  }

  public prevTrack(): void {
    const lastSongOfPreviousAlbumIndex = (index:number): number => this.playlist.albums[index].tracks.length - 1;
    this.pause();
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
    this.play();
  }
}
