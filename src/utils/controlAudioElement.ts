import { changePlayButtonImg } from "./changePlayButtonImg";

export function createAudioElement(){
    return new Audio;
}

export function playAudioElement(audioElement:HTMLAudioElement, url:string|null, seconds:number = 0) {
    if (url) {
        audioElement.src = url;
        audioElement.load();
    }
    audioElement.currentTime = seconds;
    audioElement.play();
    changePlayButtonImg('img/pause.svg')
}

export function pauseAudioElement(audioElement:HTMLAudioElement) {
    audioElement.pause();
    changePlayButtonImg('img/play.svg');
}

export function changeAudioElementVolume(audioElement:HTMLAudioElement, volume:number) {
    audioElement.volume = volume / 100
}

export function muteAudioElement(audioElement:HTMLAudioElement, muteBtn:Element) {
    audioElement.muted = true;
    muteBtn.setAttribute('src', 'img/unmute.svg');
}

export function unmuteAudioElement(audioElement:HTMLAudioElement, muteBtn:Element) {
    audioElement.muted = false;
    muteBtn.setAttribute('src', 'img/mute.svg');
}