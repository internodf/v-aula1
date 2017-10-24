// este arquivo deverá ser importado pelo main.js
// importar os componentes que serão utilizados nas rotas
// importação lazy de cadastro
//import Cadastro from './components/cadastro/Cadastro.vue';
const Cadastro = () => System.import('./components/cadastro/Cadastro.vue');
import Home from './components/home/Home.vue';

// configurações das rotas
// uma rota é um objeto javascript com 2 propriedades
// p1 = path: 'minhaurl'
// p2 = componente que será carregado no endereço: NomeComponente
// atenção - quando não usa export default, não pode importar um elemento padrão, tem que usar chaves {} para dizer qual elemento está sendo importado
export const routes = [
    { path: '', name: 'home', component: Home, titulo: 'Home', menu: true },
    { path: '/cadastro', name: 'cadastro', component: Cadastro, titulo: 'Cadastro', menu: true },
    { path: '/cadastro/:id', name: 'altera', component: Cadastro, titulo: 'Cadastro', menu: false },
    { path: '*', component: Home, menu: false }
];