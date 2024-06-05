const navigasiIndex = { nav: 1 };
const cardList = [];
const cardE = [];
const titleField = document.getElementById("title");
const authorField = document.getElementById("author");
const hargaField = document.getElementById("harga");
const isCompletedField = document.getElementById("selesai");
const yearField = document.getElementById("year");
const semua = document.querySelector("#semuaList a");
const SAVE_CARD = "save-card";
// membuat element card

function newCard(card) {
  const div = document.createElement("div");
  div.classList.add("card");

  const titleCard = document.createElement("div");
  titleCard.classList.add("title-card");

  const author = document.createElement("div");
  author.classList.add("author");

  const title = document.createElement("h1");
  title.innerText = card.title;
  const authorName = document.createElement("h5");
  authorName.innerText = card.author;
  author.append(title, authorName);
  const time = document.createElement("h6");
  time.innerText = waktu(card.id);

  titleCard.append(author, time);

  const img = document.createElement("div");
  img.classList.add("img");
  const span = document.createElement("span");
  span.classList.add("year");
  span.innerText = card.year;
  const gambar = document.createElement("img");
  gambar.setAttribute("src", "img/book.png");
  gambar.setAttribute("alt", "Buku");

  img.append(span, gambar);

  const footCard = document.createElement("div");
  footCard.classList.add("foot-card");
  const price = document.createElement("h4");
  price.innerText = "IDR." + uang(card.harga);
  const action = document.createElement("div");
  action.classList.add("action-card");
  const trashSVG = document.createElement("div");
  trashSVG.classList.add("trash-list");
  trashSVG.addEventListener("click", function () {
    let ya = confirm("Ingin Menghapus Data?");
    if (ya) {
      hapusData(card.id);
    }
  });
  trashSVG.innerHTML = ` <svg
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
    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
  />
</svg>`;
  const doneSVG = document.createElement("div");
  doneSVG.classList.add("done-list");
  doneSVG.innerHTML = done(card.isCompleted);
  doneSVG.addEventListener("click", function () {
    gantiCompleted(card.id, card.isCompleted);
  });
  const editSVG = document.createElement("div");
  editSVG.classList.add("done-list");
  editSVG.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>`;
  editSVG.addEventListener("click", function () {
    editData(card);
  });

  // action.innerHTML = trashSVG + doneSVG;
  action.append(doneSVG, editSVG, trashSVG);
  footCard.append(price, action);
  div.append(titleCard, img, footCard);
  return div;
}
// Update Ke local storage
function save() {
  if (isStorageExist()) {
    const json = JSON.stringify(cardList);
    localStorage.setItem("card-list", json);
  }
  document.dispatchEvent(new Event(SAVE_CARD));
}

// loadData untuk pertama kali
function loadData() {
  try {
    const loadList = localStorage.getItem("card-list");
    if (loadList.length > 0) {
      const list = JSON.parse(loadList);
      for (const card of list) {
        cardList.push(card);
      }
      document.getElementById("totalCard").innerText = cardList.length;
      document.dispatchEvent(new Event(SAVE_CARD));
    }
  } catch (e) {
    save();
  }
}

window.addEventListener("DOMContentLoaded", function () {
  loadData();

  // Ketika Melakukan submit form
  const submitForm = document.getElementById("addCard");
  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (cardE.length > 0) {
      editBuku.click();
    } else {
      const id = +new Date();
      const title = titleField.value;
      const author = authorField.value;
      const harga = parseInt(hargaField.value);
      const isCompleted = isCompletedField.checked == true ? 1 : 0;
      const year = parseInt(document.getElementById("year").value);
      const form = { id, title, author, year, harga, isCompleted };

      tambahData(form);
    }

    save();
  });
});

// Proses penambahan saat melakukan submut
function tambahData(card) {
  cardList.push(card);
  semua.click();
  clearForm();
  alert("data berhasil Ditambahkan");
}
//proses saat menekan tombol hapus
function hapusData(id) {
  const card = cardList.indexOf(cariCard(id));
  cardList.splice(card, 1);
  save();

  alert("data berhasil dihapus");
  semua.click();
}

// Mengganti status isCompleted
function gantiCompleted(id, isCompleted) {
  // const index = cardList.indexOf(cariCard(id));
  const card = cariCard(id);
  card.isCompleted = !isCompleted;

  save();

  document.querySelector(".navigation .active a").click();

  if (isCompleted == 1) {
    alert("Disimpan ke Rak Dibaca");
  } else {
    alert("Disimpan ke Rak selesai");
  }
}
// membersihkan semua field
function clearForm() {
  titleField.value = "";
  authorField.value = "";
  hargaField.value = 0;
  isCompletedField.value = 0;
  yearField.value = 0;
}

// instalasi awal sebelum melakukan pengeditan
function editData(card) {
  document.querySelectorAll(".navigation a")[3].click();
  window.scrollTo(0, 300);
  card = cariCard(card.id);
  cardE.push(cardList.indexOf(card));

  editForm(card);
  document.querySelector("#addCard button").style.display = "none";
}
// perintah untuk mengisi form sesuai dengan card yang akan diedit
function editForm(card) {
  titleField.value = card.title;
  authorField.value = card.author;
  hargaField.value = card.harga;
  isCompletedField.checked = card.isCompleted;
  yearField.value = card.year;
  inputForm.map((nav, index) => {
    nav.classList.add("not");
  });
  [...document.querySelectorAll(".update-btn a")].map((a) =>
    a.classList.add("show")
  );
}
// memperbaruo card
function updateData() {
  const id = +new Date();
  cardList[cardE[0]].title = titleField.value;
  cardList[cardE[0]].author = authorField.value;
  cardList[cardE[0]].harga = hargaField.value;
  cardList[cardE[0]].isCompleted = isCompletedField.checked == true ? 1 : 0;
  cardList[cardE[0]].year = document.getElementById("year").value;
  save();
}
// perintah saat menekan tombol batal untuk Edit Buku
const cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  clearForm();
  [...document.querySelectorAll(".update-btn a")].map((a) =>
    a.classList.remove("show")
  );
  cardE.pop();
  document.querySelector("#semuaList a").click();
});
// perintah saat menekan tombol ubah Edit Buku
const editBuku = document.getElementById("editBuku");
editBuku.addEventListener("click", function (e) {
  e.preventDefault();
  updateData();
  cancelBtn.click();
});

// mencari kartu berdasarkan id yang diberikan
function cariCard(id) {
  return cardList.find((card) => card.id == id);
}
document.addEventListener(SAVE_CARD, function () {
  cardLoad(cardList);
});

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

// TOMBOL DIBACA - SEMUA -SELESAI
const navBook = [...document.querySelectorAll(".main-section li a")];
navBook.map((nav, index) => {
  nav.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".main-section .active").classList.toggle("active");
    this.parentElement.classList.toggle("active");
    let posisi = index * 100;
    if (index == 3) {
      posisi = 270;

      document.querySelector("#addCard").classList.add("active");
    } else {
      tampilkanData(index);

      if ([...document.querySelectorAll("#addCard.active")].length > 0) {
        document.querySelector("#addCard").classList.remove("active");
      }
    }

    document.querySelector(".main-section .active-bar").style.transition =
      "all .4s ease";
    document.querySelector(
      ".main-section .active-bar"
    ).style.left = `${posisi}px`;
  });
});
// MEnampilkan data berdasarkan tipe cardnya
function tampilkanData(index) {
  if (cardE.length > 0) {
    cancelBtn.click();
    document.querySelector("#addCard button").setAttribute("style", "");

    clearForm();
  }
  navigasiIndex.nav = index;
  let total = 0;
  switch (index) {
    case 0:
      total = cardLoad(cardList.filter((card) => card.isCompleted == 0));
      break;
    case 1:
      total = cardLoad(cardList);
      break;
    case 2:
      total = cardLoad(cardList.filter((card) => card.isCompleted == 1));
      break;
  }
  document.getElementById("totalCard").innerText = total;
}
// menampilakan kartu berdasarkan hasil filter
function cardLoad(cards) {
  let total = 0;
  const cardsDiv = document.getElementById("cards");
  cardsDiv.innerHTML = "";
  for (const item of cards) {
    const card = newCard(item);
    cardsDiv.append(card);
    total++;
  }
  return total;
}

// FIlter berdasarkan search
document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = this.querySelector("input").value;
  const type = navigasiIndex.nav;
  let hasil = cardList;
  if (type == 0) {
    hasil = cardList.filter((card) => card.isCompleted == 0);
  } else if (type == 2) {
    hasil = cardList.filter((card) => card.isCompleted == 1);
  }

  hasil = hasil.filter((card) => {
    return (
      card.author.toLowerCase().includes(input) ||
      card.title.toLowerCase().includes(input) ||
      card.year.includes(input)
    );
  });
  cardLoad(hasil);
  document.getElementById("totalCard").innerText = hasil.length;
});
