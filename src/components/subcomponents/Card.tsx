type CardProps = {
    children: React.ReactNode
}

const Card = ({children}:CardProps) => {
    return ( <div className="w-full p-6 bg-surface/25 border border-border flex flex-col gap-2 rounded-lg relative shadow-lg shadow-background/40">{children}</div> );
}
 
export default Card;