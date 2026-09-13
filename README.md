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

