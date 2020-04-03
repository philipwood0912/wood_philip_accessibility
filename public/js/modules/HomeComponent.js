export default {
    template: `
        <div class="home-page">
            <nav class="nav">
                <li v-on:mouseenter="audio(obj.type)" v-for="(obj, index) in media" :key="index" v-on:click="getMedia(obj)" v-on:mouseover="linkAni($event)" v-on:mouseout="linkAni($event)">{{obj.title}}</li>
            </nav>
        </div>
    `,
    data: function() {
        return {
            media: {
                movie: {
                    title: "Movies",
                    mediatitle: "Sonic The Hedgehog",
                    type: "movie",
                    srcone: "sonic_trailer.webm",
                    srctwo: 'sonic_trailer.mp4',
                    text: "sonic_trailer.vtt",
                    french: "sonic_trailer_french.vtt"
                },
                tv: {
                    title: "TV Shows",
                    mediatitle: "The Witcher",
                    type: "television",
                    srcone: "witcher_trailer.webm",
                    srctwo: "witcher_trailer.mp4",
                    text: "witcher_trailer.vtt",
                    french: "witcher_trailer_french.vtt"
                },
                music: {
                    title: "Music",
                    mediatitle: "Sum 41 - In Too Deep",
                    type: "music",
                    srcone: "sum41.webm",
                    srctwo: "sum41.mp4",
                    text: "in_too_deep.vtt",
                    french: "in_too_deep_french.vtt"
                }
            },
            animat: false
        }
    },
    methods: {
        getMedia(obj) {
            this.$parent.choice = true;
            this.$parent.media = obj;
            this.$router.push({path:`/media/${obj.type}`});
        },
        linkAni(event){
            let link = event.currentTarget;
            this.animat = !this.animat;
            if(this.animat){
                link.style.color = "white";
                link.style.borderBottom = "5px solid white";
            } else {
                link.style.color = "lightgray";
                link.style.borderBottom = "5px solid #6C3C97";
            }
        },
        audio(str){
            let url = `https://ssl.gstatic.com/dictionary/static/sounds/20180430/${str}--_us_1.mp3`
            let audio = new Audio(url);
            audio.volume = 0;
            audio.volume = 1;
            audio.play();
            debugger;
        }
    }

}
