# Guia de Estilo do Projeto

## Convenções de Código
- **TypeScript:** obrigatório em arquivos `.ts` e interfaces.
- **Nomenclatura:**
    - Componentes: `PascalCase.astro`
    - Funções/variáveis: `snake_case`
    - Interfaces/types: `PascalCase`
- **Imports:** caminhos relativos curtos ou aliases configurados em `astro.config.mjs` e `tsconfig.json`:
    - `@assets/*` → `src/assets/*`
    - `@components/*` → `src/components/*`
    - `@layouts` → `src/layouts`
    - `@scripts/*` → `src/scripts/*`
    - `@styles/*` → `src/styles/*`
    - `@db` → `src/assets/db`

## Commits
- Seguir [Conventional Commits](https://www.conventionalcommits.org/):
    - `feat: nova funcionalidade`
    - `fix: correção de bug`
    - `docs: alteração de documentação`
    - `refactor: modificação no código sem adicionar/remover funcionalidades`
    - `style: alteração de estilos`

## CSS
- Usar `src/styles/global.css` para estilos globais.
- Componentes devem preferir estilos encapsulados no componente `.astro`.
- Nome de classes: padrão `kebab-case`.

## Organização de Código
- Componentes pequenos e reutilizáveis em `/ui`.
- Componentes maiores (blocos de página) em `/blocks`.
