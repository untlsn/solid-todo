import { nanoid } from 'nanoid';

// This is a regular nanoid with size set to 6 (global for app)
const uuid = () => nanoid(6);

export default uuid;
