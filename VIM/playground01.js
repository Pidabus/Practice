// Practice file for Vim commands in JS
const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "user" },
  { id: 4, name: "Diana", role: "moderator" }
];

function getActiveUsers() {
  let active = [];
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].role !== "banned") {
      active.push(userList[i]);
    }
  }
  return active;
}

const selected = getActiveUsers(users);
console.log("Active users count:", selected.length);
