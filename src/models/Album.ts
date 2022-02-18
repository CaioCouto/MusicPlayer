export class Album implements AlbumType {
  readonly title: string;
  readonly artist: string;  
  readonly cover: string;
  readonly tracks: Array<TrackData>;

  constructor(album:AlbumData) {
    this.title = album.title;
    this.artist = album.artist;
    this.cover = album.cover;
    this.tracks = album.tracks;
  }

  private compareTracksUrl(track1:TrackData | undefined, track2:TrackData | undefined): boolean {
    return track1 && track2 ? track1.url === track2.url : false;
  }

  public getUrlFromIndex(index: number): string | null {
    const track = this.tracks[index];
    return track ? track.url : null;
  }
  
  public isFirstTrack(index: number): boolean {
    const firstTrack = this.tracks[0];
    const consultedTrack = this.tracks[index]; 
    return this.compareTracksUrl(firstTrack, consultedTrack);
  }

  public isLastTrack(index: number): boolean {
    const lastTrack = this.tracks[this.tracks.length-1];
    const consultedTrack = this.tracks[index];
    return this.compareTracksUrl(lastTrack, consultedTrack);
  }
}
