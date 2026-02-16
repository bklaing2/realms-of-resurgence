import matter from "gray-matter"
import remarkFrontmatter from "remark-frontmatter"
import { QuartzTransformerPlugin } from "../types"
import yaml from "js-yaml"
import toml from "toml"
import { FullSlug, SimpleSlug, simplifySlug, splitAnchor, stripSlashes, transformLink, TransformOptions } from "../../util/path"

const WIKILINK_REGEX = /\[\[.*?\]\]/

interface Options {
  delimiters: string | [string, string]
  language: "yaml" | "toml"
  /** How to resolve Markdown paths */
  markdownLinkResolution: TransformOptions["strategy"]
}

const defaultOptions: Options = {
  delimiters: "---",
  language: "yaml",
  markdownLinkResolution: "absolute",
}

export const FrontMatterLinks: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "FrontMatterLinks",
    markdownPlugins(ctx) {
      return [
        [remarkFrontmatter, ["yaml", "toml"]],
        () => {
          return (_, file) => {
            const fileData = Buffer.from(file.value as Uint8Array)
            const { data } = matter(fileData, {
              ...opts,
              engines: {
                yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
                toml: (s) => toml.parse(s) as object,
              },
            })

            const curSlug = simplifySlug(file.data.slug!)
            const links: Set<SimpleSlug> = new Set(file.data.links || [])

            const transformOptions: TransformOptions = {
              strategy: opts.markdownLinkResolution,
              allSlugs: ctx.allSlugs,
            }

            for (let link of Object.values(data).flat()) {
              if (typeof link !== 'string' || !WIKILINK_REGEX.test(link)) continue

              link = link.substring(2, link.length - 2)
              link = transformLink(file.data.slug!, link, transformOptions)
              const url = new URL(link, "https://base.com/" + stripSlashes(curSlug, true))
              const canonicalDest = url.pathname
              let [destCanonical, _destAnchor] = splitAnchor(canonicalDest)
              if (destCanonical.endsWith("/")) destCanonical += "index"

              const full = decodeURIComponent(stripSlashes(destCanonical, true)) as FullSlug
              links.add(simplifySlug(full))
            }

            file.data.links = [...links]
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    links: SimpleSlug[]
  }
}
