export function formatDateTime(isoString) {
    if (!isoString) {
        return 'Không có thời gian đăng';
    }

    const date = new Date(isoString);
    if (isNaN(date)) {
        return 'Không có thời gian đăng';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Ví dụ sử dụng
const formattedTime = formatDateTime(''); // Không có thời gian
console.log(formattedTime); // Output: "Không có thời gian đăng"

const validTime = formatDateTime('2024-10-15T09:46');
console.log(validTime); // Output: "15/10/2024 09:46"
