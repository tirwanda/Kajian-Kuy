/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 */
export const name: RegExp = /[a-zA-Z\ ]{3,15}/;

/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 20 chars
 */
export const channelName: RegExp = /[a-zA-Z\ ]{3,20}/;

/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 */
export const country: RegExp = /[a-zA-Z\ ]{3,15}/;

/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 */
export const city: RegExp = /[a-zA-Z\ ]{3,15}/;

/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 200 chars
 */
export const description: RegExp = /[a-zA-Z\ ]{3,200}/;

/*
 * email validation
 */
export const email: RegExp = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;

/*
 * password validation, should contain:
 * (?=.*\d): at least one digit
 * (?=.*[a-z]): at least one lower case
 * (?=.*[A-Z]): at least one uppercase case
 * [0-9a-zA-Z]{6,}: at least 6 from the mentioned characters
 */
export const password: RegExp =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
