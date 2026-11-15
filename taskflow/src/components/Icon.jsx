const paths = {
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  check: 'm5 12 4 4L19 6', tasks: 'M9 5h12M9 12h12M9 19h12M3 5h.01M3 12h.01M3 19h.01',
  folder: 'M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z',
  search: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z', plus: 'M12 5v14M5 12h14',
  clock: 'M12 8v4l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
  sun: 'M12 3V1M12 23v-2M3 12H1M23 12h-2M4 4 2 2M18 18l2 2M4 20l2-2M18 6l2-2M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  moon: 'M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z', settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM10 2h4l1 3 3-1 3 3-1 3 2 1v4l-3 1 1 3-3 2-3-1-1 2h-4l-1-3-3 1-2-3 1-3-2-1v-4l3-1-1-3 3-2 3 1Z',
  edit: 'm16 3 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14Z', trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7',
  close: 'm6 6 12 12M6 18 18 6', arrow: 'M5 12h14m-5-5 5 5-5 5', chart: 'M4 3v18h17M8 16v-4M13 16V8M18 16V5',
  download: 'M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4', flag: 'M5 22V3c5-4 9 4 14 0v10c-5 4-9-4-14 0', menu: 'M3 6h18M3 12h18M3 18h18',
}
export default function Icon({ name, size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.tasks} /></svg>
}
