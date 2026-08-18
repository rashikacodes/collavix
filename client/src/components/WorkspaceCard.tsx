interface WorkspaceCardProps { 
    name: string; 
    description: string; 
    role: string;
     onClick: () => void; 
    } 
export default function WorkspaceCard({
     name, description, role, onClick 
    }: WorkspaceCardProps) {
         return ( 
         <button onClick={onClick} className="text-left w-full border rounded-lg p-4 hover:border-black transition" >
             <div className="flex justify-between items-start"> 
                <h3 className="font-semibold">{name}</h3> 
                <span className="text-xs uppercase text-gray-500">{role}</span> 
                </div> 
                {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
                </button> ); 
            }