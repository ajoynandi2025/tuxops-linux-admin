import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TopicDetailPage from './pages/TopicDetailPage';
import { TOPICS } from './data/topicsData';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#topic/")) {
      const topicId = hash.replace("#topic/", "");
      if (TOPICS.some(t => t.id === topicId)) {
        return { view: 'topic', topicId };
      }
    }
    return { view: 'home', topicId: null };
  });

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#topic/")) {
        const topicId = hash.replace("#topic/", "");
        if (TOPICS.some(t => t.id === topicId)) {
          setCurrentRoute({ view: 'topic', topicId });
          return;
        }
      }
      setCurrentRoute({ view: 'home', topicId: null });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateHome = () => {
    window.location.hash = "";
    setCurrentRoute({ view: 'home', topicId: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopic = (topicId) => {
    window.location.hash = `topic/${topicId}`;
    setCurrentRoute({ view: 'topic', topicId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find active topic and adjacent topics
  const currentTopicIndex = TOPICS.findIndex(t => t.id === currentRoute.topicId);
  const activeTopic = currentTopicIndex !== -1 ? TOPICS[currentTopicIndex] : null;
  const prevTopic = currentTopicIndex > 0 ? TOPICS[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex < TOPICS.length - 1 ? TOPICS[currentTopicIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14] text-slate-100 selection:bg-emerald-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        currentView={currentRoute.view}
        onNavigateHome={handleNavigateHome}
        onSelectTopic={handleSelectTopic}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentRoute.view === 'topic' && activeTopic ? (
          <TopicDetailPage
            topic={activeTopic}
            onNavigateHome={handleNavigateHome}
            onNavigateTopic={handleSelectTopic}
            prevTopic={prevTopic}
            nextTopic={nextTopic}
          />
        ) : (
          <HomePage
            onSelectTopic={handleSelectTopic}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTopic={handleSelectTopic}
        onNavigateHome={handleNavigateHome}
      />
    </div>
  );
}
