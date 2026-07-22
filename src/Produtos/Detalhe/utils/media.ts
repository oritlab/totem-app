const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];

export function isVideoSrc(src: string): boolean {
  return VIDEO_EXTENSIONS.some((extension) => src.toLowerCase().endsWith(extension));
}
