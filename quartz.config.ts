import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Realms of Resurgence",
    pageTitleSuffix: " - Realms of Resurgence",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "bklaing2.github.io/realms-of-resurgence",
    ignorePatterns: ["[_]*", "**/[_]*", "_Templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Homenaje",
        body: "Baskervville",
        code: "Victor Mono",
      },
      colors: {
        lightMode: {
          light: "hsl(40, 100%, 85.9%)", // background
          lightgray: "hsla(0, 0%, 25.1%, 0.07)",
          gray: "hsla(0, 0%, 25.1%, 0.69)",
          darkgray: "hsla(213.9, 92%, 9.8%, 0.74)", // Note text
          dark: "#021630e0", // headers, sidebar note titles (not folders), table of contents
          secondary: "hsla(205.7, 33.9%, 44.5%, 0.72)", // title, folders, links
          tertiary: "hsl(204.9, 29.3%, 35.5%)", // link hover, selected note in sidebar, highlighting text
          highlight: "transparent", // link highlight
          textHighlight: "transparent",
        },
        darkMode: {
          light: "#09121c", // background
          lightgray: "#ffffff14",
          gray: "hsla(0, 0%, 77.6%, 0.69)",
          darkgray: "hsla(0, 18.6%, 76.9%, 0.97)", // Note text
          dark: "hsla(40.6, 34%, 80.4%, 0.94)", // headers, sidebar note titles (not folders)
          secondary: "hsla(38.4, 62.4%, 67.6%, 0.87)", // title, folders, links
          tertiary: "hsl(38.8, 100%, 50%)", // link hover, selected note in sidebar, highlighting text
          highlight: "transparent", // link highlight
          textHighlight: "transparent",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      // Plugin.FolderPage(),
      // Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
