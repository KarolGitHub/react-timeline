import React, { useState } from 'react';

import eventData from '../../assets/data.json';
import closeIcon from '../../assets/close.svg';

const Timeline: React.FC = () => {
  const [eventModal, setEventModal] = useState<number | null>(null);

  const isElementOutOfViewport = (rect: any) => {
    return [
      rect.bottom >
        (window.innerHeight || document.documentElement.clientHeight),
      rect.right > (window.innerWidth || document.documentElement.clientWidth),
    ];
  };

  const eventModalHandler = (e: any, eventIndex: number | null = null) => {
    const eventDescription = e.target.nextSibling;
    if (eventModal !== eventIndex) {
      const boundingRect = eventDescription.getBoundingClientRect();
      const [bottomExtend, rightExtend] = isElementOutOfViewport(boundingRect);
      if (bottomExtend || rightExtend) {
        eventDescription.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
      eventDescription.style.animation =
        'descriptionCollapse 0.3s ease-in-out 1 forwards';
      setEventModal(eventIndex);
    } else {
      setEventModal(null);
    }
  };

  const getYear = (eventObject: EventObject) =>
    eventObject.date.slice(0, eventObject.date.indexOf('/'));

  const getDateLabel = (date: string) =>
    new Date(date).toDateString().substring(4);

  const sortedEventObjects = eventData.sort((a, b) => {
    const aDate = a.date.split('/').join('');
    const bDate = b.date.split('/').join('');
    return aDate.localeCompare(bDate);
  });

  /*   useEffect(() => {
    document.getElementsByClassName('timeline-event-description')..remove()
  }, []);
 */
  return (
    <div className='timeline-container'>
      <div className='timeline-events-container'>
        <ul className='timeline-events-wrapper'>
          {sortedEventObjects.map((eventObject: EventObject, index) => {
            const eventObjectYear = getYear(eventObject);
            return (
              <li className='timeline-event' key={`event${index}`}>
                <div className='timeline-event-content'>
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/${eventObject.icon}.svg`}
                    alt={`${eventObject.icon}`}
                    onClick={(e) => eventModalHandler(e, index)}
                  />
                  <div
                    className={`timeline-event-description ${
                      eventModal === index
                        ? 'timeline-event-description--expanded'
                        : ''
                    }`}
                  >
                    <span className='timeline-event-description-close'>
                      <img
                        src={closeIcon}
                        alt='close'
                        onClick={() => setEventModal(null)}
                      />
                    </span>
                    <div className='timeline-event-description-content'>
                      <h4>{eventObject.title}</h4>
                      <h5>{getDateLabel(eventObject.date)}</h5>
                      <p>{eventObject.description}</p>
                    </div>
                  </div>
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
    </div>
  );
};

export default Timeline;
