import Airtable from "airtable";

const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

const tableCategoryMap = {
  [import.meta.env.VITE_OLD_MC]: "구약 객관식",
  [import.meta.env.VITE_NEW_MC]: "신약 객관식",
  [import.meta.env.VITE_OLD_SA]: "구약 단답형",
  [import.meta.env.VITE_NEW_SA]: "신약 단답형",
  [import.meta.env.VITE_2025_OLD_MC]: "2025 구약 객관식",
  [import.meta.env.VITE_2025_NEW_MC]: "2025 신약 객관식",
  [import.meta.env.VITE_2025_OLD_SA]: "2025 구약 빈칸",
  [import.meta.env.VITE_2025_NEW_SA]: "2025 신약 빈칸",
};

export const fetchTable = async (tableId) => {
  if (!tableId) {
    console.error("❌ Table ID가 비어 있습니다.");
    return [];
  }

  try {
    const records = await base(tableId).select({ view: "Grid view" }).all();

    return records.map((r) => ({
      ...r.fields,
      id: r.id,
      Category: tableCategoryMap[tableId] || "기타",
    }));
  } catch (error) {
    console.error("Airtable fetch error:", error);
    return [];
  }
};
