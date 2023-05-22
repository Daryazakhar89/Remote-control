import { mouse } from '@nut-tree/nut-js';

export class Navigator {

  static async mouseUp(step: number) {
    const mousePoint = await mouse.getPosition();
    mousePoint.y -= step;
    await mouse.setPosition(mousePoint);
  }

  static async mouseDown(step: number) {
    const mousePoint = await mouse.getPosition();
    mousePoint.y += step;
    await mouse.setPosition(mousePoint);
  }

  static async mouseLeft(step: number) {
    const mousePoint = await mouse.getPosition();
    mousePoint.x -= step;
    await mouse.setPosition(mousePoint);
  }

  static async mouseRigth(step: number) {
    const mousePoint = await mouse.getPosition();
    mousePoint.x += step;
    await mouse.setPosition(mousePoint);
  }

  static async getMousePosition() {
    const mousePoint = await mouse.getPosition();

    return `${mousePoint.x} px, ${mousePoint.y} px`.replace(/ /g, String.fromCharCode(160));
  }
}