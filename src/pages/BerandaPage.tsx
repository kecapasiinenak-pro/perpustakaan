import React from 'react';
import { NavTab } from '../components/Navbar';

interface BerandaPageProps {
  onNavigate: (tab: NavTab) => void;
  onOpenGuide: () => void;
}

export const BerandaPage: React.FC<BerandaPageProps> = ({ onNavigate, onOpenGuide }) => {
  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-[#f7f9fb]">
      {/* Background Decorative Clouds (Megamendung inspired watermarks) */}
      <div className="absolute top-0 right-0 w-[580px] h-[580px] pointer-events-none opacity-[0.05] -mr-20 -mt-20">
        <svg className="w-full h-full text-[#001e40]" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 220C40 220 70 190 120 200C160 208 175 240 210 235C245 230 260 190 300 185C340 180 375 210 375 210C375 210 350 250 300 245C260 241 245 275 200 270C155 265 145 235 110 240C75 245 40 220 40 220Z" fill="currentColor" />
          <path d="M70 170C70 170 95 145 140 152C175 158 190 185 225 180C260 175 275 140 310 135C345 130 380 155 380 155C380 155 360 190 320 185C280 180 265 210 225 205C185 200 175 175 140 180C105 185 70 170 70 170Z" fill="currentColor" />
          <path d="M100 110C100 110 120 90 160 95C195 100 208 122 240 118C272 114 285 85 320 80C350 76 385 100 385 100C385 100 368 130 330 125C295 120 280 148 245 144C210 140 200 118 165 122C132 126 100 110 100 110Z" fill="currentColor" />
          <path d="M150 50C150 50 170 35 200 40C225 44 235 60 260 58C285 56 295 35 325 32C350 30 375 48 375 48C375 48 360 70 335 67C308 64 298 82 270 80C242 78 232 62 205 65C178 68 150 50 150 50Z" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute bottom-10 left-0 w-[420px] h-[420px] pointer-events-none opacity-[0.04] -ml-24">
        <svg className="w-full h-full text-[#775a19]" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 180C30 180 60 150 110 160C150 168 165 200 200 195C235 190 250 150 290 145C330 140 365 170 365 170C365 170 340 210 290 205C250 201 235 235 190 230C145 225 135 195 100 200C65 205 30 180 30 180Z" fill="currentColor" />
          <path d="M60 130C60 130 85 105 130 112C165 118 180 145 215 140C250 135 265 100 300 95C335 90 370 115 370 115C370 115 350 150 310 145C270 140 255 170 215 165C175 160 165 135 130 140C95 145 60 130 60 130Z" fill="currentColor" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 pt-8 lg:pt-10 pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Hero Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eceef0] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#775a19]"></span>
                <span className="text-[12px] text-[#775a19] tracking-wider uppercase font-semibold">
                  Cakrawala Pengetahuan Wilayah Ciayumajakuning
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] text-[#001e40] tracking-tight font-extrabold leading-[1.15]">
                  Selamat Datang di Portal Resmi Perpustakaan{' '}
                  <span className="text-[#003366]">Bank Indonesia Cirebon</span>
                </h1>
                <p className="text-[16px] text-[#43474f] max-w-2xl leading-relaxed">
                  Pusat rujukan literasi ekonomi, moneter, perbankan, sejarah maritim, dan kebudayaan Cirebon terpercaya yang dikurasi langsung untuk kemajuan riset bangsa.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('katalog-buku')}
                className="group inline-flex items-center gap-3 bg-[#003366] hover:bg-[#001e40] text-[#ffffff] text-[15px] font-semibold px-7 py-3.5 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Mulai Jelajah</span>
                <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1.5">
                  arrow_forward
                </span>
              </button>

              <button
                onClick={onOpenGuide}
                className="inline-flex items-center gap-2 bg-[#ffffff] hover:bg-[#f2f4f6] text-[#001e40] text-[15px] font-semibold px-6 py-3.5 rounded-xl shadow-sm transition-all border border-[#eceef0] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] text-[#775a19]">
                  menu_book
                </span>
                <span>Buku Panduan Anggota</span>
              </button>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-[#eceef0]/60">
              <div className="flex flex-col">
                <span className="text-[26px] sm:text-[28px] text-[#001e40] font-extrabold tracking-tight">
                  12,500+
                </span>
                <span className="text-[12px] text-[#43474f] mt-1">Judul Buku Terkurasi</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[26px] sm:text-[28px] text-[#775a19] font-extrabold tracking-tight">
                  3,200+
                </span>
                <span className="text-[12px] text-[#43474f] mt-1">Anggota Aktif</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[26px] sm:text-[28px] text-[#003366] font-extrabold tracking-tight">
                  100%
                </span>
                <span className="text-[12px] text-[#43474f] mt-1">Bebas Biaya Publik</span>
              </div>
            </div>
          </div>

          {/* Hero Right Column: Schedule & Service Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#ffffff] rounded-2xl p-6 sm:p-8 shadow-sm border border-[#eceef0]/80">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#eceef0]/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f2f4f6] flex items-center justify-center text-[#003366]">
                    <span className="material-symbols-outlined text-[22px]">schedule</span>
                  </div>
                  <div>
                    <h3 className="text-[16px] text-[#001e40] font-bold">Jadwal &amp; Jam Layanan</h3>
                    <p className="text-[11px] text-[#43474f]">Layanan Baca Di Tempat &amp; Konsultasi</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Buka Hari Ini
                </span>
              </div>

              <div className="space-y-3.5 pt-5">
                <div className="p-4 rounded-xl bg-[#f2f4f6]/80 flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[13px] text-[#001e40] font-semibold block">Senin – Kamis</span>
                    <span className="text-[12px] text-[#43474f]">Layanan Sirkulasi &amp; Referensi</span>
                  </div>
                  <span className="text-[15px] text-[#001e40] font-bold tracking-tight">08.00 – 15.30 WIB</span>
                </div>

                <div className="p-4 rounded-xl bg-[#f2f4f6]/80 space-y-2.5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[13px] text-[#001e40] font-semibold block">Jumat</span>
                      <span className="text-[12px] text-[#43474f]">Layanan Pustaka</span>
                    </div>
                    <span className="text-[15px] text-[#001e40] font-bold tracking-tight">08.00 – 16.00 WIB</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#785a1a] bg-[#fed488]/30 px-3 py-1.5 rounded-lg text-[12px]">
                    <span className="material-symbols-outlined text-[16px] text-[#775a19]">info</span>
                    <span>Istirahat Shalat Jumat: 11.30 – 13.00 WIB</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#f2f4f6]/40 flex items-center justify-between text-[#43474f]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">event_busy</span>
                    <span className="text-[12px] font-medium">Sabtu – Minggu &amp; Libur Nasional</span>
                  </div>
                  <span className="text-[12px] text-[#ba1a1a] font-semibold">Tutup</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-[#eceef0]/60">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f2f4f6]">
                <span className="material-symbols-outlined text-[#775a19] text-[20px] mt-0.5">location_on</span>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[12px] text-[#001e40] font-semibold">Lokasi Pelayanan</span>
                  <p className="text-[12px] text-[#43474f] leading-relaxed">
                    Gedung Heritage Kantor Perwakilan Bank Indonesia Cirebon<br />
                    Jl. Yos Sudarso No. 5-7, Lemahwungkuk, Cirebon 45111
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[12px] text-[#775a19] uppercase font-semibold tracking-wider block mb-1">
              Fasilitas Unggulan
            </span>
            <h2 className="text-[24px] sm:text-[28px] text-[#001e40] font-bold">
              Sorotan Ruang &amp; Layanan Riset
            </h2>
          </div>
          <p className="text-[13px] text-[#43474f] max-w-md">
            Dirancang menghadirkan kenyamanan studi komprehensif bagi praktisi perbankan, periset daerah, dan civitas akademika.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            onClick={() => onNavigate('katalog-buku')}
            className="group bg-[#ffffff] rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between border border-[#eceef0]/70 cursor-pointer"
          >
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-xl bg-[#d5e3ff] flex items-center justify-center text-[#003366]">
                <span className="material-symbols-outlined text-[28px]">account_balance</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-[19px] text-[#001e40] font-bold group-hover:text-[#003366] transition-colors">
                  Koleksi Moneter &amp; Finansial
                </h3>
                <p className="text-[13px] text-[#43474f] leading-relaxed">
                  Arsip buletin ekonomi moneter, riset makroprudensial, data inflasi historis Ciayumajakuning, dan jurnal terindeks internasional Bank Indonesia.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-4 flex items-center justify-between text-[#001e40] text-[14px] font-semibold border-t border-[#eceef0]/40">
              <span className="text-[12px] text-[#43474f] font-normal">5,000+ Kompendium</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform text-[#003366]">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => onNavigate('detail-buku')}
            className="group bg-[#ffffff] rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between border border-[#eceef0]/70 cursor-pointer"
          >
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-xl bg-[#ffdea5] flex items-center justify-center text-[#785a1a]">
                <span className="material-symbols-outlined text-[28px]">auto_stories</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-[19px] text-[#001e40] font-bold group-hover:text-[#775a19] transition-colors">
                  Pojok Baca &amp; Audio Visual Modern
                </h3>
                <p className="text-[13px] text-[#43474f] leading-relaxed">
                  Area baca ergonomis dengan pencahayaan hangat alami, terminal multimedia untuk arsip visual kemaritiman Cirebon dan sejarah Oeang Republik Indonesia.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-4 flex items-center justify-between text-[#775a19] text-[14px] font-semibold border-t border-[#eceef0]/40">
              <span className="text-[12px] text-[#43474f] font-normal">24 Station Interaktif</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => onNavigate('pendaftaran')}
            className="group bg-[#ffffff] rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between border border-[#eceef0]/70 cursor-pointer"
          >
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-xl bg-[#9cf2e8] flex items-center justify-center text-[#003a36]">
                <span className="material-symbols-outlined text-[28px]">wifi_tethering</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-[19px] text-[#001e40] font-bold group-hover:text-[#003a36] transition-colors">
                  Ruang Diskusi &amp; Wi-Fi Berkecepatan Tinggi
                </h3>
                <p className="text-[13px] text-[#43474f] leading-relaxed">
                  Ruang kolaboratif kedap suara untuk kelompok periset dengan fasilitas presentasi digital dan akses langsung ke jaringan repositori perbankan nasional.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-4 flex items-center justify-between text-[#001e40] text-[14px] font-semibold border-t border-[#eceef0]/40">
              <span className="text-[12px] text-[#43474f] font-normal">Dedicated 1 Gbps</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform text-[#003366]">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 pt-6 pb-16">
        <div className="bg-[#f2f4f6] rounded-2xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-[#eceef0]">
          <div className="space-y-2 max-w-xl z-10">
            <span className="text-[12px] text-[#775a19] font-semibold uppercase tracking-wider">
              Akses Pustaka Terbuka
            </span>
            <h3 className="text-[22px] sm:text-[24px] text-[#001e40] font-bold">
              Belum Menjadi Anggota Perpustakaan BI?
            </h3>
            <p className="text-[13px] text-[#43474f]">
              Daftarkan identitas Anda dalam 3 menit untuk mendapatkan kartu akses fisik dan fasilitas peminjaman koleksi cetak eksklusif.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 z-10 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('pendaftaran')}
              className="flex-1 sm:flex-initial px-6 py-3 bg-[#003366] text-[#ffffff] hover:bg-[#001e40] text-[14px] font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Daftar Keanggotaan
            </button>
            <button
              onClick={() => onNavigate('status')}
              className="flex-1 sm:flex-initial px-5 py-3 bg-[#ffffff] text-[#001e40] hover:bg-[#eceef0] text-[14px] font-semibold rounded-xl transition-all border border-[#eceef0] cursor-pointer"
            >
              Cek Status Peminjaman
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
