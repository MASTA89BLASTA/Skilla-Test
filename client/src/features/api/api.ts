/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type Call from "../redux/types/Call";

type LoadCallsResponse = {
  results: Call[];
  total_rows: string;
};

type LoadCallsParams = {
  token: string;
  dateStart: string;
  dateEnd: string;
  inOut?: string;
  limit?: number;
  offset?: number;
};

export const loadCalls = async ({
  token,
  dateStart,
  dateEnd,
  inOut,

}: LoadCallsParams): Promise<LoadCallsResponse> => {
  const url = "https://api.skilla.ru/mango/getList";

  const requestBody: Record<string, unknown> = {
    date_start: dateStart,
    date_end: dateEnd,
    in_out: inOut,
    limit: 1000,
    offset: 0,
  };
  if (inOut !== undefined && inOut !== "") {
    requestBody.in_out = parseInt(inOut, 10); 
  }

  console.log("Тело запроса (requestBody):", JSON.stringify(requestBody));
  console.log("Параметры запроса: ", { dateStart, dateEnd, inOut });

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
      total_rows: data.total_rows || "0",
    };
  }

  const errorData: { message: string } = await response.json();
  throw new Error(errorData.message);
};

export const loadCallRecord = async (
  token: string,
  recordId: string,
  partnershipId: string,
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
