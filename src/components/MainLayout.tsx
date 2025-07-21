import type { ReactNode } from "react"
import PageHeader from "./Header/index"
import PageFooter from "./Footer"

type MainLayout = { children: ReactNode }

const MainLayout = ({ children }: MainLayout) => {
    return (
        <div className={`flex flex-col min-h-screen`}>
            <PageHeader></PageHeader>
            <div className={`flex-1 w-[980px] mx-auto py-8`}>
                {children}
            </div>
            <PageFooter></PageFooter>
        </div>
    )
}

export default MainLayout