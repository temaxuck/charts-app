export class ErrorBase extends Error {
  private _details: string | null = null;

  constructor(msg: string, details: string | null) {
    super(msg);
    this._details = details;
    Object.setPrototypeOf(this, ErrorBase.prototype);
  }

  get details(): string | null {
    return this._details;
  }

}

export class AuthError extends ErrorBase {
  constructor(details: string | null) {
    super("Authentication Error", details);
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}


export class ParseError extends ErrorBase {
  constructor(details: string | null) {
    super("Parse Error", details);
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}


