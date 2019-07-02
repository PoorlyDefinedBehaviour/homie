export const is_action_valid = (action: any): boolean =>
  typeof action === typeof (() => {});
