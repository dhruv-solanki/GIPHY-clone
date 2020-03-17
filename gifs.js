const gifBox =  {
    props: ['gif'],

    template: `
        <div class="gif-box">
            <a :href="gif.url">
                <img class="gif-image" :src="gif.images.original.url" class="img-fluid">
            </a>
            <a 
                class="gif-user" 
                v-if="gif.user" 
                :href="gif.user.profile_url">
                    <img :src="gif.user.avatar_url" height="50" width="50">
                    {{ gif.user.display_name }}
            </a>
        </div>
    `
};

const gifGrid = {
    props: ['gifs'],

    components: {
        'gif-box': gifBox
    },

    template: `
        <div class="row" v-if="gifs">
            <div class="col-md-4" v-for="gif in gifs">
                <gif-box :gif="gif"></gif-box> 
            </div>
        </div>
    `
};

const app = new Vue({
    el: '#app',

    components: {
        'gif-grid': gifGrid
    },

    data: {
        apiUrl: 'http://api.giphy.com/v1/gifs',
        apiKey: '80bfcbf357864cd18518c324f47a7098',
        searchedGifs: null,
        trendingGifs: null,
        query: ''
    },

    methods: {
        fetchGifs: function() {
            const url = `${this.apiUrl}/trending?api_key=${this.apiKey}&limit=12`;

            fetch(url)
            .then(response => response.json())
            .then(data => this.trendingGifs = data.data);
        },

        searchGifs: function() {
            const url = `${this.apiUrl}/search?api_key=${this.apiKey}&q=${this.query}&limit=9s`;

            fetch(url)
            .then(response => response.json())
            .then(data => this.searchedGifs = data.data);
        }
    },

    created() {
        this.fetchGifs();
    },
    updated() {
        this.searchGifs();
    }
})