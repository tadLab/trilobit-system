import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: string;
  location: string;
  description: string;
  type: 'regular' | 'expedition' | 'special';
  spotsLeft?: number;
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Mock events - simulate Google Calendar data
  const events: Event[] = [
    {
      id: '1',
      title: 'Jarní výprava do Poodří',
      date: new Date(2026, 2, 15), // March 15
      time: '9:00',
      duration: 'Celý den',
      location: 'Poodří',
      description: 'Celodenní výlet s poznáváním přírodních památek. Sraz v centru Choltic v 9:00.',
      type: 'expedition',
      spotsLeft: 5,
    },
    {
      id: '2',
      title: 'Malý kmen - týdenní setkání',
      date: new Date(2026, 2, 18), // March 18
      time: '15:00',
      duration: '2 hodiny',
      location: 'Choltice',
      description: 'Pravidelné setkání pro děti 6-8 let. Hry a aktivity v přírodě.',
      type: 'regular',
    },
    {
      id: '3',
      title: 'Velký kmen - týdenní setkání',
      date: new Date(2026, 2, 20), // March 20
      time: '15:00',
      duration: '3 hodiny',
      location: 'Choltice a okolí',
      description: 'Pravidelné setkání pro děti 9-12 let. Pokročilé outdoorové dovednosti.',
      type: 'regular',
    },
    {
      id: '4',
      title: 'Stavba přístřešků',
      date: new Date(2026, 2, 22), // March 22
      time: '14:00',
      duration: '3 hodiny',
      location: 'Les u Choltic',
      description: 'Naučíme se stavět primitivní úkryty v lese. Praktická lekce přežití.',
      type: 'special',
      spotsLeft: 8,
    },
    {
      id: '5',
      title: 'Malý kmen - týdenní setkání',
      date: new Date(2026, 2, 25), // March 25
      time: '15:00',
      duration: '2 hodiny',
      location: 'Choltice',
      description: 'Pravidelné setkání pro děti 6-8 let. Hry a aktivity v přírodě.',
      type: 'regular',
    },
    {
      id: '6',
      title: 'Velký kmen - týdenní setkání',
      date: new Date(2026, 2, 27), // March 27
      time: '15:00',
      duration: '3 hodiny',
      location: 'Choltice a okolí',
      description: 'Pravidelné setkání pro děti 9-12 let. Pokročilé outdoorové dovednosti.',
      type: 'regular',
    },
    {
      id: '7',
      title: 'Stopování a orientace',
      date: new Date(2026, 2, 29), // March 29
      time: '10:00',
      duration: '4 hodiny',
      location: 'Okolí Choltic',
      description: 'Praktické dovednosti v terénu - učíme se číst stopy a orientovat se v přírodě.',
      type: 'special',
      spotsLeft: 3,
    },
  ];

  const monthNames = [
    'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
  ];

  const dayNames = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust so Monday is 0

    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDay = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return events.filter(event => {
      return event.date.getDate() === day &&
             event.date.getMonth() === month &&
             event.date.getFullYear() === year;
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'expedition':
        return 'bg-blue-100 border-blue-500 text-blue-900';
      case 'special':
        return 'bg-amber-100 border-amber-500 text-amber-900';
      default:
        return 'bg-emerald-100 border-emerald-500 text-emerald-900';
    }
  };

  return (
    <section className="py-8 lg:py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalendarIcon className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl lg:text-4xl text-stone-900">Kalendář akcí</h1>
          </div>
          <p className="text-lg text-stone-600">
            Všechny nadcházející akce a pravidelná setkání kmene Trilobit
          </p>
        </div>

        {/* Calendar Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
          {/* Calendar Header */}
          <div className="bg-amber-600 text-white p-4 flex items-center justify-between">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-amber-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-amber-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 border-b border-stone-200 bg-stone-50">
            {dayNames.map((day) => (
              <div
                key={day}
                className="p-3 text-center text-sm font-semibold text-stone-600"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 auto-rows-fr min-h-[600px]">
            {/* Empty cells before first day */}
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="border border-stone-200 bg-stone-50/50 p-2" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const dayEvents = getEventsForDay(day);
              const isToday = 
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={day}
                  className="border border-stone-200 p-2 min-h-[100px] hover:bg-stone-50 transition-colors"
                >
                  <div className={`text-sm font-semibold mb-2 ${
                    isToday ? 'bg-amber-600 text-white rounded-full w-7 h-7 flex items-center justify-center' : 'text-stone-900'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={`w-full text-left text-xs p-1.5 rounded border-l-2 hover:shadow-md transition-shadow ${getEventColor(event.type)}`}
                      >
                        <div className="font-medium truncate">{event.time}</div>
                        <div className="truncate">{event.title}</div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-100 border-l-2 border-emerald-500 rounded"></div>
            <span className="text-stone-600">Pravidelné setkání</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border-l-2 border-blue-500 rounded"></div>
            <span className="text-stone-600">Výprava</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-100 border-l-2 border-amber-500 rounded"></div>
            <span className="text-stone-600">Speciální akce</span>
          </div>
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${getEventColor(selectedEvent.type)}`}>
                {selectedEvent.type === 'expedition' ? 'Výprava' : 
                 selectedEvent.type === 'special' ? 'Speciální akce' : 'Pravidelné setkání'}
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">
                {selectedEvent.title}
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-stone-700">
                  <CalendarIcon className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {selectedEvent.date.toLocaleDateString('cs-CZ', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm">{selectedEvent.time} • {selectedEvent.duration}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-stone-700">
                  <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>{selectedEvent.location}</p>
                </div>
                <p className="text-stone-700 leading-relaxed pl-8">
                  {selectedEvent.description}
                </p>
                {selectedEvent.spotsLeft && (
                  <div className="pl-8 text-sm text-amber-700 font-medium">
                    Zbývá {selectedEvent.spotsLeft} {selectedEvent.spotsLeft === 1 ? 'místo' : 
                           selectedEvent.spotsLeft < 5 ? 'místa' : 'míst'}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-medium">
                  Přihlásit se
                </button>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-6 py-3 rounded-full border-2 border-stone-300 text-stone-700 hover:border-stone-400 transition-colors font-medium"
                >
                  Zavřít
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
