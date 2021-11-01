import Player from '@vimeo/player';
import throttle from 'lodash/throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
player.on('timeupdate', throttle(onTimePlayer, 1000));

function onTimePlayer(event) {
localStorage.setItem(STORAGE_KEY, `${event.seconds}`);
}
const savedTime = localStorage.getItem(STORAGE_KEY);
if(savedTime){
  player.setCurrentTime(savedTime);
}