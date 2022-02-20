export function clearTrackPlayingStyle(): void {
	const playingAudioTracks = document.querySelectorAll(`.playing`);
	if(playingAudioTracks.length > 0) {
		playingAudioTracks.forEach(playingTrack => playingTrack.classList.remove('playing'));
	}
}