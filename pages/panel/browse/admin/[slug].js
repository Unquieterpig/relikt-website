import AuthCheck from "@components/AuthCheck";
import ImageUploader from "@components/ImageUploader";
import { firestore, auth } from "@lib/firebase";

import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Card, CardBody, Textarea } from "@nextui-org/react";

import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { Controller, useForm, useFormState } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Metatags from "@components/Metatags";

import GradientTop from "@components/GamesenseGradient";

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <GradientTop />
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const postRef = doc(
    collection(firestore, "users", auth.currentUser.uid, "posts"),
    slug
  );
  // todo; useDocumentDataOnce instead of useDocumentData to prevent realtime updates
  const [post] = useDocumentDataOnce(postRef);

  return (
    <main className="flex min-h-screen m-2">
      {post && (
        <>
          <Metatags title={post.title} description={post.title} />
          <section className="w-[60vw] mr-[1rem]">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <aside className="sticky top-[80px] h-0 flex flex-col w-[20%] min-w-[250px] min-h-[200px] text-center gap-2">
            <h3>Tools</h3>
            <Button color="primary" onClick={() => setPreview(!preview)}>
              {preview ? "Edit" : "Preview"}
            </Button>

            <Link legacyBehavior href={`/${post.username}/${post.slug}`}>
              <Button color="secondary">Go to Live Post</Button>
            </Link>

            <DeletePostButton postRef={postRef} />
          </aside>
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    control,
  } = useForm({ defaultValues, mode: "onChange" });

  const { isValid, isDirty } = useFormState({ control });

  const updatePost = async ({ content, published }) => {
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success("Post updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <Card>
          <CardBody>
            <ReactMarkdown className="prose dark:prose-invert">
              {watch("content")}
            </ReactMarkdown>
          </CardBody>
        </Card>
      )}

      <div className={preview ? "hidden" : "flex flex-col"}>
        <ImageUploader />

        <Controller
          name="content"
          control={control}
          rules={{
            maxLength: {
              value: 20000,
              message: "Post cannot be longer than 20,000 characters",
            },
            minLength: {
              value: 10,
              message: "Post needs to be longer than 10 characters",
            },
            required: {
              value: true,
              message: "Post cannot be empty",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Textarea
              variant="bordered"
              disableAutosize
              classNames={{
                base: "h-[60vh]",
                input: "h-[60vh]",
              }}
              isInvalid={!!error}
              errorMessage={errors.content && errors.content.message}
              {...field}
            />
          )}
        />

        <fieldset>
          <input
            className="inline w-auto"
            type="checkbox"
            {...register("published")}
          />
          <label> Make Public?</label>
        </fieldset>

        <Button type="submit" color="success" isDisabled={!isDirty || !isValid}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}

function DeletePostButton({ postRef }) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm("Are you sure? This action is irreversible.");
    if (doIt) {
      // todo; firebase docs mention that a delete doesn't delete subcollections https://firebase.google.com/docs/firestore/manage-data/delete-data#delete_documents
      // likes subcollection probably still needs to be deleted (probably will cause problems if the user creates the same document again, let future Josh deal with it)
      // todo; Consider checking the post for an uploaded image and remove it from storage bucket as well?
      await deleteDoc(postRef);
      router.push("/panel/browse/admin");
      toast("post annihilated ", { icon: "🗑️" });
    }
  };

  return (
    <Button color="danger" onClick={deletePost}>
      Delete
    </Button>
  );
}
