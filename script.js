// ════════════════════════════════════════════════════════
//  KATEGORI
// ════════════════════════════════════════════════════════
const categories = [
  {
    id: 'cat-da',
    title: 'Data, Business & Marketing Analytics',
    subtitle: 'Business Intelligence · Forecasting · Dashboard · SQL · Market Analysis',
    icon: '📊',
    projects: ['p6', 'p1', 'p4']
  },
  {
    id: 'cat-ml',
    title: 'Machine Learning & AI',
    subtitle: 'Deep Learning · Computer Vision · NLP · Algorithm Optimization',
    icon: '🤖',
    projects: ['p2', 'p3', 'p5']
  },
  {
    id: 'cat-soon',
    title: 'IT Risk & Manajemen',
    subtitle: 'Coming Soon',
    icon: '💼',
    projects: [],
    comingSoon: true
  }
];

// ════════════════════════════════════════════════════════
//  PROJECT DATA
// ════════════════════════════════════════════════════════
const projects = {

  // ── P1: SALES FORECASTING ───────────────────────────
  p1: {
    num: '01',
    type: 'Business Analytics · Individual · RevoU',
    title: 'Store Sales Forecasting Analysis',
    shortDesc: 'Analisis 2.121 transaksi penjualan untuk optimasi strategi diskon dan identifikasi fluktuasi profit per kuartal.',
    tags: ['Python', 'SQL', 'Looker Studio', 'EDA', 'Issue Tree'],
    overview: 'Proyek analisis bisnis end-to-end pada data penjualan toko ritel menggunakan SQL dan Python. Fokus pada identifikasi pola profitabilitas, dampak strategi diskon terhadap margin, serta fluktuasi penjualan antar kuartal di tahun 2017. Output berupa dashboard interaktif Looker Studio dan rekomendasi strategis berbasis data.',
    background: [
      '2.121 transaksi penjualan dengan 3 sub-kategori: Furniture, Office Supplies, dan Technology.',
      'Segmen pelanggan: Consumer (51.2%), Corporate (30.6%), dan Home Office (18.2%).',
      'Cakupan geografis 42 negara bagian AS — top 3 kota: New York City, Seattle, Los Angeles.',
      'Anomali ditemukan: California dengan diskon 14% menghasilkan profit 2.489,54 — lebih rendah dari Michigan tanpa diskon (profit 1.972,33).'
    ],
    problemStatement: 'Bagaimana perusahaan dapat mengoptimalkan strategi diskon untuk meningkatkan profitabilitas dan mencegah penurunan drastis di kuartal berikutnya?',
    methodology: [
      'Data Cleaning & EDA: identifikasi missing value, distribusi penjualan per segmen dan kategori.',
      'Analisis Issue Tree untuk memetakan root cause penurunan profitabilitas secara sistematis.',
      'Korelasi antara tingkat diskon dan profit per negara bagian.',
      'Time series analisis profit per kuartal untuk identifikasi pola musiman.',
      'Visualisasi di Looker Studio: Profit vs Discount scatter, Profit by City, Segment pie chart.'
    ],
    findings: [
      'Penjualan naik 120% di Q3 2017 namun anjlok −144.28% di Q4 — tren musiman tidak diantisipasi.',
      'Diskon tinggi (>10%) berkorelasi negatif dengan profit — California contoh nyata distorsi diskon.',
      'Sub-kategori Tables dan Bookcases merugi meski penjualan tinggi akibat diskon berlebih.',
      'Standard Class shipping menghasilkan profit tertinggi dibanding First Class dan Same Day.'
    ],
    results: [
      { num: '2.121', label: 'Transaksi dianalisis' },
      { num: '42', label: 'State tercakup' },
      { num: '−144%', label: 'Drop profit Q4' },
      { num: '14%', label: 'Diskon tertinggi (CA)' }
    ],
    recommendations: [
      'Monitoring Pasar — pantau tren konsumen, kompetitor, dan kondisi pasar secara real-time.',
      'Pemasaran Musiman — kampanye promosi berbasis data tren Q3 untuk antisipasi penurunan Q4.',
      'Reformasi Diskon — batasi diskon maksimal 5–8% untuk Furniture & Tables agar margin tidak terkikis.',
      'Loyalty Program — ganti diskon besar dengan poin/reward untuk pertahankan pelanggan.'
    ],
    issueTree: {
      root: 'Mengapa profitabilitas menurun & penjualan berfluktuasi di 2017?',
      branches: [
        {
          label: 'Fluktuasi Penjualan Kuartal',
          color: '#8b6914',
          children: [
            'Perubahan kondisi pasar & tren konsumen',
            'Permintaan musiman tidak konsisten'
          ]
        },
        {
          label: 'Diskon Tinggi ≠ Profit Tinggi',
          color: '#8b6914',
          children: [
            'Diskon >10% memangkas margin per unit',
            'Frekuensi & besaran diskon tidak terukur'
          ]
        }
      ]
    },
    charts: [
      {
        id: 'c1',
        title: 'Profit vs Sales per Kuartal (2017)',
        xTitle: 'Kuartal',
        yTitle: 'Profit ($)',
        y1Title: 'Sales (units)',
        type: 'quarterly',
        labels: ['Q1 2017', 'Q2 2017', 'Q3 2017', 'Q4 2017'],
        datasets: [
          { label: 'Profit ($)', data: [762, 1000, 2200, -974], color: '#c9a96e' },
          { label: 'Sales (units)', data: [480, 560, 1200, 890], color: '#5b8dd9' }
        ]
      },
      {
        id: 'c2',
        title: 'Profit per Negara Bagian (Top 6)',
        xTitle: 'Negara Bagian',
        yTitle: 'Profit ($)',
        type: 'bar',
        labels: ['New York', 'California', 'Washington', 'Michigan', 'Kentucky', 'Maryland'],
        values: [2763, 2490, 2289, 1972, 1367, 1119],
        colors: ['#c9a96ecc','#e05252cc','#c9a96ecc','#c9a96ecc','#c9a96ecc','#c9a96ecc'],
        note: '🔴 California: diskon 14%, profit lebih rendah dari Michigan yang tanpa diskon'
      }
    ],
    dashboardLink: '#',
    colabLink: '#'
  },

  // ── P2: RESNET50 ────────────────────────────────────
  p2: {
    num: '02',
    type: 'Machine Learning · Computer Vision · Individual',
    title: 'Prediksi Penyakit Daun Mawar dengan ResNet50',
    shortDesc: 'Model CNN berbasis ResNet50 dengan akurasi 94% untuk deteksi otomatis Black Spot, Downy Mildew, dan Fresh Leaf.',
    tags: ['ResNet50', 'Python', 'PyTorch', 'Deep Learning', 'Computer Vision'],
    overview: 'Sistem klasifikasi penyakit daun bunga mawar berbasis CNN menggunakan arsitektur pretrained ResNet50 dengan transfer learning. Dikembangkan untuk menggantikan inspeksi manual yang tidak skalabel, dengan target penerapan pada sistem pertanian presisi berbasis AI.',
    background: [
      'Penyakit daun (Black Spot, Downy Mildew) dapat menurunkan hasil panen 20–40% bila tidak terdeteksi dini.',
      'Inspeksi manual membutuhkan ahli botani — tidak skalabel untuk perkebunan luas.',
      '3 kelas: Black Spot (50 sampel uji), Downy Mildew (31), Fresh Leaf (57). Total 138 test samples.',
      'Resolusi gambar rata-rata 1.500×1.200 px — distribusi dianalisis sebelum preprocessing.'
    ],
    problemStatement: 'Bagaimana membangun model deep learning yang mampu mengklasifikasikan penyakit daun mawar secara otomatis dengan akurasi ≥90% untuk menggantikan inspeksi manual?',
    methodology: [
      'EDA visual: analisis distribusi ukuran gambar (height & width) — mayoritas 1.400–1.600 px.',
      'Preprocessing: resize ke 224×224 px, normalisasi ImageNet mean/std, augmentasi (flip, rotate, color jitter).',
      'Transfer Learning ResNet50 pretrained ImageNet — fine-tune seluruh layer, lr=0.0001.',
      'Training 50 epoch dengan CrossEntropyLoss, scheduler ReduceLROnPlateau.',
      'Evaluasi: Confusion Matrix, Balanced Accuracy, per-class Precision/Recall/F1.'
    ],
    findings: [
      'Balanced Accuracy 94% pada test set — val loss turun konsisten, tidak overfitting.',
      'Downy Mildew: Recall 1.00 — tidak ada false negative, kritis untuk early detection penyakit.',
      'Black Spot: Precision 0.98 — sangat presisi dalam identifikasi positif.',
      '2 misklasifikasi Fresh Leaf sebagai penyakit — area improvement versi berikutnya.',
      'Model konvergen di sekitar epoch 30–35 dari 50 total epoch training.'
    ],
    results: [
      { num: '94%', label: 'Overall Accuracy' },
      { num: '1.00', label: 'Recall Downy Mildew' },
      { num: '0.98', label: 'Precision Black Spot' },
      { num: '50', label: 'Epoch Training' }
    ],
    recommendations: [
      'Integrasikan ke mobile app pertanian untuk deteksi real-time via kamera smartphone.',
      'Ekspansi ke 5+ kelas penyakit baru (Rose Rust, Botrytis Blight) untuk cakupan lebih luas.',
      'Implementasi Grad-CAM untuk visualisasi area daun yang teridentifikasi sebagai penyakit.',
      'Uji performa di kondisi lapangan: variasi lighting, sudut, dan jarak pengambilan gambar.'
    ],
    charts: [
      {
        id: 'c1',
        title: 'Per-Class Classification Report (Test Set)',
        xTitle: 'Kelas Penyakit',
        yTitle: 'Score (0–1)',
        type: 'classificationBar',
        labels: ['Black Spot', 'Downy Mildew', 'Fresh Leaf'],
        datasets: [
          { label: 'Precision', data: [0.98, 0.97, 0.90], color: '#c9a96e' },
          { label: 'Recall', data: [0.88, 1.00, 0.96], color: '#5b8dd9' },
          { label: 'F1-Score', data: [0.93, 0.98, 0.93], color: '#6ecfa9' }
        ]
      },
      {
        id: 'c2',
        title: 'Confusion Matrix — Test Set (138 sampel)',
        type: 'confusionMatrix',
        labels: ['Black Spot', 'Downy Mildew', 'Fresh Leaf'],
        matrix: [[44, 0, 6], [0, 31, 0], [1, 1, 55]]
      }
    ],
    dashboardLink: '#',
    colabLink: '#'
  },

  // ── P3: WEBTOON SVM/MLP ─────────────────────────────
  p3: {
    num: '03',
    type: 'Machine Learning · NLP · Classification · Individual',
    title: 'Klasifikasi Genre Webtoon (SVM & MLP)',
    shortDesc: 'Komparasi SVM vs MLP untuk klasifikasi 3 level popularitas webtoon dari 1.170 data — MLP unggul dengan akurasi 97%.',
    tags: ['SVM', 'MLP', 'Scikit-learn', 'Python', 'NLP', 'EDA'],
    overview: 'Studi komparatif Support Vector Machine vs Multi-Layer Perceptron untuk mengklasifikasikan tingkat popularitas genre webtoon berdasarkan fitur engagement. Proyek ini membantu komikus memahami pola pasar dan mengarahkan kreasi ke genre berpotensi viral.',
    background: [
      '1.170 judul webtoon aktif dengan distribusi: Populer (608), Kurang Populer (113), Tidak Populer (162).',
      'Fitur engagement: subscribers_smoothed, views_smoothed, likes_smoothed.',
      'Dataset imbalanced — kelas "Populer" mendominasi 52% dari total data.',
      'Pipeline: crawling → EDA → preprocessing → feature selection → modelling → evaluasi.'
    ],
    problemStatement: 'Algoritma mana (SVM atau MLP) yang lebih akurat mengklasifikasikan popularitas webtoon, dan fitur engagement apa yang paling berpengaruh?',
    methodology: [
      'Web crawling otomatis 1.170 baris data dari platform Webtoon.com.',
      'EDA: distribusi popularitas, korelasi antar fitur, identifikasi outlier dengan IQR.',
      'Preprocessing: normalisasi MinMaxScaler, stratified train-test split 80:20.',
      'Training SVM (kernel RBF, C=1) dan MLP (hidden: 128-64-32, ReLU, Adam optimizer).',
      'Evaluasi: Confusion Matrix, Classification Report (per-class precision/recall/F1), perbandingan train vs test.'
    ],
    findings: [
      'MLP: akurasi 97% (train), 96% (test) — unggul di semua metrik vs SVM.',
      'SVM: konsisten 94% train dan test — stabil namun kurang presisi untuk kelas minority.',
      'Gap train-test minimal (MLP: 1%, SVM: 0%) — kedua model tidak overfitting.',
      'views_smoothed adalah fitur paling berpengaruh pada prediksi popularitas.',
      'Kelas "Kurang Populer" paling sulit diklasifikasikan — confusion dengan dua kelas lainnya.'
    ],
    results: [
      { num: '97%', label: 'Akurasi MLP (train)' },
      { num: '96%', label: 'Akurasi MLP (test)' },
      { num: '94%', label: 'Akurasi SVM' },
      { num: '1.170', label: 'Data diproses' }
    ],
    recommendations: [
      'MLP direkomendasikan untuk deployment — akurasi lebih tinggi dan generalisasi baik.',
      'Tambahkan fitur NLP dari judul/sinopsis untuk tingkatkan akurasi kelas minority.',
      'Deploy sebagai tools rekomendasi genre real-time di platform webtoon.',
      'Kembangkan dengan BERT/embedding untuk analisis sentimen komentar pembaca.'
    ],
    charts: [
      {
        id: 'c1',
        title: 'Perbandingan Akurasi MLP vs SVM',
        xTitle: 'Model & Split Data',
        yTitle: 'Akurasi (%)',
        type: 'bar',
        labels: ['MLP — Train', 'MLP — Test', 'SVM — Train', 'SVM — Test'],
        values: [97, 96, 94, 94],
        colors: ['#c9a96ecc', '#c9a96e88', '#5b8dd9cc', '#5b8dd988']
      },
      {
        id: 'c2',
        title: 'F1-Score per Kelas — Model MLP',
        xTitle: 'Kelas Popularitas',
        yTitle: 'Score (0–1)',
        type: 'classificationBar',
        labels: ['Kurang Populer', 'Populer', 'Tidak Populer'],
        datasets: [
          { label: 'Precision', data: [0.96, 0.97, 0.98], color: '#c9a96e' },
          { label: 'Recall', data: [0.88, 0.99, 0.97], color: '#5b8dd9' },
          { label: 'F1-Score', data: [0.92, 0.98, 0.98], color: '#6ecfa9' }
        ]
      }
    ],
    dashboardLink: '#',
    colabLink: '#'
  },

  // ── P4: NETFLIX ─────────────────────────────────────
  p4: {
    num: '04',
    type: 'Business Analytics · RevoU Studi Independen',
    title: 'Analisis Bisnis Netflix (2019–2021)',
    shortDesc: 'Analisis 8.807 konten dari 7 negara — identifikasi penyebab penurunan produksi 16% dan strategi pertumbuhan 15%.',
    tags: ['SQL', 'BigQuery', 'Tableau', 'Looker Studio', 'Business Analysis'],
    overview: 'Analisis komprehensif katalog Netflix periode 2019–2021 menggunakan SQL di Google BigQuery. Menginvestigasi tren penambahan konten, distribusi genre dan rating, serta mengidentifikasi faktor penurunan produksi akibat pandemi dan persaingan platform. Output: dashboard interaktif + roadmap strategi peningkatan konten 15%/tahun.',
    background: [
      '8.807 konten: 69% Film (6.131), 31% Acara TV (2.676), dengan 14 rating dan 34 genre.',
      'Periode 2019–2021 dari 7 negara top: USA, India, UK, Canada, Perancis, Jepang, Spanyol.',
      'USA dominasi produksi (1.200+ konten), India (450+), UK (94), Japan (83).',
      'Pandemi COVID-19 mulai 2020 berdampak pada pipeline produksi global secara signifikan.',
      'Persaingan ketat: Disney+, HBO Max, Apple TV+ aktif berebut lisensi konten premium.'
    ],
    problemStatement: 'Apa penyebab penurunan penambahan konten Netflix 2019–2021, dan bagaimana strategi untuk meningkatkan produksi/penambahan konten sebesar 15% dalam setahun?',
    methodology: [
      'SQL Query di BigQuery: COUNT, GROUP BY, DATE_TRUNC per tahun dan negara.',
      'Issue Tree Decomposition: 2 root cause — persaingan platform & dampak pandemi.',
      'Distribusi analisis: rating TV-MA dominan, genre Drama terbesar, durasi 91–120 menit.',
      'Cohort analysis: negara paling terdampak penurunan produksi 2020–2021.',
      'Dashboard Looker Studio: 6 chart utama, filter tahun/rating/genre.'
    ],
    findings: [
      'Film turun 16.2%: 1.424 (2019) → 1.284 (2020) → 993 (2021) penambahan per tahun.',
      'Acara TV naik tipis 0.5% di 2020, lalu turun 15.1% di 2021.',
      'Rating TV-MA mendominasi: 2.062 film + 1.163 TV show — audiens dewasa jadi target utama.',
      'Drama genre terbesar (972), Comedy (769), Action & Adventure (588).',
      'Film 91–120 menit paling banyak (1.981 konten); TV 1 season juga dominan (1.090).',
      'USA kehilangan 431 konten baru (2019→2021), India hanya turun 50 — konten Asia stabil.'
    ],
    results: [
      { num: '8.807', label: 'Konten dianalisis' },
      { num: '−16.2%', label: 'Penurunan film' },
      { num: '−15.1%', label: 'Penurunan TV show' },
      { num: '7', label: 'Negara top produksi' }
    ],
    recommendations: [
      'Fokus produksi konten TV-MA genre Drama — segmen terbesar dan paling diminati.',
      'Targetkan film 91–120 menit dan seri 1 season — sesuai preferensi penonton.',
      'Perkuat kemitraan produksi di India & Asia Tenggara — region pertumbuhan stabil.',
      'Negosiasi lisensi awal untuk konten musiman guna mengisi kekosongan pipeline pandemi.'
    ],
    issueTree: {
      root: 'Mengapa jumlah konten Netflix semakin menurun di 2019–2021?',
      branches: [
        {
          label: 'Persaingan Platform Lain',
          color: '#8b2020',
          children: [
            'Platform lain rebut lisensi konten eksklusif lebih awal',
            'Biaya lisensi terlalu tinggi, Netflix pilih tidak menambah'
          ]
        },
        {
          label: 'Pandemi COVID-19',
          color: '#8b2020',
          children: [
            'Pembatasan produksi karena protokol kesehatan ketat',
            'Lockdown di banyak negara hentikan syuting'
          ]
        }
      ]
    },
    charts: [
      {
        id: 'c1',
        title: 'Tren Penambahan Konten Netflix (2019–2021)',
        xTitle: 'Tahun',
        yTitle: 'Jumlah Konten Ditambahkan',
        type: 'line',
        labels: ['2019', '2020', '2021'],
        datasets: [
          { label: 'Film', data: [1424, 1284, 993], color: '#e05252' },
          { label: 'Acara TV', data: [592, 595, 505], color: '#c9a96e' }
        ]
      },
      {
        id: 'c2',
        title: 'Top Genre Konten Netflix',
        xTitle: 'Jumlah Konten',
        yTitle: 'Genre',
        type: 'barH',
        labels: ['Drama', 'Comedy', 'Action & Adv.', 'Intl TV Shows', 'Children & Family', 'Documentary'],
        values: [972, 769, 588, 470, 410, 289],
        colors: ['#c9a96ecc','#c9a96ecc','#c9a96ecc','#5b8dd9cc','#5b8dd9cc','#5b8dd9cc']
      }
    ],
    dashboardLink: '#',
    colabLink: '#'
  },

  // ── P6: TIRA BEAUTY ─────────────────────────────────
  p6: {
    num: '01',
    type: 'Marketing Analytics · Business Analyst · Case Study',
    title: 'Tira Beauty Campaign Performance Analysis',
    shortDesc: 'Analisis 55.555 kampanye digital Tira Beauty (Jul 2024–Jun 2025) di 5 channel, 4 bahasa, 5 segmen — identifikasi kebocoran mid-funnel 60%, gap CPA antar channel, dan 6 rekomendasi strategis untuk optimasi ROI 2.67x.',
    tags: ['Microsoft Excel', 'Looker Studio', 'Business Analysis', 'Issue Tree', 'Marketing Analytics', 'Funnel Analysis'],
    overview: 'Tira Beauty adalah platform beauty e-commerce multi-brand yang beroperasi di pasar Asia Selatan. Bisnis ini menjalankan kampanye pemasaran digital secara masif di berbagai channel — dari media sosial, search, email, hingga influencer — dengan target audiens tersegmentasi berdasarkan demografi, gaya hidup, dan geografi. Dalam periode Juli 2024 – Juni 2025, Tira menjalankan 55.555+ kampanye aktif dengan konten dalam 4 bahasa, menjangkau 5 segmen pelanggan utama. Model bisnisnya sangat bergantung pada efisiensi akuisisi — setiap investasi iklan harus menghasilkan konversi terukur dan return positif.',
    richStats: [
      { num: '28.4B', label: 'Total Revenue (12 bln)' },
      { num: '2.67x', label: 'Avg ROI semua channel' },
      { num: '0.355', label: 'CPA terbaik (Instagram)' },
      { num: '57M',   label: 'Total konversi' }
    ],
    situasi: 'Tira Beauty beroperasi di pasar beauty yang semakin kompetitif, di mana biaya akuisisi pelanggan terus meningkat dan margin semakin tipis. Ditemukan beberapa kondisi kritis yang perlu diperhatikan:',
    funnel: [
      { label: 'Impressions', value: '3.06 Miliar',  badge: null,      badgeOk: false },
      { label: 'Clicks',      value: '259.8 Juta',   badge: 'CTR 8.5%', badgeOk: true  },
      { label: 'Leads',       value: '103.7 Juta',   badge: 'Drop 60%', badgeOk: false },
      { label: 'Conversions', value: '57.0 Juta',    badge: 'Conv 55%', badgeOk: true  }
    ],
    situasiDetail: 'Secara performa, kampanye ini sangat impresif dalam menarik atensi (CTR 8.5%) dan memiliki efektivitas konversi yang solid (55%) di tahap akhir. Namun, terdapat drop-off signifikan di tengah funnel: hanya 40% klik yang berhasil dikonversi menjadi leads. Hal ini mengindikasikan perlunya optimasi pada landing page atau penyederhanaan alur form. Dari sisi efisiensi biaya, Instagram unggul sebagai channel paling cost-effective dibanding YouTube dengan selisih efisiensi mencapai 8.1%',
    problemStatement: 'Mengapa ROI kampanye Tira Beauty belum optimal, dan bagaimana alokasi sumber daya pemasaran dapat diperbaiki untuk memaksimalkan konversi dan pendapatan?',
    problemSubs: [
      'Efisiensi antar channel belum seimbang. Ada selisih biaya (CPA) sebesar 8.1% antara Instagram dan YouTube. Dalam skala ratusan ribu kampanye, perbedaan ini sangat berpengaruh pada total pengeluaran biaya akuisisi.',
      'Terjadi kehilangan calon pelanggan (drop) sebanyak 60% tepat setelah mereka mengeklik iklan. Ini menunjukkan adanya hambatan di tengah funnel yang menghalangi orang untuk lanjut menjadi leads.',
      'Performa antar bahasa sangat kontras. Penggunaan bahasa Tamil menghasilkan keuntungan tinggi (ROI 2.74x), sementara audiens bahasa Inggris justru memakan biaya paling mahal dibanding bahasa lainnya.',
      'Konten dengan interaksi (engagement) tinggi ternyata tidak menjamin angka penjualan otomatis naik. Diperlukan strategi konten yang lebih berani dalam mengajak audiens untuk langsung melakukan transaksi.'
    ],
    methodology: [
      'Analisis funnel end-to-end: Impressions → Clicks → Leads → Conversions, menganalisis setiap tahap perjalanan audiens (dari sekadar melihat iklan hingga menjadi pembeli) untuk menemukan di titik mana calon pelanggan paling banyak hilang.',
      'Issue Tree MECE: Menggunakan metode Issue Tree MECE untuk membedah masalah bisnis ke dalam 4 pilar utama: Efisiensi Channel, Alur Funnel, Segmentasi Audiens, dan Strategi Konten.',
      'Membandingkan performa keuntungan (ROI) dan biaya (CPA) di 5 saluran iklan, 4 bahasa berbeda, serta berbagai jenis kampanye untuk mencari kombinasi yang paling menguntungkan.',
      'Analisis korelasi Pearson: Engagement Score vs Conversions (r = 0.639, R² ≈ 0.41) untuk membuktikan apakah konten yang ramai interaksi (high engagement) benar-benar berbanding lurus dengan jumlah penjualan.',
      'Audit kualitas data: Mengidentifikasi batasan dalam data, seperti absennya info anggaran biaya, data bulan Juni yang belum lengkap, serta dominasi data Omnichannel agar hasil analisis tetap akurat.',
      'Dashboard Looker Studio: Visualisasi untuk memantau tren pendapatan bulanan, efisiensi bahasa, dan performa setiap segmen secara real-time.'
    ],
    richFindings: [
      [
        { type: 'good',    head: 'Instagram',    body: 'CPA 0.355 — paling efisien dari semua channel single' },
        { type: 'bad',     head: 'YouTube',      body: 'CPA 0.384 — termahal, butuh evaluasi konten & targeting' },
        { type: 'neutral', head: 'Omnichannel',  body: 'Volume terbesar (37K kampanye), CPA 0.364 — efisien di skala' },
        { type: 'neutral', head: 'Email',        body: 'ROI tertinggi 2.73x, namun CPA 0.361 — efektif untuk retention' }
      ],
      [
        { type: 'bad',     head: 'Clicks → Leads', body: 'Hanya 40% — GAP KRITIS. Masalah di landing page atau relevansi konten pasca-klik' },
        { type: 'good',    head: 'Leads → Conv',   body: '55% — relatif kuat. Strategi closing & follow-up berjalan baik' },
        { type: 'neutral', head: 'CTR 8.5%',        body: 'Wajar untuk industri. Awareness & creative ads sudah cukup efektif' },
        { type: 'neutral', head: 'Implication',     body: 'Prioritas perbaikan ada di mid-funnel, bukan di top atau bottom' }
      ],
      [
        { type: 'good',    head: 'Premium Shoppers', body: 'Revenue #1 (5.78B). Segmen dengan nilai transaksi tertinggi' },
        { type: 'bad',     head: 'College Students', body: 'Revenue terendah (5.57B) & CPA 0.370 — strategi perlu dikustomisasi' },
        { type: 'good',    head: 'Tamil',            body: 'ROI tertinggi 2.74x & CPA 0.359 — konten lokal terbukti efisien' },
        { type: 'bad',     head: 'English',          body: 'CPA tertinggi 0.372 — konten English kurang cost-efficient vs lokal' }
      ],
      [
        { type: 'info',    head: 'Korelasi r=0.639', body: 'Engagement–Conversions: kuat, namun bukan deterministik' },
        { type: 'good',    head: 'High Engagement',  body: 'Avg conv 1.925 vs Low 462 — 4x lipat. Engagement matter secara material' },
        { type: 'bad',     head: 'Mitos Viral',      body: 'High engagement tanpa CTA kuat tidak menjamin konversi — perlu kombinasi keduanya' },
        { type: 'neutral', head: 'Paid Ads',         body: 'CPA 0.352 terendah per campaign type — paid ads paling efisien untuk akuisisi' }
      ]
    ],
    corrStrip: {
      r: '0.639',
      text: '<strong>Korelasi Engagement Score vs Conversions lebih kuat dari yang diasumsikan sebelumnya.</strong> Ini bukan "moderat" — ini cukup kuat untuk dijadikan dasar strategi. Namun dengan R² ~0.41, artinya masih ada 59% variasi konversi yang tidak dijelaskan oleh engagement saja — faktor lain seperti kualitas CTA, relevansi produk, dan timing tetap penting.'
    },
    results: [
      { num: '28.4B', label: 'Total Revenue 12 bln' },
      { num: '2.67x', label: 'Avg ROI semua channel' },
      { num: '57M',   label: 'Total konversi' },
      { num: '−60%',  label: 'Drop Clicks→Leads' }
    ],
    dataQuality: [
      { title: 'Tidak ada kolom Allocated_Budget', body: 'Dataset hanya memiliki Acquisition_Cost sebagai proxy biaya. CPA dihitung dari total biaya akuisisi dibagi konversi — bukan dari budget yang dialokasikan. Ini perlu dicatat dalam setiap laporan agar tidak terjadi salah interpretasi ROI.' },
      { title: 'Anomali Juni 2025', body: 'Revenue Juni hanya 941M vs rata-rata 2.5B/bulan. Ini bukan penurunan performa — data hanya mencakup 1–24 Juni (1.815 dari rata-rata 4.900 kampanye/bulan). Jika diproyeksikan: estimasi full-month ~1.18B. Wajib dikomunikasikan ke stakeholder untuk menghindari false alarm.' },
      { title: 'Channel Omnichannel dominasi volume (67%)', body: 'Perlu kehati-hatian dalam membandingkan CPA cross-channel karena omnichannel mencakup kombinasi beberapa platform sekaligus — sehingga metrinya tidak apple-to-apple dengan channel tunggal.' }
    ],
    richRecs: [
      { priority: 'Prioritas 1 · Channel', title: 'Realokasi Budget: YouTube → Instagram', body: 'Instagram jauh lebih hemat (CPA 0.355 vs 0.384). Dengan biaya yang sama, bisa mendapatkan jauh lebih banyak pembeli di Instagram daripada di YouTube. Tambahan konversi tanpa perlu tambah biaya sepeser pun.', impact: 'High Impact · Quick Win', impactLevel: 'high' },
      { priority: 'Prioritas 2 · Funnel',  title: 'Audit & Optimasi Mid-Funnel (Clicks→Leads)', body: 'Kehilangan 60% di tahap ini adalah kebocoran terbesar. Lakukan A/B test landing page, perbaiki kecepatan load, sederhanakan form lead, dan pastikan konsistensi pesan antara iklan dan halaman tujuan. Target: naikkan Clicks→Leads rate dari 40% ke 50% — akan menambah ~26 juta leads potensial tanpa tambahan spend.', impact: 'High Impact · 4–6 Minggu', impactLevel: 'high' },
      { priority: 'Prioritas 3 · Bahasa',  title: 'Perbanyak Konten Tamil & Hindi, serta evaluasi konten bahasa English', body: 'Tamil (ROI 2.74x, CPA 0.359) dan Hindi (CPA 0.360) secara konsisten lebih efisien daripada English (CPA 0.372). Strategi: tingkatkan porsi konten bahasa lokal, lakukan lokalisasi mendalam (bukan sekadar terjemahan), dan evaluasi konten berbahasa English untuk memahami mengapa biaya akuisisinya lebih tinggi.', impact: 'High Impact · 6–8 Minggu', impactLevel: 'high' },
      { priority: 'Prioritas 4 · Konten',  title: 'Framework Konten: Engagement × CTA Kuat', body: 'Data membuktikan High Engagement menghasilkan konversi 4x lipat Low Engagement (r=0.639). Namun engagement saja tidak cukup — setiap konten berperforma tinggi harus disertai CTA transaksional yang jelas (harga, urgency, tombol beli). Buat template konten "High-Eng + Hard-CTA" untuk tim kreatif.', impact: 'Med Impact · 2–3 Minggu', impactLevel: 'med' },
      { priority: 'Prioritas 5 · Audiens', title: 'Personalisasi Strategi per Segmen', body: 'Premium Shoppers menghasilkan revenue 5.78B vs College Students 5.57B. Meski selisihnya terlihat kecil secara persentase, CPA College Students (0.370) lebih tinggi — artinya biaya untuk mengakuisisi segmen ini lebih mahal dengan revenue lebih rendah. Pertimbangkan strategi khusus: program loyalitas untuk Premium, konten aspirasional + cicilan untuk College.', impact: 'Med Impact · 4–8 Minggu', impactLevel: 'med' },
      { priority: 'Prioritas 6 · Measurement', title: 'Perbaiki Data Foundation & Reporting', body: 'Tidak tersedianya kolom Allocated_Budget membatasi analisis ROI yang sesungguhnya. Rekomendasikan implementasi budget tracking per kampanye di sistem sumber. Tambahkan kolom: budget_allocated, actual_spend, dan channel_mix_type. Ini akan memungkinkan analisis efficiency ratio yang jauh lebih akurat untuk pengambilan keputusan.', impact: 'Foundation · 1–2 Bulan', impactLevel: 'med' }
    ],
    closing: 'Tira Beauty punya fondasi yang sangat kuat dengan ROI 2.67x dan total 57 juta konversi setahun terakhir. Untuk hasil yang lebih maksimal, fokus bisa diarahkan ke <strong>3 area</strong>: memperbaiki mid-funnel (dari 40% → 50% Clicks-to-Leads), mengalihkan budget dari YouTube ke Instagram, dan memperkuat konten bahasa lokal. Langkah-langkah ini minim biaya tapi berdampak besar, serta bisa langsung diterapkan dalam waktu singkat (4–8 minggu).',
    issueTree: {
      root: 'Bagaimana meningkatkan ROI Kampanye Tira Beauty?',
      branches: [
        { label: '1. Efisiensi Channel',    color: '#1D9E75', children: ['Instagram CPA terbaik (0.355)', 'YouTube CPA tertinggi (0.384)'] },
        { label: '2. Performa Funnel',      color: '#D4537E', children: ['Drop 60% Clicks→Leads',       'Conv 55% Leads→Orders'] },
        { label: '3. Segmentasi Bahasa',    color: '#534AB7', children: ['Tamil ROI 2.74x (terbaik)',   'English CPA 0.372 (termahal)'] },
        { label: '4. Strategi Konten',      color: '#BA7517', children: ['High Engagement = 4x conv',   'CTA kuat wajib disertakan'] }
      ]
    },
    charts: [
      {
        id: 'c1',
        title: 'CPA per Channel (lebih rendah = lebih efisien)',
        xTitle: 'Channel', yTitle: 'CPA',
        type: 'bar',
        labels: ['Paid Ads', 'Instagram', 'Email', 'Omnichannel', 'YouTube'],
        values:  [0.352, 0.355, 0.361, 0.364, 0.384],
        colors:  ['#1D9E75cc','#1D9E75cc','#c9a96ecc','#5b8dd9cc','#e05252cc'],
        note: '🔴 YouTube CPA 8.1% di atas Instagram — setiap 1.000 unit budget shift = 81 konversi tambahan'
      },
      {
        id: 'c2',
        title: 'ROI per Bahasa Konten',
        xTitle: 'Bahasa', yTitle: 'ROI (x)',
        type: 'bar',
        labels: ['Tamil', 'Email', 'Hindi', 'Bengali', 'English'],
        values:  [2.74, 2.73, 2.71, 2.68, 2.64],
        colors:  ['#1D9E75cc','#c9a96ecc','#c9a96ecc','#5b8dd9cc','#e05252cc'],
        note: '🟢 Tamil ROI 2.74x vs English 2.64x — lokalisasi konten terbukti lebih efisien'
      }
    ],
    dashboardLink: '#',
    colabLink: '#'
  },

  // ── P5: DIET GENETIKA ────────────────────────────────
  p5: {
    num: '05',
    type: 'Algorithm Optimization · Group Project',
    title: 'Perencanaan Diet Sehat dengan Algoritma Genetika',
    shortDesc: 'Sistem GA 10 kromosom untuk jadwal makan 28 hari — kalori optimal 1.602–1.610 kcal/hari dari target 1.608 kcal.',
    tags: ['Python', 'Genetic Algorithm', 'NumPy', 'Matplotlib', 'Optimization'],
    overview: 'Sistem perencanaan makanan diet berbasis Genetic Algorithm. Menerima input data pengguna dan menghasilkan jadwal menu 28 hari yang memenuhi target kalori diet secara optimal. Mendemonstrasikan penerapan metaheuristic optimization untuk problem gizi dan kesehatan.',
    background: [
      'Studi kasus: Perempuan, 19 tahun, BB 60 kg, TB 150 cm, aktivitas sedang.',
      'TDEE (Harris-Benedict): 2.108 kkal/hari — target diet (defisit 500 kkal): 1.608 kkal/hari.',
      'Ruang solusi sangat besar: ribuan kombinasi makanan × 3 waktu makan × 28 hari.',
      'Pendekatan manual tidak efisien dan tidak optimal secara nutrisi.'
    ],
    problemStatement: 'Bagaimana merancang sistem berbasis Genetic Algorithm yang menghasilkan jadwal makan diet 28 hari dengan total kalori mendekati target 1.608 kcal/hari?',
    methodology: [
      'Kalkulasi BMR dengan Mifflin-St Jeor Equation; TDEE × Activity Factor (1.55 untuk sedang).',
      'Representasi kromosom: sequence pilihan makanan untuk 28 hari × 3 waktu makan.',
      'Inisialisasi 10 kromosom secara random dari database makanan bernilai nutrisi.',
      'Fitness Function: minimasi |total_kalori − target_1608| per kromosom.',
      'Seleksi Tournament (k=3), Crossover single-point (prob=0.8), Mutasi random (prob=0.1).',
      'Evaluasi per kromosom: visualisasi total kalori 10 kromosom + kalori per hari 28 hari.'
    ],
    findings: [
      'Semua 10 kromosom konvergen di range kalori harian 1.602–1.610 kcal — sangat mendekati target.',
      'Rata-rata total kalori 10 kromosom: 20.658,7 kkal / 28 hari = ±737,8 kcal/hari per kromosom.',
      'Grafik kalori per minggu menunjukkan variasi natural — realistis untuk pola makan sehari-hari.',
      'Algoritma konvergen di generasi ke-15 dari 50 — efisien dari sisi komputasi.'
    ],
    results: [
      { num: '1.602', label: 'Min kalori/hari (kcal)' },
      { num: '1.610', label: 'Max kalori/hari (kcal)' },
      { num: '10', label: 'Kromosom dihasilkan' },
      { num: '28', label: 'Hari perencanaan' }
    ],
    recommendations: [
      'Tambahkan constraint nutrisi multi-dimensi: protein ≥50g, karbohidrat ≤200g, lemak ≤55g/hari.',
      'Perluas database makanan ke 500+ item dengan data mikronutrien lengkap.',
      'Integrasikan preferensi user (alergi, pantangan) sebagai hard constraint kromosom.',
      'Kembangkan menjadi web/mobile app dengan output PDF jadwal makan personal.'
    ],
    charts: [
      {
        id: 'c1',
        title: 'Total Kalori per Kromosom (28 Hari)',
        xTitle: 'Kromosom',
        yTitle: 'Total Kalori (kkal)',
        type: 'barChromosome',
        labels: ['K-1','K-2','K-3','K-4','K-5','K-6','K-7','K-8','K-9','K-10'],
        values: [23200, 19400, 23000, 21000, 19200, 21700, 20000, 19100, 19600, 19600],
        targetLine: 20658.7
      },
      {
        id: 'c2',
        title: 'Kalori Aktual vs Target per Hari (28 Hari)',
        xTitle: 'Hari ke-',
        yTitle: 'Kalori (kcal)',
        type: 'line',
        labels: Array.from({length:28}, (_,i) => `H${i+1}`),
        datasets: [
          { label: 'Target (1.608 kcal)', data: Array(28).fill(1608), color: '#e05252', dashed: true },
          { label: 'Kalori Aktual', data: [1610,1605,1608,1602,1609,1607,1610,1604,1606,1608,1610,1603,1607,1609,1605,1608,1602,1610,1606,1608,1609,1604,1607,1610,1603,1608,1605,1609], color: '#c9a96e' }
        ]
      }
    ],
    dashboardLink: '#',
    colabLink: '#'
  }
};

// ════════════════════════════════════════════════════════
//  ISSUE TREE RENDERER (SVG)
// ════════════════════════════════════════════════════════
function renderIssueTree(tree) {
  if (!tree) return '';

  const bCount = tree.branches.length;
  // Dynamically size canvas based on branch count
  const minColW = 160;      // minimum px per branch column
  const colW = Math.max(minColW, Math.floor(660 / bCount));
  const hPad = 20;
  const totalW = colW * bCount + hPad * 2;

  const rootH = 50, branchH = 46, leafH = 42;
  const rootY = 20;
  const branchY = rootY + rootH + 52;
  const leafY = branchY + branchH + 44;

  const svgH = leafY + leafH + 24;
  const rootX = totalW / 2;

  const svgLines = [];
  const svgBoxes = [];

  // ── Root box ──
  const rootBoxW = Math.min(totalW - 40, bCount <= 2 ? 320 : totalW - 60);
  svgBoxes.push(`
    <rect x="${rootX - rootBoxW/2}" y="${rootY}" width="${rootBoxW}" height="${rootH}" rx="10"
      fill="rgba(201,169,110,0.15)" stroke="#c9a96e" stroke-width="1.5"/>
    <foreignObject x="${rootX - rootBoxW/2 + 12}" y="${rootY + 7}" width="${rootBoxW - 24}" height="${rootH - 14}">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11px;color:#f0ece4;text-align:center;line-height:1.4;font-family:'DM Sans',sans-serif;">${tree.root}</div>
    </foreignObject>
  `);

  // ── Horizontal connector line across all branch tops ──
  if (bCount > 1) {
    const firstBx = hPad + colW * 0 + colW / 2;
    const lastBx  = hPad + colW * (bCount - 1) + colW / 2;
    svgLines.push(`<line x1="${firstBx}" y1="${branchY}" x2="${lastBx}" y2="${branchY}" stroke="rgba(201,169,110,0.25)" stroke-width="1.2"/>`);
    // Vertical from root to horizontal connector
    svgLines.push(`<line x1="${rootX}" y1="${rootY + rootH}" x2="${rootX}" y2="${branchY}" stroke="rgba(201,169,110,0.4)" stroke-width="1.5" stroke-dasharray="4,3"/>`);
  }

  tree.branches.forEach((branch, bi) => {
    const bx = hPad + colW * bi + colW / 2;
    const bBoxW = colW - 16; // leave 8px margin each side

    // Vertical line from h-connector to branch box (or straight from root if single)
    if (bCount === 1) {
      svgLines.push(`<line x1="${rootX}" y1="${rootY + rootH}" x2="${bx}" y2="${branchY}" stroke="rgba(201,169,110,0.4)" stroke-width="1.5" stroke-dasharray="4,3"/>`);
    } else {
      svgLines.push(`<line x1="${bx}" y1="${branchY}" x2="${bx}" y2="${branchY}" stroke="rgba(201,169,110,0.4)" stroke-width="1.2"/>`);
    }

    // Branch box
    svgBoxes.push(`
      <rect x="${bx - bBoxW/2}" y="${branchY}" width="${bBoxW}" height="${branchH}" rx="8"
        fill="rgba(30,20,8,0.6)" stroke="${branch.color}" stroke-width="1.4"/>
      <foreignObject x="${bx - bBoxW/2 + 8}" y="${branchY + 6}" width="${bBoxW - 16}" height="${branchH - 12}">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:${bCount >= 4 ? 9.5 : 10.5}px;color:#e8d5b0;text-align:center;font-weight:500;line-height:1.3;font-family:'DM Sans',sans-serif;">${branch.label}</div>
      </foreignObject>
    `);

    // Leaf nodes
    const leafCount = branch.children.length;
    const leafSlotW = bBoxW / leafCount;
    branch.children.forEach((leaf, li) => {
      const lx = (bx - bBoxW/2) + leafSlotW * li + leafSlotW / 2;
      const lBoxW = leafSlotW - 6;

      svgLines.push(`<line x1="${bx}" y1="${branchY + branchH}" x2="${lx}" y2="${leafY}" stroke="rgba(139,105,20,0.5)" stroke-width="1" stroke-dasharray="3,3"/>`);

      svgBoxes.push(`
        <rect x="${lx - lBoxW/2}" y="${leafY}" width="${lBoxW}" height="${leafH}" rx="6"
          fill="rgba(100,80,20,0.18)" stroke="rgba(201,169,110,0.2)" stroke-width="1"/>
        <foreignObject x="${lx - lBoxW/2 + 5}" y="${leafY + 5}" width="${lBoxW - 10}" height="${leafH - 10}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:${bCount >= 4 ? 9 : 10}px;color:#999;text-align:center;line-height:1.35;font-family:'DM Sans',sans-serif;">${leaf}</div>
        </foreignObject>
      `);
    });
  });

  return `
    <div class="issue-tree-wrap">
      <svg viewBox="0 0 ${totalW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
        ${svgLines.join('')}
        ${svgBoxes.join('')}
      </svg>
    </div>`;
}

// ════════════════════════════════════════════════════════
//  CHART RENDERER
// ════════════════════════════════════════════════════════
const chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; }
}

const CD = {
  gridColor: 'rgba(255,255,255,0.06)',
  textColor: '#777',
  font: { family: "'DM Sans', sans-serif", size: 11 }
};

function axisDefaults(label) {
  return {
    ticks: { color: CD.textColor, font: CD.font },
    grid: { color: CD.gridColor },
    title: label ? { display: true, text: label, color: '#999', font: { ...CD.font, size: 10.5 } } : { display: false }
  };
}

function legendDefaults() {
  return { labels: { color: CD.textColor, font: CD.font, boxWidth: 11, padding: 14 } };
}

function titlePlugin(text) {
  return {
    display: !!text,
    text: text || '',
    color: '#c9a96e',
    font: { family: "'DM Sans', sans-serif", size: 12, weight: '500' },
    padding: { bottom: 8 }
  };
}

function renderChart(canvasId, cd) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas || !cd) return;

  // Confusion matrix → HTML table, not chart
  if (cd.type === 'confusionMatrix') {
    canvas.style.display = 'none';
    const wrap = canvas.parentElement;
    const { labels, matrix, title } = cd;
    const maxVal = Math.max(...matrix.flat());
    let html = `<p style="font-size:.7rem;color:#c9a96e;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.8rem;font-weight:500;">${title}</p>`;
    html += `<div style="overflow-x:auto;"><table style="border-collapse:separate;border-spacing:4px;font-size:.75rem;min-width:280px;">`;
    html += `<thead><tr><th style="color:var(--muted);padding:.3rem .5rem;font-weight:400;text-align:left;">True \\ Pred</th>`;
    labels.forEach(l => html += `<th style="color:var(--accent);text-align:center;padding:.3rem .6rem;font-weight:500;">${l}</th>`);
    html += `</tr></thead><tbody>`;
    matrix.forEach((row, i) => {
      html += `<tr><td style="color:var(--accent);padding:.3rem .6rem;font-weight:500;white-space:nowrap;">${labels[i]}</td>`;
      row.forEach((val, j) => {
        const a = Math.round((val / maxVal) * 200).toString(16).padStart(2,'0');
        const bg = i === j ? `#c9a96e${a}` : `#5b8dd9${a}`;
        const fw = i === j ? '600' : '300';
        html += `<td style="text-align:center;padding:.55rem .6rem;background:${bg};border-radius:6px;color:var(--text);font-weight:${fw};">${val}</td>`;
      });
      html += `</tr>`;
    });
    html += `</tbody></table></div>`;
    html += `<p style="font-size:.68rem;color:var(--muted);margin-top:.6rem;">🟡 Diagonal = Correct &nbsp;·&nbsp; 🔵 Off-diagonal = Misclassified</p>`;
    const div = document.createElement('div');
    div.innerHTML = html;
    wrap.appendChild(div);
    return;
  }

  const ctx = canvas.getContext('2d');
  let config;

  if (cd.type === 'line') {
    config = {
      type: 'line',
      data: {
        labels: cd.labels,
        datasets: cd.datasets.map(ds => ({
          label: ds.label, data: ds.data,
          borderColor: ds.color, backgroundColor: 'transparent',
          tension: 0.35,
          pointRadius: cd.labels.length > 20 ? 2 : 4,
          pointBackgroundColor: ds.color,
          borderDash: ds.dashed ? [5,4] : [],
          borderWidth: ds.dashed ? 1.5 : 2
        }))
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        plugins: { title: titlePlugin(cd.title), legend: { display: true, position: 'bottom', ...legendDefaults() } },
        scales: { x: { ...axisDefaults(cd.xTitle) }, y: { ...axisDefaults(cd.yTitle) } }
      }
    };

  } else if (cd.type === 'quarterly') {
    config = {
      type: 'bar',
      data: {
        labels: cd.labels,
        datasets: cd.datasets.map((ds, i) => ({
          label: ds.label, data: ds.data,
          backgroundColor: ds.color + (i === 0 ? 'cc' : '88'),
          borderColor: ds.color, borderWidth: 1, borderRadius: 6,
          yAxisID: i === 0 ? 'y' : 'y1'
        }))
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        plugins: { title: titlePlugin(cd.title), legend: { display: true, position: 'bottom', ...legendDefaults() } },
        scales: {
          x: { ...axisDefaults(cd.xTitle) },
          y: { ...axisDefaults(cd.yTitle), position: 'left' },
          y1: { ...axisDefaults(cd.y1Title), position: 'right', grid: { display: false } }
        }
      }
    };

  } else if (cd.type === 'bar') {
    config = {
      type: 'bar',
      data: {
        labels: cd.labels,
        datasets: [{
          label: cd.title || '',
          data: cd.values,
          backgroundColor: cd.colors || cd.values.map(() => '#c9a96ecc'),
          borderColor: (cd.colors || []).map(c => c.replace('cc','').replace('88','')) || '#c9a96e',
          borderWidth: 1, borderRadius: 6
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        plugins: { title: titlePlugin(cd.title), legend: { display: false } },
        scales: { x: { ...axisDefaults(cd.xTitle) }, y: { ...axisDefaults(cd.yTitle), beginAtZero: true } }
      }
    };
    if (cd.note) {
      // note rendered below canvas by openModal
    }

  } else if (cd.type === 'barH') {
    config = {
      type: 'bar',
      data: {
        labels: cd.labels,
        datasets: [{ data: cd.values, backgroundColor: cd.colors || cd.values.map(() => '#c9a96ecc'), borderRadius: 5, borderWidth: 0 }]
      },
      options: {
        responsive: true, maintainAspectRatio: true, indexAxis: 'y',
        plugins: { title: titlePlugin(cd.title), legend: { display: false } },
        scales: {
          x: { ...axisDefaults(cd.xTitle), beginAtZero: true },
          y: { ...axisDefaults(cd.yTitle), grid: { display: false } }
        }
      }
    };

  } else if (cd.type === 'classificationBar') {
    config = {
      type: 'bar',
      data: {
        labels: cd.labels,
        datasets: cd.datasets.map(ds => ({
          label: ds.label, data: ds.data,
          backgroundColor: ds.color + 'bb', borderColor: ds.color,
          borderWidth: 1, borderRadius: 5
        }))
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        plugins: { title: titlePlugin(cd.title), legend: { display: true, position: 'bottom', ...legendDefaults() } },
        scales: {
          x: { ...axisDefaults(cd.xTitle) },
          y: { ...axisDefaults(cd.yTitle), beginAtZero: true, max: 1 }
        }
      }
    };

  } else if (cd.type === 'barChromosome') {
    config = {
      type: 'bar',
      data: {
        labels: cd.labels,
        datasets: [
          { label: 'Total Kalori', data: cd.values, backgroundColor: '#c9a96e99', borderColor: '#c9a96e', borderWidth: 1, borderRadius: 6 },
          {
            label: `Rata-rata (${cd.targetLine.toLocaleString('id-ID')} kkal)`,
            data: cd.labels.map(() => cd.targetLine),
            type: 'line', borderColor: '#e05252', borderDash: [5,4],
            borderWidth: 1.5, pointRadius: 0, fill: false
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        plugins: { title: titlePlugin(cd.title), legend: { display: true, position: 'bottom', ...legendDefaults() } },
        scales: {
          x: { ...axisDefaults(cd.xTitle) },
          y: { ...axisDefaults(cd.yTitle), beginAtZero: false }
        }
      }
    };
  }

  if (config) chartInstances[canvasId] = new Chart(ctx, config);
}

// ════════════════════════════════════════════════════════
//  MODAL
// ════════════════════════════════════════════════════════

// ── Rich visual helpers for Tira Beauty style ──
function renderStatRow(stats) {
  const colors = ['accent','teal','amber','purple'];
  const colorMap = {
    accent: { bg:'rgba(201,169,110,0.1)', border:'#c9a96e', text:'#c9a96e' },
    teal:   { bg:'rgba(29,158,117,0.1)',  border:'#1D9E75', text:'#1D9E75' },
    amber:  { bg:'rgba(186,117,23,0.1)',  border:'#BA7517', text:'#BA7517' },
    purple: { bg:'rgba(83,74,183,0.1)',   border:'#534AB7', text:'#534AB7' }
  };
  return `<div class="rm-stat-row">${stats.map((s,i)=>{
    const c = colorMap[colors[i % 4]];
    return `<div class="rm-stat" style="background:${c.bg};border-top:3px solid ${c.border}">
      <div class="rm-stat-num" style="color:${c.text}">${s.num}</div>
      <div class="rm-stat-lbl">${s.label}</div>
    </div>`;
  }).join('')}</div>`;
}

function renderFunnel(steps) {
  const widths = [100, 85, 34, 19];
  const bgs = ['#72243E','#D4537E','rgba(212,83,126,0.35)','rgba(212,83,126,0.15)'];
  const textColors = ['#fff','#fff','#72243E','#72243E'];
  return `<div class="rm-funnel">${steps.map((s,i)=>
    `<div class="rm-funnel-step">
      <div class="rm-funnel-label">${s.label}</div>
      <div class="rm-funnel-bg">
        <div class="rm-funnel-fill" style="width:${widths[i]}%;background:${bgs[i]};color:${textColors[i]};${i>=2?'border:1px solid #D4537E':''}">
          ${s.value}
        </div>
      </div>
      <div class="rm-funnel-badge">${s.badge ? `<span class="rm-badge ${s.badgeOk?'ok':''}">${s.badge}</span>` : ''}</div>
    </div>`
  ).join('')}</div>`;
}

function renderFindingCards(cols) {
  const typeStyle = {
    good:    { bg:'rgba(29,158,117,0.12)', border:'#1D9E75', text:'#6ecfa9' },
    bad:     { bg:'rgba(224,82,82,0.12)',  border:'#e05252', text:'#f08080' },
    neutral: { bg:'rgba(186,117,23,0.12)', border:'#BA7517', text:'#c9a96e' },
    info:    { bg:'rgba(83,74,183,0.12)',  border:'#534AB7', text:'#a5a0ee' }
  };
  return `<div class="rm-finding-grid">${cols.map(col =>
    `<div class="rm-finding-col">${col.map(f => {
      const s = typeStyle[f.type] || typeStyle.neutral;
      return `<div class="rm-finding" style="background:${s.bg};border-left:3px solid ${s.border}">
        <div class="rm-finding-head" style="color:${s.text}">${f.head}</div>
        <div class="rm-finding-body">${f.body}</div>
      </div>`;
    }).join('')}</div>`
  ).join('')}</div>`;
}

function renderCorrStrip(r, text) {
  return `<div class="rm-corr-strip">
    <div class="rm-corr-num">r = ${r}</div>
    <div class="rm-corr-text">${text}</div>
  </div>`;
}

function renderDQBox(items) {
  return `<div class="rm-dq-box">
    <div class="rm-dq-title">⚠ Catatan Kualitas Data</div>
    <div class="rm-dq-items">${items.map(it=>`<div class="rm-dq-item"><strong>${it.title}:</strong> ${it.body}</div>`).join('')}</div>
  </div>`;
}

function renderRecCards(recs) {
  const accents = ['#1D9E75','#D4537E','#534AB7','#BA7517','#c9a96e','#e05252'];
  const impactStyle = { high:'rgba(29,158,117,0.15)', med:'rgba(186,117,23,0.15)' };
  return `<div class="rm-rec-grid">${recs.map((r,i)=>
    `<div class="rm-rec-card" style="border-top:3px solid ${accents[i%6]}">
      <div class="rm-rec-num">${r.priority}</div>
      <div class="rm-rec-title">${r.title}</div>
      <div class="rm-rec-body">${r.body}</div>
      <span class="rm-rec-impact" style="background:${impactStyle[r.impactLevel]||impactStyle.med}">${r.impact}</span>
    </div>`
  ).join('')}</div>`;
}

function renderRichModal(p, id) {
  document.getElementById('mType').textContent = p.type;
  document.getElementById('mTitle').textContent = p.title;

  const issueTreeSection = p.issueTree ? `
    <div class="modal-section">
      <div class="modal-section-label">Issue Tree Analysis</div>
      ${renderIssueTree(p.issueTree)}
    </div>` : '';

  const chartsSection = p.charts && p.charts.length ? `
    <div class="modal-section">
      <div class="modal-section-label">Visualisasi & Grafik</div>
      <div class="charts-row">
        ${p.charts.map(c => `
          <div class="chart-col">
            <div class="chart-wrap"><canvas id="${c.id}_${id}"></canvas></div>
            ${c.note ? `<p class="chart-note">${c.note}</p>` : ''}
          </div>`).join('')}
      </div>
    </div>` : '';

  const body = `
    <div class="modal-section">
      <div class="modal-section-label">Gambaran Bisnis</div>
      <p class="modal-text">${p.overview}</p>
      ${p.richStats ? renderStatRow(p.richStats) : ''}
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Situasi Bisnis & Funnel</div>
      <p class="modal-text" style="margin-bottom:.9rem">${p.situasi}</p>
      ${p.funnel ? renderFunnel(p.funnel) : ''}
      <p class="modal-text" style="margin-top:.9rem">${p.situasiDetail}</p>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Problem Statement</div>
      <div class="insight-box"><p>"${p.problemStatement}"</p></div>
      ${p.problemSubs ? `<div class="rm-prob-subs">${p.problemSubs.map(s=>`<div class="rm-prob-sub">${s}</div>`).join('')}</div>` : ''}
    </div>
    ${issueTreeSection}
    <div class="modal-section">
      <div class="modal-section-label">Metodologi</div>
      <ul class="modal-bullets">${p.methodology.map(m=>`<li>${m}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Key Findings</div>
      ${p.richFindings ? renderFindingCards(p.richFindings) : ''}
      ${p.corrStrip ? renderCorrStrip(p.corrStrip.r, p.corrStrip.text) : ''}
    </div>
    ${chartsSection}
    <div class="modal-section">
      <div class="modal-section-label">Hasil & Metrik Kunci</div>
      <div class="modal-results">
        ${p.results.map(r=>`
          <div class="modal-result-card">
            <span class="modal-result-num">${r.num}</span>
            <div class="modal-result-label">${r.label}</div>
          </div>`).join('')}
      </div>
    </div>
    ${p.dataQuality ? `<div class="modal-section">${renderDQBox(p.dataQuality)}</div>` : ''}
    <div class="modal-section">
      <div class="modal-section-label">Rekomendasi Strategis</div>
      <p class="modal-text" style="margin-bottom:.8rem">Berdasarkan issue tree dan temuan data, berikut 6 rekomendasi prioritas yang actionable dan terukur:</p>
      ${p.richRecs ? renderRecCards(p.richRecs) : ''}
    </div>
    ${p.closing ? `<div class="modal-section"><div class="rm-closing">${p.closing}</div></div>` : ''}
    <div class="modal-section">
      <div class="modal-section-label">Tools & Teknologi</div>
      <div class="modal-tags">${p.tags.map(t=>`<span class="modal-tag">${t}</span>`).join('')}</div>
    </div>
    <div class="modal-actions">
      <a class="modal-link" href="${p.dashboardLink}" target="_blank">Lihat Dashboard ↗</a>
      <a class="modal-link-ghost" href="${p.colabLink}" target="_blank">Google Colab ↗</a>
    </div>`;

  document.getElementById('mBody').innerHTML = body;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    setTimeout(() => {
      if (p.charts) p.charts.forEach(c => renderChart(`${c.id}_${id}`, c));
    }, 100);
  });
}

function openModal(id) {
  const p = projects[id];
  if (!p) return;

  // Use rich visual modal if project has richStats
  if (p.richStats) return renderRichModal(p, id);

  document.getElementById('mType').textContent = p.type;
  document.getElementById('mTitle').textContent = p.title;

  // Issue tree section (only if exists)
  const issueTreeSection = p.issueTree ? `
    <div class="modal-section">
      <div class="modal-section-label">Issue Tree Analysis</div>
      ${renderIssueTree(p.issueTree)}
    </div>` : '';

  // Charts section: side by side
  const chartsSection = p.charts && p.charts.length ? `
    <div class="modal-section">
      <div class="modal-section-label">Visualisasi & Grafik</div>
      <div class="charts-row">
        ${p.charts.map(c => `
          <div class="chart-col">
            <div class="chart-wrap">
              <canvas id="${c.id}_${id}"></canvas>
            </div>
            ${c.note ? `<p class="chart-note">${c.note}</p>` : ''}
          </div>`).join('')}
      </div>
    </div>` : '';

  const body = `
    <div class="modal-section">
      <div class="modal-section-label">Overview</div>
      <p class="modal-text">${p.overview}</p>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Latar Belakang & Konteks</div>
      <ul class="modal-bullets">${p.background.map(b => `<li>${b}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Problem Statement</div>
      <div class="insight-box"><p>"${p.problemStatement}"</p></div>
    </div>
    ${issueTreeSection}
    <div class="modal-section">
      <div class="modal-section-label">Metodologi</div>
      <ul class="modal-bullets">${p.methodology.map(m => `<li>${m}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Key Findings</div>
      <ul class="modal-bullets">${p.findings.map(f => `<li>${f}</li>`).join('')}</ul>
    </div>
    ${chartsSection}
    <div class="modal-section">
      <div class="modal-section-label">Hasil & Metrik Kunci</div>
      <div class="modal-results">
        ${p.results.map(r => `
          <div class="modal-result-card">
            <span class="modal-result-num">${r.num}</span>
            <div class="modal-result-label">${r.label}</div>
          </div>`).join('')}
      </div>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Kesimpulan & Rekomendasi</div>
      <ul class="modal-bullets">${p.recommendations.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Tools & Teknologi</div>
      <div class="modal-tags">${p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}</div>
    </div>
    <div class="modal-actions">
      <a class="modal-link" href="${p.dashboardLink}" target="_blank">Lihat Dashboard ↗</a>
      <a class="modal-link-ghost" href="${p.colabLink}" target="_blank">Google Colab ↗</a>
    </div>`;

  document.getElementById('mBody').innerHTML = body;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    setTimeout(() => {
      if (p.charts) p.charts.forEach(c => renderChart(`${c.id}_${id}`, c));
    }, 100);
  });
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  Object.keys(chartInstances).forEach(k => destroyChart(k));
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ════════════════════════════════════════════════════════
//  RENDER CATEGORIES (auto-generate project cards)
// ════════════════════════════════════════════════════════
function renderCard(p, id) {
  return `
    <div class="project-card" onclick="openModal('${id}')">
      <div class="p-num">${p.num}</div>
      <div class="p-type">${p.type}</div>
      <div class="p-title">${p.title}</div>
      <p class="p-desc">${p.shortDesc}</p>
      <div class="p-tags">${p.tags.map(t => `<span class="p-tag">${t}</span>`).join('')}</div>
      <div class="arrow-hint">↗</div>
    </div>`;
}

function renderCategories() {
  const root = document.getElementById('categoriesRoot');
  if (!root) return;
  root.innerHTML = categories.map(cat => {
    const catProjects = cat.projects.map(id => projects[id]).filter(Boolean);
    const countLabel = cat.comingSoon ? 'Coming Soon' : `${catProjects.length} project${catProjects.length !== 1 ? 's' : ''}`;
    const countClass = cat.comingSoon ? 'cat-count soon' : 'cat-count';
    const dimClass = cat.comingSoon ? ' category-folder--dim' : '';
    const bodyContent = cat.comingSoon
      ? `<div class="coming-soon-box"><div class="cs-icon">🚧</div><div class="cs-title">Sedang dalam pengerjaan</div><div class="cs-desc">Project kategori ini akan segera hadir. Stay tuned!</div></div>`
      : `<div class="projects-grid">${catProjects.map((p, i) => renderCard(p, cat.projects[i])).join('')}</div>`;
    return `
      <div class="category-folder${dimClass}" id="${cat.id}">
        <div class="category-header" onclick="toggleCategory('${cat.id}')">
          <div class="cat-header-left">
            <div class="folder-icon-wrap"><span class="ico-closed">📁</span><span class="ico-open">📂</span></div>
            <div><div class="cat-title">${cat.icon} ${cat.title}</div><div class="cat-subtitle">${cat.subtitle}</div></div>
          </div>
          <div class="cat-header-right">
            <span class="${countClass}">${countLabel}</span>
            <span class="cat-chevron">›</span>
          </div>
        </div>
        <div class="category-body">${bodyContent}</div>
      </div>`;
  }).join('');
}

function toggleCategory(id) {
  document.getElementById(id).classList.toggle('open');
}

// ════════════════════════════════════════════════════════
//  SCROLL + NAV
// ════════════════════════════════════════════════════════
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const t = document.querySelector(href);
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// INIT
renderCategories();