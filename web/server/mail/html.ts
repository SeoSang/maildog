export const generatePhotoFrame = (imgUrls: string[], alt: string) => {
  return imgUrls.reduce(
    (prev, cur) =>
      prev +
      '   <div class="frame" style="width: 300px;height: 250px;border: 3px solid #ccc;background: #eee;margin: auto;padding: 15px 10px;">\n' +
      `      <img src="${cur}" alt="${alt}" style="width: 100%;height: 100%;">\n` +
      '    </div>\n',
    '',
  )
}
