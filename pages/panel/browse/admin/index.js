import AuthCheck from "@components/AuthCheck";
import PostFeed from "@components/PostFeed";
import { SearchIcon } from "@components/SearchIcon";

import { firestore, auth } from "@lib/firebase";
import { UserContext } from "@lib/context";

import { useContext, useState } from "react";
import { useRouter } from "next/router";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  Input,
} from "@nextui-org/react";

import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import {
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export default function AdminPostsPage(props) {
  return (
    <>
      <main>
        <AuthCheck>
          <AdminBreadcrumb />
          <PostList />
          <CreateNewPost />
        </AuthCheck>
      </main>
    </>
  );
}

function AdminBreadcrumb() {
  return (
    <Card className="mx-10 mt-5">
      <CardBody className="flex flex-row justify-between">
        <Breadcrumbs size="lg" className="flex text-center justify-center font">
          <BreadcrumbItem href="/panel">Panel</BreadcrumbItem>
          <BreadcrumbItem href="/panel/browse">Browse</BreadcrumbItem>
          <BreadcrumbItem href="/panel/browse/admin">Admin</BreadcrumbItem>
        </Breadcrumbs>

        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </CardBody>
    </Card>
  );
}

function PostList() {
  const ref = collection(firestore, "users", auth.currentUser.uid, "posts");
  const postQuery = query(ref, orderBy("createdAt"));
  const [querySnapshot] = useCollection(postQuery);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <p className="flex justify-center text-center mt-5 text-3xl">
        Your Posts
      </p>
      <div className="mx-12 grid grid-cols-4 gap-4">
        <PostFeed posts={posts} admin />
      </div>
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = doc(collection(firestore, "users", uid, "posts"), slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likeCount: 0,
    };

    await setDoc(ref, data);

    toast.success("Post created!");

    // Imperative navigation after doc is set
    router.push(`/panel/browse/admin/${slug}`);
  };

  return (
    <>
      <p className="flex justify-center text-center my-5 text-3xl">
        Create a New Post
      </p>

      <div className="flex justify-center items-center">
        <Card className="flex flex-col justify-center items-center w-100 p-5">
          <form onSubmit={createPost}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Post title"
              placeholder="My Awesome Voice!"
              description="Must be between 3 and 100 characters."
              className="inline-block"
            />
            <p className="text-default-500 text-small">URL: {slug}</p>
            <Button type="submit" isDisabled={!isValid} color="success">
              Create New Post
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
