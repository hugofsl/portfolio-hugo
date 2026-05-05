import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SEO({ title, description, url }) {
  const { t } = useTranslation();
  
  const siteTitle = title ? `${title} | Hugo.Lourenço` : t('seo.default_title');
  const siteDesc = description || t('seo.default_desc');
  const siteUrl = url ? `https://hugo-lourenco.web.app${url}` : 'https://hugo-lourenco.web.app';
  
  const ogImage = 'https://hugo-lourenco.web.app/og-image.jpg'; 

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDesc} />
      
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDesc} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}