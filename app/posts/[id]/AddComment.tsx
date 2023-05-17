"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import Button from "~/components/Button";

interface AddCommentProps {
    postId: string;
}

const AddComment: React.FC<AddCommentProps> = ({ postId }) => {
    const [comment, setComment] = useState("");

    const handleCreateComment = () => {
        axios
            .post(`/api/posts/${postId}/comments`, { text: comment })
            .then(() => {
                toast.success("comment added");
            })
            .catch((error) => {
                toast.error("something went wrong");
                console.log({ error });
            });
    };

    return (
        <div className="my-8">
            <textarea
                className="min-h-[180px] w-full max-w-lg rounded-lg border p-4 text-lg leading-5"
                placeholder="write your comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button className="w-30 mt-2 inline-block px-8" onClick={handleCreateComment}>
                Send
            </Button>
        </div>
    );
};

export default AddComment;
