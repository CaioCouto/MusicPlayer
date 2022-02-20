export function changePlayButtonImg(imgPath: string): void {
	const playPauseBtn = document.querySelector('.main__player-playPause');
	playPauseBtn?.setAttribute('src', imgPath);
}