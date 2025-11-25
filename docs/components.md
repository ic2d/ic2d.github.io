# Convenções de Componentes

> Obs: Tags `<slot/>` representam a região onde o conteúdo colocado entre as tags do componente, `<Component> ... </Component>`, será adicionado.

## Estrutura
- `src/components/ui/`
  - Botões, inputs, elementos básicos reutilizáveis.
- `src/components/blocks/`
  - Componentes complexos, como carroseis, seções de texto, formulários.
- `src/components/layout/`
  - Layouts globais (header, footer, sidebar).
- `src/components/members/`, `src/components/publications/` etc.
  - Componentes especializados, ligados ao domínio do projeto.

## Boas Práticas
- Props documentadas em comentários no topo do componente, quando aplicável.
- Evitar duplicação: se o mesmo padrão visual aparecer em mais de duas páginas, considerar transformá-lo em componente.
- Atualizar sempre o `index.ts` de cada pasta de componentes, para simplificar a importação dos mesmos.

## Exemplo de Documentação de Props
```ts
---
/**
 * Card de membro do grupo.
 * @prop name {string} Nome do membro
 * @prop role {string} Cargo/função
 * @prop image {string} URL da foto
 */
const { name, role, image } = Astro.props;
---
```