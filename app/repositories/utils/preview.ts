let preview = false;

export function getPreview() {
    return preview
}

export function setPreview(value: boolean) {
    preview = value;
}

export function refreshPreview() {
    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = urlParams.get('preview');
    setPreview(!!isPreview);
}

export const DEBUG_QUERY = process.env.REACT_APP_DEBUG_QUERIES ?? true; //todo do off env variable