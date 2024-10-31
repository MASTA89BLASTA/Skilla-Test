/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type Call from "../redux/types/Call";

type LoadCallsResponse = {
  results: Call[];
  total_rows: string;
};

export const loadCalls = async (
  token: string,
  dateStart: string,
  dateEnd: string,
  inOut?: string,
  limit?: number,
  offset?: number
): Promise<LoadCallsResponse> => {
  const url = "https://api.skilla.ru/mango/getList";

  const requestUrl = `${url}?date_start=${encodeURIComponent(dateStart)}&date_end=${encodeURIComponent(dateEnd)}${inOut ? `&in_out=${encodeURIComponent(inOut)}` : ""}`;
  console.log("Итоговый URL запроса:", requestUrl);

  const requestBody = {
    date_start: dateStart,
    date_end: dateEnd,
    ...(inOut !== undefined ? { in_out: inOut } : {}),
    ...(limit !== undefined ? { limit } : {}), 
    ...(offset !== undefined ? { offset } : {})
  };
  console.log("Тело запроса (requestBody):", JSON.stringify(requestBody));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    const data = (await response.json()) as LoadCallsResponse;
    console.log(data);
    return {
      results: data.results || [],
      total_rows: data.total_rows?.toString() || "0",
    };
  }

  const errorData: { message: string } = await response.json();
  throw new Error(errorData.message);
};

export const loadCallRecord = async (
  token: string,
  recordId: string,
  partnershipId: string
): Promise<Blob> => {
  const url = `https://api.skilla.ru/mango/getRecord?record=${encodeURIComponent(recordId)}&partnership_id=${encodeURIComponent(partnershipId)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
      "Content-Transfer-Encoding": "binary",
    },
  });

  console.log("Статус ответа при загрузке записи:", response.status);
  if (response.ok) {
    const blob = await response.blob();
    console.log("Полученный Blob:", blob);
    return blob;
  }

  const errorData: { message: string } = await response.json();
  throw new Error(errorData.message);
};
