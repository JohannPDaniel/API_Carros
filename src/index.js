import express from "express"
import cors from "cors"
import bcrypt from "bcrypt"

const app = express();

app.use(cors());

app.use(express.json())

const PORT = 8080

//--------------------------------------------------------

let veiculos = []
let idDinamico = 1
let admins = []
let proxAdmin = 1

//--------------------- Criar Carro ----------------------------

// http://localhost:8080/carro

app.post("/carro", (request,response) => {
    const data = request.body

    const { modelo, marca, ano, cor, preco } = data

    if(!modelo){
        return response.status(400).json({Mensagem: 'Passe um modelo de carro válido'})
    }

    if(!marca){
        return response.status(400).json({Mensagem: 'Passe uma marca de carro válida'})
    }

    if(!ano){
        return response.status(400).json({Mensagem: 'Passe um ano de carro válido'})
    }

    if(!cor){
        return response.status(400).json({Mensagem: 'Passe uma cor de carro válida'})
    }

    if(!preco){
        return response.status(400).json({Mensagem: 'Passe um preço de carro válido'})
    }

    let carro = {
        id: idDinamico,
        modelo: modelo,
        marca: marca,
        ano: ano,
        cor: cor,
        preco: preco
    }

    veiculos.push(carro)

    idDinamico++

    return response.status(201).json((
        {Mensagem: `Carro da  marca ${marca} criado com sucesso!`,
      }))
})

// -------------------------- Ler Carro --------------------------

// http://localhost:8080/carro

app.get("/carro", (request,response) => {

    if(veiculos.length === 0){
        return response.status(400).json({Mensagem: 'Não existe nenhum carro cadastrado. Crie um novo carro'})
    }

    const leituraCarros = veiculos.map((veiculo)=> `O Carro do modelo ${veiculo.modelo}, da marca ${veiculo.marca}, do ano ${veiculo.ano}, da cor ${veiculo.cor}, do preço R$ ${veiculo.preco.toFixed(2)} está disponível`)

    return response.status(200).json(leituraCarros)
})

// ---------------------Filtrar carro -----------------
// http://localhost:8080/veiculo

app.get("/veiculo", (request, response) => {
    const marca = request.body.marca

    if (!marca) {
        return response.status(400).json({ Mensagem: 'Favor enviar uma marca válida' });
    }

    const filtrandoMarcas = veiculos.filter((carro) => carro.marca === marca);

    if (filtrandoMarcas.length > 0) {  
        const listaFiltrarMarcas = filtrandoMarcas.map((carro) => ({
           marca: `ID: ${carro.id} | Modelo: ${carro.modelo} | Cor: ${carro.cor} | Preço: R$ ${carro.preco.toFixed(2)}`
        }));

        return response.status(200).json({ marca, veiculos: listaFiltrarMarcas });  
    } else {
        return response.status(404).json({Mensagem: 'Nenhum carro encontrado para a marca informada'});
    }
});

// --------------- Atualizar Veiculo ------------------------
// http://localhost:8080/carro/:idBuscado

app.put("/carro/:idBuscado", (request, response) => {
    const idBuscado = Number(request.params.idBuscado);

    if (isNaN(idBuscado) || idBuscado <= 0 || !idBuscado) {
        return response.status(400).json({ mensagem: "Favor enviar um ID válido." });
    }

    const { cor, preco } = request.body;

    const isString = (value) => typeof value === 'string';
    const isNumber = (value) => typeof value === 'number';

    if (!cor || !isString(cor)) {
        return response.status(400).json({ mensagem: "Favor enviar uma cor válida." });
    }

    if (!preco || !isNumber(preco) || preco < 0) {
        return response.status(400).json({ mensagem: "Favor enviar um preço válido." });
    }

    const posicaoId = veiculos.findIndex(veiculo => veiculo.id === idBuscado);

    if (posicaoId === -1) {
        return response.status(404).json({ mensagem: "Veículo não encontrado." });
    }

    const veiculo = veiculos[posicaoId];
    
    veiculo.cor = cor;
    veiculo.preco = preco;

    return response.status(200).json({
        mensagem: "Veículo atualizado com sucesso!",
        veiculo: veiculo
    });
});

// ----------------- Remover veículo ----------------------------
// http://localhost:8080/carro/:idBuscado

app.delete("/carro/:idBuscado", (request,response) => {
    const idBuscado = Number(request.params.idBuscado)

    if(!idBuscado){
        return response.status(400).json({ Mensagem: "Favor enviar um ID válido" })
    }

    const posicaoId = veiculos.findIndex(carro => carro.id === idBuscado)

    if(posicaoId === -1){
        return response.status(400).json({ Mensagem: "Id não encontrado" })
    } else {
        veiculos.splice(posicaoId ,1)
        return response.status(200).json({ Mensagem: "veiculo deletado com sucesso" })
  }

})

// ------------ Criar uma pessoa usuária ----------------
// http://localhost:8080/signup
app.post('/signup',async (request,response)=>{
     
    const data = request.body
    const { email, senhaDigitada } = data

    if(!email){
        return response.status(400).json({ Mensagem: "Favor inserir um email válido" })
    }
  
    if(!senhaDigitada){
        return response.status(400).json({ Mensagem: "Favor inserir uma senha válida" })
    }
  
    const verificarEmail = admins.find((admin)=> admin.email === email)
  
    if(verificarEmail){
        return response.status(400).json({ Mensagem: "Email já cadastrado no nosso banco de dados" })
    }
  
    const senhaCriptografada = await bcrypt.hash(senhaDigitada,10)
  
    let Administrador = {
        id : proxAdmin,
        email : data.email, 
        senhaDigitada : senhaCriptografada
    }
    
    admins.push(Administrador)
  
    proxAdmin++
  
        return response.status(201).json({ Mensagem: `Pessoa administradora do email ${email}, cadastrada com sucesso!`,
        senha: Administrador.senhaDigitada
    })
   
})
  
  // ------------------- logar uma pessoa usuária -----------------
  // http://localhost:8080/login

  app.post('/login', async (request, response) => {
    const { email, senha } = request.body;
  
    if (!email) {
      return response.status(400).json({ mensagem: 'Favor inserir um email válido' });
    }
  
    if (!senha) {
      return response.status(400).json({ mensagem: 'Favor inserir uma senha válida' });
    }
  
    const admin = admins.find(admin => admin.email === email);
  
    if (!admin) {
      return response.status(404).json({ mensagem: 'Admin não encontrado' });
    }
  
    const senhaMatches = await bcrypt.compare(senha, admin.senhaDigitada);
   
    if (!senhaMatches) {
      return response.status(400).json({ mensagem: 'Senha incorreta ou credencial inválida' });
    }
  
    return response.status(200).json({
      mensagem: `Pessoa com email ${email} foi logada com sucesso! Seja bem-vinde!`,
      email: email,
      loginStatus: 'Success'
    });
  });

app.listen(PORT, () => console.log("Servidor rodando na porta", PORT))

