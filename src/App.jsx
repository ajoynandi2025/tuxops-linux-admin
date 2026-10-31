import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TutorialsPage from './pages/TutorialsPage';
import TerminalModal from './components/TerminalModal';
import CheatSheetModal from './components/CheatSheetModal';
import QuizModal from './components/QuizModal';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    // Check url hash or parameter
    if (window.location.hash.length > 1) {
      return 'tutorials';
    }
    return 'home';
  });

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalInitialCommand, setTerminalInitialCommand] = useState("");
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeToolTab, setActiveToolTab] = useState('chmod');

  // Load completed modules from LocalStorage
  const [completedModules, setCompletedModules] = useState(() => {
    try {
      const saved = localStorage.getItem('tuxops_completed_modules');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save to LocalStorage whenever completedModules updates
  useEffect(() => {
    try {
      localStorage.setItem('tuxops_completed_modules', JSON.stringify(completedModules));
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  }, [completedModules]);

  const toggleModuleCompleted = (moduleId) => {
    setCompletedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleOpenTerminalWithCommand = (cmd) => {
    setTerminalInitialCommand(cmd);
    setIsTerminalOpen(true);
  };

  const handleSelectTool = (toolName) => {
    setActiveToolTab(toolName);
    const element = document.getElementById("sysadmin-tools");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCheatSheetOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsTerminalOpen(false);
        setIsCheatSheetOpen(false);
        setIsQuizOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14] text-slate-100 selection:bg-emerald-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenTerminal={(cmd) => handleOpenTerminalWithCommand(cmd)}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onSelectTool={handleSelectTool}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <HomePage
            setCurrentView={setCurrentView}
            onOpenTerminalWithCommand={handleOpenTerminalWithCommand}
            onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
            activeToolTab={activeToolTab}
            setActiveToolTab={setActiveToolTab}
            completedModules={completedModules}
          />
        ) : (
          <TutorialsPage
            onOpenTerminalWithCommand={handleOpenTerminalWithCommand}
            completedModules={completedModules}
            toggleModuleCompleted={toggleModuleCompleted}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentView={setCurrentView}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
        onOpenTerminal={(cmd) => handleOpenTerminalWithCommand(cmd)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Interactive Terminal Modal Drawer */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        initialCommand={terminalInitialCommand}
      />

      {/* Quick Cheat Sheet Modal */}
      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />

      {/* Certification Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
}
