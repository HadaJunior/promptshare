"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { revalidatePath } from "next/cache";
import Profile from "@components/Profile";

const PersonalProfile = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const parameter = useSearchParams();
  const name = parameter.get("name");
  const id = params.id.toString();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
        revalidatePath("/profile");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const fullname = posts.map((post) => post.creator.name);
  return (
    <Profile
      name={fullname || "Personal"}
      desc={`Welcome to ${fullname} personalized profile page`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default PersonalProfile;
