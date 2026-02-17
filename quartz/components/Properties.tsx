import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/properties.scss"
import { classNames } from "../util/lang"

// @ts-ignore
import script from "./scripts/properties.inline"
import { i18n } from "../i18n"
import OverflowListFactory from "./OverflowList"
import { concatenateResources } from "../util/resources"

interface PropertiesOptions {
  hideEmptyProperties: boolean
}

const defaultOptions: PropertiesOptions = {
  hideEmptyProperties: false
}

let numProps = 0
export default ((opts?: Partial<PropertiesOptions>) => {
  const options: PropertiesOptions = { ...defaultOptions, ...opts }
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()
  const Properties: QuartzComponent = ({
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    if (!fileData.frontmatter) return null

    const properties = Object.entries(fileData.frontmatter)

    if (options.hideWhenEmpty && properties.length == 0) return null

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
              .map(([key, value]) => (
                <li>
                  <span class={!!value ? "" : "span-full"}>{key}</span>
                  {value}
                </li>
              ))
          ) : (
            <li>{i18n(cfg.locale).components.properties.noPropertiesFound}</li>
          )}
        </OverflowList>
      </div>
    )
  }

  Properties.css = style
  Properties.afterDOMLoaded = concatenateResources(script, overflowListAfterDOMLoaded)

  return Properties
}) satisfies QuartzComponentConstructor
