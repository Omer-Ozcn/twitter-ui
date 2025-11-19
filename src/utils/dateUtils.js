export function formatTimeAgo(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}sn`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}dk`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}sa`;
  
  return date.toLocaleDateString("tr-TR", { month: "short", day: "numeric" });
}

export function formatFullDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString("tr-TR", {
    day: "numeric", 
    month: "long", 
    year: "numeric", 
    hour: "2-digit", 
    minute: "2-digit"
  });
}