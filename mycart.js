/* async function showselectCart(goodsID) {
  const goodNum = Number(goodsID); //แปลงเป็นตัวเลข
  console.log("productID: ", goodNum);
  try {
    const productAll = await fetch("https://fakestoreapi.com/products");
    if (!productAll.ok) {
      throw new Error(`${productAll.status}`);
    }
    const productData = await productAll.json();

    console.log(productAll, productData);

    const dataItem = productData.find((pd) => pd.id === goodNum); //หาproduct idที่ตรงกัน

    console.log(dataItem);

    // 2. แปลงข้อมูลเป็น string ก่อนเก็บ
    const jsonData = JSON.stringify(dataItem);

    // 3. เก็บใน localStorage
    localStorage.setItem("allProducts", jsonData);

    console.log("✅ เก็บข้อมูลไว้ใน localStorage เรียบร้อยแล้ว");
    if (dataItem) {
      console.log(dataItem.id);
    }
    
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
  }
}

showselectCart();
 */
// แสดง localstorage product id
const productID = localStorage.getItem("productId");
console.log("รายการสินค้าไอดี:", productID); // เก็บ array ลง localStorage ในรูปแบบ JSON string

showselectCart(productID);

async function showselectCart(productID) {
  console.log(productID);

  const goodNumt = JSON.parse(productID); //แปลงเป็นตัวเลข
  const goodNum = goodNumt.map(Number);
  console.log(typeof goodNum);
  console.log("productData: ", goodNum);
  const goodNum3 = goodNum;

  console.log(goodNum3);

  try {
    const productAll = await fetch("https://fakestoreapi.com/products");
    if (!productAll.ok) {
      throw new Error(`${productAll.status}`);
    }
    const productData = await productAll.json();

    console.log(productAll, productData);

    // ใช้ filter หาproduct id ที่ตรงกัน
    const dataItem = productData.filter(function (pd) {
      return goodNum3.includes(pd.id);
    });

    //const dataItem = productData.find((pd) => pd.id === goodNum3);

    console.log(dataItem);

    const showtb = document.querySelector(".showselectPD");
    let showproduct = "";

    dataItem.forEach((item) => {
      showproduct += `
    <div>
      <h2>${item.title}</h2>
      <p>${item.description}</p>
      <p>Price: ${item.price}</p>
      <img src="${item.image}" alt="Image of ${item.title}" width="100">
    </div>
  `;
      showtb.innerHTML = showproduct;
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
  }
  //} // for loop
}
