// ==========================================
// CINEBOOK - JAVASCRIPT
// ==========================================

let selectedSeats = [];

const hargaTiket = 50000;


// ==========================================
// PILIH FILM
// ==========================================

function pilihFilm(namaFilm) {

    document.getElementById("filmSelect").value = namaFilm;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// PILIH KURSI
// ==========================================

const seats = document.querySelectorAll(".seat");

seats.forEach(function(seat) {

    seat.addEventListener("click", function() {

        // Kursi yang sudah terisi tidak dapat dipilih
        if (seat.classList.contains("occupied")) {
            return;
        }


        const nomorKursi = seat.textContent;


        // Jika kursi sudah dipilih
        if (seat.classList.contains("selected")) {

            seat.classList.remove("selected");

            selectedSeats =
                selectedSeats.filter(
                    function(item) {
                        return item !== nomorKursi;
                    }
                );

        }

        // Jika kursi belum dipilih
        else {

            seat.classList.add("selected");

            selectedSeats.push(nomorKursi);

        }


        hitungTotal();

    });

});


// ==========================================
// HITUNG TOTAL HARGA
// ==========================================

function hitungTotal() {

    const totalHarga =
        selectedSeats.length * hargaTiket;


    document.getElementById("total").innerText =
        "Rp " + totalHarga.toLocaleString("id-ID");

}


// ==========================================
// KONFIRMASI RESERVASI
// ==========================================

function pesanTiket() {

    const film =
        document.getElementById("filmSelect").value;

    const bioskop =
        document.getElementById("bioskop").value;

    const tanggal =
        document.getElementById("tanggal").value;

    const jam =
        document.getElementById("jam").value;

    const nama =
        document.getElementById("nama").value;

    const email =
        document.getElementById("email").value;


    // Validasi
    if (
        film === "" ||
        bioskop === "" ||
        tanggal === "" ||
        jam === "" ||
        nama === "" ||
        email === "" ||
        selectedSeats.length === 0
    ) {

        alert(
            "⚠️ Silakan lengkapi semua data dan pilih kursi terlebih dahulu!"
        );

        return;

    }


    // Tampilkan data tiket

    document.getElementById("ticketFilm")
        .innerText = film;

    document.getElementById("ticketCinema")
        .innerText = bioskop;

    document.getElementById("ticketDate")
        .innerText = tanggal;

    document.getElementById("ticketTime")
        .innerText = jam;

    document.getElementById("ticketSeat")
        .innerText =
        selectedSeats.join(", ");

    document.getElementById("ticketName")
        .innerText = nama;


    // Tampilkan tiket

    document.getElementById("ticket").style.display =
        "flex";


    document.getElementById("ticket")
        .scrollIntoView({
            behavior: "smooth"
        });


    // Simpan reservasi ke LocalStorage

    const dataReservasi = {

        film: film,

        bioskop: bioskop,

        tanggal: tanggal,

        jam: jam,

        nama: nama,

        email: email,

        kursi: selectedSeats,

        total:
            selectedSeats.length * hargaTiket

    };


    localStorage.setItem(
        "reservasiCineBook",
        JSON.stringify(dataReservasi)
    );


    alert(
        "🎉 Reservasi berhasil!\n\n" +
        "Tiket kamu sudah dibuat."
    );

}