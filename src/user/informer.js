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
        const userName = 'Eich'; // Example user
        const item = 'Koala';  // Example item
        const container = 'Skyscraper'; // Example container
        const number = Math.floor(Math.random() * 10000); // Random number of items
        const fillEvent = {
          item,
          number,
          container,
          user: userName,
        };
        this.broadcastEvent(userName, fillEvent);  // Broadcast a new event every 5 seconds
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