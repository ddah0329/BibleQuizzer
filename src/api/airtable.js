import Airtable from "airtable";

const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

const tableCategoryMap = {
  [import.meta.env.VITE_OLD_MC]: "구약 4지선다형",
  [import.meta.env.VITE_NEW_MC]: "신약 4지선다형",
  [import.meta.env.VITE_OLD_SA]: "구약 단답형",
  [import.meta.env.VITE_NEW_SA]: "신약 단답형",
};

export const fetchTable = async (tableId) => {
  try {
    const records = await base(tableId).select({ pageSize: 100 }).all();
    return records.map((r) => ({
      ...r.fields,
      Category: tableCategoryMap[tableId] || "알수없음",
    }));
  } catch (error) {
    console.error("Airtable fetch error:", error);
    return [];
  }
};
