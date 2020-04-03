import HomeComponent from './modules/HomeComponent.js';
import MediaComponent from './modules/MediaComponent.js';
import ErrorComponent from './modules/ErrorComponent.js';
const routes = [
    { path: '/', name: 'home', component: HomeComponent },
    { path: '/media/:id', component: MediaComponent, props: true},
    { path: '/*', name: 'error', component: ErrorComponent }
]

const router = new VueRouter({
    routes
})

const vm = new Vue({
    data: {
        choice: false,
        media: {}
    },
    created: function() {
        if(this.choice === false && this.$router.currentRoute.path != "/"){
            this.$router.push('/');
        }
    },
    router
    
}).$mount("#app");

router.beforeEach((to, from, next) => {
        if (vm.choice == false && to.path != "/" ) {
            debugger;
            next('/');
        } else {
            next();
        }
  });