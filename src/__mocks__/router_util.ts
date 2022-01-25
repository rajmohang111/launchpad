export const init = jest.fn(([routeConfig]) => routeConfig);
export const push = jest.fn(({ routeConfig }) => routeConfig);
export const postPush = jest.fn((routeConfig) => routeConfig);
export const pop = jest.fn(({ routeConfig }) => routeConfig);
export const postPop = jest.fn(( routeConfig ) => routeConfig);
export const reset = jest.fn(({ routeConfig }) => routeConfig);
export const replace = jest.fn(({ routeConfig }) => routeConfig);
