import { Award } from "lucide-react";

const Header = () => {
    
    return (
        <div className="flex justify-center mt-2">
            <div className="w-full max-w-3xl">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-indigo-900 text-center flex items-center justify-center gap-3 flex-wrap">
                    <Award className="w-8 h-8" /> QCM - PHP
                </h1>
                </div>
            </div>
        </div>

    );
}

export default Header;