import Vue from 'vue';

Vue.directive('meu-transform', {

    /**
     * 
     * @param {*} el -> referencia ao elemento do DOM que foi associada
     * @param {*} binding 
     * @param {*} vnode 
     */
    bind(el, binding, vnode) {
        let current = 0;

        el.addEventListener('dblclick', function () {
            let incremento = binding.value || 90;
            let efeito;

            // let animate = false;

            // desativa para usar modifier
            // if (binding.value) {
            //     incremento = binding.value.incremento;
            //     animate = binding.value.animate;
            // }

            if (!binding.arg || binding.arg == 'rotate') {
                if (binding.modifiers.reverse) {
                    current -= incremento;
                } else {
                    current += incremento;
                }
                efeito = `rotate(${current}deg)`;
            } else if (binding.arg == 'scale') {
                efeito = `scale(${incremento})`;
            }

            // template string usa crase `
            el.style.transform = efeito;
            if (binding.modifiers.animate) el.style.transition = 'transform 0.5s'
        });
    }
});


// Vimos que a função bind de uma diretiva recebe três parâmetros. No entanto, o terceiro, vnode, não foi usado. Este parâmetro é uma referência para o Virtual DOM utilizado pelo Vue. Ele permite acessar propriedades do Componente no qual ela foi associada.
// No entanto, essa dependência pode acabar com o reuso da diretiva, por isso deve ser usado com parcimônia. Além disso, não é comum querermos interagir com esse parâmetro.
// Vejamos um exemplo:
//     bind(el, binding, vnode) {
//           console.log(vnode.context.propriedadeDoComponenteNoQualADiretivaFoiAssociada);
//     }
