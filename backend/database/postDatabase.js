const { collection, addDoc, getDocs, doc, deleteDoc } = require("firebase/firestore");
const db = require("../utils/firebase");

const postsCollection = collection(db, "posts");

// Add a new post
exports.addPost = async (postData) => {
  const docRef = await addDoc(postsCollection, postData);
  return { id: docRef.id, ...postData };
};

// Fetch posts
exports.fetchPosts = async () => {
  const querySnapshot = await getDocs(postsCollection);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
