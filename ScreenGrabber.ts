import { mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';

export class ScreenGrabber {
  static screenSide = 200;

  public static async grabScreenshotArea() {
    const mousePoint = await mouse.getPosition();
    const left = mousePoint.x - ScreenGrabber.screenSide / 2;
    const top = mousePoint.y - ScreenGrabber.screenSide / 2;
    const region = new Region(
      left,
      top,
      ScreenGrabber.screenSide,
      ScreenGrabber.screenSide
    );
    screen.highlight(region);
    const imageRegion = await screen.grabRegion(region);
    const imageRGB = await imageRegion.toRGB();

    const jimpImage = new Jimp({
      data: imageRGB.data,
      width: ScreenGrabber.screenSide,
      height: ScreenGrabber.screenSide,
    });
    const base64data = await jimpImage.getBase64Async(Jimp.MIME_PNG);

    return base64data.replace('data:image/png;base64,', '');
  }
}
