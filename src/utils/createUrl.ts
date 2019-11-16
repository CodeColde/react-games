function createUrl (str: string, payload: any) {
    const url = new URL(str);
    Object.keys(payload).forEach(key => url.searchParams.append(key, payload[key]));
    return url;
}

export default createUrl;