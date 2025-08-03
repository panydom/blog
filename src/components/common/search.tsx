"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useProgress } from "react-transition-progress";

interface SearchProps {
    query?: string;
    homepage: string;
    placeholder: string;
}

const SearchComponent = ({ query, homepage, placeholder }: SearchProps) => {
    const [search, setSearch] = useState(query || "");
    const router = useRouter();
    const startProgress = useProgress();

    async function handleSearch() {
        const searchText = search.trim();
        if (!searchText) {
            toast.error("请输入搜索内容");
            return;
        }
        startProgress();
        router.push(`/${homepage}?search=${searchText}&page=1`);
    }

    function handleClear() {
        setSearch("");
        startProgress();
        router.push(`/${homepage}?page=1`);
    }

    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
                className="w-72"
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
            />
            <Button variant="outline" className="cursor-pointer" onClick={handleClear}>Clear</Button>
            <Button variant="outline" className="cursor-pointer" onClick={handleSearch}><Search /></Button>
        </div>
    );
};

export default SearchComponent;