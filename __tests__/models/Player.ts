import albumData from '@/albums.json';
import { TunesPlayer } from '~/models/Player';

describe('Player', function () {
  let player: TunesPlayer;

  describe('With no items', function () {
    beforeEach(function () {
      player = new TunesPlayer();
    });

    it('Starts with album 0', function () {
      expect(player.albumIndex).toEqual(0);
    });

    it('Starts with track 0', function () {
      expect(player.trackIndex).toEqual(0);
    });
  });

  describe('With added album', function () {
    beforeEach(function () {
      player = new TunesPlayer();
      player.playlist.addAlbum(albumData[0]);
    });

    it('Is paused', function () {
      expect(!player.playing).toBeTruthy();
    });

    describe('While playing', function () {
      beforeEach(function () {
        player.play();
      });

      it('Is playing', function () {
        expect(player.playing).toBeTruthy();
      });

      it('Has a current album', function () {
        expect(player.album.title).toEqual(albumData[0].title);
      });

      it('Has a current track URL', function () {
        expect(player.trackUrl).toEqual(albumData[0].tracks[0].url);
      });

      it('Pauses', function () {
        player.pause();
        expect(player.playing).toBeFalsy();
      });

      describe('Selecting a track', function () {
        beforeEach(function () {
          player.playlist.addAlbum(albumData[1]);
        });

        it('Update valid index', function () {
          player.albumIndex = 1;
          player.trackIndex = 0;

          expect(player.albumIndex).toEqual(1);
          expect(player.trackIndex).toEqual(0);
        });

        it('Skip invalid index', function () {
          player.albumIndex = 10;
          player.trackIndex = 10;

          expect(player.albumIndex).toEqual(0);
          expect(player.trackIndex).toEqual(0);
        });
      });

      describe('Next track', function () {
        beforeEach(function () {
          player.playlist.addAlbum(albumData[1]);
        });

        it('Increments within an album', function () {
          player.nextTrack();

          expect(player.albumIndex).toEqual(0);
          expect(player.trackIndex).toEqual(1);
        });

        it('Goes to the next album', function () {
          player.trackIndex = 1;
          player.nextTrack();

          expect(player.albumIndex).toEqual(1);
          expect(player.trackIndex).toEqual(0);
        });

        it('Goes to the first album if at end', function () {
          player.albumIndex = 1;
          player.trackIndex = 1;
          player.nextTrack();

          expect(player.albumIndex).toEqual(0);
          expect(player.trackIndex).toEqual(0);
        });
      });

      describe('Previous track', function () {
        beforeEach(function () {
          player.playlist.addAlbum(albumData[1]);
        });

        it('Goes to the previous track in an album', function () {
          player.trackIndex = 1;
          player.prevTrack();

          expect(player.albumIndex).toEqual(0);
          expect(player.trackIndex).toEqual(0);
        });

        it('Goes to the last track of previous album', function () {
          player.albumIndex = 1;
          player.prevTrack();

          expect(player.albumIndex).toEqual(0);
          expect(player.trackIndex).toEqual(1);
        });

        it('Wraps around if at the very beginning', function () {
          player.prevTrack();

          expect(player.albumIndex).toEqual(1);
          expect(player.trackIndex).toEqual(1);
        });
      });
    });
  });
});
