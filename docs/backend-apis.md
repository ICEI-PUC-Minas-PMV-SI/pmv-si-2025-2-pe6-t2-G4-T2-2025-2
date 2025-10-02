# APIs e Web Services

O planejamento de uma aplicação de APIS Web é uma etapa fundamental para o sucesso do projeto. Ao planejar adequadamente, você pode evitar muitos problemas e garantir que a sua API seja segura, escalável e eficiente.

Aqui estão algumas etapas importantes que devem ser consideradas no planejamento de uma aplicação de APIS Web.

[Inclua uma breve descrição do projeto.]

## Objetivos da API

O primeiro passo é definir os objetivos da sua API. O que você espera alcançar com ela? Você quer que ela seja usada por clientes externos ou apenas por aplicações internas? Quais são os recursos que a API deve fornecer?

Objetivos da API
A API do Flow foi concebida para ser a espinha dorsal de um sistema distribuído, focado em segurança e funcionalidade.
A API do Flow tem como objetivo principal servir como camada intermediária entre o aplicativo mobile e portal administrativo web (cliente front-end) e o banco de dados (PostgreSQL), expondo endpoints seguros e bem estruturados para as seguintes funcionalidades:

1. Gerenciamento de Usuários: Permitir o cadastro, autenticação, controle de sessão (via JWT) e gerenciamento de perfis de usuário (/users e /sessions)

2. Registro e Consulta de Transações: Implementar as operações essenciais (CRUD - Criar, Registrar, Atualizar e Deletar) para lançamentos financeiros (despesas e receitas), garantindo a propriedade dos dados por usuário.
3. Organização de Categorias: Permitir que o usuário personalize e consulte suas categorias de gastos e receitas, mantendo-as atreladas ao seu perfil.
4. Oferecer Autenticação Segura: Utilizar o padrão JWT para todas as rotas privadas, com controle de acesso baseado em perfis (admin e member)
5. Prover Dados Agregados e Analíticos: Fornecer endpoints de relatórios (/reports) para cálculos de totais mensais, balanços e agrupamentos por categoria, que são consumidos pelo painel do usuário.
6. Prover Dados Analíticos para Administrador: Fornecer endpoints de relatórios (/admin) para listar usuários e informar métricas como total de transações, total de usuários, total de despesas e receitas.


## Modelagem da Aplicação
[Descreva a modelagem da aplicação, incluindo a estrutura de dados, diagramas de classes ou entidades, e outras representações visuais relevantes.]


## Tecnologias Utilizadas

Existem muitas tecnologias diferentes que podem ser usadas para desenvolver APIs Web. A tecnologia certa para o seu projeto dependerá dos seus objetivos, dos seus clientes e dos recursos que a API deve fornecer.

[Lista das tecnologias principais que serão utilizadas no projeto.]

## API Endpoints

[Liste os principais endpoints da API, incluindo as operações disponíveis, os parâmetros esperados e as respostas retornadas.]

### Endpoint 1
- Método: GET
- URL: /endpoint1
- Parâmetros:
  - param1: [descrição]
- Resposta:
  - Sucesso (200 OK)
    ```
    {
      "message": "Success",
      "data": {
        ...
      }
    }
    ```
  - Erro (4XX, 5XX)
    ```
    {
      "message": "Error",
      "error": {
        ...
      }
    }
    ```

## Considerações de Segurança

O projeto Flow está bem estruturado do ponto de vista tecnológico, e as medidas de segurança a seguir complementam a arquitetura, garantindo a Proteção de dados sensíveis, Autenticação e autorização seguras, Comunicação criptografada, Isolamento entre serviços, e uma Infraestrutura consistente com Docker e Render.
Camada de Apresentação (Front-end - React Native)

| Prática de Segurança   | Descrição |
| :----         |    :----         |      :----:    |
| Armazenamento de Tokens | Tokens JWT não devem ser armazenados em AsyncStorage ou SecureStore em texto puro sem criptografia. Recomenda-se o uso de soluções que proveem criptografia nativa no dispositivo. |
| Escopo e Expiração de Tokens | Implementar refresh tokens com escopo limitado e tempos de expiração curtos para o token principal (userToken) para mitigar a vulnerabilidade em caso de vazamento. |
| Comunicação Segura (HTTPS)| Todo o tráfego deve usar HTTPS com TLS 1.2+ para proteger os dados em trânsito contra interceptações (Man-in-the-Middle). |
| Proteção de Chaves | Nunca embutir chaves de API ou senhas diretamente no código-fonte do aplicativo. Usar variáveis de ambiente e configuração por processo de build. |
| SSL Pinning (Melhoria) | Implementar SSL Pinning no App Mobile para garantir que ele se comunique apenas com os certificados e servidores confiáveis conhecidos, oferecendo uma camada extra de proteção contra ataques MiTM. |

Camada de Lógica de Negócio (Backend - Node.js + Express)

| Prática de Segurança   | Descrição |
| :----         |    :----         |      :----:    |
| Autenticação e Autorização (JWT) | Usar JWT com expiração curta e refresh tokens com escopo limitado. O JWT_SECRET deve ser armazenado em variáveis de ambiente seguras. |
| Validação de Entrada (Zod) | O Zod protege contra injeções de dados e falhas de lógica ao validar/sanitizar rigorosamente todos os dados recebidos antes de qualquer processamento (Princípio Trust No One). |
| Criptografia de Senhas | Nunca armazenar senhas em texto claro. Implementar política de senha forte e usar o Bcrypt com salt para armazenar as senhas de forma segura. |
| Tratamento de Erros e Logs | Não expor stack traces ou mensagens de erro internos para o cliente. Não logar dados sensíveis (senhas, tokens) em logs de produção. |
| Verificação de Propriedade | A lógica da API garante que o usuário só possa acessar ou modificar seus próprios registros (ex: where: { id, userId }), protegendo contra acesso não autorizado a dados de terceiros. |

Banco de Dados (PostgreSQL com Prisma)

| Prática de Segurança   | Descrição |
| :----         |    :----         |      :----:    |
| Evitar SQL Injection | O Prisma ORM já protege a aplicação ao utilizar consultas parametrizadas por padrão, eliminando a vulnerabilidade a injeções de SQL. |
| Privilégios Mínimos | O usuário de banco de dados da aplicação deve ter apenas o acesso mínimo necessário (ex: sem permissões de root ou de criação de tabelas). |
| Backups e Criptografia | A Render deve realizar backups automáticos e criptografados. Dados sensíveis que não são senhas (ex: nome completo, e-mail) devem ser considerados para criptografia em repouso no disco do servidor. |

Infraestrutura (Render, Docker)

| Prática de Segurança   | Descrição |
| :----         |    :----         |      :----:    |
| Variáveis de Ambiente | Armazenar credenciais críticas como JWT_SECRET e DataBaseURL apenas em ambientes seguros (.env local, Secrets do Render). |
| Imagens Docker Seguras | Utilizar imagens base minimalistas (ex: Alpine) para o container do back-end e rodar a aplicação com um usuário sem permissões de root. |
| Atualizações de Segurança | Manter todas as bibliotecas e dependências (npm packages) atualizadas. Utilizar ferramentas como npm audit, Dependabot ou Snyk para monitorar vulnerabilidades. |
| Firewall e Rede | O banco de dados (PostgreSQL) deve aceitar conexões somente da API do back-end (restrição de IP/rede virtual), e não diretamente da internet. |
Práticas de Segurança e Testes

    • Testes de Segurança Automatizados: Uso do Jest e Supertest para simular falhas de segurança, como:
        ◦ Autorização Inválida: Tentar acessar rotas de admin com token de member.
        ◦ Injeção de Dados: Tentar enviar dados malformados ao Zod.
        ◦ Quebra de Propriedade: Tentar deletar uma transação de outro usuário (404 Not Found).
    • Gerenciamento de Sessões: Implementar a revogação de tokens e a invalidação de sessões antigas após a troca de senha.
    • CORS Restritivo: Configurar o CORS (cross-origin resource sharing) para permitir requisições apenas de origens específicas (domínio do portal web e aplicativo mobile).

## Implantação

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

## Testes

[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]

1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.

# Planejamento

##  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

### Semana 1

Atualizado em: 07/09/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | Arquitetura da API | 01/09/2025 | 06/09/2025 | ✔️ | 05/08/2025      |
| André Ramos | Estudo da Autenticação | 01/09/2025 | 06/09/2025 | ✔️ | 04/08/2025
| Gustavo Gino | Analise para os testes | 01/08/2025 | 06/08/2025 | ✔️ | 05/08/2025 |
| Lucas Borges | Endpoints possíveis | 01/09/2025 | 06/09/2025 | ✔️ | 05/08/2025 |
| Natã Gabriel | Estrutura de Dados | 01/09/2025 | 06/09/2025 | ✔️ | 03/08/2025 |
| Rhafael Hector | Analise para os testes | 01/09/2025 | 06/09/2025 | ✔️ | 05/08/2025 |


### Semana 2

Atualizado em: 13/09/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | API (Middlewares) | 07/09/2025 | 13/09/2025 | ✔️ | 12/09/2025      |
| André Ramos | Verificação usuário | 07/09/2025 | 13/09/2025 | ✔️ | 11/09/2025
| Gustavo Gino | Analise Testes | 07/09/2025 | 13/09/2025 | ✔️ | 13/09/2025 |
| Lucas Borges | Status Endpoints | 07/09/2025 | 13/09/2025 | ✔️ | 23/08/2025 |
| Natã Gabriel | Diagramas de classes | 07/09/2025 | 13/09/2025 | ✔️ | 23/08/2025 |
| Rhafael Hector | Analise Testes | 07/09/2025 | 13/09/2025 | ✔️ | 13/09/2025 |


### Semana 3

Atualizado em: 20/09/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | API(Controllers) | 14/09/2025 | 20/09/2025 | ✔️ | 14/09/2025 |
| André Ramos | Segurança | 14/09/2025 | 20/09/2025 | ✔️ | 20/09/2025
| Gustavo Gino | Testes | 14/09/2025 | 20/09/2025 | 📝 | ---- |
| Lucas Borges | Endpoints | 14/09/2025 | 20/09/2025 | ✔️ | 20/09/2025 |
| Natã Gabriel | Documentos da Modelagem | 14/09/2025 | 20/09/2025 | 📝 | ---- |
| Rhafael Hector | Testes | 14/09/2025 | 20/09/2025 | 📝 | ---- |

### Semana 4

Atualizado em: 26/09/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | (DOC)Implantação | 21/09/2025 | 27/09/2025 | 📝 | ---- |
| André Ramos | Objetivos da API | 21/09/2025 | 27/09/2025 | ✔️ | 23/09/2025
| Gustavo Gino | Testes | 21/09/2025 | 27/09/2025 | 📝 | ---- |
| Lucas Borges | API Endpoints | 21/09/2025 | 27/09/2025 | 📝 | ---- |
| Natã Gabriel | Documentos da Modelagem | 21/09/2025 | 27/09/2025 | 📝 | ---- |
| Rhafael Hector | Testes | 21/09/2025 | 27/09/2025 | 📝 | ---- |

### Semana 5

Atualizado em: 26/09/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | (DOC)Implantação | 28/09/2025 | 04/10/2025 | 📝 | ---- |
| André Ramos | Objetivos da API | 28/09/2025 | 04/10/2025 | ✔️ | 23/09/2025
| Gustavo Gino | Testes | 28/09/2025 | 04/10/2025 | 📝 | ---- |
| Lucas Borges | API Endpoints | 28/09/2025 | 04/10/2025 | 📝 | ---- |
| Natã Gabriel | Documentos da Modelagem | 28/09/2025 | 04/10/2025 | 📝 | ---- |
| Rhafael Hector | Testes | 28/09/2025 | 04/10/2025 | 📝 | ---- |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

