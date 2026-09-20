import { SiteConfig, IncomeStream, FAQItem } from '../types';

/**
 * Dynamically synchronizes document title, meta descriptions, and Schema.org JSON-LD
 * without requiring bulky external dependencies.
 */
export const updateDynamicSeo = (
  siteConfig: SiteConfig,
  streams: IncomeStream[],
  faqs: FAQItem[]
): void => {
  if (typeof document === 'undefined') return;

  // 1. Document Title
  if (siteConfig.siteTitle && document.title !== siteConfig.siteTitle) {
    document.title = siteConfig.siteTitle;
  }

  // 2. Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  if (siteConfig.metaDescription) {
    metaDesc.setAttribute('content', siteConfig.metaDescription);
  }

  // 3. Open Graph Tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && siteConfig.siteTitle) {
    ogTitle.setAttribute('content', siteConfig.siteTitle);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && siteConfig.metaDescription) {
    ogDesc.setAttribute('content', siteConfig.metaDescription);
  }

  // 4. Dynamic Schema.org Structured Data (FAQPage + HowTo)
  try {
    let scriptTag = document.getElementById('dynamic-cms-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-cms-structured-data';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    const faqSchemaItems = faqs.slice(0, 5).map(f => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.answer.replace(/[*#]/g, ''),
      }
    }));

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          'name': siteConfig.siteTitle,
          'description': siteConfig.metaDescription,
          'inLanguage': 'ar',
          'keyword': siteConfig.targetKeyword
        },
        {
          '@type': 'FAQPage',
          'mainEntity': faqSchemaItems
        },
        {
          '@type': 'ItemList',
          'name': 'مسارات تحقيق الدخل من الإنترنت المعتمدة 2025',
          'numberOfItems': streams.length,
          'itemListElement': streams.map((s, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'name': s.title,
            'description': s.description
          }))
        }
      ]
    };

    scriptTag.textContent = JSON.stringify(structuredData);
  } catch (e) {
    console.warn('Could not inject dynamic structured data:', e);
  }
};
