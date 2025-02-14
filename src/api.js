export async function getData() {
  try {
    const meta = await fetch("https://dummyjson.com/users");

    const response = await meta.json();

    const user = response.users;

    return user;
  } catch (error) {
    console.log("error is" + error);
    console.log("продолжение нашего кода ");
    return null;
  }
}
