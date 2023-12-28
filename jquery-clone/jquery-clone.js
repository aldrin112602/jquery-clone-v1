/**
 * Creates a new instance of Selector.
 * @param {string|NodeListOf<Element>|HTMLCollectionOf<Element>|Array<Element>} selector - A CSS selector, a node list, a collection, or an array of elements.
 */
var d = document,
  w = window;
class Selector extends Array {
  constructor(selector) {
    super(),
      selector && "string" === typeof selector
        ? this.push(...d.querySelectorAll(selector))
        : this.push(selector);
  }

  /**
   * Checks if the document is ready for manipulation.
   * @param {Function} [callback] - A function to execute after the document is ready.
   */
  ready(callback) {
    if (w.document.readyState === "complete") {
      callback && callback();
    } else {
      w.document.addEventListener("DOMContentLoaded", function () {
        callback && callback();
      });
    }
  }

  /**
   * Adds an event listener to each element in the collection.
   * @param {string} event - The name of the event to listen for.
   * @param {Function} callback - The function to execute when the event is triggered.
   * @returns {Selector} The current instance of Selector.
   */
  on(event, callback) {
    if (event && callback && typeof event == "string") {
      this.forEach((element) => {
        element.addEventListener(event, function () {
          callback instanceof Function && callback();
        });
      });
      return this;
    }
  }

  /**
   * Adds a click event listener to each element in the collection.
   * @param {Function} callback - The function to execute when an element is clicked.
   * @returns {Selector} The current instance of Selector.
   */
  click(callback) {
    if (callback && callback instanceof Function) {
      this.forEach((element) => {
        element.onclick = callback;
      });
      return this;
    }
  }

  /**
   * Hides each element in the collection.
   * @param {Function} [callback] - A function to execute after the elements are hidden.
   * @returns {Selector} The current instance of Selector.
   */
  hide(callback) {
    this.forEach((element) => {
      element.style.display = "none";
    });

    callback && callback instanceof Function && callback();

    return this;
  }

  /**
   * Shows each element in the collection.
   * @param {Function} [callback] - A function to execute after the elements are shown.
   * @returns {Selector} The current instance of Selector.
   */
  show(callback) {
    this.forEach((element) => {
      element.style.display = "block";
    });

    callback && callback instanceof Function && callback();

    return this;
  }

  /**
   * Toggles the display property of each element in the collection.
   * @param {Function} [callback] - A function to execute after the elements are toggled.
   * @returns {Selector} The current instance of Selector.
   */
  toggle(callback) {
    this.forEach((element) => {
      if (element.style.display == "none") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });

    callback && callback instanceof Function && callback();

    return this;
  }
}

/**
 * Creates a new instance of Selector.
 * @param {string|NodeListOf<Element>|HTMLCollectionOf<Element>|Array<Element>} selector - A CSS selector, a node list, a collection, or an array of elements.
 * @returns {Selector} A new instance of Selector.
 */
function $(selector) {
  return new Selector(selector);
}
