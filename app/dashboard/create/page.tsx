"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

import Button from "~/components/Button";
import Input from "~/components/Input";

import { useUser } from "~/hooks";

export default function CreatePostPage() {
    const router = useRouter();
    const { currentUser } = useUser();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [imagePreview, setImagePreview] = useState<File | undefined>();
    const [imageUrl, setImageUrl] = useState("");

    const handleCreatePost = () => {
        axios
            .post("/api/posts", { title, description, username: currentUser?.name, image: imageUrl })
            .then(() => {
                toast.success("post created");
                router.replace("/dashboard");
            })
            .catch((err) => {
                toast.error("Someting went wrong");
                console.log({ err });
            });
    };

    const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setImagePreview(e.target.files[0]);
        }
    };

    return (
        <div className="mx-auto mt-20 max-w-lg rounded-xl p-5 shadow-xl">
            <h2 className="mb-6 text-2xl">Create New Post</h2>
            {imagePreview?.type ? (
                <>
                    <img src={URL.createObjectURL(imagePreview)} alt="image preview" className="rounded-lg" />
                    <div className="mb-8 mt-4 flex items-center gap-6">
                        <Button onClick={() => setImagePreview(undefined)}>Delete</Button>
                    </div>
                </>
            ) : (
                <>
                    <label htmlFor="image" className="mb-6 block rounded-lg border-2 border-dashed p-6 text-center">
                        Select Image
                    </label>
                    <Input type="file" id="image" name="image" className="sr-only" onChange={handleSelectImage} />
                </>
            )}

            <label htmlFor="title">title</label>
            <Input
                className="mt-1 mb-4"
                placeholder="title"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="description">description</label>
            <Input
                className="mt-1 mb-8"
                placeholder="description"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={handleCreatePost}>Create</Button>
        </div>
    );
}
