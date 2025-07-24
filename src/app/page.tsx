import type { Metadata } from "next";

import Person from "@/components/RightContent/Person"
import Calendar from "@/components/RightContent/Calendar"
import Posts from "./Posts";
import { getIndexPageData } from '@/lib/articles'

export const metadata: Metadata = {

}

const size = 10;

export default async function Home({ searchParams }: { searchParams: Promise<{ page: number }> }) {
    const page = (await searchParams)?.page || 1;
    const { data, count } = await getIndexPageData(page, size);
    return (
        <div className={`flex`}>
            <div className={`flex-1`}>
                <Posts data={data} page={page} size={size} count={count}></Posts>
            </div>
            <div className={`w-80 sticky top-0 ml-6`}>
                <Person></Person>
                <div className={`mt-5`}>
                    <Calendar ></Calendar>
                </div>
            </div>
        </div>
    )
}
