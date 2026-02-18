import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/properties.scss"
import { classNames } from "../util/lang"

// @ts-ignore
import script from "./scripts/properties.inline"
import { i18n } from "../i18n"
import OverflowListFactory from "./OverflowList"
import { concatenateResources } from "../util/resources"
import { isWikilink } from "../util/misc"
import { FullSlug, simplifySlug, splitAnchor, stripSlashes, transformLink, TransformOptions } from "../util/path"

interface PropertiesOptions {
  hideWhenEmpty: boolean
  ignoreProperties: string[]
  hideEmptyProperties: boolean
  markdownLinkResolution: TransformOptions["strategy"]
}

const defaultOptions: PropertiesOptions = {
  hideWhenEmpty: true,
  ignoreProperties: [],
  hideEmptyProperties: true,
  markdownLinkResolution: "absolute",
}

let numProps = 0
export default ((opts?: Partial<PropertiesOptions>) => {
  const options: PropertiesOptions = { ...defaultOptions, ...opts }
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()
  const Properties: QuartzComponent = ({
    fileData,
    displayClass,
    cfg,
    ctx,
  }: QuartzComponentProps) => {
    if (!fileData.frontmatter) return null

    const properties = Object.entries(fileData.frontmatter)

    if (options.hideWhenEmpty && properties.length == 0) return null

    const transformOptions: TransformOptions = {
      strategy: options.markdownLinkResolution,
      allSlugs: ctx.allSlugs,
    }
    const curSlug = simplifySlug(fileData.slug!)

    const id = `props-${numProps++}`
    return (
      <div class={classNames(displayClass, "properties")}>
        <button
          type="button"
          class={fileData.collapseProps ? "collapsed props-header" : "props-header"}
          aria-controls={id}
          aria-expanded={!fileData.collapseProps}
        >
          <h3>{i18n(cfg.locale).components.properties.title}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="fold"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <OverflowList
          id={id}
          class={fileData.collapseProps ? "collapsed props-content" : "props-content"}
        >
          {properties.length > 0 ? (
            properties
              .filter(([_, v]) => !options.hideEmptyProperties || !!v)
              .filter(([k]) => !options.ignoreProperties.includes(k))
              .map(([key, value]) => {
                return <li>
                  <span class="key">{key}</span>
                  <Value value={value} />
                </li>
              })
          ) : (
            <li>{i18n(cfg.locale).components.properties.noPropertiesFound}</li>
          )}
        </OverflowList>
      </div>
    )

    function Value(props: { value: unknown }) {
      if (!props.value) return null

      const value = [props.value].flat()

      return <div class="values">
        {value.map(v => {
          if (!isWikilink(v)) return <span class="value">{v}</span>

          let link = v.substring(2, v.length - 2)
          if (link.startsWith("#"))
            return <a href={link.split("|")[0]} class="value internal">{link.split("|")[1]}</a>

          link = transformLink(fileData.slug!, link, transformOptions)
          const url = new URL(link, "https://base.com/" + stripSlashes(curSlug, true))
          const canonicalDest = url.pathname
          let [destCanonical, _destAnchor] = splitAnchor(canonicalDest)
          if (destCanonical.endsWith("/")) destCanonical += "index"

          const full = decodeURIComponent(stripSlashes(destCanonical, true)) as FullSlug
          return <a href={"/" + full} class="value internal" data-slug={full}>{v.substring(2, v.length - 2)}</a>
        })}
      </div>
    }
  }

  Properties.css = style
  Properties.afterDOMLoaded = concatenateResources(script, overflowListAfterDOMLoaded)

  return Properties
}) satisfies QuartzComponentConstructor
