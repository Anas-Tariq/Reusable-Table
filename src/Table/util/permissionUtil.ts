export default function hasPermission(permission: string): boolean {
  return userPermissions.includes(permission);
}

export function hasPermissionWithWildcard(
  userPermissions: string[],
  permission: string
): boolean {
  return userPermissions.some((userPerm) => {
    return (
      userPerm === permission ||
      (userPerm.endsWith(":*") && userPerm.startsWith(permission.split(":")[0]))
    );
  });
}

export const userPermissions = JSON.parse(
  localStorage.getItem("userPermissions") as string
);

// export function userPermissions(): string[] {
//   const getPermissions = localStorage.getItem("userPermissions") as string;
//   return JSON.parse(getPermissions);
// }

export const arrPerm = [
  "contacts:all",
  "campaigns:all",
  "campaigns:delete",
  "campaigns:update",
  "qevents:customers:delete",
  "campaigns:read",
  "qevents:customers:update",
  "campaigns:create",
  "contacts:create",
  "roles:all",
  "roles:delete",
  "roles:update",
  "roles:read",
  "roles:create",
  "users:delete",
  "users:update",
  "users:create",
  "users:read",
  "callingapi_jobs:cancel",
  "callingapi_jobs:list",
  "callingapi:schedule",
  "users:invite_list",
  "users:invite_cancel",
  "qevents:organizations:create",
  "qevents:organizations:read",
  "qevents:organizations:update",
  "qevents:organizations:delete",
  "qevents:organizations:list",
  "qevents:applications:create",
  "qevents:applications:read",
  "qevents:applications:update",
  "qevents:applications:delete",
  "qevents:applications:list",
  "qevents:events:create",
  "qevents:events:read",
  "qevents:events:update",
  "qevents:events:delete",
  "qevents:events:list",
  "qevents:subscriptions:create",
  "qevents:subscriptions:read",
  "qevents:subscriptions:update",
  "qevents:subscriptions:delete",
  "qevents:subscriptions:list",
  "qevents:channels:create",
  "qevents:channels:read",
  "qevents:channels:update",
  "qevents:channels:delete",
  "qevents:channels:list",
  "qevents:customers:list",
  "qevents:customers:read",
  "qevents:customers:create",
  "qevents:logs:read",
  "qevents:logs:list",
  "qevents:templates:create",
  "qevents:templates:update",
  "qevents:templates:delete",
  "qevents:templates:list",
  "qevents:templates:read",
  "qevents:events:trigger",
  "qevents:connectors:create",
  "qevents:connectors:read",
  "qevents:connectors:update",
  "qevents:connectors:delete",
  "qevents:connectors:assign",
  "qevents:connectors:list",
  "qevents:redis:clear",
  "qevents:redis:read",
  "qevents:tenants:create",
  "qevents:tenants:read",
  "qevents:tenants:update",
  "qevents:tenants:delete",
  "qevents:tenants:list",
];
