<template>
    <div>
        <h1 class="centralizado">{{ titulo }}</h1>

        <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
        <!-- toda a vez que o evento input for disparadp o filtro receberá o valor do campo input -->
        <input type="search" class="filtro" v-on:input="filtro = $event.target.value" placeholder="filtre pelo título da figura"> {{ filtro }}
        <ul class="lista-fotos">
            <!-- acessa funcao em computed property ao inves do atributo fotos diretamente -->
            <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.id">
                <meu-painel :titulo="foto.titulo">
                    <!-- <imagem-responsiva v-meu-transform="15" :url="foto.url" :titulo="foto.titulo" /> -->
                    <!-- passar um objeto javascript como parametro -->
                    <!-- <imagem-responsiva v-meu-transform="{ incremento: 15, animate: true}" :url="foto.url" :titulo="foto.titulo" /> -->
                    <!-- usar modifiers para conseguir algo semelhante ao animante, sem passar como parâmetro -->
                    <!-- <imagem-responsiva v-meu-transform.animate="15" :url="foto.url" :titulo="foto.titulo" /> -->
                    <!-- modifiers encadeados -->
                    <imagem-responsiva v-meu-transform:scale.animate="1.2" :url="foto.url" :titulo="foto.titulo" />

                    <!-- remove() não funciona porque o componente não é nativo do html. deve ser especificado no componente responder ao click -->
                    <!-- <meu-botao rotulo="REMOVER" tipo="button" @click="remove()"/> -->
                    <!-- <meu-botao rotulo="REMOVER" tipo="button" @click.native="remove(foto)" /> -->

                    <!-- se não usar um data binding (:) o valor de confirmacao será uma string
                    <meu-botao rotulo="REMOVER" tipo="button" @botaoAtivado="remove(foto)" confirmacao="false" /> -->
                    <meu-botao rotulo="REMOVER" tipo="button" @botaoAtivado="remove(foto)" :confirmacao="true" estilo="perigo" />
                    <router-link :to="{name: 'altera', params: { id: foto._id }}">
                        <meu-botao tipo="button" rotulo="ALTERAR" />
                    </router-link>
                </meu-painel>
            </li>
        </ul>
    </div>
</template>

<script>
    // importar componente (não quer dizer que será usado - apenas é importado)
    import Painel from '../shared/painel/Painel.vue';
    import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
    import Botao from '../shared/botao/Botao.vue';
    import FotoService from '../../domain/foto/FotoService';

    export default {
        components: {
            // criar o alias para o componente ser utilizado
            'meu-painel': Painel,
            'imagem-responsiva': ImagemResponsiva,
            'meu-botao': Botao
        },

        data() {
            return {
                mensagem: '',
                titulo: 'Alurapic ic ic ic',
                fotos: [],
                filtro: '',
            }
        },

        created() {
            // $http vem do vue-resource
            // let promise = this.$http.get('v1/fotos');

            // this.resource = this.$resource('v1/fotos{/id}');

            this.service = new FotoService(this.$resource);
            let promise = this.service.lista();

            promise
                .then(jsonFotos => this.fotos = jsonFotos, err => {
                    console.log(err);
                    this.mensagem = "Não foi possível obter as fotos. Server down?"
                });
        },

        computed: {
            fotosComFiltro() {
                if (this.filtro) {
                    // i = insensitive
                    let exp = new RegExp(this.filtro.trim(), 'i');
                    return this.fotos.filter(foto => exp.test(foto.titulo));
                } else {
                    return this.fotos;
                }
            }
        },

        methods: {
            remove(foto) {
                // this.$http.delete(`v1/fotos/${foto._id}`)
                // this.resource.delete({ id: foto._id })
                let promise = this.service.apaga(foto._id);

                promise.then(() => {
                    let indice = this.fotos.indexOf(foto);
                    this.fotos.splice(indice, 1);
                    this.mensagem = 'Foto removida com sucesso'
                }, err => {
                    console.log(err);
                    this.mensagem = 'Não foi possível remover a foto';
                });
            }
        },
    }
</script>

<style>
    .centralizado {
        text-align: center;
    }

    .lista-fotos {
        list-style: none;
    }

    .lista-fotos .lista-fotos-item {
        display: inline-block;
    }

    .imagem-responsiva {
        width: 100%;
    }

    .filtro {
        display: block;
        width: 100%;
    }
</style>