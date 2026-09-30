import React from 'react';
import { NavTab } from './Navbar';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
  onOpenGuide,
}) => {
  return (
    <footer className="w-full bg-[#ffffff] shadow-[0_-1px_8px_rgba(0,0,0,0.02)] border-t border-[#eceef0]/60 mt-16">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="Logo Perpustakaan Bank Indonesia Cirebon"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1UlOEVmGzgYLOQc0Q4XiECc3JidaT1YjXtKewsUDOevadAclcx9Mv0XYN_0Cge006hDc1KS_ysLGN1WFDF7SaBMFpK25895gA-BfihpyNHNhyf9KNKNdoOWcjYjKngMZ_XN2c7iP6bpKGiRIsXHAddUrnx7goFtDhLdG-39WP07lF29BG2uEoOhQz3TKK2rfEUcP0dX7b56GYVgVPk5NBb5VcKwiQ4k_kQaQoXAYbfZ6TNG9LKDCYXAEhc"
              />
              <div className="flex flex-col">
                <span className="font-bold text-[16px] text-[#001e40] leading-tight">
                  BI Cirebon
                </span>
                <span className="text-[11px] text-[#775a19] font-medium">
                  Pustaka &amp; Arsip Riset
                </span>
              </div>
            </div>
            <p className="text-[12px] text-[#43474f] leading-relaxed">
              Pusat rujukan literasi ekonomi, moneter, perbankan, dan warisan kebudayaan Ciayumajakuning yang dikelola oleh Kantor Perwakilan Bank Indonesia Cirebon.
            </p>
          </div>

          {/* Office Address */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[15px] text-[#001e40]">Alamat Kantor</h4>
            <p className="text-[12px] text-[#43474f] leading-relaxed">
              Kantor Perwakilan Bank Indonesia Cirebon<br />
              Jl. Yos Sudarso No. 5-7, Lemahwungkuk<br />
              Kota Cirebon, Jawa Barat 45111
            </p>
          </div>

          {/* Contact Service */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[15px] text-[#001e40]">Layanan Kontak</h4>
            <ul className="space-y-2 text-[12px] text-[#43474f]">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#775a19]">call</span>
                <span>Telepon: (0231) 202996 / 203001</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#775a19]">mail</span>
                <span>Surel: perpustakaan_cirebon@bi.go.id</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#775a19]">schedule</span>
                <span>Layanan Informasi: 08.00 - 15.30 WIB</span>
              </li>
            </ul>
          </div>

          {/* Related Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[15px] text-[#001e40]">Tautan Terkait</h4>
            <ul className="space-y-2 text-[12px] text-[#43474f]">
              <li>
                <a
                  href="https://www.bi.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#001e40] hover:underline transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  <span>Bank Indonesia Official</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('katalog-buku')}
                  className="hover:text-[#001e40] hover:underline transition-colors text-left"
                >
                  Katalog Digital Bank Indonesia (BI Library)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('katalog-buku')}
                  className="hover:text-[#001e40] hover:underline transition-colors text-left"
                >
                  Publikasi Riset &amp; Buletin Moneter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('detail-buku')}
                  className="hover:text-[#001e40] hover:underline transition-colors text-left"
                >
                  Koleksi Khusus Budaya Cirebon
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#eceef0] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#43474f]">
          <p>© 2025 Bank Indonesia Kantor Perwakilan Cirebon. Hak Cipta Dilindungi.</p>
          <div className="flex flex-wrap items-center gap-6 text-[12px]">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#001e40] transition-colors cursor-pointer"
            >
              Kebijakan Privasi
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-[#001e40] transition-colors cursor-pointer"
            >
              Ketentuan Layanan Peminjaman
            </button>
            <button
              onClick={onOpenGuide}
              className="hover:text-[#001e40] transition-colors cursor-pointer"
            >
              Panduan Periset
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
