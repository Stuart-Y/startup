import React from 'react';

import { GameEvent, GameNotifier } from './gameNotifier';


export function Updates(props){
    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        GameNotifier.addHandler(handleGameEvent);
    
        return () => {
          GameNotifier.removeHandler(handleGameEvent);
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
            const message = event.value.msg;

            messageArray.push(        
                <div key={i} className='event'>
                    <span className={'player-event'}>{event.from.split('@')[0]}</span>
                    {message}
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