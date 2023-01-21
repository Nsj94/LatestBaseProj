export function getUser() {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  else return false;
}

export function getPermissions() {
  const user = localStorage.getItem("user");
  try {
    const permissions = JSON.parse(user).user.permissions;
    if (permissions) return permissions;
    else return [];
  } catch {
    return [];
  }
}

export function getCompanyContentDetails() {
  const user = localStorage.getItem("user");
  try {
    const companyContentDetails = JSON.parse(user).user.companyContent;
    if (companyContentDetails) return companyContentDetails;
    else return {};
  } catch {
    return {};
  }
}

export function getCompanyTimelineDetails() {
  const user = localStorage.getItem("user");
  try {
    const companyTimelineDetails = JSON.parse(user).user.companyTimeline;
    if (companyTimelineDetails) return companyTimelineDetails;
    else return [];
  } catch {
    return [];
  }
}
