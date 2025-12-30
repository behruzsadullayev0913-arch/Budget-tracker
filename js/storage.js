export const storage = {
  save(data) {
    try {
      localStorage.setItem("transactions", JSON.stringify(data));
    } catch (e) {
      console.error("Xotiraga saqlashda xato:", e);
    }
  },
  load() {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  },
};
