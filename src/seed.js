// NOTE: replace 'QgiDOlbyumVc0iItclkEdHZG7kN2' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
  const firebaseAuthUserId = "QgiDOlbyumVc0iItclkEdHZG7kN2"
  const users = [
    {
      userId: firebaseAuthUserId,
      username: "doyo",
      fullName: "Sam G",
      emailAddress: "doyo@test.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "li",
      fullName: "Li Xun Un",
      emailAddress: "li@test.com",
      following: [],
      followers: [firebaseAuthUserId],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "jose",
      fullName: "Jose Pelayo",
      emailAddress: "jose@test.com",
      following: [],
      followers: [firebaseAuthUserId],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "marta",
      fullName: "Marta Arta",
      emailAddress: "marta@test.com",
      following: [],
      followers: [firebaseAuthUserId],
      dateCreated: Date.now(),
    },
    {
      userId: "5",
      username: "pepe",
      fullName: "Pepe Arta",
      emailAddress: "pepe@test.com",
      following: [],
      followers: [firebaseAuthUserId],
      dateCreated: Date.now(),
    },
    {
      userId: "6",
      username: "bea",
      fullName: "Bea Trix",
      emailAddress: "bea@test.com",
      following: [],
      followers: [firebaseAuthUserId],
      dateCreated: Date.now(),
    },
  ]

  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k])
  }

  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection("photos")
      .add({
        photoId: i,
        userId: "2",
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: `foto: ${i}.jpg`,
        likes: [],
        comments: [
          {
            displayName: "bea",
            comment: "Buen post!!",
          },
          {
            displayName: "pepe",
            comment: "No está mal...",
          },
        ],
        userLatitude: "40.463667°",
        userLongitude: "-3.74922°",
        dateCreated: Date.now(),
      })
  }
}
