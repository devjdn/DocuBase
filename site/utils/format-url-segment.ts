export const formatUrlSegment = (segment: string) => {
    return segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}