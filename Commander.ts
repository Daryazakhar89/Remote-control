import { Drawer } from './Drawer';
import { Navigator } from './Navigator';
import { ScreenGrabber } from './ScreenGrabber';

enum Commands {
  mouseUp,
  mouseDown,
  mouseLeft,
  mouseRight,
  drawCircle
}

export class Commander {
  public static async runCommand(command: string, args: number[]) {
    let commandResult = '';

    if (!command || typeof command !== 'string') {
      throw new Error('Command must be a non-empty string');
    }

    const methodName = Commander.buildMethodNameFromCommand(command);

    if (!(methodName in Commander)) {
      throw new Error('The command is wrong');
    } else {
      commandResult = await (Commander as any)[methodName](...args);
    }

    return commandResult;
  }

  private static buildMethodNameFromCommand(command: string): keyof typeof Commands {
    const words = command.split('_');
    const formattedWords = words.map((word, index) => {
      let result = '';

      if (index === 0) {
        result = word;
      } else {
        result = word.charAt(0).toUpperCase() + word.substring(1);
      }

      return result;
    });

    return formattedWords.join('') as keyof typeof Commands;
  }

  static async mouseUp(...args: number[]) {
    await Navigator.mouseUp(args[0]);
  }

  static async mouseDown(...args: number[]) {
    await Navigator.mouseDown(args[0]);
  }

  static async mouseLeft(...args: number[]) {
    await Navigator.mouseLeft(args[0]);
  }

  static async mouseRight(...args: number[]) {
    await Navigator.mouseRigth(args[0]);
  }

  static async mousePosition  () {
    return await Navigator.getMousePosition();
  }

  static async drawCircle(...args: number[]) {
    await Drawer.drawCircle(args[0]);
  }

  static async drawRectangle(...args: number[]) {
    await Drawer.drawRectangle(args[0], args[1]);
  }

  static async drawSquare(...args: number[]) {
    await Drawer.drawSquare(args[0]);
  }

  static async prntScrn() {
    return await ScreenGrabber.grabScreenshotArea();
  }
}