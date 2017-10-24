import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
// atenção - quando não usa export default, não pode importar um elemento padrão, tem que usar chaves {} para dizer qual elemento está sendo importado
import {
    routes
} from './routes.js';

import './directives/Transform';
import VeeValidate from 'vee-validate';
import msg from './pt_BR'

// npm install style-loader css-loader url-loader file-loader --save-dev
// no arquivo webpack.config.js adicionar ao rules
// { test: /\.css$/, loader: 'style-loader!css-loader' },
// { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
// { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
// { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
// { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

// o jquery é uma variável global e o bootstrap ainda não encontrou o jquery
// deverá ser configurado no webpack.config.js o plugin.
// plugins: [
//     new webpack.ProvidePlugin({
//        $: 'jquery/dist/jquery.js',
//        jQuery: 'jquery/dist/jquery.js'
//    })
// ]
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.js'


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VeeValidate, {
    locale: 'pt_BR',
    dictionary: {
        pt_BR: {
            messages: msg
        }
    }
});

// deve ser registrado VueResource
// Vue.http.options.root = 'http://localhost:3000/'; // foi pro service

// deve ser criado um roteador com o VueRouter
// a propriedade routes recebe o routes importado

// const router = new VueRouter({
//    routes: routes
// });

// em JS6, se a propriedade tiver o mesmo nome do parâmetro, não é necessário atribuiir (routes: routes)
const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})

/**
 * Passos do router
 * 1. Instalar o módulo
 * 2. Importar o vue-router
 * 3. Importar as rotas
 * 4. Registrar o VueRouter
 * 5. Criar uma instância de outer com parâmetro as rotas criadas na aplicação
 * 6. Com as rotas mapeadas, registra ele para poder ser visto em toda a aplicação
 * 7. Em App.vue coloca um componente especial do VueRouter que diz onde os componentes serão inseridos (router-view)
 */