import React from 'react';

import eventData from '../../assets/data.json';

const Timeline: React.FC = () => {
  const sortedEventObjects = eventData.sort((a, b) => {
    const aDate = a.date.split('/').join('');
    const bDate = b.date.split('/').join('');
    return aDate.localeCompare(bDate);
  });

  const getYear = (eventObject: EventObject) =>
    eventObject.date.slice(0, eventObject.date.indexOf('/'));

  return (
    <div className='timeline-container'>
      <ul className='timeline'>
        {sortedEventObjects.map((eventObject: EventObject, index) => {
          const eventObjectYear = getYear(eventObject);

          return (
            <li className='timeline-event' key={`event${index}`}>
              <div className='timeline-event-content'>
                <img
                  src={`${process.env.PUBLIC_URL}/icons/${eventObject.icon}.svg`}
                  alt={`${eventObject.icon}`}
                />

                <span className='timeline-event-year'>{eventObjectYear}</span>
              </div>
              <div className='timeline-event-dot'>
                <span className='timeline-event-circle'></span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Timeline;
