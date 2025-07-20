import Link from 'next/link'

const PageHeader = () => {
    return (
        <div className={`h-16 px-3 bg-white sticky top-0 border-b border-b-gray-50`}>
            <div className={`w-[980px] mx-auto flex`}>
                <div className="leading-16 text-2xl flex-1">
                    <Link href="/">竹与墨</Link>
                </div>
                <div className={`leading-16 flex gap-6`}>
                    <Link href="/" target='__blank'>首页</Link>
                    <Link href="https://github.com/panydom/blog" target='__blank'>Github</Link>
                </div>
            </div>
        </div>
    )
}

export default PageHeader