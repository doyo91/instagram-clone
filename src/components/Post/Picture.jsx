import PropTypes from "prop-types"

export default function Picture({ src, caption, docId }) {
  return <img key={docId} src={src} alt={caption} />
}

Picture.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
}
