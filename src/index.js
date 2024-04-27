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

// https://api-carros-2.onrender.com/carro

app.post("/carro", (request, response) => {
    try {
        const { modelo, marca, ano, cor, preco } = request.body;

        if (!modelo || typeof modelo !== "string" || modelo.trim() === "") {
            return response.status(400).json({ mensagem: "Passe um modelo de carro válido" });
        }

        if (!marca || typeof marca !== "string" || marca.trim() === "") { 
            return response.status(400).json({ mensagem: "Passe uma marca de carro válida" });
        }

        if (!ano || typeof ano !== "number" || ano <= 0 || isNaN(ano)) {
            return response.status(400).json({ mensagem: "Passe um ano de carro válido" });
        }

        if (!cor || typeof cor !== "string" || cor.trim() === "") {
            return response.status(400).json({ mensagem: "Passe uma cor de carro válida" });
        }

        if (!preco || typeof preco !== "number" || preco <= 0 || isNaN(preco)) { 
            return response.status(400).json({ mensagem: "Passe um preço de carro válido" });
        }

        const carro = {
            id: idDinamico,
            modelo,
            marca,
            ano,
            cor,
            preco,
        };

        veiculos.push(carro); 
        
        idDinamico++;
        return response.status(201).json({
            mensagem: `Carro da marca ${marca} criado com sucesso!`,
            carro: carro
        });
        

    } catch (error) {
        console.error("Erro ao criar carro:", error);
        return response.status(500).json({ mensagem: "Erro interno do servidor." });
    }
});


// -------------------------- Ler Carro --------------------------

// http://localhost:8080/carro

app.get("/carro", (request,response) => {
    try {
        if(veiculos.length === 0){
            return response.status(400).json({Mensagem: 'Não existe nenhum carro cadastrado. Crie um novo carro'})
        }
    
        const leituraCarros = veiculos.map((veiculo)=> `O Carro do modelo ${veiculo.modelo}, da marca ${veiculo.marca}, do ano ${veiculo.ano}, da cor ${veiculo.cor}, do preço R$ ${veiculo.preco.toFixed(2)} está disponível`)
    
        return response.status(200).json(leituraCarros)
    } catch (error) {
        console.error("Erro ao ler carro:", error);
        return response.status(500).json({ Mensagem: "Erro interno do servidor" });
    }
})

// ---------------------Filtrar carro -----------------
// http://localhost:8080/veiculo

app.get("/veiculo", (request, response) => {
    try {
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
    } catch (error) {
        console.error("Erro ao ler carro:", error);
        return response.status(500).json({ Mensagem: "Erro interno do servidor" });
    }
});

// --------------- Atualizar Veiculo ------------------------
// http://localhost:8080/carro/:idBuscado

app.put("/carro/:idBuscado", (request, response) => {
    try {
        const idBuscado = Number(request.params.idBuscado);

        if (isNaN(idBuscado) || idBuscado <= 0) {
            return response.status(400).json({ mensagem: "Favor enviar um ID válido." });
        }

        const { cor, preco } = request.body;

        if (!cor || cor.trim() === "") {
            return response.status(400).json({ mensagem: "Favor enviar uma cor válida." });
        }

        if (isNaN(preco) || preco < 0) {
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
            "veiculo atualizado": veiculo,
        });

    } catch (error) {
        console.error("Erro ao atualizar carro:", error);
        return response.status(500).json({ mensagem: "Erro interno do servidor." });
    }
});

  
// ----------------- Remover veículo ----------------------------
// http://localhost:8080/carro/:idBuscado

app.delete("/carro/:idBuscado", (request,response) => {
    try {
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
    } catch (error) {
        console.error("Erro ao atualizar carro:", error);
        return response.status(500).json({ mensagem: "Erro interno do servidor." });
    }

})

// ------------------- Criar uma pessoa usuária ----------------------
// http://localhost:8080/signup

app.post('/signup', async (request, response) => {
    try {
        const { email, senhaDigitada } = request.body;

        if (!email || email.trim() === "") {
            return response.status(400).json({ mensagem: "Favor inserir um email válido" });
        }
    
        if (!senhaDigitada || Number(senhaDigitada.trim() === "")) {
            return response.status(400).json({ mensagem: "Favor inserir uma senha válida" });
        }
    
        const verificarEmail = admins.find((admin) => admin.email === email);
    
        if (verificarEmail) {
            return response.status(400).json({ mensagem: "Email já cadastrado no nosso banco de dados" });
        }
    
        const senhaCriptografada = await bcrypt.hash(senhaDigitada, 10);
    
        const Administrador = {
            id: proxAdmin,
            email: email, 
            senhaDigitada: senhaCriptografada 
        };
        
        admins.push(Administrador);
        proxAdmin++;
    
        return response.status(201).json({ 
            mensagem: `Pessoa administradora com email ${email} cadastrada com sucesso!`,
        });
            
    } catch (error) {
        console.error("Erro ao processar cadastro:", error);
        return response.status(500).json({ mensagem: "Erro interno do servidor." });
    }
});
  
  // ------------------- logar uma pessoa usuária -----------------
  // http://localhost:8080/login

  app.post('/login', async (request, response) => {
    try {
        const { email, senha } = request.body;
  
        if (!email || email.trim() === "") {
            return response.status(400).json({ mensagem: 'Favor inserir um email válido' });
        }      

        if (!senha || senha.trim() === "") {
            return response.status(400).json({ mensagem: 'Favor inserir uma senha válida' });
        }

        const admin = admins.find(admin => admin.email === email);

        if (!admin) {
            return response.status(400).json({ mensagem: 'Credenciais inválidas' });
        }

        const senhaMatches = await bcrypt.compare(senha, admin.senhaDigitada);
    
        if (!senhaMatches) {
            return response.status(400).json({ mensagem: 'Credenciais inválidas' });
        }

        return response.status(200).json({
            mensagem: `Pessoa com email ${email} foi logada com sucesso! Seja bem-vinde!`,
            email: email,
            loginStatus: 'Success'
        });

    } catch (error) {
        console.error("Erro ao processar login:", error);
        return response.status(500).json({ mensagem: "Erro interno do servidor." });
    }
});

  app.listen(PORT, () => {console.log(`Servidor rodando na porta ${PORT}`);
  });

