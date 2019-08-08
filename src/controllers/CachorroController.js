module.exports = app => {

    let cachorroModel = app.models.Cachorro;

    return {
        cadastraCachorro(req, res) { 
            cachorroModel.cadastro(res, req.body);
        },
        pesquisaCachorro(req, res) { 
       
            cachorroModel.pesquisa(res, req.body)
        }
    }

}