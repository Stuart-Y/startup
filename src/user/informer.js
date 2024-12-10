const FillEvent = {
    System: 'system',
  };
  
  class EventMessage {
    constructor(from, value) {
      this.from = from;
      this.value = value;
    }
  }
  
  class FillEventNotifier {
    events = [];
    handlers = []; 
    
    constructor() {

      setInterval(() => {
        const userName = 'Eich'; 
        const item = 'Koala'; 
        const container = 'Skyscraper';
        const number = Math.floor(Math.random() * 10000);
        const fillEvent = {
          item,
          number,
          container,
          user: userName,
        };
        this.broadcastEvent(userName, fillEvent); 
      }, 5000);
    }
  
    broadcastEvent(from, value) {
      const event = new EventMessage(from, value);
      this.receiveEvent(event);
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    removeHandler(handler) {
      this.handlers.filter((h) => h !== handler);
    }
  
    receiveEvent(event) {
      this.events.push(event);
  
      this.events.forEach((e) => {
        this.handlers.forEach((handler) => {
          handler(e);
        });
      });
    }
  }
  
  const FillNotifier = new FillEventNotifier();
  export { FillEvent, FillNotifier };