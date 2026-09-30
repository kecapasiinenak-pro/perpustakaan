import React, { useState } from 'react';
import { NavTab } from '../components/Navbar';

export interface RegistrationData {
  category: 'pelajar' | 'mahasiswa' | 'umum';
  fullName: string;
  idNumber: string;
  institution: string;
  email: string;
  phone: string;
  registrationNumber: string;
  date: string;
}

interface PendaftaranPageProps {
  onNavigate: (tab: NavTab) => void;
  onRegistrationSuccess: (data: RegistrationData) => void;
}

export const PendaftaranPage: React.FC<PendaftaranPageProps> = ({
  onNavigate,
  onRegistrationSuccess,
}) => {
  const [category, setCategory] = useState<'pelajar' | 'mahasiswa' | 'umum'>('pelajar');
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [institution, setInstitution] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('Harap setujui tata tertib kunjungan dan peminjaman buku.');
      return;
    }

    const regNum = `#BI-CRB-2025-${Math.floor(10000 + Math.random() * 90000)}`;
    const regData: RegistrationData = {
      category,
      fullName,
      idNumber,
      institution,
      email,
      phone,
      registrationNumber: regNum,
      date: new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    setSubmitted(true);
    onRegistrationSuccess(regData);

    // Smoothly scroll or navigate after brief notification
    setTimeout(() => {
      onNavigate('status');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Banner */}
      <div className="relative w-full overflow-hidden bg-[#f2f4f6] py-10 lg:py-16">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#d5e3ff]/40 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-[#ffdea5]/30 blur-2xl pointer-events-none"></div>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#ffffff] px-3.5 py-1.5 rounded-full shadow-sm">
                <span className="material-symbols-outlined text-[#775a19] text-[18px]">
                  verified_user
                </span>
                <span className="text-[12px] text-[#775a19] tracking-wider uppercase font-semibold">
                  Layanan Keanggotaan Terpadu
                </span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] text-[#001e40] font-bold tracking-tight">
                Pendaftaran Keanggotaan Perpustakaan
              </h1>
              <p className="text-[15px] text-[#43474f] leading-relaxed">
                Nikmati akses gratis ribuan koleksi literatur, jurnal ilmiah terakreditasi, dan fasilitas ruang baca modern Bank Indonesia Cirebon.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#eceef0] lg:self-center">
              <div className="w-12 h-12 rounded-lg bg-[#e6e8ea] flex items-center justify-center text-[#003366]">
                <span className="material-symbols-outlined text-[24px]">id_card</span>
              </div>
              <div>
                <p className="text-[11px] text-[#43474f]">Status Akses</p>
                <p className="text-[16px] text-[#001e40] font-bold">Terbuka Untuk Umum</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Form & Sidebar */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 -mt-6 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Container (8 Cols) */}
          <div className="lg:col-span-8 bg-[#ffffff] p-6 sm:p-10 lg:p-12 rounded-2xl shadow-md border border-[#eceef0] space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8" id="formPendaftaran">
              {/* Step 1: Kategori Pendaftar */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[16px] text-[#001e40] font-bold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#003366] text-[#ffffff] flex items-center justify-center text-[12px] font-bold">
                      1
                    </span>
                    <span>Kategori Pendaftar</span>
                  </label>
                  <span className="text-[12px] text-[#775a19] font-medium">* Wajib dipilih</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Option 1: Pelajar */}
                  <label
                    onClick={() => setCategory('pelajar')}
                    className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                      category === 'pelajar'
                        ? 'bg-[#ffffff] shadow-sm ring-2 ring-[#003366] border-transparent'
                        : 'bg-[#f2f4f6] hover:bg-[#eceef0] border-transparent'
                    }`}
                  >
                    <input
                      type="radio"
                      name="kategori"
                      value="pelajar"
                      checked={category === 'pelajar'}
                      onChange={() => setCategory('pelajar')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#e0e3e5] flex items-center justify-center text-[#001e40]">
                        <span className="material-symbols-outlined text-[18px]">school</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          category === 'pelajar' ? 'bg-[#003366]' : 'bg-[#e0e3e5]'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            category === 'pelajar' ? 'bg-white' : 'bg-transparent'
                          }`}
                        ></div>
                      </div>
                    </div>
                    <span className="text-[15px] font-bold text-[#191c1e]">Anak Sekolah</span>
                    <span className="text-[11px] text-[#43474f] mt-0.5">(Pelajar SD/SMP/SMA)</span>
                  </label>

                  {/* Option 2: Mahasiswa */}
                  <label
                    onClick={() => setCategory('mahasiswa')}
                    className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                      category === 'mahasiswa'
                        ? 'bg-[#ffffff] shadow-sm ring-2 ring-[#003366] border-transparent'
                        : 'bg-[#f2f4f6] hover:bg-[#eceef0] border-transparent'
                    }`}
                  >
                    <input
                      type="radio"
                      name="kategori"
                      value="mahasiswa"
                      checked={category === 'mahasiswa'}
                      onChange={() => setCategory('mahasiswa')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#e0e3e5] flex items-center justify-center text-[#001e40]">
                        <span className="material-symbols-outlined text-[18px]">local_library</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          category === 'mahasiswa' ? 'bg-[#003366]' : 'bg-[#e0e3e5]'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            category === 'mahasiswa' ? 'bg-white' : 'bg-transparent'
                          }`}
                        ></div>
                      </div>
                    </div>
                    <span className="text-[15px] font-bold text-[#191c1e]">Anak Kuliah</span>
                    <span className="text-[11px] text-[#43474f] mt-0.5">
                      (Mahasiswa D3/S1/S2/S3)
                    </span>
                  </label>

                  {/* Option 3: Umum */}
                  <label
                    onClick={() => setCategory('umum')}
                    className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                      category === 'umum'
                        ? 'bg-[#ffffff] shadow-sm ring-2 ring-[#003366] border-transparent'
                        : 'bg-[#f2f4f6] hover:bg-[#eceef0] border-transparent'
                    }`}
                  >
                    <input
                      type="radio"
                      name="kategori"
                      value="umum"
                      checked={category === 'umum'}
                      onChange={() => setCategory('umum')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#e0e3e5] flex items-center justify-center text-[#001e40]">
                        <span className="material-symbols-outlined text-[18px]">person</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          category === 'umum' ? 'bg-[#003366]' : 'bg-[#e0e3e5]'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            category === 'umum' ? 'bg-white' : 'bg-transparent'
                          }`}
                        ></div>
                      </div>
                    </div>
                    <span className="text-[15px] font-bold text-[#191c1e]">Umum</span>
                    <span className="text-[11px] text-[#43474f] mt-0.5">
                      (Praktisi, Peneliti, Publik)
                    </span>
                  </label>
                </div>
              </div>

              {/* Step 2: Biodata & Kontak */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-[16px] text-[#001e40] font-bold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#003366] text-[#ffffff] flex items-center justify-center text-[12px] font-bold">
                      2
                    </span>
                    <span>Biodata &amp; Informasi Kontak</span>
                  </label>
                </div>

                <div className="space-y-5">
                  {/* Nama Lengkap */}
                  <div className="space-y-1.5">
                    <label className="block text-[14px] font-semibold text-[#191c1e]">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#43474f]">
                        <span className="material-symbols-outlined text-[18px]">badge</span>
                      </span>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Masukkan nama lengkap sesuai KTP/Kartu Pelajar"
                        className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[14px] placeholder:text-[#43474f]/60 focus:bg-[#ffffff] focus:ring-2 focus:ring-[#003366]/20 focus:outline-none transition-all border border-transparent focus:border-[#003366]/40"
                      />
                    </div>
                  </div>

                  {/* 2 Cols: Nomor Induk & Asal Instansi */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-[14px] font-semibold text-[#191c1e]">
                        Nomor Induk (NISN/NIM/NIK)
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#43474f]">
                          <span className="material-symbols-outlined text-[18px]">pin</span>
                        </span>
                        <input
                          type="text"
                          required
                          value={idNumber}
                          onChange={(e) => setIdNumber(e.target.value)}
                          placeholder="Contoh: 3209xxxxxxxx atau NISN/NIM Anda"
                          className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[14px] placeholder:text-[#43474f]/60 focus:bg-[#ffffff] focus:ring-2 focus:ring-[#003366]/20 focus:outline-none transition-all border border-transparent focus:border-[#003366]/40"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[14px] font-semibold text-[#191c1e]">
                        Asal Sekolah/Kampus/Instansi
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#43474f]">
                          <span className="material-symbols-outlined text-[18px]">apartment</span>
                        </span>
                        <input
                          type="text"
                          required
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="Masukkan nama sekolah, universitas, atau lembaga"
                          className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[14px] placeholder:text-[#43474f]/60 focus:bg-[#ffffff] focus:ring-2 focus:ring-[#003366]/20 focus:outline-none transition-all border border-transparent focus:border-[#003366]/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2 Cols: Email & Telepon */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block text-[14px] font-semibold text-[#191c1e]">
                        Alamat Email Aktif
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#43474f]">
                          <span className="material-symbols-outlined text-[18px]">mail</span>
                        </span>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nama@email.com untuk konfirmasi kartu digital"
                          className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[14px] placeholder:text-[#43474f]/60 focus:bg-[#ffffff] focus:ring-2 focus:ring-[#003366]/20 focus:outline-none transition-all border border-transparent focus:border-[#003366]/40"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[14px] font-semibold text-[#191c1e]">
                        Nomor WhatsApp / Telepon Aktif
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#43474f]">
                          <span className="material-symbols-outlined text-[18px]">call</span>
                        </span>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="08xxxxxxxxxx"
                          className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-[14px] placeholder:text-[#43474f]/60 focus:bg-[#ffffff] focus:ring-2 focus:ring-[#003366]/20 focus:outline-none transition-all border border-transparent focus:border-[#003366]/40"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agreement Checkbox */}
              <div className="p-4 rounded-xl bg-[#f2f4f6] space-y-4 border border-[#eceef0]">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                    className="mt-1 w-5 h-5 rounded text-[#003366] bg-[#ffffff] cursor-pointer"
                  />
                  <span className="text-[13px] text-[#191c1e] leading-snug">
                    Saya menyetujui tata tertib kunjungan dan peminjaman buku Perpustakaan Bank Indonesia Cirebon.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full bg-[#003366] text-[#ffffff] py-4 px-6 rounded-xl font-bold text-[15px] hover:bg-[#001e40] transition-all duration-200 flex items-center justify-center gap-3 shadow-md active:scale-[0.99] cursor-pointer"
                >
                  <span>Kirim Pendaftaran</span>
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
                <p className="text-[11px] text-center text-[#43474f]">
                  Data yang dikirim dilindungi oleh standar kerahasiaan operasional Bank Indonesia.
                </p>
              </div>
            </form>

            {/* Success Alert Banner */}
            {submitted && (
              <div className="p-6 rounded-xl bg-[#d5e3ff] text-[#001b3c] space-y-3 border border-[#a7c8ff] animate-fadeIn">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px] text-[#001e40]">
                    check_circle
                  </span>
                  <p className="font-bold text-[16px] text-[#001e40]">
                    Pendaftaran Berhasil Dikirim!
                  </p>
                </div>
                <p className="text-[13px] text-[#1f477b] leading-relaxed">
                  Konfirmasi aktivasi dan kode keanggotaan sementara telah diterbitkan. Mengarahkan Anda ke laman status konfirmasi...
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card 1: Ketentuan & Manfaat */}
            <div className="bg-[#ffffff] p-6 rounded-2xl shadow-md border border-[#eceef0] space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#e6e8ea] text-[#001e40] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">fact_check</span>
                </div>
                <div>
                  <h2 className="text-[16px] text-[#001e40] font-bold">Ketentuan &amp; Manfaat</h2>
                  <p className="text-[11px] text-[#43474f]">Fasilitas Perpustakaan Cirebon</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#f2f4f6]">
                  <span className="material-symbols-outlined text-[#775a19] text-[22px] shrink-0 mt-0.5">
                    wallet
                  </span>
                  <div>
                    <h3 className="text-[14px] text-[#191c1e] font-semibold">Bebas Biaya 100%</h3>
                    <p className="text-[12px] text-[#43474f] mt-0.5 leading-normal">
                      Seluruh proses pendaftaran dan peminjaman buku tidak dipungut biaya apapun (Gratis).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#f2f4f6]">
                  <span className="material-symbols-outlined text-[#775a19] text-[22px] shrink-0 mt-0.5">
                    badge
                  </span>
                  <div>
                    <h3 className="text-[14px] text-[#191c1e] font-semibold">Verifikasi Sangat Praktis</h3>
                    <p className="text-[12px] text-[#43474f] mt-0.5 leading-normal">
                      Cukup perlihatkan Kartu Identitas Fisik asli (KTP / Kartu Pelajar / KTM) saat kunjungan perdana.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#f2f4f6]">
                  <span className="material-symbols-outlined text-[#775a19] text-[22px] shrink-0 mt-0.5">
                    qr_code_2
                  </span>
                  <div>
                    <h3 className="text-[14px] text-[#191c1e] font-semibold">Kartu Digital Instan</h3>
                    <p className="text-[12px] text-[#43474f] mt-0.5 leading-normal">
                      Kartu barcode digital langsung diterbitkan ke smartphone Anda untuk akses pintu masuk dan loker.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Fasilitas Anggota */}
            <div className="relative overflow-hidden bg-[#ffffff] rounded-2xl shadow-md border border-[#eceef0] p-6 space-y-4">
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-[#e6e8ea] px-2.5 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px] text-[#001e40]">
                    auto_stories
                  </span>
                  <span className="text-[11px] font-semibold text-[#001e40]">Fasilitas Anggota</span>
                </div>
                <h3 className="text-[16px] text-[#001e40] font-bold">
                  Koleksi Riset &amp; Ruang Diskusi
                </h3>
                <p className="text-[12px] text-[#43474f] leading-relaxed">
                  Akses khusus ke BI Corner, terminal database riset ekonomi, workstation komputer terhubung jurnal internasional, dan area baca hening ber-AC.
                </p>
              </div>

              <div className="pt-2">
                <img
                  className="w-full h-40 object-cover rounded-xl shadow-sm"
                  alt="Interior Perpustakaan Bank Indonesia Cirebon"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7U1shjzv6rHMSqL8ZwIVqAT4qRH4KJvf5DGPSr-qll0v6I-4dCCH7-oGhAH_VR6TyTM-1EmUoagws8lqp0zBqHu1pw3S086OTSOspbwx6xAT9RjlanFQzxiKgyiR35j_CsixjxfUfR_xi9kndsfnGyYXgI-smSp5UVClZCE0iPcvj5z4F3aq9PD4j1l3fibmZobkeWzT0LQeTONk0BfJ1N6AmTYr_bFJl7dSG24zW72D0Oin650OW4g"
                />
              </div>
            </div>

            {/* Card 3: Butuh Bantuan? */}
            <div className="bg-[#f2f4f6] p-6 rounded-2xl space-y-3 border border-[#eceef0]">
              <div className="flex items-center gap-2 text-[#001e40] font-semibold">
                <span className="material-symbols-outlined text-[20px]">help</span>
                <span className="text-[15px]">Butuh Bantuan?</span>
              </div>
              <p className="text-[12px] text-[#43474f] leading-relaxed">
                Petugas meja sirkulasi kami siap membantu Anda selama jam operasional Senin hingga Jumat (08.00 - 15.30 WIB).
              </p>
              <div className="pt-1 flex items-center gap-2 text-[#775a19] font-semibold text-[13px]">
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>WhatsApp Meja Layanan: (0231) 202996</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
