import { Component, OnInit } from '@angular/core';
enum ActiveState {
  Inactive,
  Current,
  PreviousNextMonth,
  HasEvent
}
interface CalendarDay {
  day: number;
  active: ActiveState;
}
interface Event {
  date: number; // Day of the month
  description: string;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  currentDate: Date;
  currentMonth: string;
  currentYear: number;
  weekDays: string[];
  days: CalendarDay[];
  currentDay: number;
  eventsMap: Map<number, Event[]>;

  constructor() {
    this.currentDate = new Date();
    this.currentMonth = this.getMonthName(this.currentDate.getMonth());
    this.currentYear = this.currentDate.getFullYear();
    this.currentDay = this.currentDate.getDate();
    this.weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.days = this.generateCalendarDays(this.currentDate.getMonth(), this.currentDate.getFullYear());
    this.eventsMap = new Map<number, Event[]>();
  }

  ngOnInit(): void {
  }
  getMonthName(monthIndex: number): string {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return monthNames[monthIndex];
  }
  getClasses(day: CalendarDay): string {
    let classes = '';
    if (day.active === ActiveState.Current) {
      classes = 'active';
    } 
    else if (day.active === ActiveState.PreviousNextMonth) {
      if (day.day < this.days[0].day) { // Check if day is from previous month
        classes = 'previous-month-day'; // Or a different class for previous month
      } else {
        classes = 'next-month-day'; // Or a different class for next month
      }
    }
    else if (day.active === ActiveState.HasEvent){
      classes = 'has-event'; // if the day has event
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
      const isActive = year === currentYear && month === currentMonth && i === currentDate.getDate() ? ActiveState.Current : ActiveState.Inactive;
      days.push({ day: i, active: isActive || ActiveState.Inactive});
    }
    // Fill up remaining days with days from next month
    const lastDayofMonth = new Date(year, month, daysInMonth).getDay();
    const daysToAdd = 6 - lastDayofMonth;
    for (let i = 1; i <= daysToAdd; i++) {
      days.push({ day: i, active: ActiveState.PreviousNextMonth });
    }
    return days;
  }
  initializeEvents(): void {
    // Example: Add events to the events map
    this.addEvent(5, "Meeting with John");
    this.addEvent(15, "Dentist Appointment");
    this.addEvent(25, "Birthday Party");
    // You can add more events here
  }
  addEvent(date: number, description: string): void {
    const events = this.eventsMap.get(date) || [];
    events.push({ date, description });
    this.eventsMap.set(date, events);
  }
  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCalendar();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCalendar();
  }

  updateCalendar(): void {
    this.currentMonth = this.getMonthName(this.currentDate.getMonth());
    this.currentYear = this.currentDate.getFullYear();
    this.currentDay = this.currentDate.getDate();
    this.days = this.generateCalendarDays(this.currentDate.getMonth(), this.currentDate.getFullYear());
  }
}