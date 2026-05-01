import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url }) {
  const siteTitle = title ? `${title} | Hugo.Lourenço` : 'Hugo Lourenço | Arquiteto de Fluxos Digitais';
  const siteDesc = description || 'Estrategista e Desenvolvedor. Transformo dados em inteligência e design em experiências memoráveis utilizando React, Firebase e Python.';
  const siteUrl = url ? `https://hugo-lourenco.web.app${url}` : 'https://hugo-lourenco.web.app';
  
  // DICA: Crie uma imagem de 1200x630 pixels com o seu logo/nome, 
  // salve como 'og-image.jpg' na pasta public e o WhatsApp mostrará sua imagem!
  const ogImage = 'https://hugo-lourenco.web.app/og-image.jpg'; 

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDesc} />
      
      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDesc} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}