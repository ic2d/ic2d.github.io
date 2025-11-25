/**
 * Informações relacionadas à associação de um indivíduo ao grupo de pesquisa.
 */
export interface Membership {
    /**
     * Status de associação ao grupo de pesquisa.
     * 
     * Valores possíveis: "Ativo" ou "Inativo".
     */
    status: string;

    /**
     * Data de ingresso no grupo de pesquisa, conforme registrado no Diretório de Grupos de Pesquisa (DGP).
     * 
     * Formato recomendado: "YYYY-MM-DD".
     */
    start_date: string;

    /**
     * Data de desligamento do grupo de pesquisa, conforme o DGP.
     * 
     * Campo opcional — deve ser omitido se o membro ainda estiver ativo.
     */
    end_date?: string;

    /**
     * Papel ou função desempenhada pelo indivíduo dentro do grupo.
     * 
     * Exemplos: "Coordenador", "Pesquisador", "Colaborador", "Discente".
     */
    role: string;
}// Membership

/* =============================================================================================== */

/**
 * Representa uma mídia social vinculada a um indivíduo ou organização.
 * 
 * @remarks
 * Utilizada para a geração de ícones clicáveis em interfaces visuais.
 */
export interface SocialMedia {
    /**
     * Nome da plataforma de mídia social.
     * 
     * Exemplos: "LinkedIn", "Lattes", "ResearchGate", "ORCID".
     */
    name: string;

    /**
     * URL completa para o perfil ou página na mídia social especificada.
     */
    url: string;
}// SocialMedia

/* =============================================================================================== */

/**
 * Representa os dados de um(a) professor(a) registrados na base de dados.
 */
export interface Professor {
    /** 
     * Nome completo do(a) professor(a).
     */
    name: string;

    /**
     * Maior título acadêmico obtido.
     * 
     * Exemplos: "Esp.", "M.e", "M.a", "Dr.", "Dr.a".
     */
    academic_title: string;

    /**
     * Lista de áreas de pesquisa nas quais o(a) professor(a) atua.
     */
    research_areas: string[];

    /**
     * Informações sobre a associação atual ou passada do(a) professor(a) ao grupo de pesquisa.
     */
    membership: Membership;

    /**
     * Lista de perfis do(a) professor(a) em mídias sociais acadêmicas e profissionais.
     */
    social_media: SocialMedia[];

    /**
     * Caminho ou URL para a imagem de perfil do(a) professor(a).
     */
    img_src: string;
}// Professor

/* =============================================================================================== */

/**
 * Representa os dados de um(a) aluno(a) registrados na base de dados.
 */
export interface Student {
    /** 
     * Nome completo do(a) aluno(a).
     */
    name: string;

    /**
     * Nível de especialização acadêmica atualmente cursada pelo aluno(a).
     * 
     * @remarks
     * Somente considerado para membros ativos do grupo de pesquisa, devido
     * a necessidade de manutenção das informações.
     * 
     * Exemplos: "Graduação", "Mestrado", "Doutorado".
     */
    academic_level?: string;

    /**
     * Informações sobre a associação atual ou passada do(a) aluno(a) ao grupo de pesquisa.
     */
    membership: Membership;

    /**
     * Lista de perfis do(a) aluno(a) em mídias sociais acadêmicas e profissionais.
     */
    social_media: SocialMedia[];

    /**
     * Caminho ou URL para a imagem de perfil do(a) aluno(a).
     */
    img_src: string;
}// Student

/* =============================================================================================== */

/**
 * Representa os dados de um(a) colaborador(a) registrado na base de dados.
 * 
 * TODO: verificar as demais informações que podem ser adicionadas a esse tipo.
 */
export interface Colaborator {
    /**
     * Nome completo do(a) colaborador(a).
     */
    name: string;

    /**
     * A organização que o colaborador pertence.
     */
    organization: string;

    /**
     * Se o colaborador é externo ou interno à UTFPR.
     */
    type: string;

    /**
     * Informações sobre a associação atual ou passada do(a) colaborador(a) ao grupo de pesquisa.
     */
    membership_status: string;

    /**
     * Lista de perfis do(a) colaborador(a) em mídias sociais acadêmicas e profissionais.
     */
    social_media: SocialMedia[];

    /**
     * Caminho ou URL para a imagem de perfil do(a) colaborador(a).
     */
    img_src: string;
}// Colaborator

/* =============================================================================================== */

/**
 * Representa um projeto desenvolvido pelo grupo de pesquisa.
 * 
 * Esta interface descreve os principais atributos de um projeto desenvolvido pelo grupo de pesquisa, incluindo
 * informações sobre o status, nome, professores envolvidos, áreas de pesquisa e descrição do projeto.
 * 
 * TODO: Verificar a possiblidade de incluir o período em que o projeto se encontra(va) ativo.
 */
export interface Project{
    /**
     * Status atual do projeto.
     * 
     * ? Valores possíveis: "Ativo" ou "Concluído".
     */
    status: string;
    /**
     * Nome completo do projeto.
     */
    name: string;
    /**
     * Lista de professores envolvidos diretamente na execução do projeto.
     */
    professors: string[];
    /**
     * Áreas de pesquisa relacionadas ao projeto em questão.
     * 
     * Utilizado para categorização temática e agrupamento por linhas de pesquisa.
     */
    research_areas: string[];
    /**
     * Descrição resumida sobre o projeto e suas atividades.
     */
    description: string;
}// Project

/* =============================================================================================== */

/**
 * Representa uma publicação científica realizada por membros do grupo de pesquisa.
 * 
 * Esta interface descreve os principais atributos de uma publicação, incluindo informações
 * sobre o título, autores, áreas de pesquisa, meio de divulgação, data de publicação e identificadores digitais.
 */
export interface Publication {
    /**
     * Título completo da publicação.
     */
    title: string;

    /**
     * Lista de nomes dos autores da publicação.
     */
    authors: string[];
    /**
     * Áreas de pesquisa relacionadas ao conteúdo da publicação.
     * 
     * Utilizado para categorização temática e agrupamento por linhas de pesquisa.
     */
    research_areas: string[];

    /**
     * Tipo da publicação.
     * 
     * Exemplos: "Artigo científico", "Resumo expandido", "Capítulo de livro", "Artigo em anais de congresso".
     */
    type: string;

    /**
     * Meio de divulgação da publicação.
     * 
     * Pode incluir o nome da revista, conferência, repositório institucional, entre outros.
     * Exemplo: "Revista Brasileira de Computação", "SBRC 2025", "arXiv", "Scielo".
     */
    publication_medium: string;

    /**
     * Data de publicação.
     * 
     * Formato recomendado na base de dados: "YYYY-MM-DD". Caso a data exata não seja conhecida, trate como YYYY-MM-01.
     */
    pub_date: Date;

    /**
     * DOI (Digital Object Identifier) da publicação, se disponível.
     * 
     * Permite identificação e acesso permanente ao conteúdo digital.
     */
    doi?: string;

    /**
     * Link da publicação no Google Scholar (Google Acadêmico), se disponível.
     * 
     * Pode ser utilizado para rastrear citações, métricas e versões relacionadas.
     */
    gs_url?: string;

    /**
     * URL oficial da publicação.
     * 
     * Pode ser o link direto para o artigo no site da editora, repositório ou página do evento.
     */
    url: string;
}// Publicacao

/* =============================================================================================== */

/**
 * Representa uma entidade parceira.
 * 
 * Esta interface representa uma entidade parceira do grupo de pesquisa, contendo seu nome
 * e links para conectar a página do grupo ao da entidade.
 */
export interface Partner{

    /**
     * O nome da entidade parceira.
     */
    name: string;

    /**
     * Abreviação do nome da entidade ou Sigla correspondente.
     */
    abbreviation: string;

    /**
     * URL oficial da entiddade parceira.
     * 
     * Pode ser o link da página oficial ou algum meio de contato da entidade.
     */
    url: string;
}// Partner

/* =============================================================================================== */

/**
 * Representa um prêmio ou reconhecimento recebido pelo grupo de pesquisa.
 */
export interface Award{
    /**
     * Data em que o prêmio foi concedido.
     */
    date: Date;

    /**
     * Descrição do prêmio ou reconhecimento recebido.
     */
    description: string;

    /**
     * Membros do grupo de pesquisa que participaram ou foram reconhecidos com o prêmio.
     */
    members: string[];

    /**
     * URL oficial relacionada ao prêmio, como a página do evento ou anúncio.
     */
    url?: string;
}// Award

/**
 * Representa as premiações alcançadas pelos membros do grupo em um determinado ano.
 */
export interface AnnualAwards{
    /**
     * Ano de agrupamento das conquistas (formato YYYY).
     */
    year: string;

    /**
     * Lista de conquistas e premiações obtidas no ano.
     */
    awards: Award[];
}// AnnualAwards
/* =============================================================================================== */

/**
 * Representa um item estatístico.
 * 
 * Essa interface representa um item estatístico para o bloco Statistics,
 * representando a quantidade de algum fator relacionado ao grupo de pesquisa.
 * Ex: número de publicações, artigos, membros.
 */
export interface StatisticsItem{
    /**
     * Nome do que está sendo analisado.
     * 
     * Ex: Publicações, Artigos, Membros.
     */
    name:string;

    /**
     * Quantidade de elementos existentes.
     */
    qtde: number;

    /**
     * Nome do arquivo que representa o item estatístico, localizado em `src/assets/icons`.
     */
    img_src: string;
}// StatisticsItem