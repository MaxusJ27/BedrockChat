// component
import SideNav from "../ui/dashboard/side-nav";
const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
            <div className='w-full flex-none md:w-64 '>
                <SideNav />
            </div>
            <div className='w-full h-full '>{children}</div>
        </div>
    )
}

export default Layout;