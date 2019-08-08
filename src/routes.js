module.exports = app => {

    let cc = app.controllers.CachorroController;

    app.post("/cadastro", cc.cadastraCachorro);
    app.post("/pesquisa", cc.pesquisaCachorro);
}