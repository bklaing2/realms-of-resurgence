const WIKILINK_REGEX = /\[\[.*?\]\]/

export function isWikilink(arg: unknown): arg is string {
  return typeof arg === 'string' && WIKILINK_REGEX.test(arg)
}
