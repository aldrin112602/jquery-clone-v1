/**
 * @license jqueryClone v0.0.1
 *
 * jquery-clone.js
 *
 * (c) Aldrin Caballero | Dec. 28, 2023
 * https://github.com/aldrin112602/jquery-clone-v1
 * 
 * 
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

  /**
   * Sets the value of the first element in the collection.
   * @param {string} value - The value to set.
   * @returns {string} The value of the first element in the collection.
   */
  val(value) {
    value && (this[0].value = value);
    return this[0].value;
  }

  /**
   * Sets the innerHTML of the first element in the collection.
   * @param {string} value - The value to set.
   * @returns {string} The innerHTML of the first element in the collection.
   */
  html(value) {
    value && (this[0].innerHTML = value);
    return this[0].innerHTML;
  }

  /**
   * Sets the innerTEXT of the first element in the collection.
   * @param {string} value - The value to set.
   * @returns {string} The innerTEXT of the first element in the collection.
   */
  text(value) {
    value && (this[0].innerText = value);
    return this[0].innerText;
  }

  /**
   * Gets or sets an attribute of the first element in the collection.
   * @param {string} key - The name of the attribute to get or set.
   * @param {string} [value] - The value of the attribute to set.
   * @returns {string|Selector} If a value is not specified, returns the value of the attribute. If a value is specified, returns the current instance of Selector.
   */
  attr(key, value) {
    if (key && typeof key === "string" && !value) {
      return this[0].getAttribute(key);
    }
    this[0].setAttribute(key, value);
    return this;
  }

  /**
   * Adds content after each element in the collection.
   * @param {string} content - The content to add after each element.
   * @returns {Selector} The current instance of Selector.
   */
  after(content) {
    this.forEach((element) => {
      element.insertAdjacentHTML("afterend", content);
    });
    return this;
  }

  /**
   * Adds content before each element in the collection.
   * @param {string} content - The content to add before each element.
   * @returns {Selector} The current instance of Selector.
   */
  before(content) {
    this.forEach((element) => {
      element.insertAdjacentHTML("beforebegin", content);
    });
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

/**
 * Makes an HTTP GET request.
 * @param {string} URL - The URL to request.
 * @param {Object} [data] - The data to send with the request.
 * @param {Function} [callback] - A function to execute when the request completes.
 * @param {string} [dataType] - The type of data expected from the server.
 */
$.get = function (url, data, callback, dataType) {
  var xhr = new XMLHttpRequest();
  let type = dataType ?? null;
  if (type === "jsonp") {
    const callbackName = "jsonpCallback" + Math.round(100000 * Math.random());
    url += (url.indexOf("?") === -1 ? "?" : "&") + "callback=" + callbackName;
    window[callbackName] = function (response) {
      document.body.removeChild(script);
      delete window[callbackName];
      callback && callback(response, 200);
    };
    var script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
    return;
  }

  switch (type) {
    case "xml":
      type = "application/xml";
      break;
    case "html":
      type = "text/html";
      break;
    case "json":
      type = "application/json";
      xhr.responseType = "json";
      break;
    case "script":
      type = "application/javascript";
      break;
    case "text":
      type = "text/plain";
      break;
    default:
      type = "application/x-www-form-urlencoded";
      break;
  }

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", type);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback && callback(xhr.response, xhr.status);
    }
  };
  xhr.send(data ?? null);
};
