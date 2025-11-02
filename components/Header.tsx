import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

function Header({ isDarkMode, toggleDarkMode, sidebarOpen, setSidebarOpen }: HeaderProps) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };
    
    return (
        <header className="flex-shrink-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
             <div className="flex items-center">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 mr-4">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
             </div>
             <div className="flex items-center space-x-4">
                <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    {isDarkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-700" />}
                </button>
                <div className="relative">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="block w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500">
                        <img className="w-full h-full object-cover" src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=random`} alt="User avatar" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700">
                            <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                                <p className="font-semibold truncate">{user?.displayName}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
             </div>
        </header>
    );
}

export default Header;
