# FiveOptimizer

FiveOptimizer é um aplicativo executável para Windows desenvolvido para aplicar **otimizações automáticas no sistema e no FiveM**, melhorar desempenho em jogos e gerenciar configurações avançadas do ambiente utilizado pelo **FiveM** e **Grand Theft Auto V**.

O software foi projetado para simplificar a aplicação de tweaks de performance, gerenciamento de configurações e ajustes do sistema operacional, tudo através de uma interface simples e rápida.

---

# Objetivo

O objetivo do FiveOptimizer é permitir que usuários apliquem **otimizações de desempenho em poucos cliques**, evitando a necessidade de realizar configurações manuais complexas no Windows, no FiveM e em drivers de GPU.

---

# Funcionalidades

## Sistema de Login e Licenciamento

O aplicativo possui um sistema de autenticação para garantir acesso apenas a usuários licenciados.

Funcionalidades:

- Login com email e senha
- Validação de licença online
- Vinculação de licença ao hardware (HWID)
- Expiração de licença configurável
- Bloqueio de acesso não autorizado

---

## Gerenciamento de Configurações do FiveM

Permite aplicar e gerenciar configurações otimizadas para o FiveM.

Recursos:

- Backup automático das configurações atuais
- Aplicação de configurações otimizadas
- Restauração de configurações anteriores
- Limpeza de cache do FiveM
- Gerenciamento de arquivos de configuração

Arquivos e diretórios normalmente utilizados:

%localappdata%\FiveM\FiveM.app
%appdata%\CitizenFX
Documents\Rockstar Games\GTA V


---

## Otimizações do Windows

O aplicativo aplica ajustes no sistema operacional para melhorar o desempenho em jogos.

Entre as otimizações disponíveis:

- Ativação do modo de desempenho máximo
- Criação ou ativação do plano Ultimate Performance
- Desativação de aplicativos em segundo plano
- Otimização de serviços do Windows
- Ajustes de prioridade de processos

Exemplo de comando utilizado:
powercfg -setactive SCHEME_MIN


---

## Gerenciamento de Aplicativos de Inicialização

O aplicativo permite controlar quais programas iniciam junto com o Windows.

Recursos:

- Listagem de aplicativos de inicialização
- Desativação de programas desnecessários
- Otimização do tempo de boot do sistema

---

## Configurações da GPU NVIDIA

Integração com perfis de configuração da GPU para melhorar o desempenho em jogos.

Ajustes possíveis:

- Configurações de desempenho da GPU
- Otimização de perfis para jogos
- Ajuste de latência e gerenciamento de energia

Integração possível com ferramentas como:

- NVIDIA Profile Inspector
- NVIDIA Control Panel

---

# Interface do Aplicativo

O aplicativo possui duas interfaces principais.

## Tela de Login

Permite autenticação do usuário e validação da licença.

Campos:

- Email
- Senha
- Botão de login

---

## Dashboard Principal

Após autenticação, o usuário acessa o painel principal contendo as funcionalidades:

- Aplicar configuração do FiveM
- Limpar cache do FiveM
- Ativar modo de desempenho máximo
- Aplicar otimizações do Windows
- Configurar GPU
- Gerenciar inicialização de aplicativos

---

# Estrutura do Projeto

Exemplo de organização do projeto:
FiveOptimizer/

App/
Interface
Dashboard
Login

Modules/
FiveMConfig
WindowsTweaks
NvidiaConfig
StartupManager

Security/
LicenseManager
HWID
Authentication

API/
LicenseValidation
UserManagement

---

# Tecnologias Utilizadas

Possíveis tecnologias utilizadas no projeto:

Aplicativo Desktop:

- C#
- Windows Forms ou WPF
- .NET

Backend de autenticação:

- Node.js ou ASP.NET
- API REST

Banco de dados:

- MySQL ou PostgreSQL

---

# Segurança

Para proteger o software contra uso não autorizado, podem ser utilizadas as seguintes técnicas:

- Ofuscação de código
- Verificação de licença online
- Validação de hardware (HWID)
- Proteção contra debugging
- Proteção contra engenharia reversa

---

# Requisitos do Sistema

Sistema operacional:

- Windows 10
- Windows 11

Permissões necessárias:

- Execução como administrador para aplicar otimizações do sistema.

---

# Aviso

Algumas otimizações podem variar de acordo com:

- versão do Windows
- drivers da GPU
- atualizações do FiveM

Recomenda-se sempre manter backups das configurações antes de aplicar alterações.

---

# Licença

Este software é distribuído sob licença comercial.  
O uso sem uma licença válida não é permitido.

---

# Contato

Para suporte, sugestões ou problemas relacionados ao software, entre em contato com o desenvolvedor responsável.
