import PropTypes from "prop-types"

export default function Picture({ src, caption }) {
  return <img src={src} alt={caption} />
}

Picture.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
}
