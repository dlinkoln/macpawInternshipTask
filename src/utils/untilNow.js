export default function untilNowS(updatedAt) {
  const diffInMs = Date.now() - Date.parse(updatedAt);
  const diffInHours = ((diffInMs / (1000 * 60 * 60)).toFixed(0));
  return diffInHours;
}
