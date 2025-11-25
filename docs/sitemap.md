# Sitemap - iC2D

```mermaid
%% Sitemap do site do grupo de pesquisa - versão hierárquica
%% Renderize em um preview que suporte Mermaid (VSCode, GitHub, Mermaid Live Editor etc.)

graph LR
  %% ===== NÓS PRINCIPAIS =====
  Home["🏠 Home"]
  Sobre["ℹ️ Sobre"]
  Membros["👥 Membros"]
  Projetos["🧩 Projetos"]
  Publicacoes["📚 Publicações"]
  Premiacoes["🏆 Premiações"]
  Contato["✉️ Contato"]

  %% ===== ESTRUTURA HIERÁRQUICA =====
  Home --> Sobre
  Home --> Membros
  Home --> Projetos
  Home --> Publicacoes
  Home --> Premiacoes
  Home --> Contato

  %% ===== NÍVEL SECUNDÁRIO =====
  Publicacoes --> PublicacoesFiltradas["🔍 Publicações Filtradas / Por Área de Pesquisa"]

  %% ===== ESTILOS GLOBAIS =====
  classDef home fill:#3fc1c9,stroke:#2a9d8f,color:#fff,font-weight:bold;
  classDef principal fill:#a8dadc,stroke:#457b9d,stroke-width:2px,color:#000,font-weight:bold;
  classDef secundario fill:#d8f3dc,stroke:#74c69d,stroke-width:1.5px,color:#000;

  %% ===== APLICAÇÃO DE CLASSES =====
  class Home home;
  class Sobre,Membros,Projetos,Publicacoes,Premiacoes,Contato principal;
  class PublicacoesFiltradas secundario;
  ```