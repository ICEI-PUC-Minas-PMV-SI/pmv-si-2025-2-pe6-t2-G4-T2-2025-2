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



## Fluxo de Dados



## Tecnologias Utilizadas



## Considerações de Segurança



## Implantação


## Testes



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

