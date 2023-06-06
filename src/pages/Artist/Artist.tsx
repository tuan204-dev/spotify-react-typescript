interface ArtistProps {
  children?: React.ReactNode
}

const Artist: React.FC<ArtistProps> = (props) => {

  const {children} = props

  return (
    <div>Artist</div>
  )
}

export default Artist


