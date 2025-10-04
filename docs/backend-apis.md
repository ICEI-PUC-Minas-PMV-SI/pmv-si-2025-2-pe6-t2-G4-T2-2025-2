# APIs e Web Services

O planejamento de uma aplicação de APIs Web é uma etapa fundamental para o sucesso do projeto. Ao planejar adequadamente, você pode evitar muitos problemas e garantir que a sua API seja segura, escalável e eficiente.
O Flow é um sistema de gerenciamento de finanças pessoais desenvolvido com uma arquitetura de serviços distribuídos. O objetivo principal é fornecer aos usuários uma ferramenta simples e eficiente para monitorar seus gastos e receitas diárias.

A plataforma consiste em três componentes principais que se comunicam através de serviços web:

- **Aplicativo Mobile (React Native)**: O cliente final, focado na experiência do usuário para o registro rápido de transações e visualização de relatórios.

- **Portal de Administração (React)**: Uma interface web exclusiva para o administrador, utilizada para monitoramento geral do sistema e gestão de usuários.

- **API de Serviços (Node.js/Express)***: O back-end monolítico responsável por toda a lógica de negócio, autenticação e comunicação com o banco de dados.

A API é o elemento central do sistema, expondo endpoints RESTful que garantem a integridade e a segurança dos dados de cada usuário.


## Objetivos da API

A API do Flow foi concebida para ser a espinha dorsal de um sistema distribuído, focado em segurança e funcionalidade.

A API do Flow tem como objetivo principal servir como camada intermediária entre o aplicativo mobile e portal administrativo web (cliente front-end) e o banco de dados (PostgreSQL), expondo endpoints seguros e bem estruturados para as seguintes funcionalidades:

1. **Gerenciamento de Usuários:** Permitir o cadastro, autenticação, controle de sessão (via JWT) e gerenciamento de perfis de usuário (/users e /sessions)

2. **Registro e Consulta de Transações**: Implementar as operações essenciais (CRUD - Criar, Registrar, Atualizar e Deletar) para lançamentos financeiros (despesas e receitas), garantindo a propriedade dos dados por usuário.
3. Organização de Categorias: Permitir que o usuário personalize e consulte suas categorias de gastos e receitas, mantendo-as atreladas ao seu perfil.
   
4. **Oferecer Autenticação Segura**: Utilizar o padrão JWT para todas as rotas privadas, com controle de acesso baseado em perfis (admin e member)
   
5. **Prover Dados Agregados e Analíticos**: Fornecer endpoints de relatórios (/reports) para cálculos de totais mensais, balanços e agrupamentos por categoria, que são consumidos pelo painel do usuário.
   
6. **Prover Dados Analíticos para Administrador**: Fornecer endpoints de relatórios (/admin) para listar usuários e informar métricas como total de transações, total de usuários, total de despesas e receitas.


## Modelagem da Aplicação
[Descreva a modelagem da aplicação, incluindo a estrutura de dados, diagramas de classes ou entidades, e outras representações visuais relevantes.]


## Tecnologias Utilizadas

A escolha tecnológica para o FinanceFlow foi guiada pela eficiência, robustez e a necessidade de demonstrar uma arquitetura de serviços distribuídos moderna. A stack utiliza as seguintes ferramentas:

#### Camada de Back-end e Ferramentas de Desenvolvimento

| Tecnologia   | Categoria | Propósito no Projeto   |
| :----         |    :----         |      :----    |
| Node.js | Runtime | Ambiente assíncrono para lidar com alta concorrência de requisições.      |
| TypeScript | Linguagem | Garante a tipagem estática do código, prevenindo erros e facilitando a manutenção e a escalabilidade. |
| Express | Framework | Base minimalista para construção da API RESTful. |
| Zod | Validação | Impede que dados inválidos cheguem à lógica de negócio e ao banco de dados (400 Bad Request) |
| bcrypt | Segurança | Biblioteca utilizada para a criptografia irreversível das senhas dos usuários. |
| jsonwebtoken (JWT) | Autenticação | Padrão para criação e verificação de tokens de acesso sem estado. |
| express-async-errors | Utilidade | Simplifica o tratamento de erros assíncronos no Express. |
| cors | Middleware | Permite requisições de origens diferentes, fundamental para a comunicação entre a API e o aplicativo mobile (React Native). |

#### Camada de Dados e ORM

| Tecnologia   | Categoria | Propósito no Projeto   |
| :----         |    :----         |      :----    |
| PostgreSQL | Banco de Dados | Escolhido por sua integridade e robustez para o armazenamento de dados financeiros. |
| Prisma | ORM | Mapeia o banco de dados para a linguagem TypeScript, automatiza consultas e garante proteção nativa contra SQL Injection. |
| @prisma/client | Cliente DB| A biblioteca gerada que permite ao Node.js se comunicar com o banco de dados. |

#### Infraestrutura e Testes

| Tecnologia   | Categoria | Propósito no Projeto   |
| :----         |    :----         |      :----   |
| Docker | Conteinerização | Cria o ambiente isolado para o banco de dados (PostgreSQL) e o back-end, garantindo que a aplicação seja portátil e que o ambiente de desenvolvimento seja idêntico ao de produção. |
| Render (PaaS) | Hospedagem | Plataforma como Serviço ideal para o deploy contínuo da arquitetura distribuída. |
| Jest | Teste | Framework de teste unitário e de integração. |
| Supertest | Teste HTTP | Usado em conjunto com o Jest para simular requisições HTTP e testar as rotas da API em memória. |
| cross-env | Dev. Tool | Define variáveis de ambiente (JWT_SECRET) de forma consistente para o ambiente de testes. |


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

#### Camada de Apresentação (Front-end - React Native)

| Prática de Segurança   | Descrição |
| :----         |    :----         |
| Armazenamento de Tokens | Tokens JWT não devem ser armazenados em AsyncStorage ou SecureStore em texto puro sem criptografia. Recomenda-se o uso de soluções que proveem criptografia nativa no dispositivo. |
| Escopo e Expiração de Tokens | Implementar refresh tokens com escopo limitado e tempos de expiração curtos para o token principal (userToken) para mitigar a vulnerabilidade em caso de vazamento. |
| Comunicação Segura (HTTPS)| Todo o tráfego deve usar HTTPS com TLS 1.2+ para proteger os dados em trânsito contra interceptações (Man-in-the-Middle). |
| Proteção de Chaves | Nunca embutir chaves de API ou senhas diretamente no código-fonte do aplicativo. Usar variáveis de ambiente e configuração por processo de build. |
| SSL Pinning (Melhoria) | Implementar SSL Pinning no App Mobile para garantir que ele se comunique apenas com os certificados e servidores confiáveis conhecidos, oferecendo uma camada extra de proteção contra ataques MiTM. |


#### Camada de Lógica de Negócio (Backend - Node.js + Express)

| Prática de Segurança   | Descrição |
| :----         |    :----         |
| Autenticação e Autorização (JWT) | Usar JWT com expiração curta e refresh tokens com escopo limitado. O JWT_SECRET deve ser armazenado em variáveis de ambiente seguras. |
| Validação de Entrada (Zod) | O Zod protege contra injeções de dados e falhas de lógica ao validar/sanitizar rigorosamente todos os dados recebidos antes de qualquer processamento (Princípio Trust No One). |
| Criptografia de Senhas | Nunca armazenar senhas em texto claro. Implementar política de senha forte e usar o Bcrypt com salt para armazenar as senhas de forma segura. |
| Tratamento de Erros e Logs | Não expor stack traces ou mensagens de erro internos para o cliente. Não logar dados sensíveis (senhas, tokens) em logs de produção. |
| Verificação de Propriedade | A lógica da API garante que o usuário só possa acessar ou modificar seus próprios registros (ex: where: { id, userId }), protegendo contra acesso não autorizado a dados de terceiros. |

#### Banco de Dados (PostgreSQL com Prisma)

| Prática de Segurança   | Descrição |
| :----         |    :----         |
| Evitar SQL Injection | O Prisma ORM já protege a aplicação ao utilizar consultas parametrizadas por padrão, eliminando a vulnerabilidade a injeções de SQL. |
| Privilégios Mínimos | O usuário de banco de dados da aplicação deve ter apenas o acesso mínimo necessário (ex: sem permissões de root ou de criação de tabelas). |
| Backups e Criptografia | A Render deve realizar backups automáticos e criptografados. Dados sensíveis que não são senhas (ex: nome completo, e-mail) devem ser considerados para criptografia em repouso no disco do servidor. |

#### Infraestrutura (Render, Docker)

| Prática de Segurança   | Descrição |
| :----         |    :----         |
| Variáveis de Ambiente | Armazenar credenciais críticas como JWT_SECRET e DataBaseURL apenas em ambientes seguros (.env local, Secrets do Render). |
| Imagens Docker Seguras | Utilizar imagens base minimalistas (ex: Alpine) para o container do back-end e rodar a aplicação com um usuário sem permissões de root. |
| Atualizações de Segurança | Manter todas as bibliotecas e dependências (npm packages) atualizadas. Utilizar ferramentas como npm audit, Dependabot ou Snyk para monitorar vulnerabilidades. |
| Firewall e Rede | O banco de dados (PostgreSQL) deve aceitar conexões somente da API do back-end (restrição de IP/rede virtual), e não diretamente da internet. |


#### Práticas de Segurança e Testes

- **Testes de Segurança Automatizados**: Uso do Jest e Supertest para simular falhas de segurança, como:
  - Autorização Inválida: Tentar acessar rotas de admin com token de member.
  - Injeção de Dados: Tentar enviar dados malformados ao Zod.
  - Quebra de Propriedade: Tentar deletar uma transação de outro usuário (404 Not Found).

- **Gerenciamento de Sessões**: Implementar a revogação de tokens e a invalidação de sessões antigas após a troca de senha.
  
- **CORS Restritivo**: Configurar o CORS (cross-origin resource sharing) para permitir requisições apenas de origens específicas (domínio do portal web e aplicativo mobile).

## Implantação

O processo de implantação da API do Flow é simplificado pela utilização de Docker e uma plataforma PaaS (Platform as a Service), o que é fundamental para a Arquitetura de Sistemas Distribuídos.

#### Requisitos de Hardware e Software

Para um ambiente de produção inicial e para o escopo do projeto, os requisitos mínimos e recomendados são:

| Recurso   | Requisito Mínimo (Acadêmico/Trial) | Recomendado (Produção Inicial - Render) |
| :----         |    :----         |      :----   |
| Hardware | Servidor Cloud (Render/Heroku Free Tier) | 2 vCPUs / 4 GB RAM (Suficiente para Node.js e PostgreSQL) |
| Sistema Operacional | Linux (Ubuntu/Alpine - via Docker) | Linux (ambiente gerenciado pelo Render) |
| Runtime | Node.js (v18+) | Node.js (v18+) |
| Banco de Dados | PostgreSQL (v14+) | PostgreSQL (v14+ - Serviço Gerenciado pelo Render) |
| Ferramentas | Docker e Git | Docker (para a imagem do Node.js) e Git (para deploy contínuo) |

#### Escolha da Plataforma de Hospedagem

A plataforma escolhida é o Render (PaaS), por oferecer uma integração fluida com o Docker e simplificar a gestão de serviços distribuídos.

- **API (Node.js/Express)**: Será implantada como um Serviço Web no Render. O Render lê o Dockerfile e gerencia o processo de build e execução da API.

- **Banco de Dados (PostgreSQL)**: Será provisionado como um Serviço Gerenciado de Banco de Dados no Render ou em um provedor dedicado. Isso garante que o banco de dados seja isolado, com backups automáticos e alta disponibilidade

#### Configuração do Ambiente de Implantação

A configuração do ambiente foca em variáveis de ambiente e segurança:

| Variável   | Uso | Local de Configuração |
| :----         |    :----         |      :----    |
| DATABASE_URL | Conexão com o PostgreSQL. | Render Secrets (Injetada no container do Node.js). |
| JWT_SECRET | Chave secreta para assinatura de tokens. | Render Secrets (Injetada no container do Node.js). |
| NODE_ENV | Define o ambiente como production. | Injetado automaticamente pelo Render.

#### Passos Essenciais:
1.	**Criptografia de Senha do DB**: O DATABASE_URL deve ser armazenado como um segredo (secret) no Render para que nunca seja exposto no código ou nos logs.

2.	**Migrações de Banco de Dados**: O container deve ser configurado para executar as migrações do Prisma automaticamente no momento do deploy ou logo após a inicialização, garantindo que o esquema do banco de dados esteja sempre atualizado.

#### Processo de Deploy (CI/CD)

O deploy do Flow deve seguir um fluxo de Integração Contínua/Entrega Contínua (CI/CD) simplificado, acionado por commits no repositório Git:

1.	**Git**: O desenvolvedor faz um git push para o branch principal (ex: main).

2.	**Build do Docker**: O Render detecta a mudança e utiliza o Dockerfile do projeto para criar a imagem do container do Node.js.

3.	**Execução das Migrações**: O processo de build executa um comando (npx prisma migrate deploy ) para aplicar quaisquer alterações pendentes no esquema do PostgreSQL.

4.	**Lançamento**: O Render substitui a instância antiga da API pela nova imagem do container, finalizando o deploy em segundos ou minutos.


## Testes

A estratégia de teste do Flow é vital para garantir que a arquitetura distribuída funcione de forma coesa e segura. O foco principal foi na segurança (Autorização/Propriedade) e na integridade da lógica de negócio (Agregação/Filtros).

 

#### Estratégia e Tipos de Teste

| Tipos de Teste   | Objetivo | Ferramentas | Cobertura de Requesito |
| :----         |    :----         |      :----    |     :----    |
| Testes de Integração | Verificar a comunicação completa entre a API (Node.js) e o Banco de Dados (PostgreSQL), garantindo que o CRUD, filtros e agregações funcionem corretamente com dados persistidos. | Jest e Supertest | Cobertura total dos Requisitos Funcionais (RFs) e de Desempenho (RNFs). |
| Testes Unitários | Verificar funções isoladas (ex: criptografia de senhas, validação de Zod). | Jest | Cobertura de Unidades de Código. |
| Testes de Autorização | Garantir que o middleware verifyUserAuthorization funcione, impedindo que usuários member acessem rotas de admin e que qualquer usuário acesse dados de terceiros. | Jest e Supertest | Cobertura total da Segurança (RNF03). |
| Testes Manuais/Funcionais | Verificar a interface de endpoints em tempo real. | Insomnia | Confirmação da Usabilidade e Tratamento de Erros de Front-end. |

 

#### Suítes de Teste Implementadas e Casos de Uso

Foram criadas 5 suítes de teste (27 testes no total) para cobrir todas as funcionalidades da aplicação e os principais cenários de erro e segurança.
 
| Suites de Teste  | Foco Principal | Casos de Teste Implementados |
| :----         |    :----         |      :----    |
| admin-controller.test.ts | Autorização (Admin) | 4 casos, incluindo: ADMIN deve listar todos os usuários e MEMBER não deve conseguir obter métricas do sistema. |
| categories-controller.test.ts | CRUD e Propriedade | 6 casos, incluindo: Tentar criar uma categoria que já existe (conflito por usuário) e Retornar status 404 quando tentar deletar um registro já excluído. |
| reports-controller.test.ts | Agregação e Filtros | 5 casos, incluindo: Deve calcular o resumo (receita/despesa) corretamente e Deve retornar 400 se o mês for inválido (validação de query).|
| transactions-controller.test.ts | Segurança e Chave Estrangeira | 6 casos, incluindo: Deve falhar ao tentar atualizar transação de outro usuário e Retorna 404 se a categoria não existir para o usuário. |
| users-controller.test.ts | Autenticação e Perfil | 6 casos, incluindo: Tenta criar um usuário com um email já existente (409 Conflict) e Atualizar o perfil do usuário que está logado (PUT /users/me). |

 ----------------------------

 #### Relatório de Execução de Testes

O resultado da execução de todos os testes de integração do projeto Flow confirma a estabilidade da API:

Test Suites: 5 passed, 5 total
Tests: 27 passed, 27 total
Snapshots: 0 total
Time: 2.711 s, estimated 3 s

#### Conclusão do Teste:

Todos os 27 casos de teste passaram com sucesso. Este resultado valida as principais áreas da arquitetura:

- Segurança (Propriedade e Acesso): Os testes confirmam que a lógica de where: { id: userId } e o middleware de autorização estão impedindo acessos não autorizados.

- Integridade dos Dados: O tratamento de conflitos (409 ao criar e-mail duplicado) e as operações de agregação (reports) estão funcionando conforme a lógica de negócio.

- Performance (Testes Rápidos): O baixo tempo de execução (2.711 s) para 27 testes de integração confirma que o ambiente Jest/Supertest/Prisma está configurado para um ciclo de feedback rápido.

#### Testes Manuais Complementares (Insomnia)
Complementarmente aos testes automatizados, foi utilizado o Insomnia para realizar testes manuais (funcionais) em tempo real, verificando a semântica HTTP e as mensagens de erro retornadas pela API.

- Verificação de 400 Bad Request: Testes enviados com senhas curtas, e-mails inválidos, e corpo vazio confirmaram que o Zod está retornando o 400 com mensagens claras, o que protege a API e auxilia o front-end na usabilidade.
![arq](/docs/img/Imagem1.png)


(Cópia das telas - )
- Validação de Tokens: Confirmação de que o envio de tokens expirados ou inválidos resulta em 401 Unauthorized antes que a requisição chegue ao controller.

![arq](/docs/img/Imagem2.png)




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
| Gustavo Gino | Testes | 14/09/2025 | 20/09/2025 | ⌛| ---- |
| Lucas Borges | Endpoints | 14/09/2025 | 20/09/2025 | ✔️ | 20/09/2025 |
| Natã Gabriel | Documentos da Modelagem | 14/09/2025 | 20/09/2025 | 📝 | ---- |
| Rhafael Hector | Testes | 14/09/2025 | 20/09/2025 | ⌛ | ---- |

### Semana 4

Atualizado em: 26/09/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | (DOC)Implantação | 21/09/2025 | 27/09/2025 | ⌛ | ---- |
| André Ramos | Objetivos da API | 21/09/2025 | 27/09/2025 | ✔️ | 23/09/2025
| Gustavo Gino | Testes | 21/09/2025 | 27/09/2025 | 📝 | ---- |
| Lucas Borges | API Endpoints | 21/09/2025 | 27/09/2025 | 📝 | ---- |
| Natã Gabriel | Documentos da Modelagem | 21/09/2025 | 27/09/2025 | 📝 | ---- |
| Rhafael Hector | Testes | 21/09/2025 | 27/09/2025 | 📝 | ---- |

### Semana 5

Atualizado em: 26/09/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | (DOC)Implantação | 28/09/2025 | 02/10/2025 | ✔️ | ---- |
| André Ramos | Objetivos da API | 28/09/2025 | 04/10/2025 | ✔️ | 23/09/2025
| Gustavo Gino | Testes | 28/09/2025 | 04/10/2025 | 📝 | ---- |
| Lucas Borges | API Endpoints | 28/09/2025 | 04/10/2025 | 📝 | ---- |
| Natã Gabriel | Documentos da Modelagem | 28/09/2025 | 04/10/2025 | ✔️ | ---- |
| Rhafael Hector | Testes | 28/09/2025 | 04/10/2025 | 📝 | ---- |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

