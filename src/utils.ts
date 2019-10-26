
export function parseCSSText(cssText: string) {
  const cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, " ").replace(/\s+/g, " ")
  const style: any = {}
  const rule = (cssTxt.match(/ ?(.*?) ?{([^}]*)}/) || [])[2] || cssTxt
  const cssToJs = (s: string) => s.replace(/\W+\w/g, match => match.slice(-1).toUpperCase())
  const properties = rule.split(";").map(o => o.split(":").map(x => x && x.trim()))
  // eslint-disable-next-line no-restricted-syntax
  for (const [property, value] of properties) style[cssToJs(property)] = value
  return style
}