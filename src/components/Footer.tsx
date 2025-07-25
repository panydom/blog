import Link from 'next/link';
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className={`h-20 bg-background flex items-center justify-center border-t border-t-gray-50`}>
            <span>&copy; {currentYear} · 竹与墨</span>
            <span className={`ml-6`}>
                <span>powered by </span>
                <Link href="https://nextjs.org/" target='__blank' className={`text-blue-600 hover:text-blue-800`}>nextjs</Link>
            </span>
        </div>
    );
};

export default Footer;