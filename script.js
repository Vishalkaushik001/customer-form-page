document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("customerForm");
  const tableBody = document.querySelector("#customerTable tbody");

  function loadCustomers() {
    fetch("customer_api.php")
      .then((res) => res.json())
      .then((data) => {
        tableBody.innerHTML = "";
        data.forEach((cust, i) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${i + 1}</td>
            <td>${cust.name}</td>
            <td>${cust.address}</td>
            <td>${cust.mobile}</td>
            <td class="action-buttons">
              <button class="edit" onclick="editCustomer(${cust.id}, '${cust.name}', '${cust.address}', '${cust.mobile}')">Edit</button>
              <button class="delete" onclick="deleteCustomer(${cust.id})">Delete</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("customerId").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const mobile = document.getElementById("mobile").value;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("mobile", mobile);

    fetch("customer_api.php", {
      method: "POST",
      body: formData
    }).then(() => {
      form.reset();
      loadCustomers();
    });
  });

  window.editCustomer = function (id, name, address, mobile) {
    document.getElementById("customerId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("address").value = address;
    document.getElementById("mobile").value = mobile;
  };

  window.deleteCustomer = function (id) {
    if (confirm("Delete this customer?")) {
      fetch("customer_api.php?id=" + id, { method: "DELETE" })
        .then(() => loadCustomers());
    }
  };

  loadCustomers();
});
