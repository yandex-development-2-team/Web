export type AuthEvent = 'UNAUTHORIZED' | 'FORBIDDEN'

type AuthEventHandler = (event: AuthEvent) => void

const subscribers = new Set<AuthEventHandler>()

export const subscribeAuthEvents = (handler: AuthEventHandler) => {
  subscribers.add(handler)
  return () => subscribers.delete(handler)
}

export const emitAuthEvent = (event: AuthEvent) => {
  subscribers.forEach(handler => handler(event))
}
