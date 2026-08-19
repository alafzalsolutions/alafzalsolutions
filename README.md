# Static site starter

A clean, framework-free foundation built with semantic HTML, one shared stylesheet, and a small vanilla-JavaScript menu toggle. All visible copy is intentionally marked as a placeholder.

## Structure

```text
.
├── assets/
│   ├── css/styles.css          # Central theme variables and responsive styles
│   └── js/main.js              # Mobile navigation toggle
├── blog/
│   ├── index.html              # Article listing placeholders
│   └── article-template.html   # CMS-ready single article structure
├── index.html                  # Home
├── about.html
├── contact.html                # Form structure; no backend configured
├── tools.html                  # Future tool and technology-roadmap placeholders
├── privacy.html
├── terms.html
├── 404.html
├── robots.txt
└── sitemap.xml
```

## Local preview

Open `index.html` in a browser, or serve this directory with any static-file server. No dependencies or build step are required.

## Before publishing

1. Replace every `[Placeholder: ...]` value with approved content.
2. Replace `https://example.com` in canonical, Open Graph, sitemap, and robots URLs with the production domain.
3. Set the contact form `action` to the chosen form provider, backend endpoint, or `mailto:` destination.
4. Add real blog articles and include each published article in `sitemap.xml`. Keep `blog/article-template.html` out of the sitemap until it becomes a real article.
5. Add an Open Graph image and its `og:image` metadata once brand assets exist.

## Future framework migration

When moving to Astro or another framework, map the repeated header and footer into a shared layout component, retain `assets/css/styles.css` as the initial global stylesheet, and convert `blog/article-template.html` into the CMS-backed article route.
