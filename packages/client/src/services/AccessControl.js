import { getPermissions } from "./local-storage";

export default function AccessControl(props) {
  const user_permissions = getPermissions();
  if (user_permissions.includes(props.id) || !props.id) return props.children;
  else if (props.closed) return props.closed;
  else return false;
}

export function accessIncludes(arr) {
  const user_permissions = getPermissions();
  let access = false;
  if (arr) {
    arr.map((id) => {
      if (user_permissions.includes(id)) {
        access = true;
      }
    });
  }
  return access;
}
