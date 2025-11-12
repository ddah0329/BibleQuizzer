import Airtable from "airtable";

const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

export async function fetchQuizData(mode) {
  const tableKey = getTableKeys(mode);
  const tables = Array.isArray(tableKey) ? tableKey : [tableKey];
  let records = [];

  for (let key of tables) {
    const data = await base(import.meta.env[key])
      .select()
      .all();
    const parsed = data.map((r) => r.fields);
    records.push(...parsed);
  }

  return shuffle(records).slice(0, getLimit(mode));
}

function getTableKeys(mode) {
  switch (mode) {
    case "practice_old_mc":
      return "VITE_OLD_MC";
    case "practice_old_sa":
      return "VITE_OLD_SA";
    case "practice_new_mc":
      return "VITE_NEW_MC";
    case "practice_new_sa":
      return "VITE_NEW_SA";
    case "exam_all":
      return [
        "VITE_OLD_MC",
        "VITE_NEW_MC",
        "VITE_OLD_SA",
        "VITE_NEW_SA",
      ];
    case "exam_old":
      return ["VITE_OLD_MC", "VITE_OLD_SA"];
    case "exam_new":
      return ["VITE_NEW_MC", "VITE_NEW_SA"];
    case "VITE_2025_OLD_MC":
      return "VITE_2025_OLD_MC";
    case "VITE_2025_NEW_MC":
      return "VITE_2025_NEW_MC";
    case "VITE_2025_OLD_SA":
      return "VITE_2025_OLD_SA";
    case "VITE_2025_NEW_SA":
      return "VITE_2025_NEW_SA";
    default:
      return "VITE_OLD_MC";
  }
}

function getLimit(mode) {
  if (mode.includes("practice")) return 10;
  if (mode.includes("exam")) return 45;
  return 1000; // 2025 모드는 전체
}
