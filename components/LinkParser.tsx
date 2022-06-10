export default function LinkParser({ link }: { link: string }) {
  if (link.includes('github')) {
    return (
      <a href={link} target="_blank" rel="noreferrer">
        <i className="bx bxl-github"></i>
        Github repo
      </a>
    )
  } else if (link.includes('vercel') || link.includes('grimfeld.tech')) {
    return (
      <a href={link} target="_blank" rel="noreferrer">
        <i className="bx bx-play-circle"></i>
        Live app
      </a>
    )
  }
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <i className="bx bxl-link"></i>
      Link
    </a>
  )
}
