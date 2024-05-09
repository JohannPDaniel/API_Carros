# API_Carros
 
Esta API é uma aplicação backend que gerencia registros de carros e autenticação de usuários. Aqui está um resumo do que ela faz:

- Cadastro e Autenticação de Usuários:

Cadastro (/signup): Permite que uma nova pessoa se cadastre como administradora. O endpoint espera um email e uma senha, verifica se o email já está cadastrado e, em seguida, armazena as informações com a senha criptografada.

<img src="./Imagens/image.png" alt="cadastro">

Login (/login): Permite que uma pessoa cadastrada faça login usando seu email e senha. Se a combinação de email e senha estiver correta, ela é autenticada com sucesso.

<img src="./Imagens/image-1.png" alt="login">

- Gerenciamento de Carros:

Criação de Carro (/carro): Permite criar um novo carro com informações como modelo, marca, ano, cor e preço. O endpoint verifica se todos os dados necessários são fornecidos e se estão corretos.

<img src="./Imagens/image-2.png" alt="criar carro">

Listagem de Carros (/carro): Retorna uma lista de todos os carros cadastrados. Se não houver carros, retorna uma mensagem informando que não há carros cadastrados.

<img src="./Imagens/image-3.png" alt="ler carro">


Filtragem de Carros por Marca (/veiculo): Filtra os carros pelo atributo "marca". Se uma marca é fornecida, ele retorna uma lista de carros dessa marca. Se não encontrar nenhum carro para a marca informada, retorna uma mensagem apropriada.

<img src="./Imagens/image-4.png" alt="filtrar-carro">

Atualização de Carro (/carro/:idBuscado): Atualiza um carro específico com base no ID fornecido. Permite modificar a cor e o preço do carro. Se o ID não for válido ou não encontrar o carro, retorna uma mensagem de erro.

<img src="./Imagens/image-5.png" alt="atualizar carro">

Remoção de Carro (/carro/:idBuscado): Remove um carro específico com base no ID fornecido. Se o ID não for válido ou o carro não for encontrado, retorna uma mensagem de erro.

<img src="./Imagens/image-6.png" alt="deletar carro">

- Mensagens de Erro e Segurança:

Todos os endpoints possuem validações básicas para garantir que os dados fornecidos sejam válidos.

A aplicação lida com erros internos de servidor e fornece mensagens de erro apropriadas quando algo dá errado.

Em resumo, esta API oferece recursos para gerenciamento de carros, com funcionalidades para criar, ler, atualizar e excluir carros, além de recursos para cadastro e autenticação de administradores.

<a href="https://documenter.getpostman.com/view/34269147/2sA3Bt3puM">
Para acessar a documentação da API clique aqui
</a>

<hr>

### Técnologias usadas na API:

<div style="display: flex; gap: 10px;">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black" style="width: 110px; height: auto;" alt="JavaScript" title="JavaScript">
  
  <img src="https://img.shields.io/badge/Node.js-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white" style="width: 110px; height: 32px;" alt="Node.js" title="NodeJS">
  
  <img src="https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white" style="width: 110px; height: 32px;" alt="Express.js" title="Express">

  <img src="https://img.shields.io/badge/Postman-FF6C37.svg?style=for-the-badge&logo=Postman&logoColor=white" style="width: 110px; height: 32px;" alt="Postman" title="Postman">
  
  <img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" style="width: 140px; height: 32px;" alt="VS Code" title="VS Code">
  
  <img src="https://img.shields.io/badge/Git-F05032.svg?style=for-the-badge&logo=Git&logoColor=white" style="width: 65px; height: 32px;" alt="Git" title="Git">

  <img src="https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white" style="width: 100px; height: 32px;" alt="GitHub" title="GitHub">
</div>



