import React, { useState, useEffect } from 'react';
import './styles/global.css';
import './styles/variables.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';

// Импортируем компоненты разделов
import MainPage from './pages/MainPage'
import FAQ from './pages/FAQ';
import News from './pages/News';
import Calculator from './pages/Calculator';
import DocumentBuilder from './pages/DocumentBuilder';
import SelfCheck from './pages/SelfCheck';
import RegulationDocs from './pages/RegulationDocs';
import Contacts from './pages/Contacts';

export default function App() {
  const [currentPage, setCurrentPage] = useState('mainpage');
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    // Скроллим в начало при смене страницы
    window.scrollTo(0, 0);
  }, [currentPage]);

  const pages = {
    mainpage: <MainPage />,
    faq: <FAQ />,
    news: <News />,
    calculator: <Calculator />,
    documents: <DocumentBuilder />,
    selfcheck: <SelfCheck />,
    regulations: <RegulationDocs />,
    contacts: <Contacts />
  };

  return (
    <div className="app">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="main-content">
        {pages[currentPage]}
      </main>

      <ChatAssistant open={chatOpen} onToggle={setChatOpen} />

      <Footer />
    </div>
  );
}
