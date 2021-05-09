import { firebase, FieldValue } from "../lib/firebase"

// check if username already exists
export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get()

  return result.docs.map((user) => user.data().length > 0)
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get()

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }))

  return user
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get()

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }))

  return user
}

// get suggested profiles
export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get()

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    )
}

// add or remove from following array
export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // currently logged in user document id
  profileId, // the user that me requests to follow
  isFollowingProfile // I follow it or not (bool)
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    })
}

// add or remove from followers array
export async function updateFollowedUserFollowers(
  suggestedProfileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(suggestedProfileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    })
}

// get photos
export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get()

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }))

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true
      }

      const user = await getUserByUserId(photo.userId)
      const { username } = user[0]

      return { username, ...photo, userLikedPhoto }
    })
  )

  return photosWithUserDetails
}

export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username)
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", user.userId)
    .get()

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }))
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername)
    .where("following", "array-contains", profileUserId)
    .get()

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }))

  return response.userId
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  // 1st param: logged user doc id
  // 2nd param: profile that the logged user wants to follow
  // 2nd param: is it a follower or followed?
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  )

  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  )
}
