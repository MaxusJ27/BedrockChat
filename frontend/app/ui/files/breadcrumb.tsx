// lib 
import clsx from "clsx";
// font 
import { lato } from "../fonts";
// nextjs
import Link from "next/link";

type Breadcrumb = {
    label: string;
    path: string;
    active?: boolean;
}

const Breadcrumb = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
    return (
        <nav aria-label="Breadcrumb" className="mb-6 block">
            <ol className={clsx(lato.className, 'flex text-xl md:text-2xl')}>
                {
                    breadcrumbs.map((breadcrumb, index) => {
                        return (
                            <li key={index} aria-current={breadcrumb.active} className={clsx(breadcrumb.active ? 'text-gray-200' : 'text-gray-400')}>
                                <Link href={breadcrumb.path}>
                                    {breadcrumb.label}
                                </Link>
                                {index !== breadcrumbs.length - 1 && <span className='mx-2'>/</span>}
                            </li>
                        );
                    })
                }
            </ol>
        </nav>
    );
}
export default Breadcrumb;