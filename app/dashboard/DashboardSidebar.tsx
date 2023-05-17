import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineHome, HiOutlineBookmark, HiOutlineDocumentAdd, HiOutlineChat } from "react-icons/hi";

const dashboardSidebarData = [
    { title: "Overview", href: "/dashboard", icon: HiOutlineHome },
    { title: "Create New Post", href: "/dashboard/create", icon: HiOutlineDocumentAdd },
    { title: "My Comments", href: "/dashboard/comments", icon: HiOutlineChat },
    { title: "Saved", href: "/dashboard/favorite", icon: HiOutlineBookmark },
];

export default function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="mt-4 min-w-[250px] max-w-[250px]">
            {dashboardSidebarData.map((item) => (
                <Link
                    href={item.href}
                    key={item.title}
                    className={`mb-2 flex items-center gap-4 rounded-lg p-2 font-semibold transition hover:bg-gray-100 ${
                        pathname === item.href && "text-rose-500"
                    }`}
                >
                    <item.icon size={22} />
                    {item.title}
                </Link>
            ))}
        </aside>
    );
}
