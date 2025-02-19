document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submit");

  // altimate const
  let toatlErro = 0;

  let propertyTypeCost = 0;
  let badroomCost = 0;
  let interestedCost = 0;
  let InteriorCost = 0;
  let extentiosnCost = {};
  let facilitiesCost = {};

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    // get propertyType data with validatuons and price set
    const propertyType = document.querySelector(
      'input[name="property"]:checked'
    )?.value;
    isValidate(propertyType, "Property is required");
    switch (propertyType) {
      case "Detached":
        propertyTypeCost = 2000;
        break;
      case "Semi Detached":
        propertyTypeCost = 2000;
        break;
      case "Terrace":
        propertyTypeCost = 2000;
        break;
      case "Flat":
        propertyTypeCost = 2000;
        break;
      case "Bungalow":
        propertyTypeCost = 2000;
        break;
    }

    // get project data and prices
    const projectType = document.querySelector(
      'input[name="project"]:checked'
    )?.value;
    isValidate(projectType, "Project is required");
    switch (projectType) {
      case "Interior Works":
        InteriorCost = 2500;
        break;
      case "Extension":
        getExtentionsConst();
        break;
      case "Interior + Extension":
        getExtentionsConst();
        break;
    }

    // get extra facilities
    const facilities = document.querySelectorAll('input[name="facilities"]');
    facilities.forEach((facility) => {
      if (facility.checked) {
        facilitiesCost[facility.value] = 2500;
      } else {
        delete facilitiesCost[facilities.value];
      }
    });

    // baddorm
    const badrromIdea = document.querySelector(
      'input[name="idea"]:checked'
    )?.value;
    isValidate(badrromIdea, "Property is required");
    badroomCost = 2000 * parseInt(badrromIdea);

    // get interested
    const interested = document.querySelector(
      'input[name="interested"]:checked'
    )?.value;
    switch (interested) {
      case "Design":
        interestedCost = 2000;
        break;
      case "financing":
        interestedCost = 2000;
        break;
      case "findingBuilder":
        interestedCost = 2000;
        break;
      case "professionals":
        interestedCost = 2000;
        break;
    }

    resultMaker();
  });

  // add extrentios data
  function getExtentionsConst() {
    InteriorCost = 0;
    const extentiosToggler = document.querySelectorAll(".extentiosToggler");
    extentiosToggler.forEach((ele) => {
      let card = ele.parentElement.parentElement.parentElement;
      if (ele.checked) {
        const extentionsName = card.querySelector("select").value;
        const extentionsSquar = card.querySelector("#extentionsSquar").value;
        const extentionsInfo = card.querySelector("#extraInfo");

        extentiosnCost[card.children[1].getAttribute("id")] = {};

        if (extentionsSquar > 0) {
          if (
            extentionsName == "Side Extension" ||
            extentionsName == "Rear Extension"
          ) {
            let name = extentionsName == "Side Extension" ? "Side" : "Rear";
            extentiosnCost[card.children[1].getAttribute("id")][name] =
              2500 * extentionsSquar;
          }
          if (extentionsName == "Side + Rear Extension") {
            extentiosnCost[card.children[1].getAttribute("id")]["both"] =
              5000 * extentionsSquar;
          }
        } else {
          isValidate(false, "Selected extention value required!");
        }
      } else {
        delete extentiosnCost[card.children[1].getAttribute("id")];
      }
    });
  }

  // make a validation function
  function isValidate(argu, text) {
    if (!argu) {
      toatlErro += 1;
      Toastify({
        text: text,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
      }).showToast();
      return;
    }
  }

  // result maker
  function resultMaker() {
    let totalCost = 0;

    totalCost += propertyTypeCost ? propertyTypeCost : 0;
    totalCost += badroomCost ? badroomCost : 0;
    totalCost += interestedCost ? interestedCost : 0;
    totalCost += InteriorCost ? InteriorCost : 0;

    // extentionConst
    for (const key in extentiosnCost) {
      if (extentiosnCost.hasOwnProperty(key)) {
        const element = extentiosnCost[key];
        for (const subKey in element) {
          if (element.hasOwnProperty(subKey)) {
            totalCost += element[subKey] ? parseInt(element[subKey]) : 0;
          }
        }
      }
    }

    // facilitiesCost
    for (const key in facilitiesCost) {
      if (facilitiesCost.hasOwnProperty(key)) {
        totalCost += facilitiesCost[key] ? parseInt(facilitiesCost[key]) : 0;
      }
    }

    console.log(totalCost);
  }
});
