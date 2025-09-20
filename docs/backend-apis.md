# APIs e Web Services

O planejamento de uma aplicação de APIS Web é uma etapa fundamental para o sucesso do projeto. Ao planejar adequadamente, você pode evitar muitos problemas e garantir que a sua API seja segura, escalável e eficiente.

Aqui estão algumas etapas importantes que devem ser consideradas no planejamento de uma aplicação de APIS Web.

[Inclua uma breve descrição do projeto.]

## Objetivos da API

O primeiro passo é definir os objetivos da sua API. O que você espera alcançar com ela? Você quer que ela seja usada por clientes externos ou apenas por aplicações internas? Quais são os recursos que a API deve fornecer?

[Objetivos da API 

A API do Flow tem cono objetivo principal servir como camada intermediária entre  o aplicativo mobile  e a bases de a dados , expondo endepoints seguros e bem estrturados para seguintes itens: 

Gerenciar  usarios : cadastro , autenticação, recuperação de senha e controle de sessão.

Registrar e consultar  despesas : incluindo  criação , edição e exclusão de lançametos  financeiros por usuário.

Organizar categorias  de gastos : permitindo ao usuário personalizar e consultar suas categorias . 

Oferecer  autenticação seguara: via JWTY, com controle de acesso baseados em escopos e validações de dados.

Prover dados agregados: como totais mensais,garaficos  e relatorios de uso.

Esses Objetivos estão alinhados com uma arquitetura simples, mas robusta, permitindo facilidade de uso, manutençao do código, expansão futura e, principalmente, segurança
no tratamento das informaçoes pessoais e finaceiras do usuarios.

Segurança aplicada por camada 
Na camada de apresentação , a segurança  de comunicação entre API e armazenamento  de tokens de autenticçao sendo todo trafego por HTTPS para proteçao contra interceptaçoes.
Como melhoria  adicional , recomenda se o a implementação do SSL assegurando conexoes apenas com servidores confiáveis.
No Backend , o uso do JWT para autenticaçao  é feito de froma segura  com tokens  curtos e protegidos por chave secreta e senhas criptografada  com bcryot con salt.
A camada de dados, composta por PostgreSQL e Prisma ORM, conta com proteção contra SQL Injection por meio do uso de consultas parametrizadas. 
Na infraestrutura, o backend é containerizado com Docker, e o deploy é realizado na Render, é importante garantir que o container exponha apenas as portas necessárias, bibliotecas e dependências estejam sempre atualizadas por meio de ferramentas como npm audit, dependabot ou snyk.

Em relação á conformidade com oOWASP Top 10 , o sistema apresenta  proteçao contra injeçoes  e falhas cripitogáficas  autenticçaoconfiavel.  Mas precisa rever  a ausencia  de SSL Pinning no App Mobile.
 
Mesmo sendo projeto academico tem base sólida de segurança, validaçao e criptografia e iinfraestrtura escalavel. API Flow ira cumprir   seus objetivos  ao oferecer uma interface segura, funcional e extensivel pra gerenciamento de finanças pessoias .]


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

[Discuta as considerações de segurança relevantes para a aplicação distribuída, como autenticação, autorização, proteção contra ataques, etc.]

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

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| AlunaX        | Introdução | 01/02/2024     | 07/02/2024 | ✔️    | 05/02/2024      |
| AlunaZ        | Objetivos    | 03/02/2024     | 10/02/2024 | 📝    |                 |
| AlunoY        | Histórias de usuário  | 01/01/2024     | 07/01/2005 | ⌛     |                 |
| AlunoK        | Personas 1  |    01/01/2024        | 12/02/2005 | ❌    |       |

#### Semana 2

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| AlunaX        | Página inicial   | 01/02/2024     | 07/03/2024 | ✔️    | 05/02/2024      |
| AlunaZ        | CSS unificado    | 03/02/2024     | 10/03/2024 | 📝    |                 |
| AlunoY        | Página de login  | 01/02/2024     | 07/03/2024 | ⌛     |                 |
| AlunoK        | Script de login  |  01/01/2024    | 12/03/2024 | ❌    |       |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

