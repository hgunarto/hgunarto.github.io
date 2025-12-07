// ============================
// Isi otomatis tanggal hari ini
// ============================
window.onload = function () {
    const now = new Date();

    document.getElementById("tgl").value = now.getDate();
    document.getElementById("bln").value = now.getMonth() + 1;
    document.getElementById("thn").value = now.getFullYear();

    // auto fokus ke input terakhir (tahun)
    document.getElementById("thn").focus();
};

// ============================
// Eksekusi saat tekan ENTER
// ============================
document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        hitungWeton();
    }
});

// ============================
// Fungsi perhitungan weton
// ============================
function hitungWeton() {
    const tgl = parseInt(document.getElementById('tgl').value);
    const bln = parseInt(document.getElementById('bln').value);
    const thn = parseInt(document.getElementById('thn').value);

    if (isNaN(tgl) || isNaN(bln) || isNaN(thn)) {
        document.getElementById('hasil').innerText = "Input salah, gunakan angka.";
        return;
    }

    const hariJawa = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"];
    const neptuHari = [4,3,7,8,6,9,5];
    const pasaran = ["Legi","Pahing","Pon","Wage","Kliwon"];
    const neptuPasaran = [5,9,7,4,8];
    const wukuList = [
        "Shinta","Landhep","Wukir","Kurantil","Tolu","Gumbreg","Warigalit","Warigagung",
        "Julungwangi","Sungsang","Galungan","Kuningan","Langkir","Mandasia","Julungpujut",
        "Pahang","Kuruwelut","Mrakeh","Tambir","Madangkungan","Maktal","Wuye","Manahil",
        "Prangbakat","Bala","Wugu","Wayang","Kulawu","Dhukut","Watugunung"
    ];
    const bulanJawa = [
        "Sura","Sapar","Mulud","Bakda Mulud","Jumadilawal","Jumadilakir",
        "Rejeb","Ruwah","Pasa","Sawal","Sela","Besar"
    ];

    // Referensi 30 Nov 2025 adalah Minggu Legi tgl 9 Juwadilakir 1959
    const refTanggal = new Date(2025, 10, 30); //2025,11,3tadinya atau 3 des 2025
    const refHariIndex = 6; //2tadinya
    const refPasaranIndex = 0; //3tadinya
    const refWukuIndex = 12;
    const refTanggalJawa = 9; //12tadinya
    const refBulanJawaIndex = 5;
    const refTahunJawa = 1959;

    const selisihHari = Math.floor((new Date(thn, bln - 1, tgl) - refTanggal) / 86400000);

    let hariIndex = (refHariIndex + selisihHari) % 7;
    if (hariIndex < 0) hariIndex += 7;

    let pasaranIndex = (refPasaranIndex + selisihHari) % 5;
    if (pasaranIndex < 0) pasaranIndex += 5;

    const neptu = neptuHari[hariIndex] + neptuPasaran[pasaranIndex];

    let wukuIndex = (refWukuIndex + Math.floor(selisihHari / 7)) % 30;
    if (wukuIndex < 0) wukuIndex += 30;

    let totalHari = refTanggalJawa + selisihHari;
    let tanggalJawa = ((totalHari - 1) % 30) + 1;
    let bulanJawaIndex = (refBulanJawaIndex + Math.floor((totalHari - 1) / 30)) % 12;
    let tahunJawa = refTahunJawa + Math.floor((totalHari - 1) / 360);

    document.getElementById('hasil').innerText =
        `Hari: ${hariJawa[hariIndex]}, pasaran: ${pasaran[pasaranIndex]}, neptu: ${neptu}, ` +
        `wuku: ${wukuList[wukuIndex]}, dan tanggal Jawa: ${tanggalJawa} ${bulanJawa[bulanJawaIndex]} ${tahunJawa}`;
}





