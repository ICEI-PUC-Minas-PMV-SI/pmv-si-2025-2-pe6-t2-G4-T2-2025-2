# Introdução

O projeto visa oferecer uma solução móvel e de fácil utilização para que os usuários possam registrar e acompanhar seus gastos diários de forma simples e eficiente.

No cenário atual de crescente digitalização, o controle financeiro pessoal é uma necessidade fundamental. A maioria das pessoas busca ferramentas que auxiliem na organização de suas despesas e no planejamento financeiro. No entanto, muitas soluções existentes são complexas, com funcionalidades excessivas que acabam por afastar usuários que buscam apenas simplicidade e praticidade. O FinanceFlow surge como uma alternativa direta e intuitiva para suprir essa lacuna.

## Problema
A falta de controle financeiro pessoal é um problema comum, especialmente entre estudantes universitários e jovens profissionais. Eles frequentemente não sabem para onde o seu dinheiro está indo, o que dificulta o planejamento e a economia. Esse problema se manifesta de várias formas, desde a ausência de registro de despesas até a dificuldade em interpretar dados financeiros.

O problema de pesquisa a ser explorado é: **"Como uma aplicação móvel com arquitetura de sistemas distribuídos pode simplificar o processo de registro e visualização de gastos diários, capacitando o usuário a obter maior controle e conscientização sobre suas finanças pessoais?"**

Utilizando a Matriz CSD podemos organizar o que sabemos, o que presumimos e o que precisamos descobrir sobre este problema.

### Certezas:
 - Pessoas precisam de ajuda para controlar seus gastos.
 - Muitos aplicativos financeiros são complexos demais para o usuário comum
 - Anotações em papel ou planilhas são ineficientes

### Suposições:
 - Os usuários estão dispostos a registrar suas despesas manualmente, desde que o processo seja rápido e fácil.
 - Gráficos simples e categorização serão suficientes para que o usuário entenda seus gastos.
 - A segurança dos dados é uma preocupação, mas o usuário dará preferência à simplicidade.

### Dúvidas:
 - Qual é o conjunto mínimo de funcionalidades que tornaria o aplicativo útil sem ser complicado?
 - Como podemos incentivar o uso diário da aplicação?
 - Quais categorias de gastos são mais relevantes para o nosso público-alvo?
 - Os usuários preferem gráficos de pizza, de barras ou outras visualizações?


## Objetivos

O objetivo geral do **FinanceFlow** é **desenvolver uma aplicação móvel com arquitetura de sistemas distribuídos que ofereça aos usuários uma ferramenta simples e eficiente para registrar, categorizar e visualizar seus gastos diários, promovendo maior conscientização e controle sobre suas finanças pessoais. Além disso, o projeto inclui a criação de um portal web de gestão para o administrador da plataforma, que permitirá o monitoramento e o gerenciamento dos dados do sistema.**

Já os objetivos específicos serão guiados pelas etapas do desenvolvimento do projeto, detalhando as funcionalidades e as frentes de trabalho necessárias para atingir o objetivo geral:

1. **Desenvolver e Implementar o Módulo de Autenticação e Gestão de Usuários (Aplicativo Mobile)**: Criar um sistema seguro para o cadastro e login de usuários no aplicativo móvel. O módulo deverá gerenciar o ciclo de vida do usuário (criação, autenticação, atualização de perfil e exclusão), garantindo que cada usuário tenha acesso apenas aos seus próprios dados financeiros.
   
2. **Construir o Sistema de Registro e Categorização de Despesas:** Implementar as funcionalidades que permitem aos usuários adicionar novas despesas com detalhes como valor, data e descrição. Este objetivo inclui a criação de um sistema flexível onde o usuário possa criar, editar e excluir suas próprias categorias de gastos, permitindo uma organização financeira personalizada.
   
3. **Criar o Módulo de Visualização de Dados e Relatórios:** Desenvolver telas na aplicação móvel que apresentem um resumo visual dos gastos do usuário. Isso inclui a criação de gráficos (ex: gráfico de pizza ou de barras) que mostrem a distribuição dos gastos por categoria em um determinado período (mensal ou semanal), além de um painel de controle que exiba o total de despesas e as categorias mais relevantes.
   
4. **Criar o Portal Web de Gestão do Administrador:** Desenvolver um portal web em React (ou outra tecnologia de sua escolha, como React, Angular ou Vue.js) que se conecte à API do back-end para gerenciar os dados da aplicação. Este portal permitirá ao administrador visualizar o número de usuários, monitorar o uso geral da aplicação e, se necessário, realizar operações de manutenção ou exclusão de dados.
 

## Justificativa

O controle financeiro pessoal é uma habilidade essencial para a estabilidade e o crescimento individual, mas pesquisas mostram que a população brasileira enfrenta desafios significativos nessa área. Dados de 2023 da Confederação Nacional do Comércio de Bens, Serviços e Turismo (CNC), por meio da Pesquisa de Endividamento e Inadimplência do Consumidor (PEIC), revelaram que a proporção de famílias brasileiras com dívidas atingiu 78,5%, evidenciando uma dificuldade generalizada em gerenciar as contas. Além disso, uma pesquisa do Serviço de Proteção ao Crédito (SPC Brasil) e da Confederação Nacional de Dirigentes Lojistas (CNDL) aponta que 37% dos inadimplentes residentes nas capitais do país admitem que não fazem gestão dos próprios ganhos e gastos, sobretudo porque fazem o controle de cabeça (17%).

Esses números demonstram uma clara necessidade de ferramentas que simplifiquem o monitoramento dos gastos. O **FinanceFlow** se propõe a ser essa ferramenta, oferecendo uma solução descomplicada que capacite os usuários a tomar decisões financeiras mais conscientes. Ao focar em um público que busca simplicidade, o aplicativo preenche uma lacuna no mercado e contribui diretamente para a educação financeira, auxiliando na redução do endividamento e no aumento da capacidade de poupança.

> **Links com dados das Pesquisas**:
> - [Confederação Nacional do Comércio de Bens, Serviços e Turismo (CNC)](https://portaldocomercio.org.br/publicacoes_posts/pesquisa-de-endividamento-e-inadimplencia-do-consumidor-peic-perfil-do-endividamento-anual-2023/)
> - [Serviço de Proteção ao Crédito (SPC Brasil) e Confederação Nacional de Dirigentes Lojistas (CNDL)](https://site.cndl.org.br/37-dos-inadimplentes-nao-fazem-controle-das-contas-e-dos-gastos-revela-pesquisa-cndlspc-brasil/)


## Público-Alvo

**Personas**

*Persona 1 — Ana Beatriz (Estudante Universitária)*

Idade: 21 anos
Ocupação: Estudante de Administração
Conhecimentos prévios: Familiaridade básica com aplicativos móveis e redes sociais. Pouca experiência com apps financeiros.
Relação com a tecnologia: Usa smartphone como ferramenta principal para estudo e organização.
Desafios: Dificuldade em controlar os gastos mensais com transporte, alimentação e lazer. Costuma anotar algumas despesas em papel, mas abandona rapidamente por achar trabalhoso.
Objetivos: Ter uma forma rápida e intuitiva de registrar pequenos gastos do dia a dia para conseguir economizar e planejar viagens futuras.

*Persona 2 — Lucas Andrade (Jovem Profissional)*

Idade: 27 anos
Ocupação: Analista de Marketing Digital
Conhecimentos prévios: Usa planilhas eventualmente para organizar finanças, mas sem consistência.
Relação com a tecnologia: Conectado, utiliza diversos aplicativos no dia a dia (delivery, bancos digitais, apps de produtividade).
Desafios: Não consegue manter disciplina no controle de despesas fixas (aluguel, contas, lazer). Tem dificuldade em visualizar para onde o dinheiro está indo.
Objetivos: Ganhar clareza sobre os principais gastos mensais, reduzir desperdícios e começar a formar uma reserva financeira.

*Persona 3 — Mariana Souza (Jovem Empreendedora)*

Idade: 25 anos
Ocupação: Proprietária de uma loja online de roupas
Conhecimentos prévios: Experiência básica em aplicativos de e-commerce e bancos digitais.
Relação com a tecnologia: Frequente usuária de aplicativos de gestão de vendas e redes sociais.
Desafios: Mistura gastos pessoais com profissionais, o que gera confusão no final do mês. Não tem tempo para lidar com ferramentas complexas.
Objetivos: Manter uma separação simples entre despesas pessoais e do negócio, visualizar gráficos rápidos e tomar decisões mais conscientes para investir no crescimento da empresa.

**Histórias de Usuário**
1. Como estudante universitária, quero registrar minhas pequenas despesas diárias em segundos, para não perder tempo e manter o hábito de acompanhar minhas finanças.
2. Como jovem profissional, quero visualizar meus gastos categorizados em gráficos simples (pizza ou barras), para entender rapidamente para onde vai meu dinheiro e planejar melhor meus próximos meses.
3. Como empreendedora iniciante, quero separar despesas pessoais das do meu negócio de forma prática, para ter clareza sobre meus custos e poder reinvestir de forma inteligente.
4. Como usuário preocupado com segurança, quero garantir que apenas eu tenha acesso às minhas informações financeiras, para confiar no aplicativo e usá-lo diariamente.
5. Como usuário iniciante em finanças pessoais, quero que o aplicativo me ofereça apenas funções essenciais (registro, categorias e relatórios), para não me sentir sobrecarregado com opções desnecessárias.

**Mapa de Stakeholders**
<img width="1555" height="1437" alt="Stakeholders" src="https://github.com/user-attachments/assets/b8ffc793-a05b-4ab0-913c-3d8734772a1f" />


# Especificações do Projeto

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID     | Descrição do Requisito      |Prioridade               |  
|-------|-----------------------------|------------|  
|RF-001 | Permitir que o usuário realize cadastro e login de forma segura | ALTA |  
|RF-002 | Permitir que o usuário registre manualmente suas despesas, inserindo valor, data e descrição | ALTA |  
|RF-003 | Permitir a categorização de despesas, incluindo criação, edição e exclusão de categorias personalizadas | ALTA |  
|RF-004 | Oferecer opção para separar despesas pessoais e profissionais | MÉDIA |  
|RF-005 | Gerar relatórios de gastos por período (semanal e mensal) | ALTA |  
|RF-006 | Exibir visualizações gráficas dos gastos (pizza ou barras) | MÉDIA |  
|RF-007 | Permitir que o usuário visualize o total de despesas e categorias mais relevantes | ALTA |  
|RF-008 | Disponibilizar ao administrador um portal web para monitoramento de usuários e manutenção de dados | MÉDIA |  
|RF-009 | Permitir atualização e exclusão de registros de despesas e categorias já cadastrados | ALTA |  
|RF-010 | Garantir que cada usuário tenha acesso apenas aos seus próprios dados financeiros | ALTA |  


### Requisitos não Funcionais

|ID      | Descrição do Requisito  | Prioridade |  
|--------|-------------------------|------------|  
| RNF-001 | O sistema deve ser responsivo e funcionar em dispositivos móveis (Android e iOS) | ALTA |  
| RNF-002 | O tempo de resposta para registrar ou visualizar uma despesa não deve exceder 3 segundos | MÉDIA |  
| RNF-003 | Os dados do usuário devem ser armazenados de forma segura, com autenticação e criptografia | ALTA |  
| RNF-004 | O aplicativo deve apresentar uma interface simples e intuitiva, com foco em usabilidade | ALTA |  
| RNF-005 | O sistema deve ser escalável, suportando crescimento no número de usuários sem perda de desempenho | MÉDIA |  
| RNF-006 | O portal web administrativo deve estar disponível 99% do tempo | BAIXA |  
| RNF-007 | O aplicativo deve ser compatível com diferentes versões de sistemas operacionais móveis (mínimo Android 10 e iOS 13) | MÉDIA |  
| RNF-008 | O sistema deve garantir que cada usuário só tenha acesso aos seus próprios dados | ALTA |  
| RNF-009 | O design deve seguir boas práticas de acessibilidade | MÉDIA |  
| RNF-010 | O sistema deve permitir sincronização em nuvem para manter os dados atualizados entre dispositivos | MÉDIA | 


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID      | Restrição  | Descrição |  
|--------|-------------------------|------------|  
| RNF-001 | Portabilidade | O sistema deve ser responsivo, garantindo funcionamento adequado tanto navegadores |  
| RNF-002 | Desempenho | O Sistema deve processar e responder às requisições do usuário em no máximo 3s |
| RNF-003 | Interface do Usuário | A Interface do sistema será desenvolvido utilizando React Native e Tailwind CSS e Node.js |
| RNF-004 | Segurança | O sistema deve implementar mecanismos de proteção contra acesso não autorizado, garantindo a integridade e a confidencialidade dos dados. |
| RNF-005 | Usabilidade | O sistema deve intuitivo, de fácil navegação e compreensão por parte do usuário final. |
| RNF-006 | Persistência de Dados | O sistema deve utilizar um banco de dados relacional (como  PostgreSQL), garantindo integridade segurança e escalabilidade no armazenamento dos dados. A modelagem, manipulação e migração do banco deverão ser realizadas usando o Prisma ORM, para assegurar consistência produtividade e proteção contra vulnerabilidades como SQL Injection. |


# Catálogo de Serviços

1. Serviço: Gerenciamento de Conta do Usuário
Este serviço permite que o usuário gerencie sua identidade e acesso à plataforma, garantindo segurança e personalização.
    • Descrição do Serviço: Permite que novos usuários criem uma conta segura no FinanceFlow e que usuários existentes façam login para acessar seus dados financeiros. Inclui funcionalidades para recuperação de senha e atualização de informações de perfil, como nome de usuário.
    • Componentes do Serviço:
        ◦ Funcionalidades: Cadastro de usuário, autenticação de login, redefinição de senha.
        ◦ Camada de Lógica: API de Autenticação (Node.js/JWT).
        ◦ Camada de Dados: Dados de usuário armazenados no PostgreSQL.
        ◦ Interface: Telas de registro e login no aplicativo mobile (React Native).

2. Serviço: Acompanhamento de Gastos Pessoais
Este é o serviço central da plataforma, oferecendo ao usuário as ferramentas para registrar e organizar suas finanças diárias.
    • Descrição do Serviço: Permite que o usuário insira, visualize, edite e exclua suas despesas diárias, atribuindo-as a categorias personalizáveis. O serviço é projetado para ser rápido e intuitivo, facilitando a manutenção de um registro financeiro consistente.
    • Componentes do Serviço:
        ◦ Funcionalidades: Adicionar despesa, editar despesa, excluir despesa, criar/editar/excluir categorias.
        ◦ Camada de Lógica: API de Gastos (Node.js).
        ◦ Camada de Dados: Dados de despesas e categorias armazenados no PostgreSQL.
        ◦ Interface: Telas de inserção de gastos e listagem de despesas no aplicativo mobile (React Native).

3. Serviço: Análise e Visualização Financeira
Este serviço transforma os dados brutos de gastos em informações valiosas, ajudando o usuário a entender seu comportamento financeiro.
    • Descrição do Serviço: Oferece relatórios visuais e resumos analíticos dos gastos do usuário. Permite a visualização de gráficos por categoria e por período de tempo, facilitando a identificação de tendências e áreas para economia.
    • Componentes do Serviço:
        ◦ Funcionalidades: Geração de gráficos de gastos por categoria (gráfico de pizza), resumo de gastos mensais/semanais.
        ◦ Camada de Lógica: API de Relatórios (Node.js).
        ◦ Camada de Dados: Consultas de dados agregados no PostgreSQL.
        ◦ Interface: Telas de painel de controle e relatórios no aplicativo mobile (React Native).

4. Serviço: Gestão da Plataforma (Serviço de Suporte ao Administrador)
Este serviço é dedicado ao administrador da plataforma, fornecendo as ferramentas necessárias para monitorar a saúde do sistema e gerenciar os dados dos usuários.
    • Descrição do Serviço: Permite que o administrador visualize métricas gerais do sistema, como o número total de usuários, e gerencie contas de usuário, se necessário. O serviço visa garantir a integridade dos dados e o bom funcionamento da plataforma.
    • Componentes do Serviço:
        ◦ Funcionalidades: Listagem de usuários, visualização de dados do sistema, possibilidade de exclusão de dados (caso necessário para manutenção).
        ◦ Camada de Lógica: API de Administração (Node.js).
        ◦ Camada de Dados: Acesso aos dados de todos os usuários no PostgreSQL.
        ◦ Interface: Portal de gestão em React.
Este catálogo de serviços é uma ferramenta essencial que demonstra a capacidade da arquitetura distribuída de suportar diferentes serviços e clientes (usuário final e administrador) por meio de uma base de serviços comum.

# Arquitetura da Solução

A arquitetura do FinanceFlow é projetada para ser distribuída, com separação clara entre as camadas de apresentação, lógica de negócio e dados. Ela adota uma abordagem de serviço único (monolito) no backend para simplificar o desenvolvimento e a manutenção, ao mesmo tempo que demonstra a comunicação entre diferentes componentes.

![arq](/docs/img/Arquitetura%20Distribuida%20-%20Frame%201.jpg)

## Tecnologias Utilizadas

Para a implementação do FinanceFlow, a escolha das tecnologias foi guiada pelo objetivo de construir um sistema distribuído moderno, seguro e eficiente. A seguir, detalhamos a stack tecnológica completa, abrangendo as linguagens, frameworks, bibliotecas e ferramentas que serão utilizadas no desenvolvimento.

1. **Camada de Apresentação (Front-end)**

   A camada de interface com o usuário será desenvolvida com foco na portabilidade e na experiência mobile.
   - **React Native**: Framework para desenvolvimento de aplicações móveis multiplataforma (iOS e Android) a partir de uma única base de código JavaScript.
   - **Nativewind**: Biblioteca que utiliza a sintaxe do Tailwind CSS para estilizar componentes React Native, permitindo o desenvolvimento rápido de interfaces consistentes.
   - **Expo**: Plataforma que facilita o desenvolvimento de aplicações React Native, oferecendo um conjunto de ferramentas e serviços para a construção, testes e deploy da aplicação.
   - **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript, o que melhora a segurança, a escalabilidade e a manutenção do código, especialmente em projetos grandes.
2. **Camada de Lógica de Negócio (Back-end)**
    
    O backend do sistema, responsável por toda a lógica de negócio e pela comunicação com o banco de dados, será construído em um ambiente Node.js.
    - **TypeScript**: Linguagem principal para o desenvolvimento do backend, garantindo os mesmos benefícios de tipagem estática do front-end.
    - **Node.js**: Ambiente de execução JavaScript assíncrono e de alto desempenho, ideal para construir APIs eficientes e escaláveis.
    - **Express**: Framework web minimalista e flexível para Node.js, utilizado para criar os endpoints da API RESTful.
    - **express-async-errors**: Biblioteca que simplifica o tratamento de erros assíncronos no Express.
    - **Zod**: Biblioteca para validação de esquemas de dados. Ela garante que os dados recebidos nas requisições da API estejam no formato correto e seguro.
    - **Bcrypt**: Biblioteca para a criptografia de senhas, garantindo que as credenciais dos usuários sejam armazenadas de forma segura no banco de dados.
    - **Jsonwebtoken (JWT)**: Biblioteca para a criação e verificação de tokens web JSON, utilizados para a autenticação e autorização de usuários na API.
    - **PostgreSQL**: Banco de dados relacional robusto e de código aberto, escolhido para armazenar as informações dos usuários, despesas e categorias.
    - **Prisma**: ORM (Object-Relational Mapping) que atua como uma camada de abstração entre o código TypeScript e o banco de dados. Ele simplifica as operações de consulta, inserção e atualização de dados, além de garantir a segurança de tipos.
    - **Jest e ts-jest**: Framework de testes unitários e de integração para aplicações JavaScript e TypeScript.
    - **Supertest**: Biblioteca para testar APIs HTTP, permitindo a simulação de requisições de forma programática.
    - **Cross-env**: Ferramenta para definir variáveis de ambiente de forma consistente em diferentes sistemas operacionais.
    - **Docker e Docker Compose**: Ferramentas de conteinerização que serão utilizadas para isolar e gerenciar o ambiente de desenvolvimento, facilitando o setup do projeto e garantindo que o backend e o banco de dados funcionem de forma consistente em qualquer ambiente.

## Hospedagem

Para fins de demonstração acadêmica e devido à natureza do projeto, a hospedagem do FinanceFlow foi concebida para ser realizada em um ambiente de nuvem que oferece flexibilidade e escalabilidade.

Para a hospedagem do FinanceFlow, optou-se pela plataforma Render, que oferece um ambiente de nuvem ideal para a demonstração de projetos acadêmicos, combinando facilidade de uso com suporte a tecnologias modernas de conteinerização.

A estratégia de hospedagem adotada para o FinanceFlow é baseada em serviços gerenciados pelo Render, o que simplifica o processo de implantação e garante a consistência entre os ambientes de desenvolvimento e de produção.

1. **Back-end (Node.js)**: O serviço de back-end será hospedado como um serviço web no Render. A plataforma se encarregará de executar a imagem do Docker ou o código Node.js diretamente, gerenciando a infraestrutura subjacente de forma automática.

2. **Banco de Dados (PostgreSQL)**: O banco de dados será um serviço de PostgreSQL gerenciado pelo Render. Isso elimina a necessidade de gerenciar o servidor de banco de dados, backups e segurança, garantindo a alta disponibilidade e a integridade dos dados.

O processo de lançamento da aplicação segue os seguintes passos, otimizados para um ambiente de desenvolvimento contínuo:

1. **Containerização**: Primeiro, o back-end Node.js e o banco de dados PostgreSQL são configurados com Docker e Docker Compose no ambiente de desenvolvimento local. Isso cria um ambiente de trabalho consistente, onde todos os desenvolvedores (ou, neste caso, o desenvolvedor solo) têm a garantia de que a aplicação funcionará da mesma forma em suas máquinas.

2. **Preparação do Ambiente de Produção**: Na plataforma de hospedagem, o serviço de banco de dados gerenciado é provisionado. Em seguida, a URL de conexão do banco de dados e outras variáveis de ambiente sensíveis são configuradas no serviço de PaaS que hospedará a API.

3. **Deploy do Back-end**: O código-fonte do back-end é enviado para a plataforma de hospedagem (por exemplo, via Git). A plataforma de PaaS detecta as configurações do Docker e do Node.js, constrói a imagem do contêiner e o implanta, tornando a API acessível publicamente através de uma URL.

4. **Lançamento do Aplicativo Mobile**: O aplicativo mobile, construído com React Native e Expo, será disponibilizado para testes por meio do Expo Go. O uso do Expo Go é suficiente para demonstrar a funcionalidade completa da aplicação, uma vez que ele consome a API que já estará online.

# Planejamento

##  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

### Semana 1

Atualizado em: 17/08/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | Introdução | 11/08/2025 | 17/08/2025 | ✔️ | 16/08/2025      |
| André Ramos | Escolha Tema | 11/08/2025 | 13/08/2025 | ✔️ | 11/08/2025
| Gustavo Gino | Escolha Tema | 11/08/2025 | 13/08/2025 | ✔️ | 13/08/2025 |
| Lucas Borges | Escolha Tema | 11/08/2025 | 13/08/2025 | ✔️ | 13/08/2025 |
| Natã Gabriel | Escolha Tema | 11/08/2025 | 13/08/2025 | ✔️ | 12/08/2025 |
| Rhafael Hector | Escolha Tema | 11/08/2025 | 13/08/2025 | ✔️ | 11/08/2025 |


### Semana 2

Atualizado em: 24/08/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | Problema | 18/08/2025 | 24/08/2025 | ✔️ | 20/08/2025      |
| André Ramos | Problema | 18/08/2025 | 24/08/2025 | ✔️ | 22/08/2025
| Gustavo Gino | Justificativa | 18/08/2025 | 24/08/2025 | ✔️ | 24/08/2025 |
| Lucas Borges | Justificativa | 18/08/2025 | 24/08/2025 | ✔️ | 23/08/2025 |
| Natã Gabriel | Objetivos | 18/08/2025 | 24/08/2025 | ✔️ | 23/08/2025 |
| Rhafael Hector | Objetivos | 18/08/2025 | 24/08/2025 | ✔️ | 20/08/2025 |


### Semana 3

Atualizado em: 27/08/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | Arquitetura e Hospedagem | 25/08/2025 | 31/08/2025 | ✔️ | 31/08/2025 |
| André Ramos | Restrições | 25/08/2025 | 31/08/2025 | ✔️ | 26/08/2025
| Gustavo Gino | Requisitos | 25/08/2025 | 31/08/2025 | ✔️ | 27/08/2025 |
| Lucas Borges | Catálogo de Serviços | 25/08/2025 | 31/08/2025 | ✔️ | 29/08/2025 |
| Natã Gabriel | Catálogo de Serviços | 25/08/2025 | 31/08/2025 | ✔️ | 29/08/2025 |
| Rhafael Hector | Publico-Alvo e Personas | 25/08/2025 | 31/08/2025 | ✔️ | 20/08/2025 |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado
