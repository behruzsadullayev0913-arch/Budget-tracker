import { storage } from "./storage.js";
import { render } from "./render.js";
import { api } from "./api.js";

let transactions = [];
let currentFilter = "all";

async function init() {
  try {
    transactions = await api.fetchData();
    refreshUI();
  } catch (error) {
    render.showNotification(error);
  }
}

function refreshUI() {
  render.updateStats(transactions);
  render.displayList(transactions, deleteRecord, currentFilter);
}

function deleteRecord(id) {
  transactions = transactions.filter((t) => t.record_id !== id);
  storage.save(transactions);
  refreshUI();
}

const financeForm = document.getElementById("finance-form");
financeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const desc = document.getElementById("item_desc").value.trim();
  const amount = parseFloat(document.getElementById("amount_value").value);
  const type = document.getElementById("transaction_type").value;

  if (!desc || isNaN(amount) || amount <= 0) {
    render.showNotification("Iltimos, nomini va summani to'g'ri kiriting!");
    return;
  }

  const newRecord = {
    record_id: Date.now(),
    item_desc: desc,
    amount_value: amount,
    transaction_type: type,
  };

  transactions.push(newRecord);
  storage.save(transactions);
  refreshUI();
  e.target.reset();
});

const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    currentFilter = e.target.getAttribute("data-filter");
    refreshUI();
  });
});

init();
