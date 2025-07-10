/* const credentials = { username: "johnd", password: "m38rmF$" };
fetch("https://fakestoreapi.com/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(credentials),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.token) {
      console.log("login success");
    }
  }); */

fetch("https://fakestoreapi.com/users")
  .then((response) => response.json())
  .then((getuser) => {
    getuser.forEach((getuser) => {
      console.log(getuser);
    });
  })
  .catch((error) => console.error("Error:", error));

function login() {
  document
    .getElementById("loginform")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const inputuser = document.getElementById("username").value; //johnd
      const inputpass = document.getElementById("password").value; //m38rmF$

      console.log(inputuser, inputpass);

      const checkuser = { username: inputuser, password: inputpass };

      try {
        const res = await fetch("https://fakestoreapi.com/auth/login", {
          method: "POST", //ส่ง username กับ password ไปตรวจสอบ
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(checkuser), //ที่เก็บ username และ password ซึ่งถูกแปลงให้อยู่ในรูปแบบ JSON string
        });
        if (!res.ok) {
          //throw new Error(`Status: ${res.status}`); // หยุดทุกอย่าง แล้วไปที่บล็อก catch

          if (res.status == 404) {
            throw new Error("please try login again!! "); // หยุดทุกอย่าง แล้วไปที่บล็อก catch
          } else if (res.status === 401) {
            throw new Error("username or password incorrect"); // หยุดทุกอย่าง แล้วไปที่บล็อก catch
          }
        }
        const datauser = await res.json(); //อ่านและแปลงข้อความใน Body ของ Response ให้กลายเป็น JavaScript Object
        console.log(datauser);
        if (datauser.token) {
          console.log(datauser.token);
          console.log("login success");
          alert("success");
          localStorage.setItem("savedUsername", inputuser);

          window.location.href = "myproduct.html"; //go to website
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
    });
}
// เรียกฟังก์ชันหลัง DOM โหลดเสร็จ
document.addEventListener("DOMContentLoaded", login);
