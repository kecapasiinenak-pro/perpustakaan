import React, { useState } from 'react';
import { NavTab } from '../components/Navbar';
import { RegistrationData } from './PendaftaranPage';
import { Book } from '../data/books';

interface StatusPageProps {
  onNavigate: (tab: NavTab) => void;
  lastRegistration?: RegistrationData | null;
  lastLoan?: {
    book: Book;
    date: string;
    token: string;
  } | null;
}

export const StatusPage: React.FC<StatusPageProps> = ({
  onNavigate,
  lastRegistration,
  lastLoan,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTabMode, setActiveTabMode] = useState<'confirmation' | 'lookup'>('confirmation');

  // Search Lookup state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<{
    found: boolean;
    name?: string;
    token?: string;
    type?: string;
    status?: string;
    dueDate?: string;
  } | null>(null);

  const displayToken =
    lastLoan?.token ||
    lastRegistration?.registrationNumber ||
    '#BI-CRB-2025-08492';

  const displayDate =
    lastLoan?.date ||
    lastRegistration?.date ||
    'Jumat, 25 September 2026';

  const handleCopy = () => {
    navigator.clipboard.writeText(displayToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1200);
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const q = lookupQuery.trim().toLowerCase();
    if (!q) return;

    if (
      q.includes('08492') ||
      (lastRegistration && q.includes(lastRegistration.idNumber.toLowerCase())) ||
      (lastRegistration && q.includes(lastRegistration.fullName.toLowerCase())) ||
      q.includes('crb') ||
      q.includes('bi-')
    ) {
      setLookupResult({
        found: true,
        name: lastRegistration?.fullName || 'Arif Budiman (Periset Kebijakan)',
        token: displayToken,
        type: lastLoan ? `Peminjaman: ${lastLoan.book.title}` : 'Keanggotaan Perpustakaan',
        status: 'Terverifikasi Aktif',
        dueDate: '14 Hari Kerja (Sirkulasi Terbuka)',
      });
    } else {
      setLookupResult({
        found: false,
      });
    }
  };

  return (
    <div className="flex flex-col w-full relative min-h-[calc(100vh-5rem)]">
      {/* Background Decorative Ambience with Megamendung Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <svg
          className="absolute -top-12 -right-16 w-96 h-96 opacity-[0.04] text-[#001e40]"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <path d="M44.5,29.3 C56.7,29.3 67.2,37.8 70.1,49.5 C74.2,46.2 79.5,44.2 85.3,44.2 C98.5,44.2 109.4,54.1 110.8,67.1 C115.8,64.2 121.7,62.5 128,62.5 C146.2,62.5 161,77.3 161,95.5 C161,97.2 160.9,98.9 160.6,100.5 C173.6,104.3 183,116.3 183,130.6 C183,148.3 168.7,162.6 151,162.6 L41,162.6 C18.4,162.6 0,144.2 0,121.6 C0,100.8 15.5,83.6 35.8,81 C37.8,51.8 62.3,29.3 44.5,29.3 Z" />
        </svg>
        <svg
          className="absolute bottom-10 -left-20 w-[480px] h-[480px] opacity-[0.03] text-[#001e40]"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <path d="M40,60 C60,40 100,50 110,70 C130,60 160,80 160,110 C160,140 130,160 100,160 L30,160 C10,160 0,140 0,120 C0,95 20,80 40,60 Z" />
        </svg>

        {/* Atmospheric Dashboard Backing */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-8 opacity-25 filter blur-[2px]">
          <div className="h-6 w-48 bg-[#e0e3e5] rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-44 bg-[#f2f4f6] rounded-xl"></div>
            <div className="h-44 bg-[#f2f4f6] rounded-xl"></div>
            <div className="h-44 bg-[#f2f4f6] rounded-xl"></div>
          </div>
          <div className="mt-8 h-80 bg-[#f2f4f6] rounded-2xl"></div>
        </div>
      </div>

      {/* Dimming Backdrop Scrim Overlay with Card */}
      <div className="relative z-20 flex flex-col items-center justify-center p-4 sm:p-6 my-auto min-h-[calc(100vh-10rem)]">
        {/* Switch tab for quick lookup or view receipt */}
        <div className="flex items-center gap-2 mb-4 bg-[#f2f4f6] p-1 rounded-xl border border-[#eceef0] shadow-xs">
          <button
            onClick={() => setActiveTabMode('confirmation')}
            className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
              activeTabMode === 'confirmation'
                ? 'bg-[#001e40] text-white shadow-xs'
                : 'text-[#43474f] hover:text-[#001e40]'
            }`}
          >
            Bukti Transaksi
          </button>
          <button
            onClick={() => setActiveTabMode('lookup')}
            className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
              activeTabMode === 'lookup'
                ? 'bg-[#001e40] text-white shadow-xs'
                : 'text-[#43474f] hover:text-[#001e40]'
            }`}
          >
            Cek Status Mandiri
          </button>
        </div>

        {activeTabMode === 'confirmation' ? (
          /* Central Success Confirmation Card */
          <div
            className="relative w-full max-w-[580px] bg-[#ffffff] rounded-2xl shadow-[0_24px_50px_-12px_rgba(0,30,64,0.22),0_4px_16px_-4px_rgba(0,0,0,0.06)] overflow-hidden my-auto transform transition-all border border-[#eceef0] animate-fadeIn"
            id="statusModalCard"
          >
            {/* Top Subtle Gold-to-Navy Edge Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#001e40] via-[#775a19] to-[#003366]"></div>

            {/* Card Inner Body */}
            <div className="p-6 sm:p-9 flex flex-col items-center text-center">
              {/* Large Animated Success Checkmark Ring */}
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute w-24 h-24 rounded-full bg-emerald-500/10 animate-ping opacity-60 duration-1000"></div>
                <div className="relative w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center shadow-[0_4px_14px_rgba(16,185,129,0.18)]">
                  <svg
                    className="w-12 h-12 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3.5"
                    viewBox="0 0 48 48"
                  >
                    <circle
                      className="stroke-emerald-200"
                      cx="24"
                      cy="24"
                      fill="none"
                      r="21"
                      strokeWidth="2.5"
                    ></circle>
                    <path
                      className="stroke-emerald-600 stroke-[3.5]"
                      d="M14 24.5L21 31.5L34 17"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Section Hierarchy Badging */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6e8ea] text-[#43474f] text-[12px] font-semibold tracking-wider uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Konfirmasi Transaksi Sistem
              </span>

              {/* Headline Title */}
              <h1 className="text-[22px] sm:text-[24px] text-[#001e40] font-bold tracking-tight mb-3">
                Selamat! Pendaftaran / Peminjaman Berhasil
              </h1>

              {/* Descriptive Paragraph */}
              <p className="text-[14px] text-[#43474f] leading-relaxed max-w-md mx-auto mb-6">
                Permintaan Anda telah tercatat dalam sistem{' '}
                <strong className="font-semibold text-[#191c1e]">
                  Perpustakaan Bank Indonesia Cirebon
                </strong>
                . Kartu anggota digital serta bukti peminjaman telah dikirimkan ke email Anda.
              </p>

              {/* Transaction Details Bento Panel */}
              <div className="w-full bg-[#f2f4f6] rounded-xl p-4 sm:p-5 text-left mb-6 space-y-3.5 border border-[#eceef0]">
                {/* Registration Token */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 bg-[#ffffff]/80 p-3 rounded-lg gap-1.5 sm:gap-0 border border-[#eceef0]/60">
                  <span className="text-[12px] text-[#43474f]">Nomor Registrasi Sistem</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-[#001e40] font-bold tracking-wide font-mono">
                      {displayToken}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="p-1 text-[#43474f] hover:text-[#001e40] transition-colors rounded cursor-pointer"
                      title="Salin Nomor Registrasi"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {copied ? 'done' : 'content_copy'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Status Pill */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] text-[#43474f]">Status Registrasi</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Terverifikasi Aktif
                  </span>
                </div>

                {/* Processing Date */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-[13px] text-[#43474f]">Tanggal Proses</span>
                  <span className="text-[13px] text-[#191c1e] font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#43474f] text-[16px]">
                      event_available
                    </span>
                    <span>{displayDate}</span>
                  </span>
                </div>

                {/* Pick-up & Service Desk */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between px-1 pt-1 gap-1 sm:gap-4">
                  <span className="text-[13px] text-[#43474f] shrink-0">Lokasi Layanan</span>
                  <span className="text-[13px] text-[#001e40] font-semibold text-right flex items-center sm:justify-end gap-1.5">
                    <span className="material-symbols-outlined text-[#775a19] text-[18px] shrink-0">
                      account_balance
                    </span>
                    <span>Meja Layanan Sirkulasi KPwBI Cirebon</span>
                  </span>
                </div>

                {lastLoan && (
                  <div className="flex items-center justify-between px-1 pt-2 border-t border-[#eceef0]">
                    <span className="text-[12px] text-[#43474f]">Judul Koleksi:</span>
                    <span className="text-[12px] text-[#001e40] font-semibold text-right truncate max-w-[240px]">
                      {lastLoan.book.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Note Notice Box */}
              <div className="w-full flex items-start gap-3 p-3.5 bg-[#fed488]/20 rounded-xl text-left mb-6 border border-[#fed488]/40">
                <span className="material-symbols-outlined text-[#775a19] text-[20px] shrink-0 mt-0.5">
                  info
                </span>
                <p className="text-[12px] text-[#43474f] leading-normal">
                  Tunjukkan kode QR pada kartu digital atau bukti peminjaman kepada staf sirkulasi di lobi perpustakaan saat pengambilan koleksi fisik.
                </p>
              </div>

              {/* Action CTAs */}
              <div className="w-full flex flex-col sm:flex-row items-center gap-3">
                {/* Primary CTA Button (Download PDF) */}
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-[#003366] text-[#ffffff] font-semibold text-[14px] hover:bg-[#001e40] transition-all duration-200 shadow-md flex items-center justify-center gap-2 group active:scale-[0.99] cursor-pointer"
                >
                  {downloading ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">
                        progress_activity
                      </span>
                      <span>Menyiapkan PDF...</span>
                    </>
                  ) : downloadSuccess ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] text-emerald-300">
                        task_alt
                      </span>
                      <span>Dokumen Telah Diunduh</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px] group-hover:translate-y-0.5 transition-transform">
                        download
                      </span>
                      <span>Unduh Kartu / Bukti (PDF)</span>
                    </>
                  )}
                </button>

                {/* Secondary CTA Button (Explore/Home) */}
                <button
                  type="button"
                  onClick={() => onNavigate('katalog-buku')}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#eceef0] hover:bg-[#e0e3e5] text-[#001e40] font-semibold text-[14px] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                  <span>Jelajahi Katalog Buku</span>
                </button>
              </div>

              {/* Tertiary Subtle Dismissal */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('beranda')}
                  className="text-[12px] text-[#43474f] hover:text-[#001e40] transition-colors underline decoration-[#c3c6d1] underline-offset-4 cursor-pointer"
                >
                  Kembali ke Beranda Utama
                </button>
              </div>
            </div>

            {/* Institutional Footer Ribbon Inside Modal */}
            <div className="bg-[#eceef0] px-6 py-2.5 flex items-center justify-between text-left border-t border-[#e0e3e5]">
              <span className="text-[11px] text-[#43474f] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#001e40]">
                  verified_user
                </span>
                <span>Sistem Informasi Pustaka KPwBI Cirebon</span>
              </span>
              <span className="text-[11px] text-[#775a19] font-semibold">Layanan Resmi</span>
            </div>
          </div>
        ) : (
          /* Cek Status Mandiri Lookup Box */
          <div className="relative w-full max-w-[580px] bg-[#ffffff] rounded-2xl shadow-xl overflow-hidden my-auto p-6 sm:p-8 border border-[#eceef0] animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#d5e3ff] text-[#003366] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">manage_search</span>
              </div>
              <div>
                <h2 className="text-[18px] font-bold text-[#001e40]">Cek Status Keanggotaan &amp; Pinjaman</h2>
                <p className="text-[12px] text-[#43474f]">Lacak nomor registrasi pendaftaran atau nomor identitas Anda</p>
              </div>
            </div>

            <form onSubmit={handleLookup} className="space-y-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  placeholder="Ketik Nomor Registrasi (cth: #BI-CRB-...) atau NIK / Nama"
                  className="w-full pl-4 pr-24 py-3 bg-[#f2f4f6] rounded-xl text-[14px] text-[#191c1e] border border-[#eceef0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003366]/20"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#001e40] text-white text-[13px] font-semibold rounded-lg hover:bg-[#003366] transition-colors cursor-pointer"
                >
                  Periksa
                </button>
              </div>
            </form>

            {lookupResult && (
              <div className="space-y-4">
                {lookupResult.found ? (
                  <div className="bg-[#ecfdf5] border border-emerald-200 rounded-xl p-4 text-[13px] space-y-2">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                      <span className="font-semibold text-emerald-800">Status Data: Terverifikasi</span>
                      <span className="font-mono text-emerald-900 font-bold">{lookupResult.token}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-emerald-950">
                      <div>
                        <span className="text-[11px] text-emerald-700 block">Nama Anggota:</span>
                        <span className="font-semibold">{lookupResult.name}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-emerald-700 block">Layanan:</span>
                        <span className="font-semibold">{lookupResult.type}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#fff1f2] border border-rose-200 rounded-xl p-4 text-[13px] text-rose-800 text-center">
                    Data tidak ditemukan. Silakan pastikan nomor registrasi atau NIK Anda sudah benar.
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-[#eceef0] flex items-center justify-between text-[13px]">
              <button
                type="button"
                onClick={() => onNavigate('pendaftaran')}
                className="text-[#003366] hover:underline font-semibold cursor-pointer"
              >
                + Daftar Anggota Baru
              </button>
              <button
                type="button"
                onClick={() => onNavigate('katalog-buku')}
                className="text-[#43474f] hover:text-[#001e40] cursor-pointer"
              >
                Ke Katalog Buku →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
