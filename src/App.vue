<template>
  <div class="corpo">
    <!-- virou componente
      <nav>
      <ul>
        <li v-for="route in routes" :key="route.path">
          <router-link :to="route.path ? route.path : '/'">{{ route.titulo }}</router-link>
        </li>
      </ul>
    </nav> -->
    <meu-menu :rotas="routes" />
    <transition name="pagina">
      <!-- hora exibe um componente, hora exibe outro, de acordo com a rota -->
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import {
    routes
  } from './routes';

  import Menu from './components/shared/menu/Menu.vue';

  // importar componente (não quer dizer que será usado - apenas é importado)
  export default {
    components: {
      'meu-menu': Menu
    },
    data() {
      return {
        routes: routes.filter(route => route.menu)
      }
    }
  }
</script>

<style>
  .corpo {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    width: 96%;
  }

  .pagina-enter,
  .pagina-leave-active {
    opacity: 0
  }

  .pagina-enter-active,
  .pagina-leave-active {
    transition: opacity .2s
  }
</style>