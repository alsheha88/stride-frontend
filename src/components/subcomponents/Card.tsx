type CardProps = {
    children: React.ReactNode;
    className?: string;
}

const Card = ({children, className}:CardProps) => {
    return ( <div className={`${className} w-full p-6 bg-surface/25 border border-border flex flex-col gap-2 rounded-lg relative shadow-lg shadow-background/40`}>{children}</div> );
}
 
export default Card;