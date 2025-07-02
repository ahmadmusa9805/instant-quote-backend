export const CALLBOOKING_SEARCHABLE_FIELDS = ['name', 'description', 'atcCodes'];
 export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const normalizeDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-').map(Number);

  if (!year || !month || !day) {
    throw new Error(`Invalid date input: ${dateStr}`);
  }

  const date = new Date(Date.UTC(year, month - 1, day)); // UTC safe
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

 
 export function normalizeTime(time: string): string {
   const [h, m] = time.split(':');
   return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`; // '09:00'
 }