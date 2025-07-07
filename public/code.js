console.log("hi maa");

document.getElementById("train-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const train_number = document.querySelector("#train-number").value;
      const params = new URLSearchParams({ train_number });
      console.log(params);
      fetch("/train-number-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
    });