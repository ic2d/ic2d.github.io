import { parse } from 'csv-parse/sync';
import fs from 'fs';

import type { 
    SocialMedia, 
    Professor, 
    Student, 
    Project, 
    Publication, 
    Partner, 
    Award,
    AnnualAwards,
    Colaborator
} from '@scripts/interfaces';

import { get_YYYY_from_date } from '@scripts/utils';
/* =============================================================================================== */

/**
 * Retorna uma matriz de strings com os dados de uma tabela salva em formato .tsv.
 * 
 * A função lê o arquivo.tsv e converte as linhas e colunas em uma matriz de strings.
 * Sendo usada para ler os arquivos que compõem a base de dados do programa.
 * 
 * @param file_path caminho para o arquivo.tsv.
 * @returns uma matriz de strings com os dados da tabela.
 */
export function parse_tsv_file(file_path: string): string[][]{
    const raw_file = parse(
        fs.readFileSync(file_path, 'utf8'),{
        delimiter:'\t',
        skip_empty_lines: true,
        autoParseDate: true,
    });

    return raw_file;
}// parse_tsv_file

/* =============================================================================================== */

/**
 * Retorna os índices da coluna "Associação" e da coluna correspondente de redes sociais
 * a partir do array de cabeçalhos fornecido.
 *
 * A função procura o índice da coluna "Associação" no cabeçalho.
 * Se encontrado, retorna uma tupla contendo o índice de "Associação" e o índice
 * quatro posições após ela (assumido como sendo a coluna de redes sociais).
 * Se "Associação" não for encontrada, retorna [null, null].
 *
 * @param header - Um array de strings representando os nomes das colunas do cabeçalho.
 * @returns Uma tupla contendo o índice da coluna "Associação" e o índice da coluna de redes sociais,
 *          ou [null, null] se "Associação" não estiver presente.
 */
function get_reference_columns(header: string[]): [(number | null), (number | null)] {
    const membership_column = header.indexOf("Associação");
    if (membership_column == -1) return [null, null]; 

    const social_media_column = membership_column+4;
    return [membership_column, social_media_column];
}// get_reference_columns

/* =============================================================================================== */

/**
 * Retorna os nomes das redes sociais a partir do cabeçalho de uma tabela.
 *
 * @param header - Array de strings representando o cabeçalho da tabela.
 * @param social_media_column - Índice da coluna onde começam os nomes das redes sociais.
 * @returns Um array contendo os nomes das redes sociais extraídos do cabeçalho.
 */
function get_social_media_names(header: string[], social_media_column: number): string[]{
    const social_media_names = header.slice(social_media_column);
    return social_media_names;
}// get_social_media_names

/* =============================================================================================== */

/**
 * Extrai informações sobre associação e redes sociais a partir dos cabeçalhos fornecidos.
 *
 * @param reference_header - O cabeçalho de separação das diferentes seções nas colunas de dados 
 * (ex: dados gerais, membership, redes sociais).
 * @param header - O cabeçalho atual do arquivo, contendo os nomes das colunas presentes.
 * @returns Uma tupla contendo:
 *   - O índice da coluna de associação (membership), ou `null` se não encontrado.
 *   - O índice da coluna de redes sociais (social media), ou `null` se não encontrado.
 *   - Um array com os nomes das mídias sociais extraídos do cabeçalho.
 *
 * Se algum dos parâmetros for `undefined` ou se as colunas de referência não forem encontradas,
 * retorna `[null, null, []]`.
 */
function extract_membership_and_social_media_info(reference_header: string[] | undefined, header: string[] | undefined)
    : [number | null, number | null, string[]] {
    if (reference_header == undefined || header == undefined) return [null, null, []];

    /* Encontrando a colunas de associação e redes sociais */
    const [membership_column, social_media_column] = get_reference_columns(reference_header);
    if (membership_column == null || social_media_column == null) return [null, null, []];

    /* Extraindo o nome das mídias sociais */
    const social_media_names = get_social_media_names(header, social_media_column);

    return [membership_column, social_media_column, social_media_names];
}// extract_membership_and_social_media_info

/* =============================================================================================== */

/**
 * Extrai e retorna uma lista de objetos SocialMedia a partir de uma linha de dados.
 *
 * @param data_line - Array de strings representando uma linha de dados, onde cada elemento é uma coluna.
 * @param social_media_names - Array de nomes das mídias sociais a serem extraídas.
 * @param social_media_column - Índice da coluna inicial das mídias sociais em `data_line`.
 * @returns Um array de objetos SocialMedia, cada um contendo o nome e a URL correspondente da mídia social.
 */
function get_social_media_links(data_line: string[], social_media_names: string[], social_media_column: number): SocialMedia[]{
    /* Extraindo as mídias sociais */
    const sm_links = data_line.slice(social_media_column);
    let social_media_list: SocialMedia[] = []
    for(let i=0; i < social_media_names.length; i++){
        let new_social_media: SocialMedia = {
            name: social_media_names[i],
            url: sm_links[i]
        };
        social_media_list.push(new_social_media);
    }// for i
    return social_media_list;
}// get_social_media_links

/* =============================================================================================== */

/**
 * Converte uma matriz de dados brutos de professores em uma lista de objetos `Professor`.
 * 
 * Este método extrai informações sobre associação e redes sociais das primeiras duas linhas da matriz,
 * e então processa cada linha restante para construir um objeto representando um professor,
 * incluindo título acadêmico, nome, áreas de pesquisa, imagem, status de associação e redes sociais.
 * 
 * @param raw Matriz de strings contendo os dados brutos dos professores, onde cada linha representa um professor.
 * @returns Um array de objetos `Professor` com os dados estruturados. Retorna um array vazio se as colunas necessárias 
 * não forem encontradas.
 */
export function parse_professors(raw: string[][]): Professor[]{
    /* Encontrando a colunas de associação e redes sociais */
    const [membership_column, social_media_column, social_media_names] = extract_membership_and_social_media_info(raw[0], raw[1]);
    if(membership_column == null || social_media_column == null) return []; 
    
    let result: Professor[] = [];
    for(let line of raw.splice(2)){
        /* Extraindo as mídias sociais do professor */
        let sm: SocialMedia[] = get_social_media_links(line, social_media_names, social_media_column);

        /* Extraindo os demais dados e estruturando um objeto representando o professor */
        let new_professor: Professor = {
            academic_title: line[0],
            name: line[1],
            research_areas: line[2].split(','),
            img_src: line[3],
            membership: {
                status: line[membership_column],
                start_date: line[membership_column+1],
                end_date: line[membership_column+2],
                role: line[membership_column+3],
            },
            social_media: sm
        };// new_professor

        result.push(new_professor);
    }// for line

    return result;
}// parse_professors

/* =============================================================================================== */

/**
 * Converte uma matriz de dados brutos de estudantes em uma lista de objetos `Student`.
 * 
 * Este método identifica as colunas de associação e redes sociais, extrai os dados relevantes
 * de cada estudante, e estrutura cada linha em um objeto do tipo `Student`, incluindo informações
 * de associação e links de redes sociais.
 * 
 * @param raw Matriz de strings representando os dados brutos dos estudantes.
 * @returns Um array de objetos `Student` com os dados estruturados. Retorna um array vazio se as colunas 
 * necessárias não forem encontradas.
 */
export function parse_students(raw: string[][]): Student[]{
    /* Encontrando a colunas de associação e redes sociais */
    const [membership_column, social_media_column, social_media_names] = extract_membership_and_social_media_info(raw[0],raw[1]);
    if(membership_column == null || social_media_column == null) return []; 
    
    let result: Student[] = [];
    for(let line of raw.splice(2)){
        /* Extraindo as mídias sociais do aluno */
        let sm: SocialMedia[] = get_social_media_links(line, social_media_names, social_media_column);

        /* Extraindo os demais dados e estruturando um objeto representando o aluno */
        let new_student: Student = {
            name: line[0],
            academic_level: line[1],
            img_src: line[2],
            membership: {
                status: line[membership_column],
                start_date: line[membership_column+1],
                end_date: line[membership_column+2],
                role: line[membership_column+3],
            },
            social_media: sm
        };// new_student

        result.push(new_student);
    }// for line

    return result;
}// parse_students

/* =============================================================================================== */

/**
 * Converte uma matriz de dados brutos dos colaboradores em uma lista de objetos `Colaborator`.
 * 
 * Este método identifica as colunas de associação e redes sociais, extrai os dados relevantes
 * de cada estudante, e estrutura cada linha em um objeto do tipo `Student`, incluindo informações
 * de associação e links de redes sociais.
 * 
 * @param raw Matriz de strings representando os dados brutos dos estudantes.
 * @returns Um array de objetos `Student` com os dados estruturados. Retorna um array vazio se as colunas 
 * necessárias não forem encontradas.
 */
export function parse_colaborators(raw: string[][]): Colaborator[]{
    /**
     * Encontrando as informações das mídias sociais.
     * ? Difere dos demais membros, por não ter dados completos de associação (data de entrada/saída).
     * ! Caso altere as colunas, é necessário alterar a constante.
    */
    const social_media_column = 5;
    const social_media_names = get_social_media_names(raw[1], social_media_column);

    let result: Colaborator[] = [];
    /* Encontrando a colunas de associação e redes sociais */
    for(let line of raw.splice(2)){
        /* Extraindo as mídias sociais do aluno */
        let sm: SocialMedia[] = get_social_media_links(line, social_media_names, social_media_column);

        /* Extraindo os demais dados e estruturando um objeto representando o aluno */
        let new_colaborator: Colaborator = {
            name: line[0],
            organization: line[1],
            img_src: line[2],
            membership_status: line[3],
            type: line[4],            
            social_media: sm
        };// new_student

        result.push(new_colaborator);
    }// for line

    return result;
}// parse_colaborators

/* =============================================================================================== */

/**
 * Converte uma matriz 2D de dados brutos de projetos em um array de objetos `Project`.
 * Assume que a primeira linha contém os cabeçalhos e a ignora.
 * Cada projeto deve conter as seguintes colunas:
 * - status: string
 * - name: string
 * - professors: string separado por vírgulas
 * - research_areas: string separado por vírgulas
 * - description: string
 *
 * @param raw - Matriz 2D de dados brutos dos projetos, onde cada array interno representa uma linha.
 * @returns Um array de objetos `Project`.
 */
export function parse_projects(raw: string[][]): [Project[], Set<string>]{
    let projects: Project[] = [];
    let research_areas: Set<string> = new Set<string>;
    for(let line of raw.splice(1)){
        line[3].split(', ').forEach(area => area? research_areas.add(area.trim()): null);

        let new_project: Project = {
            status: line[0],
            name: line[1],
            professors: line[2].split(', '),
            research_areas: line[3].split(', '),
            description: line[4]
        };
        projects.push(new_project);
    }// for line

    return [projects, research_areas];
}// parse_projects

/* =============================================================================================== */

/**
 * Converte uma matriz 2D de dados brutos das publicações do grupo em um array de objetos `Publication`.
 * Assume que a primeira linha contém os cabeçalhos e a ignora.
 * Cada publicação deve conter as seguintes colunas:
 * - title: string
 * - authors: string separado por vírgulas
 * - research_areas: string separado por vírgulas
 * - type: string
 * - publication_medium: string
 * - pub_date: string com formato YYYY[-MM[-DD]]
 * - gls_url: string url do Google Scholar
 * - url: string url externa
 * - doi: string
 *
 * @param raw - Matriz 2D de dados brutos das publicações, onde cada array interno representa uma linha.
 * @returns Um array de objetos `Publication`.
 */

export function parse_publications(raw: string[][]): [Publication[], Set<string>]{
    let publications: Publication[] = [];
    let research_areas: Set<string> = new Set<string>;
    for(let line of raw.splice(1)){
        line[2].split(',').forEach(area => area? research_areas.add(area.trim()): null);
        
        let new_pub: Publication = {
            title: line[0],
            authors: line[1].split(', '),
            research_areas: line[2].split(', '),
            type: line[3],
            publication_medium: line[4],
            pub_date: new Date(line[5]),
            gs_url: line[6],
            url: line[7],
            doi: line[8]
        };
        publications.push(new_pub);
    }// for line

    // Ordena por data de publicação - da mais recente à mais antiga
    publications = publications.toSorted((a, b) =>  b.pub_date.getTime() - a.pub_date.getTime());
    return [publications, research_areas];
}// parse_publications

/* =============================================================================================== */

/**
 * Converte uma matriz 2D de dados brutos das entidades parceiras do grupo em um array de objetos `Partner`.
 * Assume que a primeira e segunda linha contém os cabeçalhos e a ignora.
 * Cada publicação deve conter as seguintes colunas:
 * - name: string
 * - url: string url externa
 *
 * @param raw - Matriz 2D de dados brutos das publicações, onde cada array interno representa uma linha.
 * @returns Um array de objetos `Publication`.
 */
export function parse_partners(raw: string[][]): Partner[]{
    let partners: Partner[] = [];
    for(let line of raw.splice(2)){
        let new_partner: Partner = {
            name: line[0],
            abbreviation: line[1],
            url: line[2]
        };
        partners.push(new_partner);
    }// for line

    return partners;
}// parse_partners

/* =============================================================================================== */

/**
 * Gera uma lista de premiações agrupadas por ano, desde o ano atual até o ano de criação
 * do grupo (2020).
 * 
 * @param awards - Array de objetos `Award` a serem organizados.
 * @returns Array de objetos `AnnualAwards`, cada um contendo o ano e as premiações daquele ano.
 * Apenas anos com premiações são incluídos.
 */
function generate_yearly_awards_list(awards: Award[]): AnnualAwards[] {
    const awardsByYear: AnnualAwards[] = [];
    const current_date = new Date();
    const current_year = get_YYYY_from_date(current_date);

    for (let year = current_year; year >= 2020; year--) {
        const start_of_year = new Date(`${year}-01-01`).getTime();
        const start_of_next_year = new Date(`${year + 1}-01-01`).getTime();

        const awardsInYear = awards.filter(
            award => award.date.getTime() >= start_of_year && award.date.getTime() < start_of_next_year
        );

        awardsByYear.push({
            year: year.toString(),
            awards: awardsInYear
        });
    }// for year

    // Retorna apenas anos com premiações
    return awardsByYear.filter(item => item.awards.length > 0);
}// generate_yearly_awards_list

/**
 * Converte uma matriz 2D de dados brutos das premiações em um array de objetos `Awards` e 
 * `AnnualAwards` (agrupando as premiações por ano).
 * 
 * A primeira linha da matriz é assumida como cabeçalho e será ignorada.
 * Cada linha deve conter as seguintes colunas:
 * 1. date: string no formato YYYY[-MM[-DD]]
 * 2. description: string com a descrição da premiação
 * 3. members: string com nomes separados por vírgula e espaço
 * 4. url: string contendo URL externa (opcional)
 * 
 * O fluxo da função é:
 * - Converte cada linha em um objeto `Award`
 * - Ordena os objetos do mais recente para o mais antigo
 * - Agrupa os objetos em `AnnualAwards` por ano
 * 
 * @param rawData - Matriz 2D de dados brutos das premiações.
 * @returns Array de `Awards` geral e um array de `AnnualAwards`, contendo o ano e a lista de 
 * premiações daquele ano.
 */
export function parse_awards(rawData: string[][]): [Award[], AnnualAwards[]] {
    let awards: Award[] = [];

    for (const line of rawData.slice(1)) { // Ignora cabeçalhos
        const new_award: Award = {
            date: new Date(line[0]),
            description: line[1],
            members: line[2].split(', '),
            url: line[3]
        };
        awards.push(new_award);
    }

    // Ordena do mais recente para o mais antigo
    awards = awards.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Agrupa por ano e retorna
    return [awards, generate_yearly_awards_list(awards)];
}// parse_awards
