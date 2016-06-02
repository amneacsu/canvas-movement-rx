const Rx = require('rx');
const originalModifiers = require('./modifiers');

const events = (state) => {
  const keydownStream = Rx.Observable.fromEvent(document, 'keydown');
  const aStream = keydownStream.filter((event) => {
    return event.key === 'a';
  });
  const wStream = keydownStream.filter((event) => {
    return event.key === 'w';
  });

  Rx.Observable.when(aStream.and(wStream).thenDo((a,b)=>{
    console.log(a.key,b.key);
    return 'test';
  })).subscribe((event) => {
    console.log('when', event);
  });
};


module.exports = {
  events,
  update: originalModifiers.update
};