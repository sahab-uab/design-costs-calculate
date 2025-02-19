import "./calculator";

// show extention
window.addEventListener("DOMContentLoaded", function () {
  // get extentions wraper
  const extentions = document.getElementById("extentions");
  // Get selected project type
  const projectType = document.querySelectorAll('input[name="project"]');
  projectType.forEach((input) => {
    input.addEventListener("change", function () {
      if (this.value == "Interior + Extension" || this.value == "Extension") {
        extentions.classList.remove("hidden");
      } else {
        extentions.classList.add("hidden");
      }
    });
  });

  //   hide and show extentions setting
  const groundFloorBtn = this.document.getElementById("groundFloor");
  const groundFloorSettings = this.document.getElementById(
    "groundFloorSettings"
  );
  groundFloorBtn.addEventListener("change", function () {
    const checkedValue = this.checked;
    if (checkedValue) {
      groundFloorSettings.classList.remove("hidden");
    } else {
      groundFloorSettings.classList.add("hidden");
    }
  });
  const twoStoreyBtn = this.document.getElementById("twoStorey");
  const twoStoreySettings = this.document.getElementById("twoStoreySettings");
  twoStoreyBtn.addEventListener("change", function () {
    const checkedValue = this.checked;
    if (checkedValue) {
      twoStoreySettings.classList.remove("hidden");
    } else {
      twoStoreySettings.classList.add("hidden");
    }
  });
  const conversionBtn = this.document.getElementById("conversion");
  const conversionSettings = this.document.getElementById("conversionSettings");
  conversionBtn.addEventListener("change", function () {
    const checkedValue = this.checked;
    if (checkedValue) {
      conversionSettings.classList.remove("hidden");
    } else {
      conversionSettings.classList.add("hidden");
    }
  });

  // counter
  const upCounter = document.querySelectorAll("#upCounter");
  const downCounter = document.querySelectorAll("#downCounter");

  upCounter.forEach((btn) => {
    btn.addEventListener("click", function () {
      const ele = btn.parentElement.querySelector("input");
      ele.value = parseInt(ele.value) + 1;
    });
  });
  downCounter.forEach((btn) => {
    btn.addEventListener("click", function () {
      const ele = btn.parentElement.querySelector("input");
      if (ele.value == 0) {
        return;
      }
      ele.value -= 1;
    });
  });
});
