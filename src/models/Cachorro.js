module.exports = app => {

    let mongoObj = app.config.banco;

    return {

        cadastro(res, dados) {
            mongoObj.mongoClient.then(banco => {

                let bdObj = banco.db(mongoObj.nomeBD);
                bdObj.collection("cachorro").insertMany(dados, (erro, result) => {

                    if (erro) {
                        res.json({ msg: false });
                    }
                    else {
                        res.json({ msg: true });
                    }
                })
            })
        },

        pesquisa(res, dados) {

            mongoObj.mongoClient.then(banco => {

                let bdObj = banco.db(mongoObj.nomeBD);

                if (Object.keys(dados).length == 1) {
                    this.umParametro(dados, bdObj, res);
                }

                else if (Object.keys(dados).length == 2) {
                    this.doisParametros(dados, bdObj, res);
                }

                else {

                    bdObj.collection("cachorro").find({
                        $or: [
                            { "cachorros.nome": new RegExp(dados.nome, 'i') },
                            { "cachorros.raca": new RegExp(dados.raca, 'i') },
                            { "dono": new RegExp(dados.dono, 'i') }
                        ]
                    })

                        .toArray((erro, result) => {
                            res.json(result);
                        })

                }
            })

        },

        umParametro(dados, bdObj, res) {

            if (dados.hasOwnProperty('nome') && dados.hasOwnProperty("raca") == false && dados.hasOwnProperty("dono") == false) {

                bdObj.collection("cachorro").find({ "cachorros.nome": new RegExp(dados.nome, 'i') }).toArray((erro, result) => {

                    res.json(result);

                })
            }
            else if (dados.hasOwnProperty('raca') && dados.hasOwnProperty("nome") == false && dados.hasOwnProperty("dono") == false) {
                bdObj.collection("cachorro").find({ "cachorros.raca": new RegExp(dados.raca, 'i') }).toArray((erro, result) => {
                    res.json(result);
                })
            }

            else {
                bdObj.collection("cachorro").find({ "dono": new RegExp(dados.dono, 'i') }).toArray((erro, result) => {
                    res.json(result);
                })
            }
        },


        doisParametros(dados, bdObj, res) {

            if (dados.hasOwnProperty('nome') && dados.hasOwnProperty("raca") && dados.hasOwnProperty("dono") == false) {
                bdObj.collection("cachorro").find({
                    $or: [
                        { "cachorros.nome": new RegExp(dados.nome, 'i') },
                        { "cachorros.raca": new RegExp(dados.raca, 'i') }
                    ]
                })

                    .toArray((erro, result) => {
                        res.json(result);
                    })
            }
            else if (dados.hasOwnProperty('raca') == false && dados.hasOwnProperty("nome") && dados.hasOwnProperty("dono")) {
                bdObj.collection("cachorro").find({
                    $or: [
                        { "cachorros.nome": new RegExp(dados.nome, 'i') },
                        { "dono": new RegExp(dados.dono, 'i') }
                    ]
                })

                    .toArray((erro, result) => {
                        res.json(result);
                    })
            }

            else {
                bdObj.collection("cachorro").find({
                    $or: [
                        { "cachorros.raca": new RegExp(dados.raca, 'i') },
                        { "dono": new RegExp(dados.dono, 'i') }
                    ]
                })

                    .toArray((erro, result) => {
                        res.json(result);
                    })
            }
        }
    }
}