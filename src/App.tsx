import { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { BerandaPage } from './pages/BerandaPage';
import { KatalogPage } from './pages/KatalogPage';
import { DetailBukuPage } from './pages/DetailBukuPage';
import { PendaftaranPage, RegistrationData } from './pages/PendaftaranPage';
import { StatusPage } from './pages/StatusPage';
import { InfoModal, ModalType } from './components/InfoModal';
import { Book, BOOKS } from './data/books';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('katalog-buku');
  const [selectedBook, setSelectedBook] = useState<Book>(
    BOOKS.find((b) => b.id === 'sejarah-jalur-rempah-cirebon') || BOOKS[1]
  );
  const [lastRegistration, setLastRegistration] = useState<RegistrationData | null>(null);
  const [lastLoan, setLastLoan] = useState<{
    book: Book;
    date: string;
    token: string;
  } | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Restore stored registration or loan if any
  useEffect(() => {
    try {
      const savedReg = localStorage.getItem('bi_cirebon_last_reg');
      if (savedReg) {
        setLastRegistration(JSON.parse(savedReg));
      }
      const savedLoan = localStorage.getItem('bi_cirebon_last_loan');
      if (savedLoan) {
        setLastLoan(JSON.parse(savedLoan));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const handleRegistrationSuccess = (data: RegistrationData) => {
    setLastRegistration(data);
    try {
      localStorage.setItem('bi_cirebon_last_reg', JSON.stringify(data));
    } catch {
      // ignore
    }
  };

  const handleConfirmLoan = (book: Book) => {
    const loanToken = `#BI-CRB-2025-${Math.floor(10000 + Math.random() * 90000)}`;
    const loanRecord = {
      book,
      date: new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      token: loanToken,
    };
    setLastLoan(loanRecord);
    try {
      localStorage.setItem('bi_cirebon_last_loan', JSON.stringify(loanRecord));
    } catch {
      // ignore
    }
    handleNavigate('status');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e]">
      {/* Top Universal Navbar */}
      <Navbar activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-1">
        {activeTab === 'beranda' && (
          <BerandaPage
            onNavigate={handleNavigate}
            onOpenGuide={() => setActiveModal('guide')}
          />
        )}

        {activeTab === 'katalog-buku' && (
          <KatalogPage
            onNavigate={handleNavigate}
            onSelectBook={handleSelectBook}
            onOpenConsultation={() => setActiveModal('consultation')}
          />
        )}

        {activeTab === 'detail-buku' && (
          <DetailBukuPage
            book={selectedBook}
            onNavigate={handleNavigate}
            onSelectBook={handleSelectBook}
            onConfirmLoan={handleConfirmLoan}
          />
        )}

        {activeTab === 'pendaftaran' && (
          <PendaftaranPage
            onNavigate={handleNavigate}
            onRegistrationSuccess={handleRegistrationSuccess}
          />
        )}

        {activeTab === 'status' && (
          <StatusPage
            onNavigate={handleNavigate}
            lastRegistration={lastRegistration}
            lastLoan={lastLoan}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setActiveModal('privacy')}
        onOpenTerms={() => setActiveModal('terms')}
        onOpenGuide={() => setActiveModal('researcher')}
      />

      {/* Reusable Informational Modals */}
      <InfoModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
