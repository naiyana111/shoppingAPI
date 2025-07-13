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
        console.log(detailUser.id);
        userID = detailUser.id;
        showWelcome(getUser, userID);

        /* logined.innerHTML = `<p>Username : ${getUser}
<p>email : ${detailUser.email}</p>`; */
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function showWelcome(getUser, userID) {
  const showWel = document.getElementById("logined");
  showWel.innerHTML = `<p>Username : ${getUser}
<p>ID : ${userID}</p>`;
  product(userID);
}

userLocal();

//แสดง product

async function product(userID) {
  try {
    const productUrl = await fetch("https://fakestoreapi.com/products");
    if (!productUrl.ok) {
      throw new Error(`${productUrl.status}`);
    }
    const allproduct = await productUrl.json();
    console.log(productUrl, allproduct);
    const productDetail = document.getElementById("product");

    const products = allproduct
      .map((product) => {
        return `
    
    <p>รหัสสินค้า: ${product.id}</p>
    <p>ชื่อยี่ห้อ: ${product.title}</p>
    <p>ราคา: ${product.price}</p>
    <p>คำอธิบาย: ${product.description}</p>
    <p>หมวดหมู่: ${product.category}</p>
    <img src="${product.image}" alt="Product image" width="200">
    <button class="add-cart" data-id="${product.id}">

      <ion-icon name="cart-outline"></ion-icon>
      </button>
  `;
      })
      .join("");
    productDetail.innerHTML = products;
    //ปุ่ม add cart หน้าบ้าน
    const addCart = document.querySelectorAll(".add-cart");
    let count = 0;
    addCart.forEach((button) => {
      button.addEventListener("click", async function () {
        alert("added");
        // อ้างอิงตัวproductid
        const goodsID = this.dataset.id;

        const cart = {
          userID: Number(userID),
          products: [{ productId: Number(goodsID), quantity: 1 }],
        };
        console.log("userId:" + userID, "productID:" + goodsID);
        try {
          const add = await fetch("https://fakestoreapi.com/carts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cart),
          });
          const data = await add.json();
          console.log(data);
          ///เช็คจำนวนครั้งที่กดใส่ตระกร้า
          count++;
          console.log("จำนวนครั้งที่กด", count);
          const showClick = document.querySelector(".shownum");

          console.log(showClick);
          ////display count cart
          if (count > 0) {
            showClick.style.display = "block";
            showClick.innerHTML = `${count}`;
          }
        } catch (error) {
          console.error("เกิดข้อผิดพลาด:", error);
        }
      }); //  ปิด addEventListener
    });

    // ปิด forEach
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

//ฟังก์ชัน add cart

//ฟังก์ชัน add cart หน้าบ้าน
