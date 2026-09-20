# Identitas

Nama : Moh Zidan Ilmi Alwi  
NRP : 5025251116  
Kelas : A  

# Deskripsi & preview 
Sesuai namanya, ini adalah web yang bisa menyimpan to-do/kegiatan yang akan dilakukan kedepannya. Jadi kita bisa memasukkan nama kegiatan, tanggal, waktu, beserta dengan deskripsi detail tentang kegiatan tersebut. Elemen utama di app ini berada di tengah, yaitu 2 box yang masing-masing berisi to-do list dan detail dari todo tersebut.  

<img width="1858" height="897" alt="image" src="https://github.com/user-attachments/assets/24aa92b6-a092-40ba-8cef-1e236a1158d1" />  
Di awal pemuatan web, box bagian kanan akan berisi deskripsi dari to-do pertama yang diambil dari database (data dummy). Box bagian kanan bisa berganti menyesuaikan tombol yang dipencet oleh user. Setiap to-do diorganisir kedalam box-box persegi panjang yang berisi nama, waktu, beserta button-button untuk melakukan aksi lebih lanjut ke to-do tersebut. Ada 3 fungsi utama: <br> <br>
1. Edit, merubah box bagian kanan menjadi edit box. Sehingga bisa mengedit nama, tanggal, waktu, beserta deskripsi dari to-do tersebut
<img width="1857" height="913" alt="image" src="https://github.com/user-attachments/assets/2629af9a-ddf0-49ce-b1c5-1ecc9d282149" />
2. Detail, merubah box bagian kanan menjadi deskripsi dari to-do tersebut <br>
<img width="1858" height="897" alt="image" src="https://github.com/user-attachments/assets/24aa92b6-a092-40ba-8cef-1e236a1158d1" /> 
3. Delete, menghapus to-do (di kasus ini menghapus to-do "Mancing") <br>
<img width="1856" height="913" alt="image" src="https://github.com/user-attachments/assets/c1cd0bc0-ee36-46cf-a9c9-6f2382de05b9" />

Selain itu, ada button add untuk menambahkan to-do baru ke dalam to-do list: <br>
<img width="1846" height="907" alt="image" src="https://github.com/user-attachments/assets/d6e51b23-fbc2-415e-8e00-a2a658b965ab" />

Secara teknis, perubahan box bagian kanan saya lakukan dengan menambahkan atribut `onclick` pada button yang memanggil fungsi didalam `<script>`. Di fungsi itu terdapat kode yang mengubah display dari box yang ingin dihilangkan menjadi `none` sedangkan yang dimunculkan menjadi `flex` atau sesuai display yang diinginkan. Lalu untuk pegoperasian dengan database ataupun back end, semua saya lakukan dengan library flask (saya memilih ini karena memang hanya ini yang pernah saya pelajari & sudah terbiasa) 

# Update 1
Saya baru sadar kalau DOM manipulation baru diajarkan disini, karena sebelumnya sudah ada fitur add, edit, dan delete. Maka di app ini tinggal menambahkan fitur checkbox & toggle dark-mode:
<img width="1852" height="908" alt="image" src="https://github.com/user-attachments/assets/a73702b0-e218-4fe7-8122-59f6ebfcd481" /> <br>
Disini checkbox akan memanggil event handler `onchange` yang memanggil fungsi `checkHandle(this)`. Fungsi ini akan mengecek status dari element checkbox, apakah checked atau tidak, jika iya akan merubah style dari box todo yang berkaitan:
<img width="1851" height="899" alt="image" src="https://github.com/user-attachments/assets/666b2176-45cf-495a-bb95-488e805486e7" /> <br>
Saat di-uncheck, style dari element tersebut juga akan direset ulang. Lalu untuk dark-mode, fitur ini menggunakan button di bagian atas kanan untuk memanggil fungsi `changeTheme` saat onclick, fungsi ini menambahkan class `dark_mode` pada element body. Sehingga `body.dark_mode {}` dan style yang diberlakukan pada css akan aktif, yang mana merubah tampilan web menjadi dark:
<img width="1857" height="886" alt="image" src="https://github.com/user-attachments/assets/6fd3d399-edf5-43e0-812e-7291e00a2118" /> 
Bisa dilihat juga bahwa saat button "dark mode" dipencet, textnya juga berubah menjadi "white mode". Jika button dipencet lagi akan merubahnya kembali ke theme awal


