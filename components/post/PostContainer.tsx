interface PostContainerProps {
    children: React.ReactNode;
}

export default function PostContainer({ children }: PostContainerProps) {
    return <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{children}</div>;
}
