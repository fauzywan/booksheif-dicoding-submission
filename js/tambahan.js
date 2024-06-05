// svg untuk isCompleted apakah 0 atau 1
function done(type) {
  if (type) {
    return `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    class="size-5"
  >
    <path
      fill-rule="evenodd"
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
      clip-rule="evenodd"
    />
    </svg>`;
  }
  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="size-6"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  />
</svg>`;
}
// header navar agar garis bawah mengikuti mouse
const navHeader = [...document.querySelectorAll("header li a")];
navHeader.map((nav, index) => {
  nav.addEventListener("mouseover", function (e) {
    e.preventDefault();
    document.querySelector("header .active").classList.toggle("active");
    this.parentElement.classList.toggle("active");
    let posisi = index * 110;

    document.querySelector("header .active-bar").style.transition =
      "all .4s ease";
    document.querySelector("header .active-bar").style.left = `${posisi}px`;
  });
});

// Mengubah format number harga menjadi nominal uang
function uang(nominal) {
  return new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
    nominal
  );
}
// ketika field berisikan data maka label akan tetap diatas meskipun tidak sedang fokus
const inputForm = [...document.querySelectorAll("form input")];
inputForm.map((nav, index) => {
  nav.addEventListener("keyup", function () {
    if (this.value != "") {
      this.classList.add("not");
    } else {
      this.classList.remove("not");
    }
  });
});
// semua field bertipe number tidak bisa diisi dengan bilangan negatif
[...document.querySelectorAll('input[type="number"]')].map((numberInput) => {
  numberInput.addEventListener("keyup", function () {
    if (this.value < 0) {
      this.value = 1;
    }
  });
});
// menampilkan keterangan waktu kapan card ditambahkan
function waktu(id) {
  let diff = Math.floor((new Date() - id) / 1000);
  let interval = diff / 86400;
  let time = new Date(id).toLocaleDateString();
  time =
    time.split("/")[1] + "/" + time.split("/")[0] + "/" + time.split("/")[2];
  if (diff < 60) {
    time = diff + " Detik lalu";
  } else if (diff >= 60 && diff < 3600) {
    interval = diff / 60;
    time = Math.floor(interval) + " Menit lalu";
  } else if (diff >= 3600 && diff <= 86400) {
    interval = diff / 3600;
    if (interval > 2) {
      time = new Date(id).getHours() + ":" + new Date(id).getMinutes();
    } else {
      time = Math.floor(interval) + " Jam lalu";
    }
  } else {
    time = 0;
  }
  return time;
}
