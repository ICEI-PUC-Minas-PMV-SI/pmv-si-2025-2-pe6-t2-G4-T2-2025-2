# Front-end Móvel
Flow é uma plataforma de gerenciamento de finanças pessoais projetada sob uma arquitetura de sistemas distribuídos. O ecossistema é composto por três pilares integrados: um aplicativo móvel (React Native) focado na experiência do usuário final para lançamentos rápidos, um portal administrativo web (React) para gestão e monitoramento da plataforma, e uma API RESTful robusta (Node.js) que centraliza a lógica de negócios e a persistência de dados.

O objetivo central do projeto é democratizar o controle financeiro através de uma ferramenta simples e eficiente, permitindo que usuários registrem despesas, receitas e visualizem sua saúde financeira através de relatórios categorizados. A solução prioriza a segurança e a integridade dos dados, implementando autenticação via tokens JWT e garantindo que cada usuário tenha acesso exclusivo e isolado às suas próprias informações financeiras.

Do ponto de vista acadêmico e técnico, o projeto visa demonstrar a implementação prática de uma arquitetura moderna e escalável. Ele utiliza tecnologias de ponta como TypeScript, Prisma ORM e PostgreSQL, além de práticas de DevOps com Docker, exemplificando a separação clara de responsabilidades entre front-end, back-end e banco de dados em um ambiente distribuído.

## Projeto da Interface
O desenvolvimento da interface móvel do **Flow** foi norteado pela premissa de oferecer uma experiência de usuário fluida, intuitiva e focada na agilidade do registro de informações. Construído com **React Native** e estilizado via **NativeWind**, o aplicativo atua como o ponto de contato primário para o usuário final, permitindo que o controle financeiro seja realizado em tempo real, diretamente do dispositivo móvel.

A estrutura de navegação foi desenhada para minimizar a carga cognitiva, utilizando uma **Barra de Navegação Inferior (Bottom Tab Bar)** para acesso rápido às áreas principais (Dashboard, Add Transação e Categorias) e **Modais** sobrepostos para ações de alta frequência, como a adição de novas transações. O design visual adota um tema escuro (*Dark Mode*) consistente com o Portal Administrativo, utilizando contrastes de verde neon para guiar a atenção do usuário aos elementos de ação e indicadores de saúde financeira.

Em termos de interação, a interface prioriza o *feedback* imediato e a visualização de dados. Gráficos interativos de barras e rosca (Donut) foram implementados para transformar dados brutos em insights visuais instantâneos. O fluxo de telas foi otimizado para garantir que tarefas críticas, como o lançamento de uma despesa, possam ser concluídas com o mínimo de toques possível, garantindo a eficiência da aplicação em cenários de uso cotidiano.

### Wireframes

![Login](img/WireMovel-Login.jpg)
![Registro](img/WireMovel-Registro.jpg)
![Dashboard](img/WireMovel-Dashboard.jpg)
![Categorias](img/WireMovel-Categorias.jpg)
![Transações](img/WireMovel-AddTransacao.jpg)
![Perfil](img/WireMovel-Perfil.jpg)

### Design Visual

![WhatsApp Image 2025-11-30 at 13 28 38 (1)](https://github.com/user-attachments/assets/3565383a-cda9-4b6d-81bb-06e711d9a24a)
![WhatsApp Image 2025-11-30 at 13 28 38](https://github.com/user-attachments/assets/a0f16183-2b16-441e-a8ae-364002d3b92c)


## Fluxo de Dados

O fluxo de dados no aplicativo móvel do **Flow** segue um padrão unidirecional e cíclico, priorizando a segurança e a consistência das informações. A comunicação com o servidor é realizada via API RESTful, enquanto o gerenciamento de estado local garante uma interface reativa e fluida.

### Descrição dos Fluxos Principais
#### Fluxo de Autenticação e Sessão
Este é o fluxo crítico que garante a segurança do acesso.

1. Entrada: O usuário insere credenciais na tela de Login.
2. Processamento Local: O aplicativo valida o formato do e-mail e a presença da senha.
3. Requisição: Envio de POST /sessions para a API.
4. Resposta: A API retorna um Token JWT e os dados do usuário.
5. Armazenamento Seguro: O aplicativo utiliza o Expo SecureStore para criptografar e salvar o token no dispositivo.
6. Navegação: O contexto de autenticação (AuthContext) detecta o token e redireciona automaticamente o usuário para o Dashboard.

#### Fluxo de Carregamento do Dashboard (Leitura)
Ocorre sempre que o usuário acessa a tela principal ou altera o mês de referência.

1. Gatilho: O usuário abre o app ou seleciona um novo mês no seletor.

2. Requisição Paralela: O aplicativo dispara simultaneamente (via Promise.all) requisições para:

   - /reports/summary (Saldo, Receitas, Despesas).

   - /transactions (Lista de transações recentes).

   - /reports/weeklyReport (Dados para o gráfico semanal).

3. Processamento: Os dados brutos recebidos são formatados (ex: conversão de valores para moeda BRL, formatação de datas) e armazenados em estados locais (useState).

4. Visualização: Os componentes (Gráficos e Listas) são renderizados com os novos dados.

#### Fluxo de Criação de Transação (Escrita)
Representa a inserção de novos dados no sistema.

1. Entrada: O usuário preenche valor, descrição, data e seleciona uma categoria na tela Nova Transação.
2. Seleção de Categoria: O app lista as categorias disponíveis consumindo GET /categories e filtrando localmente por tipo (Receita/Despesa).
3. Envio: Ao confirmar, o app envia um POST /transactions com o payload JSON.
4. Sincronização:

   - Após o sucesso (201 Created), o usuário é levado de volta ao Dashboard.

   - O hook useFocusEffect detecta o retorno à tela e dispara automaticamente o Fluxo de Leitura, garantindo que o saldo e os gráficos reflitam a nova transação imediatamente.

#### Tecnologias de Interligação com a API
- Axios: Cliente HTTP utilizado para todas as requisições, configurado com interceptors para anexar automaticamente o Token JWT.
- JSON: Formato padrão para troca de dados.
- HTTPS: Protocolo obrigatório para garantir a encriptação dos dados em trânsito.


## Tecnologias Utilizadas

| Categoria | Tecnologia | Propósito no Projeto |
| :--- | :--- | :--- |
| **Base (Core)** | **React Native** | Framework principal para o desenvolvimento da interface nativa (iOS e Android) utilizando a lógica do React. |
| **Base (Core)** | **TypeScript** | Garante a tipagem estática, aumentando a segurança do código e facilitando a manutenção e refatoração. |
| **Base (Core)** | **Expo** | Plataforma que agiliza o desenvolvimento, build e teste, fornecendo acesso fácil a APIs nativas (como SecureStore). |
| **Estilização** | **NativeWind** | Traz o poder do Tailwind CSS para o React Native, permitindo estilização rápida via classes diretamente no JSX. |
| **Navegação** | **React Navigation** | Gerencia todo o fluxo de navegação do app, implementando Pilhas (Stack) para telas modais e Abas (Bottom Tabs) para o menu principal. |
| **Ger. de Estado** | **React Context API** | Usado no `AuthContext` para gerenciar globalmente a sessão do usuário (login, logout e persistência de token). |
| **Ger. de Estado** | **React Hooks** | `useState`, `useEffect`, `useCallback` e o específico `useFocusEffect` são usados para controlar o ciclo de vida e reatividade das telas. |
| **Formulários** | **React Hook Form** | Gerencia o estado dos formulários (Login, Cadastro) de forma performática, reduzindo a necessidade de múltiplos estados manuais. |
| **Validação** | **Zod** | Utilizado para criar esquemas de validação robustos, integrando-se ao React Hook Form para validar dados antes do envio. |
| **Comunicação API** | **Axios** | Cliente HTTP para realizar as requisições REST ao back-end, configurado para injetar automaticamente o token JWT. |
| **Armazenamento** | **Expo SecureStore** | Armazenamento local criptografado, utilizado para persistir o Token JWT e dados sensíveis do usuário de forma segura. |
| **Armazenamento** | **AsyncStorage** | Armazenamento local simples chave-valor, usado para persistir preferências não sensíveis, como o status de visualização do tutorial. |
| **Visualização** | **RN Gifted Charts** | Biblioteca utilizada para renderizar os gráficos interativos (Barras e Rosca) no Dashboard de forma nativa e animada. |
| **Onboarding** | **RN Copilot** | Biblioteca para criar o tutorial passo-a-passo (Walkthrough) que guia novos usuários pelas funcionalidades principais. |
| **Onboarding** | **RN Copilot** | Biblioteca para criar o tutorial passo-a-passo (Walkthrough) que guia novos usuários pelas funcionalidades principais. |
| **Iconografia** | **Lucide React Native** | Conjunto de ícones vetoriais modernos e consistent


## Considerações de Segurança
A segurança do **Flow** foi projetada em camadas ("Defense in Depth"), garantindo que a proteção dos dados financeiros e pessoais dos usuários seja mantida desde a interface do usuário até o banco de dados.

Abaixo estão as estratégias implementadas para mitigar riscos e garantir a integridade da aplicação distribuída.

#### Autenticação e Gerenciamento de Sessão
A autenticação é a porta de entrada do sistema e utiliza padrões modernos para garantir que apenas usuários legítimos acessem a plataforma.

- Padrão JWT (JSON Web Token): A API utiliza tokens JWT assinados com uma chave secreta (JWT_SECRET) mantida apenas no servidor. O token é stateless (sem estado), o que permite que a API escale horizontalmente sem depender de sessões em memória.
- Criptografia de Senhas: As senhas nunca são armazenadas em texto plano. Utilizamos a biblioteca Bcrypt para realizar o hashing das senhas com um salt aleatório antes da persistência no banco de dados, protegendo contra ataques de rainbow table.
- Armazenamento Seguro (Mobile): No aplicativo React Native, o token JWT não é salvo em armazenamento comum. Utilizamos o Expo SecureStore, que aproveita o Keychain (iOS) e o Keystore (Android) para criptografar o token no dispositivo do usuário.
- Contexto de Autenticação: O front-end (Web e Mobile) utiliza um AuthContext centralizado que gerencia o ciclo de vida do token, garantindo o logout automático e a limpeza de dados sensíveis da memória quando necessário.

#### Autorização e Controle de Acesso (RBAC)
Apenas estar logado não é suficiente; o sistema verifica o que o usuário pode fazer.

- Role-Based Access Control (RBAC): O sistema implementa dois níveis de acesso distintos:
  - member: Acesso restrito apenas aos seus próprios dados (transações, categorias, perfil).
  - admin: Acesso privilegiado ao Portal Administrativo para visualização de métricas globais e gestão de usuários.
- Middleware de Proteção: As rotas críticas são protegidas por middlewares (ensureAuthenticated e verifyUserAuthorization) que interceptam a requisição, validam o token e verificam se a role do usuário permite o acesso ao recurso solicitado.
- Isolamento de Dados (Propriedade): A segurança é aplicada no nível da consulta ao banco de dados. Todo comando de leitura ou escrita inclui a cláusula where: { userId: request.user.id }. Isso garante matematicamente que um usuário jamais consiga ler ou manipular transações de outro usuário, mesmo que tente forjar IDs na URL.

#### Proteção Contra Ataques Comuns
A arquitetura foi desenhada para mitigar as vulnerabilidades mais comuns listadas no OWASP Top 10.

- Prevenção de SQL Injection: A utilização do Prisma ORM elimina o risco de injeção de SQL. O Prisma utiliza prepared statements (consultas parametrizadas) por padrão, tratando todos os inputs do usuário como dados literais e nunca como comandos executáveis.
- Validação e Sanitização de Dados: A biblioteca Zod atua como um guardião na entrada da API. Todos os dados recebidos (body, query, params) são validados contra um esquema estrito. Dados malformados, tipos incorretos ou campos inesperados são rejeitados imediatamente com erro 400 Bad Request, impedindo que dados "sujos" entrem na lógica de negócio.
- Tratamento de Erros Seguro: A API implementa uma camada global de tratamento de erros (AppError). Erros internos do servidor ou falhas de banco de dados não expõem stack traces ou detalhes sensíveis da infraestrutura para o cliente; apenas mensagens genéricas e códigos de status HTTP apropriados são retornados.

#### Segurança da Infraestrutura e Comunicação
- HTTPS/TLS: Em produção (Render), toda a comunicação entre os clientes (Mobile/Web) e a API é forçada via HTTPS, garantindo a criptografia dos dados em trânsito e protegendo contra ataques Man-in-the-Middle.
- Variáveis de Ambiente: Segredos como credenciais de banco de dados e chaves de assinatura JWT são injetados em tempo de execução através de variáveis de ambiente, nunca sendo "commitados" no código-fonte (repositório).
- Containerização (Docker): O uso do Docker garante que a aplicação rode em um ambiente isolado e controlado, com versões específicas de dependências, reduzindo a superfície de ataque do sistema operacional.


## Implantação
A implantação do **Flow** envolve a orquestração de quatro componentes distintos que compõem a arquitetura distribuída: o Banco de Dados, a API de Serviços (Back-end), o Portal Administrativo (Front-end Web) e o Aplicativo Móvel.

Para este projeto, adotamos uma estratégia baseada em PaaS (Platform as a Service) utilizando a plataforma Render, que simplifica a gestão de infraestrutura, e o ecosistema Expo (EAS) para o aplicativo móvel.

#### Requisitos de Hardware e Software
Como utilizamos serviços em nuvem, os requisitos de hardware físico são abstraídos pelo provedor. Abaixo estão as especificações dos ambientes de execução:

##### Ambiente de Servidor (Back-end & Banco de Dados):

- Banco de Dados: Instância PostgreSQL (Versão 14 ou superior). Requer armazenamento persistente e suporte a conexões SSL.
- API (Node.js): Ambiente de execução Node.js (v18+ LTS). Recomenda-se containerização via Docker para garantir a paridade entre desenvolvimento e produção.
  - Recursos Mínimos Sugeridos: 0.5 vCPU e 512MB de RAM (Suficiente para o escopo acadêmico).

#### Ambiente de Cliente (Front-end):

Mobile App:

- Android: Versão 6.0 (Marshmallow) ou superior.

- iOS: Versão 13.0 ou superior.

#### Escolha da Plataforma de Hospedagem
A plataforma Render foi selecionada para hospedar a camada de servidor e web devido à sua integração nativa com repositórios Git, suporte a Docker e facilidade de configuração de serviços distribuídos.


## Testes

Diferente da API e do Portal Web, que contam com suítes de testes automatizados para lógica e integração, a estratégia de validação do Aplicativo Móvel (React Native) priorizou Testes Manuais de Sistema e Interface executados em ambiente simulado de alta fidelidade.

O objetivo desta abordagem foi validar não apenas a lógica funcional, mas principalmente a Experiência do Usuário (UX), a responsividade do layout (NativeWind), as animações de gráficos e a integração correta com os recursos nativos do dispositivo (Teclado, Safe Area, Navegação por Gestos).

### Ferramentas de Teste

| Ferramenta | Propósito |
| :--- | :--- |
| **Xcode / iOS Simulator** | Ambiente principal de execução. Utilizado para simular dispositivos como iPhone 15 e iPhone SE (para validar diferentes tamanhos de tela). |
| **Metro Bundler** | Monitoramento de logs em tempo real, *Hot Reloading* para testes visuais rápidos e depuração de erros de JavaScript. |
| **Inspector (DevTools)** | Utilizado para verificar a hierarquia de componentes, estilos do NativeWind e requisições de rede (Network). |
| **API Staging (Render)** | O aplicativo foi testado conectado diretamente à API de produção/homologação para validar a integração real de dados. |

### Casos de Teste Funcionais (Roteiro de Teste Manual)

Abaixo estão os cenários executados manualmente no Simulador iOS para validar os Requisitos Funcionais (RF) da aplicação.

#### Módulo 1: Autenticação e Sessão

| Caso de Teste | Ação Executada | Comportamento Esperado (Passou/Falhou) |
| :--- | :--- | :--- |
| **CT01 - Cadastro com Sucesso** | Preencher formulário de *SignUp* com dados válidos e clicar em "Cadastrar". | Exibir alerta de sucesso e redirecionar para Login. Usuário deve ser criado no Banco. |
| **CT02 - Validação de Campos** | Tentar cadastrar com senhas diferentes ou e-mail inválido. | O **Zod/React Hook Form** deve exibir mensagens de erro em vermelho abaixo dos inputs. |
| **CT03 - Login com Sucesso** | Inserir credenciais válidas na tela *SignIn*. | O botão deve mostrar *loading*, o token deve ser salvo no `SecureStore` e o app deve navegar para o *Dashboard*. |
| **CT04 - Login Inválido** | Inserir credenciais erradas. | O app deve exibir um `Alert` nativo com a mensagem de erro retornada pela API ("Credenciais inválidas"). |
| **CT05 - Logout** | Clicar no botão de sair no menu do Dashboard. | O token deve ser removido do dispositivo e o app deve voltar para a tela de Login. |

#### Módulo 2: Dashboard e Visualização

| Caso de Teste | Ação Executada | Comportamento Esperado (Passou/Falhou) |
| :--- | :--- | :--- |
| **CT06 - Carregamento Inicial** | Abrir o Dashboard após login. | Exibir *skeleton* ou *spinner* de carregamento, seguido pelos dados atualizados vindos da API. |
| **CT07 - Navegação Temporal** | Clicar nas setas do seletor de mês (Ex: Setembro -> Outubro). | O app deve disparar nova requisição, atualizar o saldo, o gráfico e a lista de transações para o mês selecionado. |
| **CT08 - Alternância de Abas** | Alternar entre "Visão Geral" e "Por Categorias". | O conteúdo deve mudar instantaneamente. A aba Categorias deve mostrar o Gráfico de Rosca correto. |
| **CT09 - Gráficos Interativos** | Visualizar o Gráfico de Barras. | As barras devem ser renderizadas com as cores corretas (Verde/Vermelho) e altura proporcional aos valores. |

#### Módulo 3: Gestão de Transações e Categorias

| Caso de Teste | Ação Executada | Comportamento Esperado (Passou/Falhou) |
| :--- | :--- | :--- |
| **CT10 - Nova Categoria** | Acessar aba Categorias, digitar nome e clicar em `+`. | A nova categoria deve aparecer na lista imediatamente. |
| **CT11 - Nova Transação** | Clicar no botão `+`, preencher valor, descrição e selecionar categoria. | O modal deve fechar e o Dashboard deve atualizar o saldo automaticamente (`useFocusEffect`). |
| **CT12 - Scroll Infinito** | Rolar a lista "Todas as Transações" até o final. | O app deve carregar a próxima página de transações sem travar a UI. |
| **CT13 - Exclusão** | Na lista de transações, clicar na lixeira de um item. | Exibir alerta de confirmação ("Tem certeza?"). Ao confirmar, o item deve sumir da lista. |

### Testes Não Funcionais (Validação de UX/UI)
Estes testes avaliaram a qualidade da interface e o desempenho percebido.

1. Responsividade de Layout (NativeWind):
   - Teste: Executar o app em dispositivos com Notch (iPhone 14/15) e sem Notch (iPhone SE).
   - Resultado: O uso de SafeAreaView e classes flexíveis garantiu que nenhum conteúdo ficasse cortado ou sobreposto à barra de status.

2. Feedback Visual e Usabilidade:
   - Teste: Verificar se todas as ações assíncronas (chamadas de API) possuem feedback visual (ActivityIndicator ou desabilitação de botões).
   - Resultado: Botões de "Entrar", "Salvar" e carregamento de listas mostram spinners, impedindo cliques duplos e confusão do usuário.

3. Tratamento de Teclado:
   - Teste: Tocar em um input na parte inferior da tela.
   - Resultado: O componente KeyboardAvoidingView empurra o conteúdo para cima, garantindo que o teclado não cubra o campo de digitação.

4. Navegação:
   - Teste: Navegar profundamente nas telas e usar o gesto de "voltar" (swipe back) do iOS.
   - Resultado: A pilha de navegação (Stack Navigator) gerencia o histórico corretamente, mantendo a fluidez nativa.

# Planejamento

##  Quadro de tarefas

### Semana 1

Atualizado em: 08/11/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | Wireframes | 03/11/2025 | 08/11/2025 | ✔️ | 08/11/2025      |
| André Ramos | Estudo da Segurança |  03/11/2025 | 08/11/2025 | 📝 | ----
| Gustavo Gino | Tipografia |  03/11/2025 | 08/11/2025 | ✔️ | 08/11/2025 |
| Lucas Borges | Adequação API |  03/11/2025 | 08/11/2025 | 📝 | ---- |
| Natã Gabriel | Tecnologias |  03/11/2025 | 08/11/2025 | 📝 | ---- |
| Rhafael Hector | Design IU/UX |  03/11/2025 | 08/11/2025 | 📝 | ---- |

#### Semana 2

Atualizado em: 15/11/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | Desenvolvimento | 09/11/2025 | 15/11/2025 | 📝 | ----      |
| André Ramos | Desenvolvimento | 09/11/2025 | 15/11/2025 | 📝 | ----
| Gustavo Gino | Tipografia | 09/11/2025 | 15/11/2025 | ✔️ | 08/11/2025 |
| Lucas Borges | Adequação API | 09/11/2025 | 15/11/2025 | 📝 | ---- |
| Natã Gabriel | Tecnologias | 09/11/2025 | 15/11/2025 | 📝 | ---- |
| Rhafael Hector | Design IU/UX | 09/11/2025 | 15/11/2025 | ✔️ | 15/11/2025 |

#### Semana 3

Atualizado em: 22/11/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | Desenvolvimento | 16/11/2025 | 22/11/2025 | 📝 | ----      |
| André Ramos | Desenvolvimento | 16/11/2025 | 22/11/2025 | ✔️ | 22/11/2025
| Gustavo Gino | Verificar Tipografia | 16/11/2025 | 22/11/2025 | ✔️ | 22/11/2025 |
| Lucas Borges | Adequação API | 16/11/2025 | 22/11/2025 | 📝 | ---- |
| Natã Gabriel | Tecnologias | 16/11/2025 | 22/11/2025 | ✔️ | 22/11/2025 |
| Rhafael Hector | Design IU/UX | 16/11/2025 | 22/11/2025 | ✔️ | 15/11/2025 |

#### Semana 4

Atualizado em: 29/11/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Thiago Ferreira | Desenvolvimento | 23/11/2025 | 29/11/2025 | ✔️ | 29/11/2025      |
| André Ramos | Desenvolvimento | 23/11/2025 | 29/11/2025 | ✔️ | 22/11/2025
| Gustavo Gino | Verificar Tipografia | 23/11/2025 | 29/11/2025 | ✔️ | 22/11/2025 |
| Lucas Borges | Adequação API | 23/11/2025 | 29/11/2025 | ✔️ | 29/11/2025 |
| Natã Gabriel | Tecnologias | 23/11/2025 | 29/11/2025 | ✔️ | 22/11/2025 |
| Rhafael Hector | Design IU/UX | 23/11/2025 | 29/11/2025 | ✔️ | 15/11/2025 |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

