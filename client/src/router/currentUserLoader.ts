export function currentUserLoader() {
  const currentUser = localStorage.getItem("currentUser");

  let result = {};
  if (currentUser) {
    result = JSON.parse(currentUser);
    //console.log(result);
  }

  return { result };
}
