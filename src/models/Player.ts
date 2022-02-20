import { Playlist } from '~/models/Playlist';
export class Player implements PlayerType {
  public album: AlbumType | null;
  readonly playlist: PlaylistType;
  public trackUrl: string | null;
  private _playing: boolean;
  private _albumIndex: number;
  private _trackIndex: number;
  private _previousVolume: number;
  private _audioElement: HTMLAudioElement;
  private _audioElementCurrentSrc: string | null;
  private _audioElementCurrentTime: number;

  constructor() {
    this._albumIndex = 0;
    this._trackIndex = 0;
    this.playlist = new Playlist();
    this._playing = false;
    this.album = null;
    this.trackUrl = null;
    this._previousVolume = 0.5;
    this._audioElement = new Audio();
    this._audioElementCurrentSrc = null;
    this._audioElementCurrentTime = 0;
  }

  private returnsAudioSourceAndCurrentTime(): Array<any> {
    const isTheSameMusic = this.trackUrl === this._audioElementCurrentSrc;  
    if(isTheSameMusic) return [ this._audioElementCurrentSrc!, this._audioElementCurrentTime];
    else return [ this.trackUrl, 0 ];
  }

  public set albumIndex(albumIndex: number) {
    const albumIndexIsValid = albumIndex <= (this.playlist.albums.length - 1); 
    if(albumIndexIsValid) {
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
    return this._albumIndex;
  }

  public get trackIndex(): number {
    return this._trackIndex;
  }  
  
  public get playing(): boolean {
    return this._playing;
  }  
  
  public get volume(): number {
    return this._audioElement.volume;
  } 

  public play(): void {
    this.album = this.playlist.albums[this._albumIndex];
    this.trackUrl = this.album.tracks[this._trackIndex].url;
    [ this._audioElement.src, this._audioElement.currentTime ] = this.returnsAudioSourceAndCurrentTime();
    this._audioElement.load();
    this._audioElement.play();
    this._playing = true;
  }

  public pause(): void {
    this._audioElementCurrentTime = this._audioElement.currentTime;
    this._audioElementCurrentSrc = this._audioElement.currentSrc;
    this._audioElement.pause();
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

  public changeVolume(volume: number): void {
    this._audioElement.volume = volume;
  }
  
  public mute(): void {
    this._previousVolume = this._audioElement.volume;
    this._audioElement.muted = true;
    this._audioElement.volume = 0;
  }
  
  public unmute(): void {
    this._audioElement.volume = this._previousVolume; 
    this._audioElement.muted = false; 
  }
  
  public muted(): boolean {
    return this._audioElement.muted;
  }
}
