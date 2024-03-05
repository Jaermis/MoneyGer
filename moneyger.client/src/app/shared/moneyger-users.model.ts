export class MoneygerUsers {
  accountID: number = 0;
  workEmail: string = "";
  userPassword: string = "";
  firstName: string = "";
  lastName: string = "";

  // Initialize dateCreated with null for a truly blank date
  dateCreated: Date | null = null;

  constructor() {
    // Optionally set a default placeholder string in the template if desired
    // this.dateCreated = null; // Already set in the class definition
  }
}
