/// <reference lib="webworker" />

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

addEventListener('message', ({ data }) => {
  const finalS = data.users.map((user: User) => `insert into table values(${user.name}, ${user.email}, ${user.address}, ${user.phone.replace(/\D/g, '')})`).join('\n');
  postMessage(finalS);
}, false);
