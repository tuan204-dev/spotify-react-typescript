export default function isEllipsisActive(e: HTMLElement) {
  return e?.offsetWidth < e?.scrollWidth
}
