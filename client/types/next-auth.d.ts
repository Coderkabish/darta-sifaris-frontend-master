import 'next-auth/jwt';
import 'next-auth';

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
  interface Session {
    message?: string;
    data: {
      token?: string;
    };
  }

  interface User {
    message?: string;
    data: {
      token?: string;
    };
  }
}

/** Example on how to extend the built-in types for JWT */
declare module 'next-auth/jwt' {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    message?: string;
    data: {
      token?: string;
    };
  }
}
