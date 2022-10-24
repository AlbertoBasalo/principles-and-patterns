export class Notifier {
  public notify(trip: string, operation: string): string {
    return `${trip} ${operation} notified to passenger`;
  }
}
