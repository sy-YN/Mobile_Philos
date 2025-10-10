
import { EventEmitter } from 'events';

// This is a simple event emitter that will be used to propagate errors
// from the Firebase services to the UI.
export const errorEmitter = new EventEmitter();
