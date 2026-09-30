import React, { useState } from 'react';

export type NavTab = 'beranda' | 'katalog-buku' | 'detail-buku' | 'pendaftaran' | 'status';

interface NavbarProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'katalog-buku', label: 'Katalog Buku' },
    { id: 'detail-buku', label: 'Detail Buku' },
    { id: 'pendaftaran', label: 'Pendaftaran' },
    { id: 'status', label: 'Status' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all">
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4 lg:gap-6">
        {/* Logo and Brand Title */}
        <button
          onClick={() => {
            onNavigate('beranda');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3.5 shrink-0 text-left cursor-pointer group focus:outline-none"
        >
          <img
            alt="Logo Perpustakaan Bank Indonesia Cirebon"
            className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1UlOEVmGzgYLOQc0Q4XiECc3JidaT1YjXtKewsUDOevadAclcx9Mv0XYN_0Cge006hDc1KS_ysLGN1WFDF7SaBMFpK25895gA-BfihpyNHNhyf9KNKNdoOWcjYjKngMZ_XN2c7iP6bpKGiRIsXHAddUrnx7goFtDhLdG-39WP07lF29BG2uEoOhQz3TKK2rfEUcP0dX7b56GYVgVPk5NBb5VcKwiQ4k_kQaQoXAYbfZ6TNG9LKDCYXAEhc"
          />
          <div className="flex flex-col">
            <span className="font-bold text-[17px] text-[#001e40] tracking-tight leading-tight group-hover:text-[#003366] transition-colors">
              Perpustakaan
            </span>
            <span className="text-[11px] text-[#43474f] font-medium tracking-normal">
              Bank Indonesia Cirebon
            </span>
          </div>
        </button>

        {/* Desktop Nav Pills */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#f2f4f6] p-1 rounded-xl">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 text-[14px] rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#003366] text-[#ffffff] font-semibold shadow-sm'
                    : 'text-[#43474f] font-normal hover:text-[#191c1e] hover:bg-[#e6e8ea]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Info Section */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Operating Hours Pill */}
          <div className="hidden sm:flex items-center gap-2 bg-[#f2f4f6] px-3 py-1.5 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-[#53a9a0] animate-pulse"></span>
            <span className="text-[#43474f] font-medium">Buka: Senin - Jumat</span>
            <span className="text-[#775a19] font-semibold">(08.00 - 15.30 WIB)</span>
          </div>

          {/* Staff Profile Badge */}
          <div className="flex items-center gap-2.5 sm:pl-2 border-l sm:border-[#eceef0]">
            <img
              alt="Staf Layanan Perpustakaan Bank Indonesia Cirebon"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#eceef0]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs2Stfk9k6RV6w1Vw9una5_TThm5kSM8XTS1SyqvhNv1HPfw3RlAPefjNazQ07VNMjBvL44fdtYuK_kL0C2yjsqmJQpihkGvtGUDC_qQ3SIeb60Ez5C0JsiuKXLpcVsEYDCYqcuQOVzATabaIFhHunH_3uVX1IcPJnBbpzRyIGgNk6UlZst9ESt0Eo2BLQIsqhqngrfCUi42ynJjJ9iSjwb8SGV46XzXVM85dEwEa5uzkXBIIs26QbQQ"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[12px] text-[#191c1e] leading-none font-semibold">
                Staf Layanan
              </span>
              <span className="text-[11px] text-[#43474f] leading-none mt-1">
                Perpustakaan BI
              </span>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#001e40] hover:bg-[#f2f4f6] focus:outline-none"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#eceef0] bg-[#ffffff] px-4 py-3 shadow-lg transition-all animate-fadeIn">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-[14px] transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-[#003366] text-[#ffffff] font-semibold'
                      : 'text-[#43474f] hover:bg-[#f2f4f6]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Hours Pill */}
          <div className="mt-3 pt-3 border-t border-[#eceef0] flex items-center gap-2 text-xs text-[#43474f] px-2">
            <span className="w-2 h-2 rounded-full bg-[#53a9a0] animate-pulse"></span>
            <span>Buka: Senin - Jumat (08.00 - 15.30 WIB)</span>
          </div>
        </div>
      )}
    </header>
  );
};
