export type PhotoParam = { breedId: number; imageUrl: string }

export const generatePhotoFrame = (
  photoParams: PhotoParam[],
  alt: string,
): string => {
  return photoParams.reduce(
    (prev, cur) =>
      prev +
      '<div style="display: flex;flex-direction: column;margin-bottom: 10px;align-items: center;">\n' +
      '   <div class="frame" style="width: 300px;height: 250px;border: 3px solid #ccc;background: #eee;margin: auto;padding: 15px 10px;">\n' +
      `      <img src="${cur.imageUrl}" alt="${alt}" style="width: 100%;height: 100%;">\n` +
      '    </div>\n' +
      `    <a href="${process.env.NEXT_PUBLIC_SERVICE_URL}/breed/${cur.breedId}" style="width: 100px;text-decoration: none;background-color: white;border: 2px solid gray;color: black;padding: 16px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;transition-duration: 0.4s;cursor: pointer;">About Me!</a>\n` +
      '</div>\n',
    '',
  )
}
