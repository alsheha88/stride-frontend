type CardProps = {
    children: React.ReactNode
}

const Card = ({children}:CardProps) => {
    return ( <div className="w-full p-6 bg-surface border border-border flex flex-col gap-2 rounded-lg relative">{children}</div> );
}
 
export default Card;