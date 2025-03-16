export class AuthError extends Error {
  private _details: string | null = null;

  constructor(msg: string, details: string | null) {
    super(msg);
    this._details = details;
    Object.setPrototypeOf(this, AuthError.prototype);
  }

  get details(): string | null {
    return this._details;
  }
}
