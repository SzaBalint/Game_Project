export class User {
  id: number;
  username: string;

  constructor(user: User) {
    {
      this.id = user.id || 0;
      this.username = user.username || '';
    }
  }
}
