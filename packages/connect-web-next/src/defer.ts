export function defer<T>(): Promise<T> & Ctrl<T> {
  let res: ((v: T | PromiseLike<T>) => void) | undefined = undefined;
  let rej: ((reason?: unknown) => void) | undefined;
  const p = new Promise<T>((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  void p.catch(() => {
    // We want to provide several promises that are typically awaited
    // by the user one after the other.
    // If we reject one of the promises before it is awaited by the user,
    // some runtimes may report an unhandled promise rejection.
    // We are attaching this error handler to avoid the warnings.
  });
  const c: Ctrl<T> = {
    resolve(v) {
      res?.(v);
    },
    reject(reason) {
      rej?.(reason);
    },
  };
  return Object.assign(p, c);
}

type Ctrl<T> = {
  resolve(v: T | PromiseLike<T>): void;
  reject(reason?: unknown): void;
};
