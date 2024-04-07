import { useEffect, useState } from "react";
import { db } from "../firebaseConfig/firebase";
import { collection, getDocs } from "firebase/firestore";

function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await db.collection("posts").get();
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);

      //   const querySnapshot = await getDocs(collection(db, "posts"));
      //   querySnapshot.forEach((doc) => {
      //     console.log(`${doc.id} => ${doc.data()}`);
      //   });
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post?.title}</h3>
          <p>{post?.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Post;
