export function updateCurrentGroup(groupId: string) {
  const currentUserInfo = localStorage.getItem("currentUser");
  const parsedCurrentUserInfo = currentUserInfo && JSON.parse(currentUserInfo);
  const newUserInfo = { ...parsedCurrentUserInfo, currentGroup: groupId };
  //console.log(data, newUserInfo);

  localStorage.setItem("currentUser", JSON.stringify(newUserInfo));
  return newUserInfo;
}
