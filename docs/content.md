# Gerenciamento de Conteúdo

## Páginas
As páginas estão localizadas em `src/pages/`. Cada arquivo `.astro` corresponde a uma rota:
- `index.astro` → `/`
- `sobre.astro` → `/sobre`
- `membros.astro` → `/membros`
- `publicacoes.astro` → `/publicacoes`
- `publicacoes/[slug].astro` → rotas dinâmicas para os filtros por área de pesquisa → `/publicacoes/area-de-pesquisa`.
- `premiacoes.astro` → `/premiacoes`
- `contato.astro` → `/contato`

### Publicações
- Localizadas em `src/pages/publicacoes/`.
- Rota dinâmica `[slug].astro` gera páginas individuais para o filtro por área de pesquisa.
- O conteúdo vem de (`.tsv` estático em `/assets/db`).

## Banco de Dados
O banco de dado está localizado em `src/assets/db`, sendo composto por uma coletânia de arquivos
`.tsv`, com gerenciamento unificado no arquivo `index.ts`.
- `members/professors.tsv`: tabela contendo os dados dos professores que fazem/fizeram parte do projeto.
- `members/students.tsv`: tabela contendo os dados dos alunos que fazem/fizeram parte do projeto.
- `members/colaborators.tsv`: tabela contendo os dados dos colaboradores que fazem/fizeram parte do projeto.
- `partners.tsv`: tabela contendo os dados das entidades parceiras do grupo de pesquisa.
- `projects.tsv`: tabela contendo os dados dos projetos atuais e passados do grupo de pesquisa.
- `publications.tsv`: tabela contendo os dados das publicações realizadas pelos membros do grupo de pesquisa.
- `awards.tsv`: tabela contendo os dados das premiações obtidas pelo grupo de pesquisa.

## Interfaces
Para as informações do banco de dados, foram configuradas interfaces para organização e tipagem dos dados, melhorando a verificação das informações e facilitando a recuperação dos dados.

As interfaces são definidas em `src/scripts/interfaces.ts`:
- `Membership`: informações referentes à adesão dos membros, no geral, ao grupo de pesquisa.
- `SocialMedia`: links para as mídia social associados ao nome da mídia para geração dos ícones.
- `Professor`: informações de um professore/ex-membro.
- `Student`: informações de um aluno/ex-membro.
- `Project`: informações de um projeto do grupo de pesquisa.
- `Publication`: informações de uma publicação realizada pelo grupo de pesquisa.
- `Partner`: informações de um parceiro do grupo de pesquisa.
- `StatisticsItem`: informações estatísticas sobre o grupo de pesquisa para geração do bloco Statiscts no `src/pages/index.astro`.

## Parsers
Para a importação dos dados do banco de dados estático, composto pelo conjunto de tabelas.tsv, foram desenvolvidos parsers que lêem os dados dos arquivos (`parse_tsv_file`) e convertem os dados para objetos de suas interfaces respectivas.

Os parsers se encontram agrupados em `src/scripts/parsers.ts`.

## Imagens
- Guardadas em `src/assets/imgs/`.
- Ícones em `src/assets/icons/`.

