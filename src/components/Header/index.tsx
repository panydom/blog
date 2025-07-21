import Link from 'next/link'
import ThemeToggle from './ThemeToggle';

const PageHeader = () => {
    return (
        <div className={`h-16 px-3 bg-background sticky top-0 border-b border-b-gray-50`}>
            <div className={`w-[980px] mx-auto flex`}>
                <div className="leading-16 text-2xl flex-1">
                    <Link href="/">竹与墨</Link>
                    <span className="ml-6">
                    </span>
                </div>
                <div className={`leading-16 flex items-center gap-6`}>
                    <Link href="/" target='__blank'>首页</Link>
                    <Link href="https://github.com/panydom/blog" target='__blank'>Github</Link>
                    <ThemeToggle></ThemeToggle>
                </div>
            </div>
        </div>
    )
}

export default PageHeader