import { Component, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';

enum ActiveState {
  Inactive,
  Current,
  PreviousNextMonth,
  HasEvent,
  HasCurrent,
  DoneEvent
}

interface CalendarDay {
  day: number;
  active: ActiveState;
}

interface Event {
  date: Date;
  time: string;
  description: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class CalendarComponent implements OnInit {
  currentDate: Date;
  currentMonth: string;
  currentYear: number;
  weekDays: string[];
  days: CalendarDay[];
  currentDay: number;
  events: Event[] = [];

  predefinedEvents: Event[] = [
    { date: new Date(2024, 4, 16), time: '10:00 AM', description: 'Meeting with client' },
    { date: new Date(2024, 4, 20), time: '12:00 PM', description: 'Team lunch' },
    { date: new Date(2024, 4, 25), time: '5:00 PM', description: 'Project deadline' },
    { date: new Date(2024, 4, 16), time: '9:00 AM', description: 'Meeting with boss' },
    // Add more events as needed
  ];

  newEventDate: Date | null = null;
  newEventTime: string = '';
  newEventDescription: string = '';

  showUpcomingEvents: boolean = true; // Toggle state

  constructor() {
    this.currentDate = new Date();
    this.currentMonth = this.getMonthName(this.currentDate.getMonth());
    this.currentYear = this.currentDate.getFullYear();
    this.currentDay = this.currentDate.getDate();
    this.weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.days = this.generateCalendarDays(this.currentDate.getMonth(), this.currentDate.getFullYear());
    this.events = [...this.predefinedEvents];
  }

  ngOnInit(): void {}

  getMonthName(monthIndex: number): string {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthIndex];
  }

  getClasses(day: CalendarDay): string {
    let classes = '';
    if (day.active === ActiveState.Current) {
      classes = 'active';
    } else if (day.active === ActiveState.PreviousNextMonth) {
      if (day.day < this.days[0].day) { // Check if day is from previous month
        classes = 'previous-month-day';
      } else {
        classes = 'next-month-day';
      }
    } else if (day.active === ActiveState.HasEvent) {
      classes = 'has-event';
    } else if (day.active === ActiveState.HasCurrent) {
      classes = 'has-current';
    } else if (day.active === ActiveState.DoneEvent) {
      classes = 'done-events';
    }
    return classes;
  }

  generateCalendarDays(month: number, year: number): CalendarDay[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const days: CalendarDay[] = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get last date of previous month
    const lastDateofLastMonth = new Date(year, month, 0).getDate();

    // Fill up preceding days of current month with days from previous month
    for (let i = firstDayIndex; i > 0; i--) {
      const day = lastDateofLastMonth - i + 1;
      days.push({ day, active: ActiveState.PreviousNextMonth });
    }

    // Fill up days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      let isActive: ActiveState = ActiveState.Inactive;
      if (year === currentYear && month === currentMonth && i === this.currentDay) {
        isActive = ActiveState.Current;
      }
      const hasEvents = this.predefinedEvents.some(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month && eventDate.getDate() === i;
      });
      if (isActive === ActiveState.Current && hasEvents) {
        isActive = ActiveState.HasCurrent;
      } else if (hasEvents) {
        const event = this.predefinedEvents.find(event => {
          const eventDate = new Date(event.date);
          return eventDate.getFullYear() === year && eventDate.getMonth() === month && eventDate.getDate() === i;
        });
        if (event && new Date(event.date) < currentDate) {
          isActive = ActiveState.DoneEvent;
        } else {
          isActive = ActiveState.HasEvent;
        }
      }
      days.push({ day: i, active: isActive });
    }

    // Fill up remaining days with days from next month
    const lastDayofMonth = new Date(year, month, daysInMonth).getDay();
    const daysToAdd = 6 - lastDayofMonth;
    for (let i = 1; i <= daysToAdd; i++) {
      days.push({ day: i, active: ActiveState.PreviousNextMonth });
    }
    return days;
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.currentMonth = this.getMonthName(this.currentDate.getMonth());
    this.currentYear = this.currentDate.getFullYear();
    this.days = this.generateCalendarDays(this.currentDate.getMonth(), this.currentDate.getFullYear());
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentMonth = this.getMonthName(this.currentDate.getMonth());
    this.currentYear = this.currentDate.getFullYear();
    this.days = this.generateCalendarDays(this.currentDate.getMonth(), this.currentDate.getFullYear());
  }

  addEvent(): void {
    if (this.newEventDate && this.newEventTime && this.newEventDescription) {
      const newEvent: Event = {
        date: this.newEventDate,
        time: this.newEventTime,
        description: this.newEventDescription
      };
      this.predefinedEvents.push(newEvent);
      this.newEventDate = null;
      this.newEventTime = '';
      this.newEventDescription = '';
      this.days = this.generateCalendarDays(this.currentDate.getMonth(), this.currentDate.getFullYear());
    }
  }

  groupEventsByDate(events: Event[]): { date: Date; events: Event[] }[] {
    const groupedEvents: { date: Date; events: Event[] }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    events.forEach(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      if (this.showUpcomingEvents && eventDate >= today || !this.showUpcomingEvents && eventDate < today) {
        let group = groupedEvents.find(g => g.date.getTime() === eventDate.getTime());
        if (!group) {
          group = { date: eventDate, events: [] };
          groupedEvents.push(group);
        }
        group.events.push(event);
      }
    });

    return groupedEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  toggleEventView(): void {
    this.showUpcomingEvents = !this.showUpcomingEvents;
  }

  deleteEvent(eventToDelete: Event): void {
    this.predefinedEvents = this.predefinedEvents.filter(event => event !== eventToDelete);
    this.days = this.generateCalendarDays(this.currentDate.getMonth(), this.currentDate.getFullYear());
  }
}
