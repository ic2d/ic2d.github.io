// @ts-check
import { defineConfig } from 'astro/config';
import path from 'node:path';
import sitemap from '@astrojs/sitemap';

/**
 * Configuração principal do Astro.
 * 
 * Aqui personalizamos o Vite (bundler interno do Astro) para adicionar
 * aliases de importação. Isso facilita e organiza os imports no código,
 * evitando caminhos relativos longos como ../../../components.
 * 
 * Aliases definidos:
 *   - '@assets' → aponta para 'src/assets'
 *   - '@components' → aponta para 'src/components'
 *   - '@layouts' → aponta para 'src/layouts'
 *   - '@scripts' → aponta para 'src/scripts'
 *   - '@styles' → aponta para 'src/styles'
 *   - '@db': → aponta para 'src/assets/db'
 * 
 * Obs.: se usar TypeScript, lembre de também configurar esses paths no tsconfig.json
 * para o editor/TS entender os aliases.
 *
 * Doc: https://astro.build/config
 */
export default defineConfig({
    vite:{
        resolve: { 
            alias: { 
                '@assets': path.resolve('./src/assets'),
                '@components': path.resolve('./src/components'),
                '@layouts': path.resolve('./src/layouts'),
                '@scripts': path.resolve('./src/scripts'),
                '@styles': path.resolve('./src/styles'),
                '@db': path.resolve('./src/assets/db'),
            }// alias
        }// resolve
    },// vite
    site: "https://ic2d.github.io",
    integrations: [sitemap()],
});
