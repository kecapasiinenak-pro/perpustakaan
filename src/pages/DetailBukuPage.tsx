import React, { useState } from 'react';
import { Book, BOOKS, RELATED_BOOKS } from '../data/books';
import { NavTab } from '../components/Navbar';

interface DetailBukuPageProps {
  book?: Book;
  onNavigate: (tab: NavTab) => void;
  onSelectBook: (book: Book) => void;
  onConfirmLoan?: (book: Book) => void;
}

export const DetailBukuPage: React.FC<DetailBukuPageProps> = ({
  book,
  onNavigate,
  onSelectBook,
  onConfirmLoan,
}) => {
  // Default to the featured book from screenshot 3 if none specified
  const currentBook = book || BOOKS.find((b) => b.id === 'sejarah-jalur-rempah-cirebon') || BOOKS[1];

  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBorrowModal, setShowBorrowModal] = useState<boolean>(false);
  const [borrowerName, setBorrowerName] = useState<string>('');
  const [borrowerId, setBorrowerId] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      showToast('Buku berhasil disimpan ke daftar bacaan favorit Anda.');
    } else {
      showToast('Buku dihapus dari daftar favorit.');
    }
  };

  const handleDownloadSummary = () => {
    showToast('Mengunduh Executive Summary Riset (PDF 2.4 MB)...');
  };

  const handleStartBorrow = () => {
    setShowBorrowModal(true);
  };

  const handleProcessBorrow = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBorrowModal(false);
    if (onConfirmLoan) {
      onConfirmLoan(currentBook);
    } else {
      onNavigate('status');
    }
  };

  const isAvailable = currentBook.status === 'Tersedia';

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 py-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-[#43474f]">
          <button
            onClick={() => onNavigate('beranda')}
            className="hover:text-[#001e40] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Beranda</span>
          </button>
          <span className="material-symbols-outlined text-[12px] text-[#c3c6d1]">chevron_right</span>
          <button
            onClick={() => onNavigate('katalog-buku')}
            className="hover:text-[#001e40] transition-colors cursor-pointer"
          >
            Katalog Buku
          </button>
          <span className="material-symbols-outlined text-[12px] text-[#c3c6d1]">chevron_right</span>
          <span className="text-[#001e40] font-medium truncate max-w-xs md:max-w-md">
            {currentBook.title}
          </span>
        </nav>

        {/* Main Detail Section: Split 2 Column Asymmetric */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT SIDE: Cover & Physical Metadata (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-stretch gap-6">
            {/* Realistic 3D Cover Display */}
            <div className="relative w-full max-w-[380px] mx-auto group">
              {/* Subtle Megamendung / Ambient Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#ffdea5]/30 via-[#d5e3ff]/20 to-transparent rounded-3xl blur-2xl -z-10 opacity-70 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="bg-[#ffffff] p-5 rounded-2xl shadow-[0_16px_40px_-12px_rgba(0,30,64,0.12),0_4px_16px_-4px_rgba(0,0,0,0.04)] transition-transform duration-300 group-hover:-translate-y-1 border border-[#eceef0]/80">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),0_12px_32px_-8px_rgba(0,30,64,0.25)] bg-[#eceef0]">
                  <img
                    alt={`Sampul ${currentBook.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={currentBook.detailImage || currentBook.image}
                  />
                  {/* Book spine crease effect */}
                  <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/25 via-white/10 to-transparent pointer-events-none"></div>

                  {/* Exclusive Tag */}
                  <div className="absolute top-3 right-3 bg-[#001e40]/85 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="material-symbols-outlined text-[13px] text-[#ffdea5]">
                      menu_book
                    </span>
                    <span className="text-[11px] text-[#ffffff] font-medium tracking-wide">
                      Eksklusif BI
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Availability Badge */}
            <div
              className={`w-full max-w-[380px] mx-auto px-4 py-3.5 rounded-xl shadow-sm flex items-center justify-between gap-3 border ${
                isAvailable
                  ? 'bg-[#ecfdf5] border-emerald-200'
                  : 'bg-[#fff1f2] border-rose-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isAvailable ? 'bg-[#10b981]' : 'bg-[#e11d48]'
                    }`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      isAvailable ? 'bg-[#059669]' : 'bg-[#be123c]'
                    }`}
                  ></span>
                </span>
                <div className="flex flex-col">
                  <span
                    className={`text-[12px] font-semibold leading-tight ${
                      isAvailable ? 'text-[#065f46]' : 'text-[#9f1239]'
                    }`}
                  >
                    Status: {isAvailable ? 'Tersedia untuk Dipinjam' : 'Sedang Dipinjam'}
                  </span>
                  <span
                    className={`text-[11px] ${
                      isAvailable ? 'text-[#047857]' : 'text-[#be123c]'
                    }`}
                  >
                    Lokasi: {currentBook.location}
                  </span>
                </div>
              </div>
              <span
                className={`material-symbols-outlined shrink-0 ${
                  isAvailable ? 'text-[#059669]' : 'text-[#be123c]'
                }`}
              >
                shelves
              </span>
            </div>

            {/* Publication Specifications (Card) */}
            <div className="w-full max-w-[380px] mx-auto bg-[#ffffff] p-6 rounded-2xl shadow-[0_2px_8px_-2px_rgba(0,51,102,0.04)] border border-[#eceef0] space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#001e40] text-xl">fact_check</span>
                <h3 className="text-[16px] text-[#001e40] font-bold">Metadata Publikasi</h3>
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[12px]">
                <div className="flex flex-col">
                  <span className="text-[#43474f] text-[11px] uppercase tracking-wider">ISBN</span>
                  <span className="font-semibold text-[#191c1e] mt-0.5">
                    {currentBook.isbn || '978-602-8821-44-1'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#43474f] text-[11px] uppercase tracking-wider">Tebal Halaman</span>
                  <span className="font-semibold text-[#191c1e] mt-0.5">
                    {currentBook.pages || '384 Halaman'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#43474f] text-[11px] uppercase tracking-wider">Penerbit</span>
                  <span className="font-semibold text-[#191c1e] mt-0.5">
                    {currentBook.publisher || 'Bank Indonesia Institute'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#43474f] text-[11px] uppercase tracking-wider">Tahun Terbit</span>
                  <span className="font-semibold text-[#191c1e] mt-0.5">
                    {currentBook.year}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#43474f] text-[11px] uppercase tracking-wider">Bahasa</span>
                  <span className="font-semibold text-[#191c1e] mt-0.5">
                    {currentBook.language || 'Indonesia & Inggris'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#43474f] text-[11px] uppercase tracking-wider">Nomor Klasifikasi</span>
                  <span className="font-semibold text-[#775a19] mt-0.5 font-mono">
                    {currentBook.classificationCode || currentBook.callNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Narrative, Review & Actions (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Header Book & Metadata */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#ffdea5]/50 px-3 py-1 rounded-full text-[#261900] text-[12px] font-semibold">
                <span className="material-symbols-outlined text-[14px]">sailing</span>
                <span>{currentBook.badge || currentBook.categoryLabel}</span>
              </div>

              <h1 className="text-[26px] sm:text-[32px] text-[#001e40] font-bold tracking-tight leading-snug">
                {currentBook.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1">
                <div className="flex items-center gap-1.5 text-[#191c1e]">
                  <span className="material-symbols-outlined text-[16px] text-[#775a19]">person_edit</span>
                  <span className="text-[14px] font-semibold">{currentBook.author}</span>
                </div>
                <span className="text-[#c3c6d1]">•</span>
                <div className="flex items-center gap-1.5 bg-[#e6e8ea] px-2.5 py-0.5 rounded-full">
                  <div className="flex text-amber-500">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  </div>
                  <span className="text-[12px] font-bold text-[#191c1e]">{currentBook.rating || 4.9}</span>
                  <span className="text-[12px] text-[#43474f]">
                    ({currentBook.reviewsCount || 48} Ulasan Pembaca &amp; Periset)
                  </span>
                </div>
              </div>
            </div>

            {/* Synopsis Card */}
            <div className="bg-[#ffffff] p-6 rounded-2xl shadow-[0_2px_8px_-2px_rgba(0,51,102,0.04)] border border-[#eceef0] space-y-4">
              <h2 className="text-[16px] text-[#001e40] font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[#001e40]">auto_stories</span>
                <span>Sinopsis &amp; Telaah Riset</span>
              </h2>
              <div className="text-[14px] text-[#43474f] leading-relaxed space-y-3 whitespace-pre-line">
                <p>
                  {currentBook.synopsis ||
                    'Buku ini menyajikan dokumentasi historis mendalam mengenai keemasan pelabuhan Muara Jati di Cirebon yang bertransformasi menjadi simpul niaga maritim terpenting di pesisir utara pulau Jawa.'}
                </p>
              </div>

              {/* Keyword Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {(currentBook.tags || ['#JalurRempah', '#PelabuhanMuaraJati', '#KasultananCirebon', '#NumismatikaBI', '#EkonomiMaritim']).map(
                  (tag, i) => (
                    <span
                      key={i}
                      className="bg-[#f2f4f6] px-3 py-1 rounded-lg text-[#43474f] text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-[#ffffff] p-6 rounded-2xl shadow-[0_4px_16px_-4px_rgba(0,51,102,0.06)] border border-[#eceef0] space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Main Action: Pinjam Sekarang */}
                <button
                  type="button"
                  onClick={handleStartBorrow}
                  className="flex-1 bg-[#001e40] hover:bg-[#002244] text-[#ffffff] text-[15px] font-semibold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group active:scale-[0.98] cursor-pointer"
                >
                  <span className="material-symbols-outlined transition-transform group-hover:scale-110">
                    book_online
                  </span>
                  <span>Pinjam Sekarang</span>
                </button>

                {/* Favorite Button */}
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  title="Simpan ke Daftar Bacaan"
                  className={`bg-[#f2f4f6] hover:bg-[#eceef0] text-[#191c1e] text-[15px] font-semibold py-3.5 px-5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isFavorited ? 'ring-2 ring-[#775a19]' : ''
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[#775a19]"
                    style={{ fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {isFavorited ? 'bookmark' : 'bookmark_border'}
                  </span>
                  <span className="hidden sm:inline">Favorit</span>
                </button>

                {/* Download PDF summary */}
                <button
                  type="button"
                  onClick={handleDownloadSummary}
                  title="Unduh Executive Summary Riset (PDF)"
                  className="bg-[#f2f4f6] hover:bg-[#eceef0] text-[#001e40] text-[15px] font-semibold py-3.5 px-5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[#003366]">picture_as_pdf</span>
                  <span className="hidden sm:inline">Ringkasan</span>
                </button>
              </div>

              {/* Toast Alert */}
              {toastMessage && (
                <div className="bg-[#001e40] text-[#ffffff] text-[13px] px-4 py-3 rounded-xl flex items-center justify-between shadow-lg animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffdea5] text-[18px]">
                      check_circle
                    </span>
                    <span>{toastMessage}</span>
                  </div>
                  <button
                    onClick={() => setToastMessage(null)}
                    className="hover:opacity-75 cursor-pointer ml-3"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              )}

              {/* Circulation Rules Card */}
              <div className="bg-[#f2f4f6] p-4 rounded-xl space-y-2 border border-[#eceef0]/80">
                <div className="flex items-center gap-2 text-[12px] text-[#001e40] font-semibold">
                  <span className="material-symbols-outlined text-[#775a19] text-[18px]">
                    verified_user
                  </span>
                  <span>Ketentuan Layanan Sirkulasi Bank Indonesia Cirebon:</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px] text-[#43474f]">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#775a19] text-[16px] shrink-0 mt-0.5">
                      schedule
                    </span>
                    <span>Durasi pinjam <strong>14 hari kerja</strong> kalender.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#775a19] text-[16px] shrink-0 mt-0.5">
                      collections_bookmark
                    </span>
                    <span>Maksimal kuota <strong>3 buku</strong> per anggota aktif.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#775a19] text-[16px] shrink-0 mt-0.5">
                      sync_alt
                    </span>
                    <span>Dapat diperpanjang <strong>1x secara online</strong>.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION REKOMENDASI BUKU TERKAIT */}
        <section className="space-y-6 pt-6 border-t border-[#eceef0]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#775a19] text-[12px] uppercase tracking-wider font-semibold">
                <span className="material-symbols-outlined text-[16px]">auto_stories</span>
                <span>Rujukan Riset Terkait</span>
              </div>
              <h2 className="text-[24px] text-[#001e40] font-bold mt-1">
                Koleksi Terkait Pilihan Kurator
              </h2>
              <p className="text-[13px] text-[#43474f] mt-0.5">
                Karya ilmiah dan dokumentasi arsip ekonomi kedaerahan terpilih untuk memperkaya referensi Anda.
              </p>
            </div>
            <button
              onClick={() => onNavigate('katalog-buku')}
              className="inline-flex items-center gap-1.5 text-[#001e40] font-semibold text-[14px] hover:text-[#003366] group transition-colors cursor-pointer"
            >
              <span>Lihat Katalog Lengkap</span>
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>

          {/* Grid 3 Curated Recommendation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED_BOOKS.map((item) => (
              <article
                key={item.id}
                className="bg-[#ffffff] rounded-2xl p-5 shadow-[0_2px_8px_-2px_rgba(0,51,102,0.04)] hover:shadow-[0_12px_24px_-6px_rgba(0,51,102,0.08)] transition-all duration-300 flex flex-col justify-between group -translate-y-0 hover:-translate-y-1 border border-[#eceef0]/80"
              >
                <div className="flex gap-4">
                  <div
                    onClick={() => {
                      onSelectBook(item);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-24 h-36 shrink-0 rounded-lg overflow-hidden shadow-sm relative bg-[#eceef0] cursor-pointer"
                  >
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      src={item.image}
                    />
                  </div>
                  <div className="flex flex-col justify-between min-w-0">
                    <div className="space-y-1">
                      <span className="text-[11px] text-[#775a19] font-semibold uppercase tracking-wider">
                        {item.categoryLabel}
                      </span>
                      <h3
                        onClick={() => {
                          onSelectBook(item);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-[15px] text-[#001e40] font-semibold line-clamp-2 leading-snug group-hover:text-[#003366] transition-colors cursor-pointer"
                      >
                        {item.title}
                      </h3>
                      <p className="text-[12px] text-[#43474f] truncate">{item.author}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-[12px]">
                      <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="text-[#191c1e] font-semibold">{item.rating}</span>
                      <span className="text-[#43474f] text-[11px]">({item.reviewsCount} ulasan)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between bg-[#f2f4f6] px-3 py-2 rounded-xl">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                      item.status === 'Tersedia' ? 'text-[#065f46]' : 'text-[#775a19]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.status === 'Tersedia' ? 'bg-[#059669]' : 'bg-[#775a19]'
                      }`}
                    ></span>
                    {item.status === 'Tersedia' ? `Tersedia (${item.location.split(' - ')[1] || 'Rak'})` : 'Referensi Khusus Di Tempat'}
                  </span>
                  <button
                    onClick={() => {
                      onSelectBook(item);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#001e40] hover:text-[#003366] text-[12px] font-semibold flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Detail</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Borrow Loan Reservation Dialog Modal */}
      {showBorrowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001e40]/40 backdrop-blur-sm">
          <div className="bg-[#ffffff] w-full max-w-md rounded-2xl shadow-xl overflow-hidden p-6 sm:p-7 relative border border-[#eceef0] animate-fadeIn">
            <button
              onClick={() => setShowBorrowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f2f4f6] text-[#43474f] hover:bg-[#e6e8ea] flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-[#d5e3ff] flex items-center justify-center text-[#003366]">
                <span className="material-symbols-outlined text-[20px]">book_online</span>
              </span>
              <h3 className="text-[18px] font-bold text-[#001e40]">Formulir Peminjaman Koleksi</h3>
            </div>

            <p className="text-[13px] text-[#43474f] mb-4">
              Konfirmasi peminjaman buku: <strong className="text-[#001e40]">{currentBook.title}</strong>
            </p>

            <form onSubmit={handleProcessBorrow} className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-[#001e40] mb-1">
                  Nama Peminjam / Anggota
                </label>
                <input
                  type="text"
                  required
                  value={borrowerName}
                  onChange={(e) => setBorrowerName(e.target.value)}
                  placeholder="Contoh: Rian Budiman"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f2f4f6] text-[13px] border border-[#eceef0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003366]/20"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#001e40] mb-1">
                  Nomor Anggota / NIK / NIM
                </label>
                <input
                  type="text"
                  required
                  value={borrowerId}
                  onChange={(e) => setBorrowerId(e.target.value)}
                  placeholder="Contoh: 3209123456789001 atau #BI-CRB-..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f2f4f6] text-[13px] border border-[#eceef0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003366]/20"
                />
              </div>

              <div className="p-3 bg-[#f2f4f6] rounded-lg text-[11px] text-[#43474f] space-y-1">
                <div className="flex justify-between">
                  <span>Masa Pinjam:</span>
                  <span className="font-semibold text-[#001e40]">14 Hari Kerja</span>
                </div>
                <div className="flex justify-between">
                  <span>Lokasi Pengambilan:</span>
                  <span className="font-semibold text-[#001e40]">Meja Sirkulasi KPwBI Cirebon</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBorrowModal(false)}
                  className="flex-1 py-2.5 rounded-lg bg-[#eceef0] text-[#43474f] text-[13px] font-semibold hover:bg-[#e0e3e5] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-[#001e40] text-white text-[13px] font-semibold hover:bg-[#003366] shadow-sm cursor-pointer"
                >
                  Ajukan Pinjaman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
