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

[O projeto Flow está bem estruturado do ponto de vista tecnológico, e as medidas de segurança abaixo complementam a arquitetura, garantindo:
Proteção de dados sensíveis, Autenticação e autorização seguras, Comunicação criptografada, Isolamento entre serviços, Infraestrutura consistente e segura com Docker e Render.

1.Camada de Apresentaçao (Front-end - ReactNative)

Armazenamentos  Seguros de Tokens:
Tokens JWT não devem ser armazenados em AsyncStorege ou SEcureStore em texto puro sem criptografia.
Tokens com  escopo limitado e curto tempo de expiração mitigam a vulnelaribilidade .
Comunicação Segura com HTTPS :
todo trafego deve usar https com tls 1.2+ para proteger dados em transito.
Proteção contra Man in the Midle.
Implementar SSl Pinnig  no App Mobile para que se comunique apenas com servidores confiáveis.
Nunca imbutir chaves de Api ou senhas  diretamente no código.
Usar variáveis de ambiente  e configuração por build.

2.Camada de Lógica de Negocio(Backend - Node.js + Expres)
Autenticaçoa e Autorização:
Usa JWT com expiração curta, armazena JWT_Secrete em .env, e refersh tokens com escopo limitado.
Validação  de Entrada (Zod): Protege  contra injeções  e falhas  ao validar /sanitizar todos dados  recebidos.
Crptografia  de Senhas :Nunca armazena senhas  em texto claro , implementa politica de senha forte.
Tratamentos de Erros e Logs:Nao expõe  erros internos e não loga com erros sem com dados sensíveis.

3. Banco de Dados (PostgreSQL com Prisma)
Privilégios Mínimos: Usuário da aplicação com acesso mínimo necessário (sem root),
Evitar SQL Injection: Prisma ORM já protege ao parametrizar queries.
Backups e Criptografia: Render deve realizar backups automáticos e criptografados, dados sensíveis podem ser criptografados na aplicação.

4. Infraestrutura (Render ,Docker)
Variáveis de ambiente : JWT _Secrete , DataBaseURL apenas no .env seguro.
Imagen Docker Segura: Usa Imagens minimalistas ,roda App com usuário sem root.
Atualizações de segurança: Mantem tudo atualizado, usar npm audit,Dependabot ou Snyk para vulnerabilidades.
Firewall/Rede: Banco deve aceitar consxoes só do backend, a API deve validar domínios e autenticação.

5.Pratica de Segurança
Testes de Segurança Autommatizados: uso do Jest+ Supertest para testar falhas de segurança como: Autenticçao invalida, injeção de dados e acesso não autorizado.
Monitoramento de alertas : ferramentas para detctar falhas, picos e acessos incomuns.
CorsRestritivo : Configure cors para permitir  apenas oiregens especificas .
Gerenciamento de Sessões : Revogar tokens apos troca de senha.
]

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

