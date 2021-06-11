//selecting all the required DOM elements
const player = document.querySelector('.total_player');
const video = player.querySelector('.video');
const progress = player.querySelector('.progress_filled');
const tProgress = player.querySelector('.total_progress');
const controls = player.querySelector('.controls');
const play = controls.querySelector('.play');
const time = controls.querySelector('.time');
const prev = controls.querySelector('.prev');
const next = controls.querySelector('.next');
const vol = controls.querySelector('#volume');
const vollabel = controls.querySelector('.vollabel');
const speed = controls.querySelector('#speed');
const speedlabel = controls.querySelector('.spdlabel');
const flscr = controls.querySelector('.fullscreen');
const vi = controls.querySelector('.volicon');





//functionalities for specific events



function togglePlay(){
    if(video.paused)
    video.play();
    else
    video.pause();
}


//updating play button
function updateButton() {
    if(video.paused)
    play.className="play fas fa-play";
    else
    play.className="play fas fa-pause";
}

function updateProgress() {
    const percent = (video.currentTime/video.duration)*100;
    progress.style.flexBasis=`${percent}%`;
}

function updateTime() {
    let t,d,min,sec,dmin,dsec;
    t=Math.floor(video.currentTime);
    min = Math.floor(t/60);
    sec = t-min*60;        //finding extra sec (total sec - min*60)

    d=Math.floor(video.duration);
    dmin = Math.floor(d/60);
    dsec = d-dmin*60;
    time.textContent=`${min}:${sec} / ${dmin}:${dsec}`;
}

function updateVideo(){
    video.currentTime = video.currentTime + parseFloat(this.value);
}

function updateVolume(){
    video.volume=this.value;
    updateVolLabel(this);
}

function updateVolLabel(e) {
    let x = Math.floor(e.value*100);
    vollabel.textContent = x;
    if(x==0)
    vi.className="volicon fas fa-volume-mute";
    else if(x<50)
    vi.className="volicon fas fa-volume-down";
    else if(x>50)
    vi.className="volicon fas fa-volume-up";
}


//updating sound controls after keyboard events
function changeVol() {
    let volObj = {value:video.volume};
    vol.value = video.volume;
    updateVolLabel(volObj);
}


function updateSpeed(){
    video.playbackRate = this.value;
    updateSpeedLabel(this);
}

function updateSpeedLabel(e) {
    speedlabel.textContent = `${e.value}X`;
}



//function for fullscreen
function maximize() {
if(!fs)
video.requestFullscreen();
else
video.exitFullscreen();
}

function dragVideo(e) {
    const time = (e.offsetX / tProgress.offsetWidth)*video.duration;
    video.currentTime = time;
}





//function for keyboard controls
function keyPlay(e) {
    let volObj = {value:video.volume};
    if(e.key===' ')
    togglePlay();
    else if(e.key=='ArrowRight')
    video.currentTime+=10;
    else if(e.key=='ArrowLeft')
    video.currentTime-=10;
    else if(e.key=='ArrowUp')
    video.volume+=0.10;
    else if(e.key=='ArrowDown')
    video.volume-=0.10;
    else if(e.key=='m')
    {
        if(video.volume!=0)
        {
        video.volume=0;
        updateVolLabel(volObj);
        }
        else
        video.volume=1;
    }
    else if(e.key=='F11')
    {
        maximize();
    }
}










//listening for required events from all the elements
play.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',updateProgress);
video.addEventListener('timeupdate',updateTime);
video.addEventListener('volumechange',changeVol);
video.addEventListener('click',togglePlay);
prev.addEventListener('click',updateVideo);
next.addEventListener('click',updateVideo);
vol.addEventListener('change',updateVolume);
vol.addEventListener('mousemove',updateVolume);
speed.addEventListener('change',updateSpeed);
speed.addEventListener('mousemove',updateSpeed);
let fs = false;
flscr.addEventListener('click',maximize);

md=false;
tProgress.addEventListener('click',dragVideo);
tProgress.addEventListener('mousemove',(e)=>md&&dragVideo(e));
tProgress.addEventListener('mousedown',()=>md=true);
tProgress.addEventListener('mouseup',()=>md=false);
window.addEventListener('keydown',(e)=>keyPlay(e));
