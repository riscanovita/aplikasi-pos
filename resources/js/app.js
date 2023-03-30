// require('./bootstrap');

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'

import { InertiaProgress } from '@inertiajs/progress'

createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      //set mixins
      .mixin({
        methods: {
          hasAnyPermission: function (permissions) {
            
            let allPermissions = this.$page.props.auth.permissions;       //menampung list data permissions yg diambil dr props bernama auth.permissions
            let hasPermission = false;
            //cek nilai parameter
            permissions.forEach(function(item){
              if(allPermissions[item]) hasPermission = true;     
            });

            return hasPermission;
          },

          formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
        },
      })
      .use(plugin)
      .mount(el)
  },
});