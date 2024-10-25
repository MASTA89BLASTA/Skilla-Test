import Call from '../redux/types/Call';

export const loadCalls = async (): Promise<Call[]> => {
  const response = await fetch('https://api.skilla.ru/testapi');
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  const data: { message: string } = await response.json();
  throw new Error(data.message);
};