# Front-end Web

Este documento detalha o desenvolvimento da interface web (Front-end) do Portal Administrativo **Flow**. Esta aplicação é um Single Page Application (SPA) construída em React com TypeScript e estilizada com Tailwind CSS.

## Projeto da Interface Web

Este documento detalha o desenvolvimento da interface web (Front-end) do Portal Administrativo **Flow**. Esta aplicação é um Single Page Application (SPA) construída em React com TypeScript e estilizada com Tailwind CSS.

### Wireframes

[Inclua os wireframes das páginas principais da interface, mostrando a disposição dos elementos na página.]

### Design Visual

Tipografia:
![Tipografia](img/Tipografia.png)

Paleta De Cores:
![PaletaDeCores](img/PaletaDeCor.png)

Design das Telas:
![WhatsApp Image 2025-11-01 at 16 21 43 (1)](https://github.com/user-attachments/assets/563e25a9-fafd-4f90-8708-0183c5125034)

![WhatsApp Image 2025-11-01 at 16 21 43](https://github.com/user-attachments/assets/5e20cb1b-2dcc-4d20-a05c-c3dd792f0e7a)

![WhatsApp Image 2025-11-01 at 16 21 42](https://github.com/user-attachments/assets/6b24cf98-d986-4695-885d-fba8903b7343)


## Fluxo de Dados

### Fluxo 1
1. O usuário entra no sistema (insere e-mail e senha na página SignIn.tsx e clica em entrar). 

2. Os dados do formulário são validados localmente usando Zod.

3. Uma requisição POST /sessions é enviada à API com os dados.

4. O AuthProvider armazena o token e user no localStorage

5. A instância global do api (Axios) é atualizada com o cabeçalho Authorization: Bearer [token]

6. O AppRoutes detecta que session não é mais null e que o role é "admin".

7. O React Router redireciona automaticamente o usuário da rota / para /admin/dashboard e o usuário recebe um popup na tela ("Login efetuado com sucesso")

### Fluxo 2
1. As próximas páginas buscam os dados da API confirmando que o session do AuthContext é válido e renderizando as páginas Dashboard.tsx e UserListPage.tsx

## Tecnologias Utilizadas

O Portal Administrativo foi construído como uma Single Page Application (SPA) moderna, utilizando um conjunto de tecnologias focado em desempenho, manutenibilidade e uma excelente experiência de desenvolvimento.

A tabela abaixo detalha as principais bibliotecas e frameworks utilizados no projeto:

| Categoria   | Tecnologia | Propósito no Projeto    |
| :----         |    :----         |      :----    |
| Base (Core)       | React | Biblioteca principal para a construção da interface de usuário declarativa e baseada em componentes.
| Base (Core)       | TypeScript    | Garante a tipagem estática, aumentando a segurança do código, melhorando o IntelliSense e facilitando a refatoração.              |
| Build Tool        | Vite  | Ferramenta de build moderna que oferece Hot Module Replacement (HMR) instantâneo e builds de produção otimizados. |
| Estilização        | Tailwind CSS  |    Framework utility-first para estilização rápida e consistente diretamente no JSX, permitindo a criação de um design system customizado. |
| Estilização | tailwindcss-animate | Plugin do Tailwind para adicionar animações de entrada/saída (animate-in, fade-in) de forma declarativa. |
| Iconografia | react-icons | Biblioteca para a inclusão de ícones (como HiMenu, TbUserCircle, HiPlus) de forma otimizada. |
| Roteamento | React Router DOM | Utilizado para gerenciar a navegação entre as páginas (Login, Dashboard, Usuários, Perfil) e para a criação de Rotas Protegidas. |
| Ger. de Estado | React Context API | Usado especificamente no AuthContext para gerenciar globalmente o estado da sessão do usuário (token, dados do usuário, status de isLoading). |
| Ger. de Estado | React Hooks | useState, useEffect, useContext, useRef, useCallback e useActionState são usados para gerenciar o estado local das páginas e componentes. |
| Comunicação API | Axios | Cliente HTTP baseado em Promises (abstraído no serviço api.ts) para realizar requisições seguras (com Bearer Token) aos endpoints da API. |
| Notificação | react-hot-toast | Biblioteca para exibir notificações toast globais (sucesso, erro) de forma limpa e centralizada. |
| Validação | Zod | Utilizado no front-end para validar os dados dos formulários (Login, Perfil, Adicionar Usuário) antes do envio, garantindo feedback imediato ao usuário. |

## Considerações de Segurança

Armazenamento do Token:
Prefira cookies HTTP-only com SameSite=strict e Secure em vez de localStorage.
Se usar localStorage, proteja contra XSS com políticas CSP e sanitização.
Validação de Dados:
O front usa Zod, mas o backend também deve validar e sanitizar todas as entradas.
Comunicação Segura:
Todas as requisições devem usar HTTPS para proteger credenciais e tokens.
Autorização:
O cabeçalho Authorization: Bearer [token] só deve ser definido após login.
Tokens expirados devem forçar logout e limpeza do armazenamento.
Sessão e Expiração:
Use tokens de curta duração e, se necessário, refresh tokens seguros.
Monitore e encerre sessões inválidas automaticamente.
Proteção contra ataques:
XSS: sanitize dados e evite dangerouslySetInnerHTML.
CSRF: cookies com SameSite=strict.
Força bruta: rate limiting no backend.
Mensagens e Logs:
Use mensagens de erro genéricas e não exponha dados sensíveis no console.
Atualizações e Deploy:
Mantenha dependências atualizadas e aplique cabeçalhos de segurança no servidor (HSTS, CSP, X-Frame-Options, etc.).

Em resumo:

Garantir que seja HTTPS, tokens curtos, validação em ambas as camadas, e proteção contra XSS/CSRF.
Evite expor tokens ou dados sensíveis no front-end.

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

