export const jadwal = [
  {
    id: 1,
    day: "Senin",
    time: "08:00 - 10:00",
    subject: "Praktikum Pemrograman Berbasis Web",
    code: "IF2340042",
    lecturer: "Rima Dias Ramadhani, S.Kom., M.Kom",
    location: "Ruang: A101, Gedung GKB 2 (Gedung A)",
  },
    {
        id: 2,
        day: "Senin",
        time: "13:00 - 15:00",
        subject: "Algoritma dan Pemrograman",
        code: "IF2340050",
        lecturer: "Budi Santoso, S.T., M.T.",
        location: "Ruang: B202, Gedung GKB 1 (Gedung B)",
    },
    {
        id: 3,
        day: "Rabu",
        time: "13:00 - 15:00",
        subject: "Basis Data",
        code: "IF2340060",
        lecturer: "Siti Aminah, S.Kom., M.Kom",
        location: "Ruang: C303, Gedung GKB 3 (Gedung C)",
    },
    {
        id: 4,
        day: "Rabu",
        time: "08:00 - 10:00",
        subject: "Jaringan Komputer",
        code: "IF2340070",
        lecturer: "Ahmad Zaki, S.Kom., M.Kom",
        location: "Ruang: D404, Gedung GKB 4 (Gedung D)",
    },
    {
        id: 5,
        day: "Rabu",
        time: "10:00 - 12:00",
        subject: "Praktikum Jaringan Komputer",
        code: "IF2340070",
        lecturer: "Ahmad Zaki, S.Kom., M.Kom ",
        location: "Ruang: D404, Gedung GKB 4 (Gedung D)",
    },
    {
        id: 6,
        day: "Rabu",
        time: "13:00 - 15:00",
        subject: "Rekayasa Perangkat Lunak",
        code: "IF2340080",
        lecturer: "Dewi Sartika, S.Kom., M.Kom",
        location: "Ruang: E505, Gedung GKB 5 (Gedung E)",
    },
    {
        id: 7,
        day: "Kamis",
        time: "10:00 - 12:00",
        subject: "Pengolahan Citra Digital",
        code: "IF2340070",
        lecturer: "Ahmad Zaki, S.Kom., M.Kom",
        location: "Ruang: D404, Gedung GKB 4 (Gedung D)",
    },
    {
        id: 8,
        day: "Kamis",
        time: "13:00 - 14:40",
        subject: "Praktikum Pengolahan Citra Digital",
        code: "IF2340070",
        lecturer: "Ahmad Zaki, S.Kom., M.Kom",
        location: "Ruang: D404, Gedung GKB 4 (Gedung D)",
    }

];

export const pembayaran = [
    {
        id: 1,
        semester: "2025/2026 Gasal",
        period: "1 Aug. 2025 - 31 Jan. 2026",
        totalAmount: 40000000,
        details: [
            {
                name: "Biaya Kuliah",
                amount: 2000000
            },
            {
                name: "Praktek",
                amount: 375000
            },
            {
                name: "Internet",
                amount: 100000
            },
            {
                name: "Registrasi",
                amount: 30000
            },
            {
                name: "Asuransi",
                amount: 20000
            },
            {
                name: "KP/PBL",
                amount: 375000
            },
            
        ],
        note: "Pembayaran melalui kode Pembayaran yang tertera di BSI atau ATM dengan kode pembayaran yang ada.",
        
    },
    {
        id: 2,
        semester: "2024/2025 Genap",
        period: "1 Feb. 2025 - 31 Jul. 2025",
        totalAmount: 3900000,
        details: [
            {
                name: "Biaya Kuliah",
                amount: 2000000
            },
            {
                name: "Praktek",
                amount: 350000
            },
            {
                name: "Internet",
                amount: 100000
            },
            {
                name: "Registrasi",
                amount: 30000
            },
            {
                name: "Asuransi",
                amount: 20000
            },
            {
                name: "KP/PBL",
                amount: 300000
            }
        ],
        note: "Pembayaran telah lunas pada tanggal 5 Feb. 2025"
    }
]

export const PembayaranBankBSI = [
    {
        id: 1,
        method: "Via Teller",
        steps: [
            "Isi slip yang sudah disediakan ",
            "Setelah transaksi berhasil di proses, simpan slip dan cek status tagihan terbayar di siamus.",
        ]
    },
    {
        id: 2,
        method: "Via ATM",
        steps: [
            "Masukkan kartu ATM",
            "Pilih menu pembayaran/pembelian, kemudian pilih menu akademik",
            "Masukkan kode: ",
            "Pastikan nama dan tagihan yang muncul sudah sesuai, pilih benar, transaksi berhasil",
            "Simpan bukti pembayaran dan cek status tagihan terbayar di siamus"
        ]
    },
    {
        id: 3,
        method: "Via Mobile Banking BSI/BYOND",
        steps: [
            "Pilih menu bayar, kemudian pilih akademik",
            "Pilih no rekening apabila rekening lebih dari satu",
            "Masukkan nama akademik 9005 (Universitas Muhammadiyah Semarang/UNMUH Semarang)",
            "Pastikan nama dan tagihan yang muncul sudah sesuai, pilih benar, transaksi berhasil",
            "Masukkan kode 0323023012, dan dilanjutkan pengisian PIN",
            "Pastikan nama mahasiswa dan jumlah tagihan sudah sesuai",
            "Pilih selanjutnya, transaksi berhasil",
            "Simpan bukti pembayaran dan cek status tagihan terbayar di siamus"
        ]
    },
    {
        id: 4,
        method: "Via ATM Bank Lain",
        steps: [
            "Pilih menu transfer bank lain",
            "Masukkan no Rekening 45190090050323023012",
            "Masukkan kode: ",
            "Masukkan nominal transfer yang sesuai dengan tagihan di siamus, jika nominal yang diinput tidak sesuai maka transaksi gagal",
            "Menu konfirmasi muncul, cek kembali nama rekening tujuan dan nominal tagihan",
            "Pilih benar apabila nama dan tagihan yang muncul sudah sesuai, transaksi berhasil",
            "Simpan bukti pembayaran dan cek status tagihan terbayar di siamus"
        ]
    },
    {
        id: 5,
        method: "Via Mobile Banking Bank Lain",
        steps: [
            "Pilih menu transfer bank lain",
            "Pilih Bank BSI (Bank Syariah Indonesia)",
            "Masukkan no Rekening 45190090050323023012",
            "Masukkan nominal transfer yang sesuai dengan tagihan di siamus, jika nominal yang diinput tidak sesuai maka transaksi gagal",
            "Pastikan layanan transfer yang dipilih adalah layanan online (biaya transfer 6.500)",
            "Masukkan PIN, transaksi berhasil",
            "Simpan bukti pembayaran dan cek status tagihan terbayar di siamus"
        ]
    }
];

export const PembayaranBankJatengSyariah = [
    {
        id: 1,
        method: "Via Teller",
        steps: [
            "Isi slip yang sudah disediakan ",
            "Setelah transaksi berhasil di proses, simpan slip dan cek status tagihan terbayar di siamus.",
        ]
    },
    {
        id: 2,
        method: "Via ATM Bank Jateng Syariah",
        steps: [
            "Pilih menu pembayaran/pembelian, kemudian pilih menu universitas",
            "Masukkan ID Universitas 042",
            "Masukkan kode pembayaran: ",
            "Pastikan nama dan tagihan yang muncul sudah sesuai",
            "Pilih bayar semua tagihan, klik benar, transaksi berhasil",
            "Simpan bukti pembayaran dan cek status tagihan terbayar di siamus"
        ]
    },
    {
        id: 3,
        method: "Via Mobile Banking BSI/BYOND",
        steps: [
            "Pilih menu bayar, kemudian pilih akademik",
            "Pilih no rekening apabila rekening lebih dari satu",
            "Masukkan nama akademik 9005 (Universitas Muhammadiyah Semarang/UNMUH Semarang)",
            "Pastikan nama dan tagihan yang muncul sudah sesuai, pilih benar, transaksi berhasil",
            "Masukkan kode 0323023012, dan dilanjutkan pengisian PIN",
            "Pastikan nama mahasiswa dan jumlah tagihan sudah sesuai",
            "Pilih selanjutnya, transaksi berhasil",
            "Simpan bukti pembayaran dan cek status tagihan terbayar di siamus"
        ]
    },
    {
        id: 4,
        method: "Via ATM Bank Lain",
        steps: [
            "Pilih menu transfer bank lain",
            "Masukkan no Rekening 45190090050323023012",
            "Masukkan kode: ",
            "Masukkan nominal transfer yang sesuai dengan tagihan di siamus, jika nominal yang diinput tidak sesuai maka transaksi gagal",
            "Menu konfirmasi muncul, cek kembali nama rekening tujuan dan nominal tagihan",
            "Pilih benar apabila nama dan tagihan yang muncul sudah sesuai, transaksi berhasil",
            "Simpan bukti pembayaran dan cek status tagihan terbayar di siamus"
        ]
    },
    {
        id: 5,
        method: "Via Mobile Banking Bank Lain",
        steps: [
            "Pilih menu transfer bank lain",
            "Pilih Bank BSI (Bank Syariah Indonesia)",
            "Masukkan no Rekening 45190090050323023012",
            "Masukkan nominal transfer yang sesuai dengan tagihan di siamus, jika nominal yang diinput tidak sesuai maka transaksi gagal",
            "Pastikan layanan transfer yang dipilih adalah layanan online (biaya transfer 6.500)",
            "Masukkan PIN, transaksi berhasil",
            "Simpan bukti pembayaran dan cek status tagihan terbayar di siamus"
        ]
    }
];