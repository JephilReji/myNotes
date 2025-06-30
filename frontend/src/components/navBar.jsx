import { Link } from "react-router";
import {PlusIcon} from "lucide-react";

const NavBar = () => {
  return (
    <header className="bg-base-350 border-b border-base-content/10">
        <div className="mx-auto max-w-6xt p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-extrabold text-balance font-serif tracking-normal">My Notes</h1>
                <div className='flex items-center gap-4'>
                    <Link to={"/create"} className="btn btn-primary">
                    <PlusIcon className="size-5"/>
                    <span>New Note</span>
                    </Link>
                </div>
            </div>
        </div>
      
    </header>
  )
}

export default NavBar;
