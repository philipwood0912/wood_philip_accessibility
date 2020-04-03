export default {
    template: `
        <div class="vid-page">
            <div class="vid-con">
                <h1>Media Page - {{this.$parent.media.title}}</h1>
                <h2>{{this.$parent.media.mediatitle}}</h2>
                <video @canplay="video($event)" id="vidsource" width="480">
                <source :src="'public/media/' + this.$parent.media.srcone" type="video/webm">
                <source :src="'public/media/' + this.$parent.media.srctwo" type="video/mp4">
                Sorry this doesn't seem to work in the current browser...
                <track id="captions" label="English" kind="subtitles" srclang="en" :src="'public/text/' + this.$parent.media.text">
                <track id="captions" label="French" kind="subtitles" srclang="fr" :src="'public/text/' + this.$parent.media.french">
                </video>
                <div class="vid-controls">
                    <div v-if="!this.playing">
                        <button v-on:mouseenter="audio('play', 1)" v-on:click="play()" class="button"><i class="fas fa-play fa-2x" style="color:#6C3C97;"></i></button>
                    </div>
                    <div v-else>
                        <button v-on:mouseenter="audio('pause', 1)" v-on:click="pause()" class="button"><i class="fas fa-pause fa-2x" style="color:#6C3C97;"></i></button>
                    </div>
                    <button v-on:mouseenter="audio('backward', 1)" v-on:click="back($event.path[2].children[2].firstChild)"><i class="fas fa-backward fa-2x" style="color:#6C3C97;"></i></button>
                    <div class="progress">
                        <div class="progress-bar" :style="{width:durationInterval * duration + 'px'}"></div>
                    </div>
                    <button v-on:mouseenter="audio('forward', 1)" v-on:click="forward($event.path[2].children[2].firstChild)"><i class="fas fa-forward fa-2x" style="color:#6C3C97;"></i></button>
                    <button style="color:#6C3C97;" id="time">{{this.minutes}}:{{this.time}}</button>
                    <div class="closedCap">
                        <button v-on:mouseenter="audio('caption', 1)" v-on:click="caption"><i class="far fa-closed-captioning fa-2x" style="color:#6C3C97;"></i></button>
                        <div v-if="chngcap">
                            <h4 v-on:mouseenter="audio('english', 2)" v-on:click="captions(0)">English</h4>
                            <h4 v-on:mouseenter="audio('french', 1)" v-on:click="captions(1)">French</h4>
                        </div>
                    </div>
                    <div class="volControl">
                        <button v-on:mouseenter="audio('sound', 1)" v-on:click="volume"><i class="fas fa-volume-up fa-2x" style="color:#6C3C97;"></i></button>
                        <div v-if="chngvol">
                            <input v-model="this.vols" type="range" min="0" max="100" step="10" v-on:input="changeVol">
                        </div>
                    </div>
                </div>
                <button v-on:mouseenter="audio('back', 1)" id="backbut" v-on:click="goBack">Back <i class="fas fa-arrow-circle-right fa-1x" style="color:#6C3C97;"></i></button>
            </div>
        </div>
    `,
    data: function() {
        return {
            chngvol: false,
            playing: false,
            intervalid: '',
            duration: 0,
            maxduration: 0,
            durationInterval: 0,
            vidsource: "",
            vols: "50",
            time: 0,
            minutes: 0,
            chngcap: false
        }
    },
    computed:{
        // computer funct for changes in duration
        changes : {
            get : function(){
                return this.duration;
            },
            set : function(v){
                if(this.duration < 0){
                    this.duration = 0;
                } else if(this.duration > this.maxduration){
                    this.duration = 0;
                } else {
                    this.duration = v;
                }
            }
        },
        //computed function for changes in volume
        volumeChange : {
            get: function() {
                return this.vols
            },
            set: function(v){
                this.vols = v;
            }
        },
        // computed funct for change in time
        timeChange : {
            get: function() {
                return this.time;
            }, 
            set: function(v) {
                if(v > 59){
                    this.minutes++;
                    this.time = 0;
                } else if(v <= 0){
                    this.minutes--;
                    this.time = v + 59;
                } else {
                    this.time = v;
                }
            }
        }
    },
    methods: {
        // grab video player
        video(event){
            this.vidsource = event.target;
        },
        //play audio files on hover
        // took audio from dictionary
        audio(str, int){
            let url = `https://ssl.gstatic.com/dictionary/static/sounds/20180430/${str}--_us_${int}.mp3`;
            let audio = new Audio(url);
            audio.play();
            debugger;
        },
        //volume show
        volume(){
            this.chngvol = !this.chngvol;
        },
        //change volume using computed funct
        changeVol(){
            let vol = vols / 100;
            this.vidsource.volume = vol;
            this.volumeChange = vols;
            debugger;
        },
        // show caption choices
        caption() {
            this.chngcap = !this.chngcap;
        },
        // enable captions
        captions(int){
            let caption = this.vidsource.textTracks[int];
            if(caption.mode == 'disabled'){
                // loop through captions n disable
                for(var i=0; i < this.vidsource.textTracks.length; i++){
                    this.vidsource.textTracks[i].mode = 'disabled';
                }
                // enable one that is clicked
                caption.mode = 'showing';
                this.chngcap = !this.chngcap;
            } else {
                // else disable it if clicked
                caption.mode = 'disabled';
                this.chngcap = !this.chngcap;
            }
            debugger;
        },
        // progress bar funct using computer funct for dynamic rending
        // use of intervals to update every second
        progress(el){        
            if(el.playing){
                el.intervalid = setInterval(function(){
                    el.changes += 1;
                    el.timeChange += 1;
                    if(el.duration > el.maxduration){
                        clearInterval(el.intervalid);
                    }
                }, 1000);
            } else {
                clearInterval(el.intervalid);
            }
        },
        // go back function - back to homeee
        goBack(){
            this.$parent.choice = false;
            this.$parent.media = {};
            this.$router.back();
        },
        // play button function
        play(){
            this.playing = !this.playing;
            if(this.playing){
                this.maxduration = this.vidsource.duration;
                this.durationInterval = 200 / this.maxduration;
                this.progress(this);
                this.vidsource.play();
            }
        },
        //pause function 
        pause(){
            this.playing = !this.playing;
            this.progress(this);
            this.vidsource.pause();
        },
        // backward function
        back(bar){
            bar.style.width -= this.durationInterval * this.duration + 'px';
            this.duration -= 5;
            this.vidsource.currentTime -= 5;
            this.timeChange -= 5;
            if(this.duration < 0){
                bar.style.width = 0 + 'px';
                this.duration = 0;
                this.vidsource.currentTime = 0;
                this.minutes = 0;
                this.time = 0;
            }
        },
        //forward function
        forward(bar){
            if(this.duration < this.maxduration){
                bar.style.width += this.durationInterval * this.duration + 'px';
                this.duration += 5;
                this.vidsource.currentTime += 5;
                this.timeChange += 5;
            }
            if(this.duration > this.maxduration){
                this.duration = 0;
                bar.style.width = 0 + 'px';
                this.vidsource.currentTime = 0;
                this.minutes = 0;
                this.time = 0;
            }
        }
    },
}