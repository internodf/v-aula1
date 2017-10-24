export default class Foto {
    // se não receber parâmetros, será atribuído o valor padrão ''
    constructor(titulo = '', url = '', descricao = '') {
        this.titulo = titulo;
        this.url = url;
        this.descricao = descricao;
    }
}