import {
    parse_tsv_file,
    parse_professors,
    parse_projects,
    parse_students,
    parse_publications,
    parse_partners,
    parse_awards,
    parse_colaborators
} from '@scripts/parsers';

import type {
    Professor,
    Student, 
    Colaborator,
    Partner, 
    Project, 
    Award,
    AnnualAwards,
    StatisticsItem 
} from '@scripts/interfaces';

import { generate_color_map } from '@scripts/utils';

/**
 * Lista de professores, carregada a partir do TSV em `src/assets/db/members/professors.tsv`.
 */
const professors: Professor[] = parse_professors(
    parse_tsv_file('src/assets/db/members/professors.tsv')
);

/**
 * Lista de estudantes, carregada do TSV em `src/assets/db/members/students.tsv`.
 */
const students: Student[] = parse_students(
    parse_tsv_file('src/assets/db/members/students.tsv')
);

/**
 * Lista de colaboradores externos.
 */
const colaborators: Colaborator[] = parse_colaborators(
    parse_tsv_file('src/assets/db/members/colaborators.tsv')
);

/**
 * Lista de instituições/parceiros, carregada de `src/assets/db/partners.tsv`.
 */
const partners: Partner[] = parse_partners(
    parse_tsv_file('src/assets/db/partners.tsv')
);

/**
 * Projetos de pesquisa e suas respectivas áreas.
 * - `[0]` → lista de projetos (`Project[]`)
 * - `[1]` → conjunto de áreas de pesquisa (`Set<string>`)
 */
const [projects, projects_research_areas]: [Project[], Set<string>] = parse_projects(
    parse_tsv_file('src/assets/db/projects.tsv')
);

/**
 * Publicações e suas respectivas áreas de pesquisa.
 * - `[0]` → lista de publicações
 * - `[1]` → conjunto de áreas de pesquisa
 */
const [publications, publications_research_areas] = parse_publications(
    parse_tsv_file('src/assets/db/publications.tsv')
);

/**
 * Conjunto total de áreas de pesquisa do grupo,
 * unindo as áreas vindas de projetos e publicações.
 */
const research_areas = Array.from(
    projects_research_areas.union(publications_research_areas)
).sort();

/**
 * Mapa de cores das áreas de pesquisa.
 */
const ra_color_map = generate_color_map(research_areas);

/**
 * Prêmios e reconhecimentos, carregados do mesmo arquivo de publicações.
 */
const [awards, annual_awards]: [Award[], AnnualAwards[]] = parse_awards(
    parse_tsv_file('src/assets/db/awards.tsv')
);

/**
 * Itens estatísticos para exibição no bloco Statistics.
 * Caso necessário basta adicionar novos componentes ou comentar os existentes para
 * removê-los a exibição.
 */
const statistics_itens: StatisticsItem[] = [
    { 
        name: "Publicações", 
        qtde: publications.length, 
        img_src: "Publicacoes" 
    },
    { 
        name: "Artigos", 
        qtde: publications.filter(pub => pub.type == "Artigo").length, 
        img_src: "Artigos" 
    },
    { 
        name: "Anais de Eventos", 
        qtde: publications.filter(pub => pub.type == "Anais").length, 
        img_src: "Anais" 
    },
    { 
        name: "Membros", 
        qtde: professors.filter(prof => prof.membership.status == "Ativo").length + 
                students.filter(student => student.membership.status == "Ativo").length, 
        img_src: "Membros" 
    }
];

export {
    professors,
    students,
    colaborators,
    partners,
    projects,
    publications,
    awards,
    annual_awards,
    research_areas,
    ra_color_map,
    statistics_itens
};