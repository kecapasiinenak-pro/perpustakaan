import React from 'react';

export type ModalType = 'guide' | 'privacy' | 'terms' | 'researcher' | 'consultation' | null;

interface InfoModalProps {
  type: ModalType;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap: Record<
    Exclude<ModalType, null>,
    { title: string; subtitle: string; icon: string; body: React.ReactNode }
  > = {
    guide: {
      title: 'Buku Panduan Anggota Perpustakaan',
      subtitle: 'Standar Operasional Prosedur Layanan Pustaka & Riset BI Cirebon',
      icon: 'menu_book',
      body: (
        <div className="space-y-4 text-[13px] text-[#43474f] leading-relaxed">
          <div className="p-3.5 bg-[#f2f4f6] rounded-xl space-y-1.5">
            <h4 className="font-bold text-[#001e40] text-[14px]">1. Persyaratan Masuk &amp; Loker</h4>
            <p>
              Pengunjung wajib menitipkan tas dan jaket pada loker digital perpustakaan. Kunci atau kartu akses loker dapat diperoleh di meja resepsionis dengan menukar kartu tanda pengenal (KTP/KTM/Kartu Pelajar).
            </p>
          </div>
          <div className="p-3.5 bg-[#f2f4f6] rounded-xl space-y-1.5">
            <h4 className="font-bold text-[#001e40] text-[14px]">2. Peminjaman Buku Cetak</h4>
            <p>
              Setiap anggota terdaftar berhak meminjam maksimal 3 (tiga) buku sirkulasi selama 14 hari kerja kalender. Koleksi referensi bertanda &quot;Referensi Khusus Di Tempat&quot; hanya dapat dibaca di area baca lobi.
            </p>
          </div>
          <div className="p-3.5 bg-[#f2f4f6] rounded-xl space-y-1.5">
            <h4 className="font-bold text-[#001e40] text-[14px]">3. Fasilitas Komputer &amp; Wi-Fi Riset</h4>
            <p>
              Tersedia koneksi internet dedicated 1 Gbps untuk penelusuran portal jurnal internasional, e-library BI, dan data inflasi time-series wilayah Ciayumajakuning.
            </p>
          </div>
        </div>
      ),
    },
    privacy: {
      title: 'Kebijakan Privasi & Perlindungan Data',
      subtitle: 'Perlindungan Kerahasiaan Data Anggota Perpustakaan Bank Indonesia',
      icon: 'shield',
      body: (
        <div className="space-y-3 text-[13px] text-[#43474f] leading-relaxed">
          <p>
            Kantor Perwakilan Bank Indonesia Cirebon berkomitmen menjaga keamanan dan kerahasiaan data pribadi yang Anda kirimkan melalui portal ini, meliputi Nomor Induk Kependudukan (NIK/NIM), alamat surel, dan kontak telepon.
          </p>
          <p>
            Data Anda hanya dipergunakan untuk keperluan administrasi keanggotaan, penerbitan barcode digital peminjaman, serta penyampaian notifikasi tenggat waktu pengembalian koleksi literatur.
          </p>
          <p>
            Data tidak akan disebarluaskan, diperjualbelikan, atau dibagikan kepada pihak ketiga manapun di luar kepentingan resmi operasional Bank Indonesia.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Ketentuan Layanan Peminjaman Buku',
      subtitle: 'Tata Tertib Sirkulasi Koleksi Literatur KPwBI Cirebon',
      icon: 'gavel',
      body: (
        <div className="space-y-3 text-[13px] text-[#43474f] leading-relaxed">
          <ul className="list-disc list-inside space-y-2">
            <li>Lama peminjaman maksimal adalah 14 (empat belas) hari kerja.</li>
            <li>Perpanjangan masa pinjam dapat dilakukan 1x secara online atau melalui staf sirkulasi sebelum jatuh tempo.</li>
            <li>Anggota wajib menjaga kebersihan dan keutuhan fisik buku; dilarang mencorat-coret, melipat halaman, atau merusak barcode koleksi.</li>
            <li>Keterlambatan pengembalian akan dikenakan sanksi suspensi hak peminjaman sementara selama jumlah hari keterlambatan.</li>
          </ul>
        </div>
      ),
    },
    researcher: {
      title: 'Panduan Peneliti & Periset Daerah',
      subtitle: 'Akses Naskah Khusus & Konsultasi Arsip Ekonomi Makro Ciayumajakuning',
      icon: 'biotech',
      body: (
        <div className="space-y-3 text-[13px] text-[#43474f] leading-relaxed">
          <p>
            Bagi mahasiswa tingkat akhir, akademisi, dosen, dan peneliti independen yang membutuhkan data historis inflasi, buletin riset moneter intern, atau kajian regional KPwBI Cirebon:
          </p>
          <div className="p-3 bg-[#f2f4f6] rounded-xl text-[12px] space-y-1">
            <span className="font-bold text-[#001e40] block">Alur Permohonan Data Riset:</span>
            <span>1. Menyiapkan surat pengantar resmi dari universitas / instansi riset.</span>
            <br />
            <span>2. Mengajukan topik kajian kepada pustakawan atau mengisi formulir konsultasi riset.</span>
            <br />
            <span>3. Pustakawan akan memfasilitasi temu-kembali arsip dan ruang diskusi kelompok.</span>
          </div>
        </div>
      ),
    },
    consultation: {
      title: 'Hubungi Pustakawan & Konsultasi Riset',
      subtitle: 'Meja Referensi & Konsultasi Literatur KPwBI Cirebon',
      icon: 'contact_support',
      body: (
        <div className="space-y-4 text-[13px] text-[#43474f] leading-relaxed">
          <p>
            Pustakawan kami siap mendampingi penelusuran bahan pustaka, literatur kebanksentralan, serta arsip komoditas dan kemaritiman Cirebon.
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            <div className="p-3 bg-[#f2f4f6] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#775a19] font-bold block">WhatsApp Meja Sirkulasi</span>
                <span className="font-semibold text-[#001e40]">+62 231 202996</span>
              </div>
              <a
                href="https://wa.me/62231202996"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-[#001e40] text-white text-[12px] font-semibold rounded-lg hover:bg-[#003366]"
              >
                Chat Sekarang
              </a>
            </div>
            <div className="p-3 bg-[#f2f4f6] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#775a19] font-bold block">Surel Riset &amp; Pustaka</span>
                <span className="font-semibold text-[#001e40]">perpustakaan_cirebon@bi.go.id</span>
              </div>
              <a
                href="mailto:perpustakaan_cirebon@bi.go.id"
                className="px-3 py-1.5 bg-[#eceef0] text-[#001e40] text-[12px] font-semibold rounded-lg hover:bg-[#e0e3e5]"
              >
                Kirim Surel
              </a>
            </div>
          </div>
        </div>
      ),
    },
  };

  const item = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001e40]/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#ffffff] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-7 relative border border-[#eceef0]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f2f4f6] text-[#43474f] hover:bg-[#e6e8ea] flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#d5e3ff] text-[#003366] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-[#001e40] leading-tight">{item.title}</h3>
            <p className="text-[11px] text-[#775a19] font-medium mt-0.5">{item.subtitle}</p>
          </div>
        </div>

        <div className="my-4 pt-2 border-t border-[#eceef0]">{item.body}</div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#001e40] text-white text-[13px] font-semibold rounded-xl hover:bg-[#003366] transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
