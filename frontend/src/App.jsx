import React, { useState, useEffect } from 'react';
import './styles/global.css';
import './styles/variables.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';

// Импортируем компоненты разделов
import MainPage from './pages/MainPage';
import FAQ from './pages/FAQ';
import News from './pages/News';
import Calculator from './pages/Calculator';
import DocumentBuilder from './pages/DocumentBuilder';
import SelfCheck from './pages/SelfCheck';
import RegulationDocs from './pages/RegulationDocs';
import Contacts from './pages/Contacts';

export default function App() {
  const [currentPage, setCurrentPage] = useState('mainpage');
  const [currentSubsection, setCurrentSubsection] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  // Скролл в начало при смене страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Функция навигации, которую получает чат
  const handlePageChange = (page, subsection = null) => {
    setCurrentPage(page);
    setCurrentSubsection(subsection);
  };

  // Рендер страниц с передачей subsection
  const renderPage = () => {
    switch (currentPage) {
      case 'mainpage':
        return <MainPage onPageChange={handlePageChange} />;
      case 'faq':
        return <FAQ onPageChange={handlePageChange} />;
      case 'news':
        return <News />;
      case 'calculator':
        return <Calculator />;
      case 'documents':
        return <DocumentBuilder subsection={currentSubsection} />;
      case 'selfcheck':
        return <SelfCheck subsection={currentSubsection} />;
      case 'regulations':
        return <RegulationDocs />;
      case 'contacts':
        return <Contacts subsection={currentSubsection} />;
      default:
        return <MainPage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="app">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
      />
      
      <main className="main-content">
        {renderPage()}
      </main>

      <ChatAssistant 
        open={chatOpen} 
        onToggle={setChatOpen}
        onPageChange={handlePageChange}
      />

      <Footer />
    </div>
  );
}