import { storage } from "./storage.js";

export const api = {
  async fetchData() {
    return new Promise((resolve, reject) => {
      const data = storage.load();
      if (data) {
        resolve(data);
      } else {
        reject("Ma'lumotlarni yuklashda xatolik yuz berdi!");
      }
    });
  },
};
