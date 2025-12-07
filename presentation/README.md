# Apresentação da Solução

[![Assista ao video de apresentação](../docs/img/img%20presentation.png)]((https://drive.google.com/file/d/1tk0ZfusPDR7tEedVzAXxiR5Cwunu84Hu/view?usp=sharing))

[Download video](https://drive.google.com/file/d/1tk0ZfusPDR7tEedVzAXxiR5Cwunu84Hu/view?usp=sharing)

# Flow 💸

> Plataforma de Gestão Financeira Pessoal baseada em Arquitetura Distribuída.

![Status](https://img.shields.io/badge/status-concluído-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)

---

## 📖 Sobre o Projeto

**Flow** é um ecossistema de controle financeiro projetado para simplificar a gestão de receitas e despesas pessoais. O projeto foi desenvolvido como trabalho final da disciplina de **Arquitetura de Sistemas Distribuídos**, demonstrando a integração segura e eficiente entre múltiplas plataformas.

O objetivo é resolver a complexidade do controle financeiro manual (planilhas) e a poluição visual dos apps bancários, oferecendo uma solução focada na experiência do usuário e na integridade dos dados distribuídos.

---

## 🏗️ Arquitetura do Sistema

O sistema adota uma arquitetura distribuída, separando claramente as responsabilidades entre servidor, cliente web e cliente móvel.


## Componentes Distribuídos:
1. API Central (Backend): Responsável pela lógica de negócios, autenticação e persistência.

2. Portal Administrativo (Web): Focado na gestão do sistema e visualização de métricas globais.

3. Aplicativo Móvel (Mobile): Focado no usuário final para lançamentos rápidos e consulta de saldo.

## 🚀 Módulos da Aplicação

1. Backend (API)
O núcleo do sistema. Desenvolvido para ser seguro, escalável e stateless.

  - Segurança: Autenticação via JWT, criptografia de senhas com Bcrypt e validação de dados com Zod.

  - Banco de Dados: PostgreSQL containerizado via Docker, gerenciado pelo Prisma ORM.

  - Documentação: Rotas documentadas via Swagger/OpenAPI.

2. Frontend Web (Portal Admin)
Interface voltada para administradores e power-users.

  - Dashboard: Gráficos de visão geral do sistema.

  - Gestão: CRUD completo de usuários e categorias.

  - Tecnologia: React SPA com Vite e TailwindCSS.

3. Frontend Mobile (App do Usuário)
A ponta do sistema na mão do usuário.

  - UX/UI: Design moderno com NativeWind e gráficos interativos (Gifted Charts).

  - Onboarding: Tutorial interativo (Copilot) para novos usuários.

  - Funcionalidades: Lançamento de transações, gestão de categorias e relatórios mensais.

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia | Propósito no Projeto |
| :--- | :--- | :--- |
| Core | React Native / Expo | Interface Mobile Android/iOS. |
| Core | React / Vite | Interface Web Administrativa. |
| Core | Node.js / Express | API RESTful. |
| Linguagem | TypeScript / Express | Tipagem estática e segurança de código em todo o monorepo. |
| Banco de Dados | PostgreSQL | Persistência de dados relacional. |
| ORM | Prisma | Abstração e gerenciamento do banco de dados. |
| Estilização | NativeWind / Tailwind | Estilização utilitária consistente entre Web e Mobile. |
| Segurança | BCrypt & JWT | Hashing de senhas e tokens de sessão stateless. |
| Infra | Docker | Containerização |



 
