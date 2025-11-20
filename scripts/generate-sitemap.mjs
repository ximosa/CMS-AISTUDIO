import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// --- Configuración ---
const supabaseUrl = 'https://rmdlxyithpfdoemsajcs.supabase.co';
// Usamos la clave de 'anon' que es segura para exponer en el lado del cliente y para leer datos públicos.
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtZGx4eWl0aHBmZG9lbXNhamNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MTU5MjIsImV4cCI6MjA3OTA5MTkyMn0.aHqYIavBaEDCGg-MPI5D2X2T_wbXW7VpQyJ-xmumihI';
const supabase = createClient(supabaseUrl, supabaseKey);

const baseUrl = 'https://ximosa.github.io/CMS-AISTUDIO';
const publicDir = './public';
// --- Fin Configuración ---

async function generateSitemap() {
  console.log('Generando sitemap...');

  try {
    // 1. Obtener posts del blog desde Supabase
    const { data: posts, error } = await supabase
      .from('posts')
      .select('slug, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error al obtener posts de Supabase: ${error.message}`);
    }

    // 2. Definir las páginas estáticas
    const staticPages = [
      { path: '/', priority: '1.00' },
      { path: '/servicios', priority: '0.80' },
      { path: '/sobre-mi', priority: '0.80' },
      { path: '/contacto', priority: '0.80' },
      { path: '/blog', priority: '0.80' },
    ];

    // 3. Construir el XML
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(page => `
  <url>
    <loc>${baseUrl}/#${page.path}</loc>
    <priority>${page.priority}</priority>
    <changefreq>weekly</changefreq>
  </url>`)
    .join('')}
  ${posts
    .map(post => `
  <url>
    <loc>${baseUrl}/#/blog/${post.slug}</loc>
    <lastmod>${new Date(post.created_at).toISOString().split('T')[0]}</lastmod>
    <priority>0.64</priority>
    <changefreq>monthly</changefreq>
  </url>`)
    .join('')}
</urlset>`;

    // 4. Escribir el archivo
    if (!fs.existsSync(publicDir)){
        fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(`${publicDir}/sitemap.xml`, sitemapXml);

    console.log('¡Sitemap generado con éxito!');
    console.log(`Se encontraron ${posts.length} posts dinámicos.`);
    console.log(`Sitemap guardado en ${publicDir}/sitemap.xml`);

  } catch (error) {
    console.error('Error al generar el sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
