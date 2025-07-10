async function userLocal() {
  const getUser = localStorage.getItem("savedUsername");
  console.log(getUser);
  showdataUser(getUser);
}

//แสดงUsername ที่ล็อกอิน
/* logined.innerHTML = `<p>Username : ${getUser}</p>
<p>email : ${useremail}</p>`; */

async function showdataUser(getUser) {
  console.log(getUser);
  try {
    const urluser = await fetch("https://fakestoreapi.com/users");

    if (!urluser.ok) {
      throw new Error(`${urluser.status}`);
    }

    const data = await urluser.json();
    console.log(data);
    const detailUser = data.find((user) => user.username === getUser);
    {
      if (detailUser) {
        console.log(detailUser.email);
        dataEmail = detailUser.email;
        showWelcome(getUser, dataEmail);
        /* logined.innerHTML = `<p>Username : ${getUser}
<p>email : ${detailUser.email}</p>`; */
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function showWelcome(getUser, dataEmail) {
  const showWel = document.getElementById("logined");
  showWel.innerHTML = `<p>Username : ${getUser}
<p>email : ${dataEmail}</p>`;
  product();
}

userLocal();

//แสดง product

async function product() {
  try {
    const productUrl = await fetch("https://fakestoreapi.com/products");
    if (!productUrl.ok) {
      throw new Error(`${productUrl.status}`);
    }
    const allproduct = await productUrl.json();
    console.log(allproduct);
    const productDetail = document.getElementById("product");
    let products = "";

    allproduct.forEach((product) => {
      products += `
    
    <p>รหัสสินค้า: ${product.id}</p>
    <p>ชื่อยี่ห้อ: ${product.title}</p>
    <p>ราคา: ${product.price}</p>
    <p>คำอธิบาย: ${product.description}</p>
    <p>หมวดหมู่: ${product.category}</p>
    <img src="${product.image}" alt="Product image" width="200">
   
  `;
    });
    productDetail.innerHTML = products;
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
  }
}

//ฟังก์ชัน logout
const logoutbtn = document.querySelector(".logoutPosition");

logoutbtn.addEventListener("click", function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});
