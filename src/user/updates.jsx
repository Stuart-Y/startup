import React from 'react';

import { FillNotifier } from './informer';


export function Updates(props){
    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        FillNotifier.addHandler(handleFillEvent);
    
        return () => {
          FillNotifier.removeHandler(handleFillEvent);
        };
    });

    function handleFillEvent(event) {
        let newEvents = [event, ...events];
        if (newEvents.length > 10) {
          newEvents = newEvents.slice(1, 10);
        }
        setEvent(newEvents);
    }

    function createMessageArray() {
        const messageArray = [];
        for (const [i,event] of events.entries()){
            const message = `Item: ${event.value.item}, Number: ${event.value.number}, Container: ${event.value.container}`;

            messageArray.push(
                <div key={i} className="event">
                    <span className={'player-event'}>{event.from}</span>
                    <span className="event-message">{message}</span>
                </div>
            );
        }
        return messageArray;
    }

    return (
        <div className='players'>
          Player
          <span className='player-name'>{userName}</span>
          <div id='player-messages'>{createMessageArray()}</div>
        </div>
      );
}