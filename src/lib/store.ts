/**
 * Simple in-memory store for demo state:
 * - Auth (signed-in user)
 * - User-submitted tools
 */

export type Tool = {
  id: number;
  name: string;
  category: string;
  description: string;
  tagline: string;
  price: number;
  priceLabel: string;
  pricingModel: string;
  website: string;
  github?: string;
  rating: number;
  reviews: number;
  tag: string | null;
  submittedBy?: string;
  isUserSubmitted?: boolean;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};

// ─── Auth state ───────────────────────────────────────────────────────────────

let _currentUser: User | null = null;

export function getUser(): User | null {
  return _currentUser;
}

export function signIn(user: User) {
  _currentUser = user;
  _authListeners.forEach((fn) => fn(_currentUser));
}

export function signOut() {
  _currentUser = null;
  _authListeners.forEach((fn) => fn(_currentUser));
}

const _authListeners: Array<(u: User | null) => void> = [];
export function onAuthChange(fn: (u: User | null) => void) {
  _authListeners.push(fn);
  return () => {
    const i = _authListeners.indexOf(fn);
    if (i !== -1) _authListeners.splice(i, 1);
  };
}

// ─── Tools store ──────────────────────────────────────────────────────────────

const _userTools: Tool[] = [];
const _toolListeners: Array<() => void> = [];

export function getUserTools(): Tool[] {
  return [..._userTools];
}

export function addUserTool(tool: Tool) {
  _userTools.unshift(tool);
  _toolListeners.forEach((fn) => fn());
}

export function onToolsChange(fn: () => void) {
  _toolListeners.push(fn);
  return () => {
    const i = _toolListeners.indexOf(fn);
    if (i !== -1) _toolListeners.splice(i, 1);
  };
}
