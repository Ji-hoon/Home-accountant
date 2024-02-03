export function updateCurrentGroup({
  groupId,
  role,
}: {
  groupId: string;
  role: string;
}) {
  console.log(groupId, role);
  const currentUserInfo = localStorage.getItem("currentUser");
  const parsedCurrentUserInfo = currentUserInfo && JSON.parse(currentUserInfo);
  const newUserInfo = {
    ...parsedCurrentUserInfo,
    currentRole: role,
    currentGroup: groupId,
  };
  //console.log(data, newUserInfo);

  localStorage.setItem("currentUser", JSON.stringify(newUserInfo));
  return newUserInfo;
}
