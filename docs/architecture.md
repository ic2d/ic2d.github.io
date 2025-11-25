# Arquitetura do Projeto

Este projeto utiliza o **Astro** como framework principal para geração de site estático, com suporte a TypeScript e organização modular de componentes.

## Visão Geral
- **Framework:** [Astro](https://astro.build)
- **Linguagens:** TypeScript, HTML, CSS
- **Estilo:** CSS global + CSS isolado de cada componente
- **Gerenciador de pacotes:** npm
- **Controle de versão:** Git + GitHub
- **Base de dados:** arquivos `.tsv`em `src/assets/db`, baixados da planilha remota no [GoogleSheets](https://docs.google.com/spreadsheets/d/1XloJZJleV3cfxtBuNinAVojrfaJ6Olyv9i_PtyK4mC0/edit?usp=sharing).

## Estrutura de Pastas
- `src/pages/` → Definição de rotas e páginas.
- `src/layouts/` → Layouts globais e templates de página.
- `src/components/` → Componentes reutilizáveis (UI, blocos, etc).
- `src/assets/` → Imagens, ícones, banco de dados estático.
- `src/styles/` → Estilos globais.
- `public/` → Arquivos estáticos servidos diretamente (favicon, imagens públicas, robots.txt).

## Fluxo de Build
1. Desenvolvedor cria páginas e componentes em `.astro` ou `.ts`.
2. O Astro compila em HTML/CSS/JS estático.
3. O resultado vai para `/dist`.
4. O deploy é feito no **GitHub Pages**.

## Integrações
- `csv-parse` para leitura das tabelas`.tsv` que compõem o banco de dados.
- `slugify` para conversão simplificada de nomes em diretórios.
- `jquery` para simplificar a manipulação de elementos HTML.
- `DOMPurify` para sanitização dos dados do formulário de contato.