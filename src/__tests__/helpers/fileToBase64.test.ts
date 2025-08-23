import { fileToBase64 } from '@src/helpers/fileToBase64';

describe('fileToBase64', () => {
  it('should convert a JPEG image file to a base64 string', async () => {
    const file = new File([new Uint8Array([255, 216, 255, 224])], 'test.jpg', {
      type: 'image/jpeg',
    });

    const result = await fileToBase64(file);
    expect(result.startsWith('data:image/jpeg;base64,')).toBe(true);
  });
});
