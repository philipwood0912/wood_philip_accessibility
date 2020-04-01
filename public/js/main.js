import HomeComponent from './modules/HomeComponent.js';
import MediaComponent from './modules/MediaComponent.js';
import ErrorComponent from './modules/ErrorComponent';
const routes = [
    { path: '/', name: 'home', component: HomeComponent },
    { path: '/media/:id', component: MediaComponent},
    { path: '/*', name: 'error', component: ErrorComponent }
]

const router = new VueRouter({
    routes
})

const vm = new Vue({
    data: {
        
    },
    router
    
}).$mount("#app");