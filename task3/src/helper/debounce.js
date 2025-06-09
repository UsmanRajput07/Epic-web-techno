export function debounce(func, delay = 1000) {
    let timeoutId;
    return (...params) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...params)
            timeoutId = null
        }, delay)
    }
}
