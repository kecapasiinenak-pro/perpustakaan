import React, { useState, useMemo } from 'react';
import { Book, BOOKS } from '../data/books';
import { NavTab } from '../components/Navbar';

interface KatalogPageProps {
  onNavigate: (tab: NavTab) => void;
  onSelectBook: (book: Book) => void;
  onOpenConsultation?: () => void;
}

export const KatalogPage: React.FC<KatalogPageProps> = ({
  onNavigate,
  onSelectBook,
  onOpenConsultation,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [selectedQuickBook, setSelectedQuickBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categories = [
    { id: 'all', label: 'Semua Koleksi' },
    { id: 'moneter', label: 'Kebijakan Moneter' },
    { id: 'bisnis', label: 'Ekonomi & Bisnis' },
    { id: 'cirebon', label: 'Sejarah & Maritim Cirebon' },
    { id: 'finansial', label: 'Literasi Finansial' },
  ];

  const filteredBooks = useMemo(() => {
    let result = [...BOOKS];

    // Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter((book) => book.categoryId === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.callNumber.toLowerCase().includes(q) ||
          b.categoryLabel.toLowerCase().includes(q) ||
          (b.tags && b.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Sort
    if (sortBy === 'title-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const handleOpenDetail = (book: Book) => {
    onSelectBook(book);
    onNavigate('detail-buku');
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Decorative Megamendung ambient vector backdrop */}
      <div className="relative w-full overflow-hidden pb-12">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#001e40]/5 blur-3xl pointer-events-none"></div>
        <div className="absolute top-40 left-10 w-72 h-72 rounded-full bg-[#fed488]/20 blur-2xl pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-6 lg:pt-10">
          {/* Breadcrumb Header */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6e8ea] text-[#43474f] text-[11px] font-medium">
              <span className="material-symbols-outlined text-[14px] text-[#775a19]">local_library</span>
              Portal Riset &amp; Pustaka Cirebon
            </span>
            <span className="text-[#c3c6d1] text-[11px]">•</span>
            <span className="text-[11px] text-[#775a19] font-bold uppercase tracking-wider">
              Koleksi Terbuka
            </span>
          </div>

          {/* Main Title & Mini Stats */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
            <div className="max-w-3xl">
              <h1 className="text-[28px] sm:text-[34px] text-[#001e40] font-bold tracking-tight">
                Katalog Koleksi Buku &amp; Pustaka
              </h1>
              <p className="text-[15px] text-[#43474f] mt-2 max-w-2xl leading-relaxed">
                Jelajahi beragam literatur moneter, perbankan, ekonomi syariah, UMKM, hingga sejarah lokal Cirebon yang tersimpan di Perpustakaan Bank Indonesia Cirebon.
              </p>
            </div>

            {/* Quick Summary Mini-Stats */}
            <div className="flex items-center gap-3 shrink-0 bg-[#ffffff] px-4 py-3 rounded-xl shadow-sm border border-[#eceef0]/80">
              <div className="w-10 h-10 rounded-lg bg-[#d5e3ff] flex items-center justify-center text-[#001e40]">
                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
              </div>
              <div>
                <div className="text-[20px] text-[#001e40] leading-tight font-extrabold">1.480+</div>
                <div className="text-[11px] text-[#43474f]">Judul Terkatalog</div>
              </div>
            </div>
          </div>

          {/* Omnibox Interactive Search & Filters Area */}
          <div className="bg-[#ffffff] rounded-2xl shadow-sm border border-[#eceef0] p-4 lg:p-6 mb-10">
            {/* Search Field */}
            <div className="relative w-full mb-5">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#737780]">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan judul buku, nama pengarang, topik, atau nomor klasifikasi..."
                className="w-full pl-12 pr-28 py-3.5 bg-[#f2f4f6] rounded-xl text-[#191c1e] text-[14px] placeholder:text-[#737780] focus:bg-[#ffffff] focus:ring-2 focus:ring-[#003366]/20 focus:outline-none transition-all"
              />
              <div className="absolute inset-y-0 right-2 flex items-center">
                <button
                  type="button"
                  onClick={() => {}}
                  className="px-4 py-2 bg-[#001e40] text-[#ffffff] rounded-lg text-[12px] font-semibold hover:bg-[#003366] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span>Cari</span>
                </button>
              </div>
            </div>

            {/* Category Pills Bar */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#001e40] text-[#ffffff] shadow-sm'
                          : 'bg-[#f2f4f6] text-[#43474f] hover:bg-[#e6e8ea]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-[#43474f]">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#f2f4f6] text-[#191c1e] text-[12px] font-semibold px-3 py-1.5 rounded-lg outline-none cursor-pointer border border-[#eceef0]"
                >
                  <option value="terbaru">Terbaru Ditambahkan</option>
                  <option value="title-asc">Judul (A - Z)</option>
                  <option value="popular">Paling Sering Dipinjam</option>
                </select>
              </div>
            </div>
          </div>

          {/* Book Grid 3-Column */}
          {filteredBooks.length === 0 ? (
            <div className="bg-[#ffffff] rounded-2xl p-12 text-center border border-[#eceef0]">
              <span className="material-symbols-outlined text-[48px] text-[#737780] mb-3">
                menu_book
              </span>
              <h3 className="text-[18px] font-bold text-[#001e40]">Tidak Ada Buku Ditemukan</h3>
              <p className="text-[13px] text-[#43474f] mt-1 max-w-md mx-auto">
                Coba sesuaikan kata kunci pencarian Anda atau pilih kategori &quot;Semua Koleksi&quot;.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-[#003366] text-white text-[13px] font-semibold rounded-lg"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filteredBooks.map((book) => {
                const isAvailable = book.status === 'Tersedia';
                return (
                  <article
                    key={book.id}
                    className="flex flex-col bg-[#ffffff] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 group border border-[#eceef0]/80"
                  >
                    {/* Book Cover Container with Badges */}
                    <div
                      onClick={() => handleOpenDetail(book)}
                      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#eceef0] mb-5 cursor-pointer"
                    >
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={book.title}
                        src={book.image}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md bg-[#ffffff]/90 backdrop-blur-sm text-[#001e40] text-[11px] font-semibold tracking-wide shadow-xs">
                          {book.categoryLabel}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 py-1 rounded-md bg-[#001e40]/85 text-[#ffffff] text-[11px] font-mono">
                          {book.callNumber}
                        </span>
                      </div>
                    </div>

                    {/* Book Metadata & Title */}
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]"></span>
                        <span className="text-[11px] text-[#43474f] font-medium">
                          {book.subLabel}
                        </span>
                      </div>

                      <h2
                        onClick={() => handleOpenDetail(book)}
                        className="text-[18px] font-bold text-[#001e40] group-hover:text-[#003366] transition-colors line-clamp-2 mb-2 cursor-pointer leading-snug"
                      >
                        {book.title}
                      </h2>

                      <p className="text-[12px] text-[#43474f] mb-4 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#737780]">
                          edit_note
                        </span>
                        <span>{book.author}</span>
                      </p>

                      {/* Card Footer: Status & Actions */}
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#eceef0]/60">
                        {isAvailable ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[12px] font-semibold">Tersedia</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            <span className="text-[12px] font-semibold">Dipinjam</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedQuickBook(book)}
                            title="Pratinjau Cepat"
                            className="p-1.5 text-[#43474f] hover:text-[#001e40] rounded-lg hover:bg-[#f2f4f6] transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenDetail(book)}
                            className="inline-flex items-center gap-1 text-[#001e40] hover:text-[#775a19] text-[12px] font-semibold px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] transition-colors cursor-pointer"
                          >
                            <span>Lihat Detail</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-[#eceef0]">
            <p className="text-[12px] text-[#43474f]">
              Menampilkan <span className="font-semibold text-[#001e40]">1 - 6</span> dari{' '}
              <span className="font-semibold text-[#001e40]">58</span> koleksi literatur
            </p>

            <nav aria-label="Pagination Navigasi" className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                aria-label="Halaman Sebelumnya"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#737780] hover:text-[#001e40] hover:bg-[#e6e8ea] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`w-10 h-10 rounded-lg font-bold text-[14px] flex items-center justify-center shadow-sm cursor-pointer ${
                  currentPage === 1
                    ? 'bg-[#001e40] text-[#ffffff]'
                    : 'text-[#191c1e] hover:bg-[#e6e8ea]'
                }`}
              >
                1
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className={`w-10 h-10 rounded-lg font-bold text-[14px] flex items-center justify-center transition-all cursor-pointer ${
                  currentPage === 2
                    ? 'bg-[#001e40] text-[#ffffff]'
                    : 'text-[#191c1e] hover:bg-[#e6e8ea]'
                }`}
              >
                2
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(3)}
                className={`w-10 h-10 rounded-lg font-bold text-[14px] flex items-center justify-center transition-all cursor-pointer ${
                  currentPage === 3
                    ? 'bg-[#001e40] text-[#ffffff]'
                    : 'text-[#191c1e] hover:bg-[#e6e8ea]'
                }`}
              >
                3
              </button>
              <span className="px-2 text-[#737780] text-[14px] select-none">...</span>
              <button
                type="button"
                onClick={() => setCurrentPage(10)}
                className={`w-10 h-10 rounded-lg font-bold text-[14px] flex items-center justify-center transition-all cursor-pointer ${
                  currentPage === 10
                    ? 'bg-[#001e40] text-[#ffffff]'
                    : 'text-[#191c1e] hover:bg-[#e6e8ea]'
                }`}
              >
                10
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(Math.min(10, currentPage + 1))}
                aria-label="Halaman Berikutnya"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#737780] hover:text-[#001e40] hover:bg-[#e6e8ea] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </nav>
          </div>

          {/* Quick Advisory Banner */}
          <div className="mt-8 bg-[#ffffff] p-6 rounded-2xl shadow-sm border border-[#eceef0] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#fed488]/40 text-[#785a1a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">contact_support</span>
              </div>
              <div>
                <h3 className="text-[16px] text-[#001e40] font-bold">
                  Butuh Naskah Riset atau Data Khusus Bank Indonesia?
                </h3>
                <p className="text-[12px] text-[#43474f] mt-1">
                  Petugas pustaka kami dapat membantu penelusuran buletin riset moneter internal dan rujukan arsip ekonomi Ciayumajakuning.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (onOpenConsultation) {
                    onOpenConsultation();
                  } else {
                    onNavigate('pendaftaran');
                  }
                }}
                className="px-5 py-2.5 rounded-lg bg-[#003366] text-[#ffffff] font-semibold text-[14px] hover:bg-[#001e40] transition-all shadow-sm cursor-pointer"
              >
                Hubungi Pustakawan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Quick View Drawer / Modal */}
      {selectedQuickBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001e40]/40 backdrop-blur-sm transition-opacity">
          <div className="bg-[#ffffff] w-full max-w-lg rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 relative animate-fadeIn border border-[#eceef0]">
            <button
              type="button"
              onClick={() => setSelectedQuickBook(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f2f4f6] text-[#191c1e] hover:bg-[#e6e8ea] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-md bg-[#d5e3ff] text-[#1f477b] text-[11px] font-semibold">
                Informasi Pustaka
              </span>
              <span className="text-[11px] text-[#43474f] font-mono">
                {selectedQuickBook.callNumber}
              </span>
            </div>

            <h3 className="text-[20px] font-bold text-[#001e40] mb-2 leading-snug">
              {selectedQuickBook.title}
            </h3>
            <p className="text-[14px] text-[#43474f] mb-6">
              Penulis: {selectedQuickBook.author}
            </p>

            <div className="space-y-3 bg-[#f2f4f6] p-4 rounded-xl mb-6 text-[13px]">
              <div className="flex justify-between items-center">
                <span className="text-[#43474f]">Tahun Terbit</span>
                <span className="text-[#191c1e] font-semibold">{selectedQuickBook.year}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#43474f]">Lokasi Rak</span>
                <span className="text-[#191c1e] font-semibold text-right">
                  {selectedQuickBook.location}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#43474f]">Status Ketersediaan</span>
                <span
                  className={`font-semibold ${
                    selectedQuickBook.status === 'Tersedia'
                      ? 'text-emerald-700'
                      : 'text-rose-700'
                  }`}
                >
                  ● {selectedQuickBook.status === 'Tersedia' ? 'Tersedia untuk Dipinjam' : 'Sedang Dipinjam'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const book = selectedQuickBook;
                  setSelectedQuickBook(null);
                  handleOpenDetail(book);
                }}
                className="flex-1 py-3 bg-[#001e40] text-[#ffffff] font-semibold text-[14px] text-center rounded-xl hover:bg-[#003366] transition-all shadow-sm cursor-pointer"
              >
                Halaman Detail Lengkap
              </button>
              <button
                type="button"
                onClick={() => setSelectedQuickBook(null)}
                className="px-5 py-3 bg-[#e6e8ea] text-[#191c1e] font-semibold text-[14px] rounded-xl hover:bg-[#d8dadc] transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
