import { mouse, Button } from "@nut-tree/nut-js";

enum Direction {
  right = 1,
  left = -1
}

export class Drawer {
  static async drawCircle(radius: number) {
    const movements = [];
    const point = await mouse.getPosition();
    const centerX = point.x;
    const centerY = point.y;
    const startX = point.x - radius;
    const endX = point.x + radius;

    let x = startX;
    let direction: Direction = 1;

    while (true) {
      x += direction * (0.05);

      // break if the whole circle was drawn
      if (direction === -1 && x <= startX) {
        break;
      }

      // change direction if a half of the circle was drawn
      if (x >= endX) {
       direction = -1;
       continue;
      }

      const y = direction * (Math.sqrt(Math.pow(radius, 2) - Math.pow((x - centerX), 2))) + centerY;
      point.x = Math.round(x);
      point.y = Math.round(y);

      // move mose to a drawing position and only then hold left button
      if (!movements.length) {
        await mouse.setPosition(point);
        await mouse.pressButton(Button.LEFT);
      }

      movements.push(mouse.setPosition(point));
    }

    await mouse.releaseButton(Button.LEFT)

    await Promise.all(movements);
  }

  static async drawRectangle(width:number, height:number) {
    const point = await mouse.getPosition();

    await mouse.pressButton(Button.LEFT);
    point.x = point.x + width;
    await mouse.setPosition(point);

    await mouse.pressButton(Button.LEFT);
    point.y = point.y + height;
    await mouse.setPosition(point);

    await mouse.pressButton(Button.LEFT);
    point.x = point.x - width;
    await mouse.setPosition(point);

    await mouse.pressButton(Button.LEFT);
    point.y = point.y - height;
    await mouse.setPosition(point);
    await mouse.releaseButton(Button.LEFT);
  }

  static async drawSquare(side: number) {
    await Drawer.drawRectangle(side, side);
  }
}