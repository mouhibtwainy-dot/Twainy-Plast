// Split an "Arabic … English" caption into separately-directed lines so bidi text doesn't scramble
export function splitBilingual(text: string): string[] {
  const m = /[؀-ۿ][^A-Za-z]*?\s(\*?[A-Z][a-z])/.exec(text)
  if (!m || !/^[^A-Za-z]*[؀-ۿ]/.test(text)) return [text]
  const at = m.index + m[0].length - m[1].length
  return [text.slice(0, at).trim(), text.slice(at).trim()]
}
