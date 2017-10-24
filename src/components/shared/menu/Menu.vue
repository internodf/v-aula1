<template>
    <nav>
        <h2>menu</h2>
      <ul>
        <!-- <li><rotar-link to="/">Home</rotar-link></li>
        <li><rotar-link to="/cadastro">Cadastro</rotar-link></li> -->
        <li v-for="rota in rotas" :key="rota.path">
          <!-- se path foi definido, usa ele, se vier em branco ('') usa '/' -->
          <router-link :to="rota.path ? rota.path : '/'">{{ rota.titulo }}</router-link>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
    props: {
        rotas : {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>

