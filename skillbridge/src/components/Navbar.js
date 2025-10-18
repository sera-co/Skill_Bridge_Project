import React from 'react';

const Navbar = ({ currentUser, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">SkillBridge</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <span className="text-stone-600 text-sm">
                AI-Powered Learning Path Generator
              </span>
            </div>
            {(currentUser || localStorage.getItem('token')) && (
              <div className="flex items-center space-x-4">
                {currentUser && (
                  <div className="text-right">
                    <p className="text-sm font-medium text-stone-800">{currentUser.name}</p>
                    <p className="text-xs text-stone-500">{currentUser.email}</p>
                  </div>
                )}
                <button
                  onClick={onLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
