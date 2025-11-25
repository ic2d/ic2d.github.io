/**
 * Converte uma data para string legível no formato 'MM de YYYY' (e.g. Novembro de 2012).
 * 
 * @param date data a ser convertida.
 * @returns Uma string contendo a data no formato 'MM de YYYY'.
 */
export function get_MM_YYYY_string(date: Date): string{
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }).replace(/^./u, (c) => c.toUpperCase());
}// get_MM_YYYY_string

/**
 * Obtém um inteiro representando o ano da data informada (e.g. 2025).
 * @remakrs
 * Usado para geração automática das seções das premiações.
 * 
 * @param date data a ser convertida.
 * @returns Um inteiro contendo o valor do ano atual.
 */
export function get_YYYY_from_date(date: Date): number{
    return Number.parseInt(date.toLocaleDateString("pt-BR", {year: "numeric" }));
}// get_MM_YYYY_string

/**
 * Gera um mapa de cores atribuindo uma cor HSL distinta para cada área.
 *
 * Cada área no array de entrada é mapeada para uma cor única, variando o matiz (hue)
 * de forma uniforme ao longo dos 360 graus do círculo cromático. A saturação e a luminosidade
 * são fixadas em 70% e 50%, respectivamente.
 *
 * @param areas - Um array de nomes de áreas para gerar as cores.
 * @returns Um objeto que mapeia cada nome de área para sua respectiva cor HSL.
 */
export function generate_color_map(areas: string[]): Record<string, string> {
  const colorMap: Record<string, string> = {};
  const count = areas.length;

  areas.forEach((area, i) => {
    const hue = Math.round((360 / count) * i);
    const color = `hsl(${hue}, 70%, 50%)`;
    colorMap[area] = color;
  });

  return colorMap;
}// generate_color_map