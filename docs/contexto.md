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

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário cadastre tarefas | ALTA | 
|RF-002| Emitir um relatório de tarefas no mês   | MÉDIA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

# Catálogo de Serviços

Descreva aqui todos os serviços que serão disponibilizados pelo seu projeto, detalhando suas características e funcionalidades.

# Arquitetura da Solução

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![arq](https://github.com/user-attachments/assets/b9402e05-8445-47c3-9d47-f11696e38a3d)


## Tecnologias Utilizadas

Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

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
