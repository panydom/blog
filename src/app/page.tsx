import Person from "@/components/RightContent/Person"
import Calendar from "@/components/RightContent/Calendar"
import { getIndexPageData } from '@/lib/articles'

export default async function Home() {
    await getIndexPageData();
    return (
        <div className={`flex`}>
            <div className={`flex-1`}></div>
            <div className={`w-80 sticky top-0`}>
                <Person></Person>
                <div className={`mt-5`}>
                    <Calendar ></Calendar>
                </div>
            </div>
        </div>
    )
}
