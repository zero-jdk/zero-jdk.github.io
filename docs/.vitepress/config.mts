import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Zero JDK",
  description: "Reproducible builds by default",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/guide/' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zero-jdk' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/' },
          ]
        }
      ]
    }

  }
})
