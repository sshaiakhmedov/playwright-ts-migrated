export interface NegativeLoginScenario {
  description: string;
  username: string;
  password: string;
  errorMessage: string;
}

export const DEMOBLAZE_DATA = {
  getNegativeLoginScenarios: (validUser: string, validPass: string): NegativeLoginScenario[] => [
    { description: 'valid user and invalid password', username: validUser, password: 'wrong_password', errorMessage: 'Wrong password.' },
    { description: 'invalid user and valid password', username: 'invalidUser123_xyz', password: validPass, errorMessage: 'User does not exist.' },
    { description: 'empty user and valid password', username: '', password: validPass, errorMessage: 'Please fill out Username and Password.' },
    { description: 'valid user and empty password', username: validUser, password: '', errorMessage: 'Please fill out Username and Password.' },
    { description: 'empty username and empty password', username: '', password: '', errorMessage: 'Please fill out Username and Password.' },
    { description: 'valid user and space password', username: validUser, password: ' ', errorMessage: 'Wrong password.' },
    { description: 'space username and valid password', username: ' ', password: validPass, errorMessage: 'Wrong password.' },
    { description: 'invalid username with special characters and valid password', username: '!@#$%^&*()', password: validPass, errorMessage: 'Wrong password.' },
    { description: 'valid user and very long invalid password', username: validUser, password: 'a'.repeat(100), errorMessage: 'Wrong password.' },
    { description: 'valid user and uppercase password', username: validUser, password: (validPass || '').toUpperCase(), errorMessage: 'Wrong password.' },
  ],
} as const;
