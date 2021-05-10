import PropTypes from "prop-types"
import { useContext, useState } from "react"
import FirebaseContext from "../../context/firebase"
import UserContext from "../../context/user"

export default function AddComments({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const {
    user: { displayName },
  } = useContext(UserContext)
  const { firebase, FieldValue } = useContext(FirebaseContext)

  const [comment, setComment] = useState("")

  const handleSubmitComment = (event) => {
    event.preventDefault()

    // new array, put the new comment and add the old comments
    setComments([...comments, { displayName, comment }])
    setComment("")

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      })
  }

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          type="text"
          aria-label="Añadir comentario"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          name="add-comment"
          placeholder="Añade un comentario..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Publicar
        </button>
      </form>
    </div>
  )
}

AddComments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
}
