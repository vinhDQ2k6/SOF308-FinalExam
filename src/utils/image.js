// Chuẩn hóa URL ảnh Google: thêm tham số kích thước nếu thiếu
export function normalizeGooglePhoto(url, size = 64) {
    if (!url) return ''
    try {
        const u = new URL(url)
        const isGooglePhoto = u.hostname.endsWith('googleusercontent.com')
        // Nếu là ảnh Google mà chưa có tham số kích thước (=sXX-c), thì thêm
        if (isGooglePhoto && !/(\?|&)sz=\d+/.test(url) && !/=s\d+-c$/.test(url)) {
            return `${url}=s${size}-c`
        }
    } catch {
        // Nếu không phải URL hợp lệ, trả về nguyên trạng
    }
    return url
}

// Fallback avatar (UI Avatars) khi không có/không tải được ảnh Google
export function fallbackAvatar(name = 'User', size = 64) {
    const n = encodeURIComponent(name)
    return `https://ui-avatars.com/api/?name=${n}&size=${size}&background=0D8ABC&color=fff&bold=true`
}