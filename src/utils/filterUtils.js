export const transformFiltersToFeatures = (filters) => {
  if (!filters || typeof filters !== "object") {
    console.log("Filters are missing or invalid:", filters); // Логування, якщо filters відсутні або не є об'єктом
    return [];
  }

  console.log("Filters:", filters); // Логування самих filters для перевірки

  return Object.entries(filters)
    .filter(([_, value]) => value && value !== "") // Виключаємо null, false та порожні значення
    .map(([key]) => key); // Повертаємо лише ключі
};
