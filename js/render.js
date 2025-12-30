export const render = {
  updateStats(transactions) {
    const income = transactions
      .filter((t) => t.transaction_type === "income")
      .reduce((sum, t) => sum + t.amount_value, 0);

    const expense = transactions
      .filter((t) => t.transaction_type === "expense")
      .reduce((sum, t) => sum + t.amount_value, 0);

    const balance = income - expense;

    document.getElementById(
      "total-income"
    ).innerText = `${income.toLocaleString("ru-RU")} so'm`;
    document.getElementById(
      "total-expense"
    ).innerText = `${expense.toLocaleString("ru-RU")} so'm`;
    document.getElementById(
      "total-balance"
    ).innerText = `${balance.toLocaleString("ru-RU")} so'm`;
  },

  displayList(transactions, onDelete, filter = "all") {
    const listElement = document.getElementById("transaction-list");
    listElement.innerHTML = "";

    const filtered = transactions.filter((t) =>
      filter === "all" ? true : t.transaction_type === filter
    );

    filtered.forEach((t) => {
      const li = document.createElement("li");
      li.className = "list-item";
      const colorClass =
        t.transaction_type === "income" ? "text-success" : "text-danger";

      li.innerHTML = `
                <span>${
                  t.item_desc
                } - <strong class="${colorClass}">${t.amount_value.toLocaleString(
        "ru-RU"
      )} so'm</strong></span>
                <button class="del-btn" data-id="${
                  t.record_id
                }">O'chirish</button>
            `;
      li.querySelector(".del-btn").onclick = () => onDelete(t.record_id);
      listElement.appendChild(li);
    });
  },

  showNotification(message) {
    const container = document.getElementById("notification-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },
};
