# Site do Grupo de Estudos e Pesquisa iC²D
![Astro](https://img.shields.io/badge/astro-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

Este repositório contém o projeto do site do Grupo de Estudos e Pesquisa em Inteligência Computacional e Ciência de Dados (iC²D), estruturado sob o framework Astro.

## 📦 Requisitos

- [Node.js](https://nodejs.org/) >= v22.19.0
- [npm](https://www.npmjs.com/) >= v10.9.3

## 🧞 Comandos Disponíveis

Todos os comandos são rodados a partir da raiz do projeto, em um terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala as dependências                          |
| `npm run dev`             | Inicia um servidor local em `localhost:4321`     |
| `npm run build`           | Constroi os arquivos de produção em `./dist/`    |
| `npm run preview`         | Vizualização local da build, antes do deploy     |
| `npm run astro ...`       | Rode comandos de CLI como `astro add`, `astro check` |


## 📂 Estrutura do Repositório

O projeto do site está organizado na seguinte estrutura de pastas e arquivos:

```text
/ic2d
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   ├── db
│   │   ├── icons
│   │   └── imgs
│   ├── components
│   │   ├── blocks
│   │   ├── layout
│   │   ├── members
│   │   ├── projects
│   │   ├── publications
│   │   └── ui
│   ├── layouts
│   ├── pages
│   │   ├── publicacoes
│   │   │   └── [slug].astro
│   │   ├── contato.astro
│   │   ├── index.astro
│   │   ├── membros.astro
│   │   ├── premiacoes.astro
│   │   ├── projetos.astro
│   │   ├── publicacoes.astro
│   │   └── sobre.astro
│   ├── scripts
│   │   ├── utils.ts
│   │   ├── interfaces.ts
│   │   └── parsers.ts
│   └── styles
│       └── global.css
├── .gitignore
├── astro.config.mjs
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

> Os arquivos que compõem `.tsv` a base de dados em `src/assets/db` são atualizados e baixados da planilha remota no [Google Sheets](https://docs.google.com/spreadsheets/d/1XloJZJleV3cfxtBuNinAVojrfaJ6Olyv9i_PtyK4mC0/edit?usp=sharing).


## ⚙️ Configuração

Para estabelecer as configurações necessárias para moificar o projeto é necessário:

1. Instalar todos os [requisitos](#-requisitos);
2. Instalar todas as dependências (`package.json`) do projeto através do comando:
```bash
npm install
``` 

Agora basta continuar desenvolvendo, simples assim!

> Obs: caso deseje manter um ambiente controlado, recomendo utilizar o [nvm](https://github.com/nvm-sh/nvm).

## 🚀 Deploy

O projeto desenvolvido é voltado para um site estático. Para o deploy do site, foi configurado uma ação do GitHub Actions que realiza o processo de construção e implantação da nova versão de forma automática. Desse modo, basta:

1. Realizar um `commit` com as novas informações e alterações no site.
2. Verificar na seção `Actions` se o fluxo de construção e implantação da nova versão ocorreu sem problemas.

## 🙋‍♂️ Contribuindo

Para contribuir com o projeto, lembre-se de seguir as práticas do [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## 👀 Quer saber mais?

- [Como atualizar a base de dados?](./docs/how-to-db.md)
- [Como adaptar a seção de estatísticas?](./docs/how-to-statistics.md)
- [Documentação do Projeto](./docs)
- [Documentação do Astro](https://docs.astro.build)
