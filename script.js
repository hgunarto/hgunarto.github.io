<input type="date" id="tanggal" />
<div id="hasil" style="margin-top:10px;"></div>

<script>
// --- 1. Set tanggal otomatis hari ini ---
document.getElementById("tanggal").value =
    new Date().toISOString().substring(0, 10);

// --- 2. Tekan ENTER untuk eksekusi ---
document.getElementById("tanggal").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        prosesTanggal();
    }
});

// --- Data Neptu Jawa ---
const dinoJawa = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const neptuDino = { "Minggu": 5, "Senin": 4, "Selasa": 3, "Rabu": 7, "Kamis": 8, "Jumat": 6, "Sabtu": 9 };

const pasaran = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
const neptuPasaran = { "Legi": 5, "Pahing": 9, "Pon": 7, "Wage": 4, "Kliwon": 8 };

// --- Fungsi Hitung Pasaran Jawa ---
function hitungPasaran(dateObj) {
    // basis: 1 Januari 1970 adalah Kamis Legi
    const start = new Date("1970-01-01");
    const diff = Math.floor((dateObj - start) / (1000 * 60 * 60 * 24));
    return pasaran[ diff % 5 ];
}

// --- 3. Proses Tanggal ---
function prosesTanggal() {
    const input = document.getElementById("tanggal").value;
    const dateObj = new Date(input);

    // Hari biasa
    const hari = dinoJawa[ dateObj.getDay() ];

    // Pasaran
    const pasar = hitungPasaran(dateObj);

    // Neptu
    const totalNeptu = neptuDino[hari] + neptuPasaran[pasar];

    // Format Indonesia
    const tampilIndo = dateObj.toLocaleDateString("id-ID", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    document.getElementById("hasil").innerHTML = `
        <b>Tanggal input:</b> ${input}<br>
        <b>Format Indonesia:</b> ${tampilIndo}<br><br>

        <b>Hari Jawa:</b> ${hari}<br>
        <b>Pasaran:</b> ${pasar}<br>
        <b>Neptu Hari:</b> ${neptuDino[hari]}<br>
        <b>Neptu Pasaran:</b> ${neptuPasaran[pasar]}<br>
        <b>Total Neptu:</b> ${totalNeptu}
    `;
}
</script>
