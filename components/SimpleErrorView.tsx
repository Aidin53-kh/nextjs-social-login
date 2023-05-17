export default function SimpleErrorView({ title }: { title: string }) {
    return (
        <div className="mt-[200px] text-center">
            <h1 className="text-xl font-semibold">{title}</h1>
        </div>
    );
}
