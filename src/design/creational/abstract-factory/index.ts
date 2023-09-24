// Abstract Products
interface Button {
  click(): void;
}

interface PcWindow {
  open(): void;
}

// Concrete Products
class WindowsButton implements Button {
  click() {
    console.log('Windows Button clicked');
  }
}

class MacButton implements Button {
  click() {
    console.log('Mac Button clicked');
  }
}

class WindowsWindow implements PcWindow {
  open() {
    console.log('Windows Window opened');
  }
}

class MacWindow implements PcWindow {
  open() {
    console.log('Mac Window opened');
  }
}

/**
 * @description Abstract Factory
 * @note ここが肝。Factoryクラスの必要なメソッドをまとめる
 * @tips 結局サブクラスごとでメソッドを変えるのであれば継承 or ジェネリクスを使うしかないのかな
 */
interface GUIFactory {
  createButton(): Button;
  createWindow(): PcWindow;
}

/**
 * @description Concrete Factories
 * @note windows用に必要なクラスをセットするクラス
 */
class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }

  createWindow(): PcWindow {
    return new WindowsWindow();
  }
}

/**
 * @desc Concrete Factories
 * @note mac用に必要なクラスをセットするクラス
 */
class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }

  createWindow(): PcWindow {
    return new MacWindow();
  }
}

// Client Code
const buildGUI = (factory: GUIFactory) => {
  const button = factory.createButton();
  const window = factory.createWindow();

  button.click();
  window.open();
};

const factory = Math.random() < 0.5 ? new WindowsFactory() : new MacFactory();
buildGUI(factory);
