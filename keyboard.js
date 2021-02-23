
  
  let language =[];
  window.localStorage.setItem("keydoardLang", "en");
  let sondClick = true;

const requestEn = new XMLHttpRequest();
const requestRu = new XMLHttpRequest();

requestRu.open('GET', './ru.json');
requestEn.open('GET', './en.json');
requestRu.onload = () => {
  requestEn.onload = () => {
    languageRu = JSON.parse(requestRu.response);
    languageEn = JSON.parse(requestEn.response);
    language = { "ru": languageRu, 
                "en": languageEn};
  function StorageSet(name, value) {
      window.localStorage.setItem(name, JSON.stringify(value));
    }
    
    function StorageGet(name, subst = null) {
      if (window.localStorage.getItem(name)=="ru"){
        return languageRu;
      }
      else return languageEn;
        }
    
  const rowsOrder = [
      ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal','Sound', 'Voice', 'Delete', 'X'],
      ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'],
      ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
      ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ArrowUp', 'en-ru'],
      ['ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
    ];
     
    let lang = StorageGet('keydoardLang', '"ru"');
    

  function createElements(elem, classNames, children, parent, ...dataAttr) {
      let element = null;
      try {
        element = document.createElement(elem);
      } catch (error) {
        throw new Error('Unable to create HTMLElement!');
      }
    
      if (classNames) element.classList.add(...classNames.split(' ')); 
    
      if (children && Array.isArray(children)) {
        children.forEach((childElement) => childElement && element.appendChild(childElement));
      } else if (children && typeof children === 'object') {
        element.appendChild(children);
      } else if (children && typeof children === 'string') {
        element.innerHTML = children;
      }
    
      if (parent) {
        parent.appendChild(element);
      }
    
      if (dataAttr.length) {
        dataAttr.forEach(([attrName, attrValue]) => {
          if (attrValue === '') {
            element.setAttribute(attrName, '');
          }
          if (attrName.match(/value|id|placeholder|cols|rows|autocorrect|spellcheck/)) {
            element.setAttribute(attrName, attrValue);
          } else {
            element.dataset[attrName] = attrValue;
          }
        });
      }
      return element;
    }
    

    // create class key
          class KeyElem {             
          constructor({ small, shift, code }) {
      this.small = small;
      this.shift = shift;
      this.code = code;
      this.isFnKey = Boolean(small.match(/Tab|Caps|Shift|Ctrl|Win|Alt|arr|Del|Back|Enter|en-ru|Sound|Voice|X/));
    
      if (this.shift && shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
          this.sub = createElements('div', 'sub', this.shift);  
      } else {
          this.sub = createElements('div', 'sub', ''); 
      }
          this.letter = createElements('div', 'letter', small); 
          this.div = createElements('div', 'keyboard__key', [this.sub, this.letter], null, ['code', this.code], 
          this.isFnKey ? ['fn', 'true'] : ['fn', 'false'],
          this.isFnKey ? ['key', '76'] : ['key', '65']);
      }
    }
        const main = createElements('main', '',
        [createElements('h1', 'title', 'Virtual Keyboard'),
        createElements('h2', 'title', 'Для смены языка нажимайте клавишу en-ru'),
        createElements('h2', 'title', 'Для включения или выключения звуков клавиатуры нажимайте клавишу Sound'),
        createElements('h2', 'title', 'Чтобы спрятать клавиатуру нажмите клавишу Х, чтобы активировать нажмите в поле ввода'),
        createElements('h2', 'title', 'Для голосового ввода нажмите клавишу Voice')]);

      class Keyboard {
      constructor(rowsOrder) {
        this.rowsOrder = rowsOrder;
        this.keysPressed = {};
        this.isCaps = false;
        this.isSound = false;
        this.isVoice = false;
      }

            // Keyboard

      init(langCode) {
        this.keyBase = lang;
        this.output = createElements('textarea', 'output', null, main,
        ['placeholder', 'Hello...'],
        ['rows', 8],
        ['cols', 60],
        ['spellcheck', false],
        ['autocorrect', 'off']);
          this.container = createElements('div', 'keyboard', null, main, ['language', langCode]);
          document.body.prepend(main);
          return this;
      }
    
      generateLayout() {
        this.keyButtons = [];
        this.rowsOrder.forEach((row, i) => {
          const rowElement = createElements('div', 'keyboard__row', null, this.container, ['row', i + 1]);
          rowElement.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
          row.forEach((code) => {
            const keyObj = this.keyBase.find((key) => key.code === code);
            if (keyObj) {
              const keyButton = new KeyElem(keyObj);
              this.keyButtons.push(keyButton);
              rowElement.appendChild(keyButton.div);
            }
          });
        });

      document.addEventListener('keydown', this.handleEvent);
      document.addEventListener('keyup', this.handleEvent);
        
      this.container.onmousedown = this.newHandleEvent;
    this.container.onmouseup = this.newHandleEvent;
  }


  playSound = (e) => {
    const audio = document.querySelector(e);
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
  }
  

  newHandleEvent = (e) => {
    e.stopPropagation();
    const keyDiv = e.target.closest('.keyboard__key');
    if (!keyDiv) return;
    const { dataset: { code } } = keyDiv;
    keyDiv.addEventListener('mouseleave', this.resButton);
    this.handleEvent({ code, type: e.type });
  };
      
    handleEvent = (e) => {

      if (e.stopPropagation) e.stopPropagation();
      const { code, type } = e;
      const keyObj = this.keyButtons.find((key) => key.code === code);
      if (!keyObj) return;
      this.output.focus();

          if (type.match(/keydown|mousedown/)) {
          
          if(sondClick){
              if (code.match(/Caps/)) {
              this.playSound(`audio[data-key="83"]`);
              }
              else if (code.match(/Shift/)){
                this.playSound(`audio[data-key="68"]`);
              }
              else if (code.match(/Backspace/)){
                this.playSound(`audio[data-key="75"]`);
              }
              else if (code.match(/Enter/)){
                this.playSound(`audio[data-key="74"]`);
              } else if (code.match(/Tab|Control|Win|Alt|arr|Del|en-ru|Sound|Voice/)){
                this.playSound(`audio[data-key="71"]`);
              }
              else{
                let ln = window.localStorage.getItem("keydoardLang");
                if(ln=='"en"'){
                this.playSound(`audio[data-key="76"]`);
                }
                else{
                  this.playSound(`audio[data-key="65"]`);
                }
              }
        }
        
    if (!type.match(/mouse/)) e.preventDefault();

        if (code.match(/Shift/)) this.shiftKey = true;
        if (this.shiftKey) this.setUppCase(true);

        if (code.match(/Control|Alt|Caps/) && e.repeat) return;
        if (code.match(/Control/)) this.ctrKey = true;
        if (code.match(/Alt/)) this.altKey = true;
        if (code.match(/Control/) && this.altKey) this.setLanguage();
        if (code.match(/Alt/) && this.ctrKey) this.setLanguage();
        if (code.match(/en-ru/)) {
          this.setLanguage();
            keyObj.div.innerHTML = window.localStorage.getItem('keydoardLang');          
        }

        keyObj.div.classList.add('active');

        if (code.match(/Caps/) && !this.isCaps) {
          this.isCaps = true;
          this.setUppCase(true);
        } else if (code.match(/Caps/) && this.isCaps) {
          this.isCaps = false;
          this.setUppCase(false);
          keyObj.div.classList.remove('active');
        }

        if (code.match(/Sound/)&& !this.isSound){   
                this.isSound = true;
                this.setSound();
              } else if (code.match(/Sound/) && this.isSound) {
                 this.isSound = false;
                this.setSound();
                keyObj.div.classList.remove('active');
              }

        if (!this.isCaps) {
          this.printOutput(keyObj, this.shiftKey ? keyObj.shift : keyObj.small);
        }
        else if (this.isCaps) {
          if (this.shiftKey) {
            this.printOutput(keyObj, keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
          } else {
            this.printOutput(keyObj, !keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
          }
        }
        this.keysPressed[keyObj.code] = keyObj;
      } else if (e.type.match(/keyup|mouseup/)) {
        this.resPrButton(code);
        if (code.match(/Shift/)) {
          this.shiftKey = false;
          this.setUppCase(false);
        }
        if (code.match(/Control/)) this.ctrKey = false;
        if (code.match(/Alt/)) this.altKey = false;

        if (!code.match(/Caps/)) {

          keyObj.div.classList.remove('active');
          if (code.match(/Sound/)){
            if(this.isSound)
            keyObj.div.classList.add('active');
            else{
              keyObj.div.classList.remove('active');
            }
          }
        }


      }
    }
    
    setSound = (e) => {
      if (sondClick){
        sondClick = false;
      }
      else{
        sondClick = true;
      }
      
    }

    setHide = () =>{
      this.container.classList.add("hide");
    }
    resButton = ({ target: { dataset: { code } } }) => {
      if (code.match('Shift')) {
        this.shiftKey = false;
        this.setUppCase(false);
        this.keysPressed[code].div.classList.remove('active');
      }
      if (code.match(/Control/)) this.ctrKey = false;
      if (code.match(/Alt/)) this.altKey = false;
      this.resPrButton(code);
      this.output.focus();
    }
  
    resPrButton = (targetCode) => {
      if (!this.keysPressed[targetCode]) return;
      if (!this.isCaps) this.keysPressed[targetCode].div.classList.remove('active');
      this.keysPressed[targetCode].div.removeEventListener('mouseleave', this.resButton);
      delete this.keysPressed[targetCode];
    }
  
    setLanguage = () => {
          const langAbbr = Object.keys(language);

          let langIdx = langAbbr.indexOf(this.container.dataset.language);
          this.keyBase = langIdx + 1 < langAbbr.length ? language[langAbbr[langIdx += 1]]
            : language[langAbbr[langIdx -= langIdx]];
      
          this.container.dataset.language = langAbbr[langIdx];
          StorageSet('keydoardLang', langAbbr[langIdx]);
          lang = StorageSet('keydoardLang', langAbbr[langIdx]);
          this.keyButtons.forEach((button) => {
            const keyObj = this.keyBase.find((key) => key.code === button.code);
            if (!keyObj) return;
            button.shift = keyObj.shift;
            button.small = keyObj.small;
            if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/g)) {
              button.sub.innerHTML = keyObj.shift;
            } else {
              button.sub.innerHTML = '';
            }
            button.letter.innerHTML = keyObj.small;
          });
          if (this.isCaps) this.setUppCase(true);
    }

    setUppCase(isTrue) {
      if (isTrue) {
        this.keyButtons.forEach((button) => {
          if (button.sub) {
            if (this.shiftKey) {
              button.sub.classList.add('sub-active');
              button.letter.classList.add('sub-inactive');
            }
          }
          if (!button.isFnKey && this.isCaps && !this.shiftKey && !button.sub.innerHTML) {
            button.letter.innerHTML = button.shift;
          } else if (!button.isFnKey && this.isCaps && this.shiftKey) {
            button.letter.innerHTML = button.small;
          } else if (!button.isFnKey && !button.sub.innerHTML) {
            button.letter.innerHTML = button.shift;
          }
        });
      } else {
        this.keyButtons.forEach((button) => {
          if (button.sub.innerHTML && !button.isFnKey) {
            button.sub.classList.remove('sub-active');
            button.letter.classList.remove('sub-inactive');
            if (!this.isCaps) {
              button.letter.innerHTML = button.small;
            } else if (!this.isCaps) {
              button.letter.innerHTML = button.shift;
            }
          } else if (!button.isFnKey) {
            if (this.isCaps) {
              button.letter.innerHTML = button.shift;
          } else {
            button.letter.innerHTML = button.small;
          }
        }
      });
    }
    }
    
  printOutput(keyObj, symbol) {
    let posCursor = this.output.selectionStart;
    let left = this.output.value.slice(0, posCursor);
    let right = this.output.value.slice(posCursor);
    const textHandlers = {
      
      ArrowLeft: () => {
        posCursor = posCursor - 1 >= 0 ? posCursor - 1 : 0;
      },
      ArrowRight: () => {
        posCursor += 1;
      },
      ArrowUp: () => {
        const positionFromLeft = this.output.value.slice(0, posCursor).match(/(\n).*$(?!\1)/g) || [[1]];
        posCursor -= positionFromLeft[0].length;
      },
      ArrowDown: () => {
        const positionFromLeft = this.output.value.slice(posCursor).match(/^.*(\n).*(?!\1)/) || [[1]];
        posCursor += positionFromLeft[0].length;
      },
      Tab: () => {
        this.output.value = `${left}\t${right}`;
        posCursor += 1;
      },
      Backspace: () => {
        this.output.value = `${left.slice(0, -1)}${right}`;
        posCursor -= 1;
      },
      Delete: () => {
        this.output.value = `${left}${right.slice(1)}`;
      },
      Enter: () => {
        this.output.value = `${left}\n${right}`;
        posCursor += 1;
      },
      Space: () => {
        this.output.value = `${left} ${right}`;
        posCursor += 1;
      }
    };
    if (textHandlers[keyObj.code]) textHandlers[keyObj.code]();
    else if (!keyObj.isFnKey) {
      posCursor += 1;
      this.output.value = `${left}${symbol || ''}${right}`;
    }
    this.output.setSelectionRange(posCursor, posCursor);
    }
  

  }
  
  new Keyboard(rowsOrder).init(window.localStorage.getItem("keydoardLang")).generateLayout();

  let out = document.querySelector(".output");
  out.onclick = function() {
    document.querySelector(".keyboard").classList.remove('hide');
  };  

  let x = document.querySelector("body > main > div > div:nth-child(1) > div:nth-child(17)");
  x.onclick = function() {
    document.querySelector('.keyboard').classList.add("hide");
  };  

  let voice = document.querySelector("body > main > div > div:nth-child(1) > div:nth-child(15)");
  let outVoice = document.querySelector("body > main > textarea");
            voice.onclick = function (){
              
                let langKey = document.querySelector("body > main > div > div:nth-child(3) > div:nth-child(2)");
                let res = outVoice.value;
                
                voice.classList.add('active');
            var recognizer = new webkitSpeechRecognition();
            recognizer.interimResults = true;

            if(window.localStorage.getItem("keydoardLang")=='"ru"'){
            recognizer.lang = 'ru-Ru';
            }else{
              recognizer.lang = 'en-En';
            }

            recognizer.onresult = function (event) {
              var result = event.results[event.resultIndex];
              console.log(result);
              if (result.isFinal) {
                outVoice.innerHTML = res + " " + result[0].transcript;
                recognizer.stop();
                voice.classList.remove('active');
              } else {
                console.log('Промежуточный результат: ', result[0].transcript);
              }

            };
              recognizer.start();
              setTimeout(stopR, 10000);

              function stopR(){
                voice.classList.remove('active');
              }
          };
          

}
}
requestRu.send();
requestEn.send();

