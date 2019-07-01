export const is_action_valid = (action: any) =>
  typeof action === typeof (() => {});
