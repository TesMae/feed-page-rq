import React, { useState } from "react";
import { useAddPost } from "../server/postQuery";
import { NewPostData } from "../types/post";

export default function NewPostForm() {
  const [postSave, setPostSave] = useState<NewPostData>({
    userId: "",
    title: "",
    body: "",
    createdAt: 0,
  });
  const mutation = useAddPost();

  const handleSaveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPostSave((prevPostSave) => ({
      ...prevPostSave,
      [name]: value,
      createdAt: new Date().getTime(),
    }));
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (postSave) {
            mutation.mutate(postSave);
            setPostSave({ userId: "", title: "", body: "", createdAt: 0 });
          }
        }}
      >
        <h3>Add Post : </h3>
        <label> User Id </label>
        <input
          required
          type="text"
          name="userId"
          onChange={handleSaveChange}
          value={postSave?.userId}
        />

        <label> Title </label>
        <input
          required
          type="text"
          name="title"
          onChange={handleSaveChange}
          value={postSave?.title}
        />

        <label> Body </label>
        <input
          required
          type="text"
          name="body"
          onChange={handleSaveChange}
          value={postSave?.body}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
