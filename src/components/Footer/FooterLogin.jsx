import PropTypes from "prop-types"

const links = [
  { id: 1, name: "Información", url: "https://about.instagram.com/" },
  { id: 2, name: "Blog", url: "https://about.instagram.com/blog" },
  {
    id: 3,
    name: "Empleo",
    url: "https://about.instagram.com/about-us/careers",
  },
  { id: 4, name: "Ayuda", url: "https://help.instagram.com/" },
  { id: 5, name: "API", url: "https://www.instagram.com/developer/" },
  {
    id: 6,
    name: "Privacidad",
    url: "https://help.instagram.com/519522125107875",
  },
  {
    id: 7,
    name: "Condiciones",
    url: "https://help.instagram.com/581066165581870",
  },
  {
    id: 8,
    name: "Cuentas destacadas",
    url: "https://www.instagram.com/directory/profiles/",
  },
  {
    id: 9,
    name: "Hashtags",
    url: "https://www.instagram.com/directory/hashtags/",
  },
  {
    id: 10,
    name: "Ubicaciones",
    url: "https://www.instagram.com/explore/locations/",
  },
]
const topics = [
  { id: 1, name: "Belleza", url: "https://www.instagram.com/topics/beauty/" },
  {
    id: 2,
    name: "Danza y espectáculo",
    url: "https://www.instagram.com/topics/dance-and-performance/",
  },
  {
    id: 3,
    name: "Ejercicio físico",
    url: "https://www.instagram.com/topics/fitness/",
  },
  {
    id: 4,
    name: "Comida y bebida",
    url: "https://www.instagram.com/topics/food-and-drink/",
  },
  {
    id: 5,
    name: "Hogar y jardinería",
    url: "https://www.instagram.com/topics/home-and-garden/",
  },
  { id: 6, name: "Música", url: "https://www.instagram.com/topics/music/" },
  {
    id: 7,
    name: "Artes visuales",
    url: "https://www.instagram.com/topics/visual-arts/",
  },
]

export default function FooterLogin({ showTopics = true }) {
  return (
    <footer className="w-full flex flex-col items-center justify-end text-center">
      <div
        clasname="flex 
      "
      >
        {links.map((link) => (
          <a
            key={link.id}
            className="text-gray-base font-light text-xs p-2 "
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
        ))}
      </div>
      {showTopics && (
        <div>
          {topics.map((topic) => (
            <a
              key={topic.id}
              className="text-gray-base font-light text-xs p-2 mb-4"
              href={topic.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {topic.name}
            </a>
          ))}
        </div>
      )}

      <p className="text-gray-base font-light text-xs p-2 mt-4 mb-4">
        Español (España) © 2021 Instagram from Facebook
      </p>
    </footer>
  )
}

FooterLogin.propTypes = {
  showTopics: PropTypes.bool,
}
