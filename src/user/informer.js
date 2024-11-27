const FillEvent = {
    System: 'system',
    End: 'gameEnd',
  };
  
  class EventMessage {
    constructor(from, type, value) {
      this.from = from;
      this.type = type;
      this.value = value;
    }
  }
  
  class GameEventNotifier {
    events = [];
    handlers = [];
  
    constructor() {
      // Simulate chat messages that will eventually come over WebSocket
      setInterval(() => {
        const score = Math.floor(Math.random() * 3000);
        const date = new Date().toLocaleDateString();
        const userName = 'Eich';
        this.broadcastEvent(userName, FillEvent.End, { name: userName, item: item, container: container });
      }, 5000);
    }
  
    broadcastEvent(from, type, value) {
      const event = new EventMessage(from, type, value);
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