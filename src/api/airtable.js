// src/api/airtable.js
import Airtable from 'airtable';

// Airtable 기본 설정
const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

/**
 * 배열을 랜덤하게 셔플합니다 (Fisher-Yates shuffle)
 * @param {Array} array - 셔플할 배열
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Airtable에서 레코드를 가져오고 셔플하여 지정된 개수만큼 반환합니다.
 * @param {string} tableId - Airtable 테이블 ID
 * @param {number} count - 가져올 레코드 개수
 * @param {string} category - '구약' 또는 '신약'
 * @param {string} type - 'mc' (객관식) 또는 'sa' (단답형)
 */
export const getShuffledRecords = async (tableId, count, category, type) => {
  try {
    const records = await base(tableId).select().all();
    
    // Airtable 레코드를 사용하기 쉬운 객체로 변환
    const formattedRecords = records
      .map((record) => ({
        id: record.id,
        ...record.fields,
        category, // 메타데이터 추가
        type,     // 메타데이터 추가
      }))
      // --- (수정된 부분) ---
      // Question 필드와 Answer 필드가 비어있지 않은(null, undefined, '') 레코드만 필터링합니다.
      // trim()을 사용하여 공백만 있는 경우도 제외합니다.
      .filter(record => 
        record.Question && record.Question.trim() !== '' &&
        record.Answer && record.Answer.toString().trim() !== '' // Answer가 숫자일 수도 있으므로 toString() 추가
      );
      // --- (수정 끝) ---

    const shuffled = shuffleArray(formattedRecords);
    return shuffled.slice(0, count);
  } catch (error) {
    console.error(`Error fetching from Airtable table ${tableId}:`, error);
    throw error;
  }
};