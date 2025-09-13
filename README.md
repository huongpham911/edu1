# Website SMA Negeri 1 Ketambe

Website resmi SMA Negeri 1 Ketambe yang dibangun menggunakan Node.js, Express, dan EJS.

## Fitur

- **Homepage** dengan informasi lengkap sekolah
- **Galeri Slideshow** otomatis dari folder img dengan deskripsi
- **Halaman Kontak** dengan formulir dan peta lokasi
- **Halaman Fasilitas** menampilkan fasilitas sekolah
- **Halaman Prestasi** menampilkan prestasi sekolah
- **Halaman Berita** dengan berita dan kegiatan sekolah
- **Responsive Design** yang mobile-friendly
- **Upload Gambar** dengan error handling
- **Maps Integration** menggunakan Google Maps
- **Background Server** yang tidak mengganggu terminal

## Informasi Sekolah

- **Nama**: SMA NEGERI 1 KETAMBE
- **NPSN**: 69773522
- **Alamat**: Jl. Kutacane - Blang Kejeren, Leuser, Ketambe
- **Kabupaten**: Aceh Tenggara, Aceh 24652
- **Status**: NEGERI
- **Waktu**: Pagi/6 hari

## Instalasi

1. Pastikan Node.js sudah terinstall
2. Clone atau download project ini
3. Buka terminal di folder project
4. Install dependencies:
```bash
npm install
```

## Menjalankan Website

### Development Mode
```bash
npm start
```
atau
```bash
node app.js
```

### Background Server (Recommended)
```bash
npm run server:start    # Start server in background
npm run server:stop     # Stop server
npm run server:restart  # Restart server
npm run server:status   # Check server status
```

### Development dengan Auto-reload
```bash
npm run dev
```

Website akan berjalan di: http://localhost:3000

## Struktur Project

```
school/
├── app.js              # Main server file
├── package.json        # Dependencies dan scripts
├── README.md          # Dokumentasi
├── views/             # Template EJS
│   ├── index.ejs      # Homepage
│   ├── contact.ejs    # Halaman kontak
│   ├── about.ejs      # Halaman tentang
│   ├── facilities.ejs # Halaman fasilitas
│   ├── achievements.ejs # Halaman prestasi
│   ├── news.ejs       # Halaman berita
│   └── 404.ejs        # Error page
├── public/            # Static files
│   ├── css/
│   │   └── style.css  # Custom styling
│   ├── js/
│   │   └── main.js    # JavaScript functionality
│   └── img/           # Images
└── img/               # Upload folder
```

## Halaman Yang Tersedia

- `/` - Homepage/Beranda
- `/tentang` - Tentang Sekolah
- `/fasilitas` - Fasilitas Sekolah
- `/prestasi` - Prestasi Sekolah
- `/berita` - Berita & Kegiatan
- `/kontak` - Kontak & Formulir

## Kustomisasi

### Menambah Data Sekolah
Edit file `app.js` di bagian `schoolData` untuk menambah atau mengubah:
- Informasi sekolah
- Fasilitas
- Prestasi
- Berita

### Mengubah Tampilan
- Edit file di folder `views/` untuk mengubah HTML
- Edit `public/css/style.css` untuk styling
- Edit `public/js/main.js` untuk JavaScript

### Upload Gambar
- Upload gambar ke folder `img/`
- Atau gunakan endpoint `/upload` untuk upload via form
- Gambar otomatis muncul di slideshow homepage

### Galeri Slideshow
- Otomatis memuat semua gambar dari folder `img/`
- Support format: JPG, JPEG, PNG, GIF, WEBP
- Auto-play dengan interval 5 detik
- Responsive design untuk mobile dan desktop
- Keyboard navigation (arrow keys)
- Lazy loading untuk performa optimal

## Fitur Upload Gambar

Website mendukung upload gambar dengan fitur:
- Validasi file
- Error handling
- Auto-rename untuk menghindari konflik
- Responsive image display

## Maps Integration

Lokasi sekolah terintegrasi dengan Google Maps:
- Link: https://maps.app.goo.gl/LvpaaRXbXtgu3QT76
- Embedded map di halaman kontak
- Tombol direct link ke Google Maps

## Troubleshooting

### Error saat menjalankan
1. Pastikan Node.js terinstall
2. Pastikan semua dependencies ter-install (`npm install`)
3. Pastikan port 3000 tidak digunakan aplikasi lain

### Error upload gambar
1. Pastikan folder `img/` ada dan writable
2. Check file permissions
3. Pastikan file adalah image format yang valid

### Masalah tampilan
1. Clear browser cache
2. Pastikan file CSS dan JS ter-load dengan benar
3. Check browser console untuk error

## Teknologi Yang Digunakan

- **Node.js** - Runtime JavaScript
- **Express.js** - Web framework
- **EJS** - Template engine
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icons
- **Google Fonts** - Typography
- **Multer** - File upload handling

## Development

Untuk development, gunakan:
```bash
npm run dev
```

Ini akan menjalankan server dengan nodemon yang auto-restart saat ada perubahan file.

## Production

Untuk production:
1. Set environment variables jika diperlukan
2. Gunakan process manager seperti PM2
3. Configure reverse proxy (nginx/apache)
4. Setup SSL certificate

## License

© 2025 SMA Negeri 1 Ketambe. All rights reserved.

## Contact

- Email: info@sman1ketambe.my.id
- Address: Jl. Kutacane - Blang Kejeren, Leuser, Ketambe, Aceh Tenggara, Aceh 24652
