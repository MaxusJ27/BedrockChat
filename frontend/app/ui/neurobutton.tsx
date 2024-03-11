import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
}

const Button = ({children, className, ...rest}: ButtonProps) => {
    return (
        <button 
        {...rest}
        className={clsx(
            'flex h-10 items-center rounded-lg bg-gray-800 text-sm font-medium shadow-gray-200 text-white hover:bg-gray-900  hover:shadow-md hover:shadow-white shadow-sm focus-visible:outline focus-visible:outline-2',
            className,
        )}>
            {children}
        </button>
    )
}

export default Button;