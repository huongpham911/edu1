const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));

// Serve gallery fix script
app.get('/gallery-fix.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'gallery-fix.js'));
});

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// School data
const schoolData = {
  name: 'SMA NEGERI 1 KETAMBE',
  npsn: '69773522',
  email: 'info@sman1ketambe.my.id',
  address: {
    street: 'Jl. Kutacane - Blang Kejeren',
    village: 'Leuser',
    district: 'Ketambe',
    regency: 'Kabupaten Aceh Tenggara',
    province: 'Aceh',
    postalCode: '24652'
  },
  status: 'NEGERI',
  schedule: 'Pagi/6 hari',
  level: 'SMA',
  mapsUrl: 'https://maps.app.goo.gl/LvpaaRXbXtgu3QT76',
  facilities: [
    'Ruang Kelas Modern',
    'Laboratorium Komputer',
    'Perpustakaan',
    'Lapangan Olahraga',
    'Kantin Sekolah',
    'Masjid',
    'Ruang Guru',
    'Ruang Kepala Sekolah'
  ],
  achievements: [
    'Program Makan Siang Bergizi 2025',
    'Upacara Pengibaran Bendera Rutin',
    'Masa Pengenalan Lingkungan Sekolah (MPLS)',
    'Pembentukan Karakter Siswa'
  ],
  news: [
    {
      date: '19 Agustus 2025',
      title: 'Program Makan Siang Bergizi',
      content: 'Hari Pertama Penerima Makan Siang Bergizi Program Yang Dibuat Bapak Presiden Kita Prabowo Subianto. Siswa Menerima Dengan Sangat Bahagia. Terimakasih Kami Ucapakan Untuk Bapak Presiden Kami Yang Telah Mengembangkan Program Makan Siang Bergizi ini.'
    },
    {
      date: '28 Juli 2025',
      title: 'Upacara Pengibaran Bendera',
      content: 'Upacara Pengibaran Bendera telah terlaksana dengan khidmat dan tertib. Upacara dipimpin oleh Ibu PADILAH,S.Pd. selaku Pembina Upacara, yang memberikan arahan dan motivasi kepada siswa untuk terus menanamkan semangat disiplin, tanggung jawab, semangat belajar dan cinta tanah air.'
    },
    {
      date: '18 Juli 2025',
      title: 'Rutinitas Apel Siswa',
      content: 'Apel pagi menumbuhkan kedisplinan, rasa kebersamaan, serta memberikan motivasi dan semangat belajar kepada siswa.'
    }
  ]
};

// Routes
app.get('/', (req, res) => {
  res.render('index', { school: schoolData, page: 'home' });
});

app.get('/tentang', (req, res) => {
  res.render('about', { school: schoolData, page: 'about' });
});

app.get('/fasilitas', (req, res) => {
  res.render('facilities', { school: schoolData, page: 'facilities' });
});

app.get('/prestasi', (req, res) => {
  res.render('achievements', { school: schoolData, page: 'achievements' });
});

app.get('/berita', (req, res) => {
  res.render('news', { school: schoolData, page: 'news' });
});

app.get('/kontak', (req, res) => {
  res.render('contact', { school: schoolData, page: 'contact' });
});

// Test route
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

// Simple test route
app.get('/simple', (req, res) => {
  res.sendFile(path.join(__dirname, 'simple-test.html'));
});

// Gallery route to get images
app.get('/api/gallery', (req, res) => {
  const imgDir = path.join(__dirname, 'img');
  
  fs.readdir(imgDir, (err, files) => {
    if (err) {
      console.error('Error reading img directory:', err);
      return res.json({ images: [] });
    }
    
    // Filter only image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    }).map(file => `/img/${file}`);
    
    res.json({ images: imageFiles });
  });
});

// Handle form submissions
app.post('/contact', (req, res) => {
  console.log('Contact form submitted:', req.body);
  res.redirect('/kontak?success=1');
});

// Handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ success: true, filename: req.file.filename });
  } else {
    res.json({ success: false, error: 'No file uploaded' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { school: schoolData });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`SMA Negeri 1 Ketambe website is ready!`);
});
