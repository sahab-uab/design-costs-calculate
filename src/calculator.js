document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submit");

  let propertyTypeCost = {};
  let badroomCost = {};
  let interestedCost = {};
  let extentiosnCost = {};
  let interiorCost = 0;
  let facilitiesCost = {};

  let totalError = {};

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    // get propertyType data with validatuons and price set
    const propertyType = document.querySelector(
      'input[name="property"]:checked'
    )?.value;
    isValidate(propertyType, "propertyType", "Property is required");
    propertyTypeCost = {};
    switch (propertyType) {
      case "Detached":
        propertyTypeCost["Detached"] = 2000;
        break;
      case "Semi Detached":
        propertyTypeCost["Semi Detached"] = 2000;
        break;
      case "Terrace":
        propertyTypeCost["Terrace"] = 2000;
        break;
      case "Flat":
        propertyTypeCost["Flat"] = 2000;
        break;
      case "Bungalow":
        propertyTypeCost["Bungalow"] = 2000;
        break;
    }

    // get project data and prices
    const projectType = document.querySelector(
      'input[name="project"]:checked'
    )?.value;
    isValidate(projectType, "projectType", "Project is required");
    switch (projectType) {
      case "Interior Works":
        interiorCost = 0;
        interiorCost = 2500;
        break;
      case "Extension":
        getExtentionsConst("Extension");
        break;
      case "Interior + Extension":
        getExtentionsConst("Interior_Extension");
        break;
    }

    // get extra facilities
    const facilities = document.querySelectorAll('input[name="facilities"]');
    facilitiesCost = {};
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
    badroomCost = {};
    badroomCost[badrromIdea] = 2000 * parseInt(badrromIdea);

    // get interested
    const interested = document.querySelector(
      'input[name="interested"]:checked'
    )?.value;
    interestedCost = {};
    switch (interested) {
      case "Design":
        interestedCost["Design"] = 2000;
        break;
      case "financing":
        interestedCost["financing"] = 2000;
        break;
      case "findingBuilder":
        interestedCost["findingBuilder"] = 2000;
        break;
      case "professionals":
        interestedCost["professionals"] = 2000;
        break;
    }

    resultMaker();
  });

  // add extrentios data
  function getExtentionsConst(target) {
    interiorCost = 0;
    const extentiosToggler = document.querySelectorAll(".extentiosToggler");
    extentiosToggler.forEach((ele) => {
      let card = ele.parentElement.parentElement.parentElement;
      if (ele.checked) {
        const extentionsName = card.querySelector("select").value;
        const extentionsSquar = card.querySelector("#extentionsSquar").value;
        const extentionsInfo = card.querySelector("#extraInfo").value;

        extentiosnCost[card.children[1].getAttribute("id")] = {};

        if (extentionsSquar > 0) {
          if (
            extentionsName == "Side Extension" ||
            extentionsName == "Rear Extension"
          ) {
            let name = extentionsName == "Side Extension" ? "Side" : "Rear";
            extentiosnCost[card.children[1].getAttribute("id")]["name"] = name;
            extentiosnCost[card.children[1].getAttribute("id")]["price"] =
              2500 * extentionsSquar;
            extentiosnCost[card.children[1].getAttribute("id")]["target"] =
              target;
            extentiosnCost[card.children[1].getAttribute("id")]["quty"] =
              extentionsSquar;
          }
          if (extentionsName == "Side + Rear Extension") {
            extentiosnCost[card.children[1].getAttribute("id")]["both"] =
              "both";
            extentiosnCost[card.children[1].getAttribute("id")]["price"] =
              5000 * extentionsSquar;
            extentiosnCost[card.children[1].getAttribute("id")]["target"] =
              target;
            extentiosnCost[card.children[1].getAttribute("id")]["quty"] =
              extentionsSquar;
          }
          extentiosnCost[card.children[1].getAttribute("id")]["select"] =
            card.children[1].getAttribute("id");
          if (extentionsInfo != "") {
            extentiosnCost[card.children[1].getAttribute("id")][
              "extentionsInfo"
            ] = extentionsInfo;
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
  function isValidate(argu, target, text) {
    if (!argu) {
      totalError[target] = true;
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
    } else {
      delete totalError[target];
    }
  }

  // result maker
  function resultMaker() {
    // result json
    let reulstObject = {};

    // total cost
    let totalCost = 0;

    // make a result object
    reulstObject["property"] = {};
    for (const key in propertyTypeCost) {
      if (propertyTypeCost.hasOwnProperty(key)) {
        reulstObject["property"][key] = propertyTypeCost[key];
      }
    }

    reulstObject["badroom"] = {};
    for (const key in badroomCost) {
      if (key != "undefined") {
        if (badroomCost.hasOwnProperty(key)) {
          reulstObject["badroom"][key] = badroomCost[key];
        }
      }
    }

    reulstObject["interested"] = {};
    for (const key in interestedCost) {
      if (interestedCost.hasOwnProperty(key)) {
        reulstObject["interested"][key] = interestedCost[key];
      }
    }

    reulstObject["facilities"] = {};
    for (const key in facilitiesCost) {
      if (facilitiesCost.hasOwnProperty(key)) {
        reulstObject["facilities"][key] = facilitiesCost[key];
      }
    }

    reulstObject["extentions"] = {};
    if (interiorCost > 0) {
      reulstObject["facilities"] = {};
      reulstObject["extentions"] = {};
      reulstObject["extentions"]["Interior_Works"] = interiorCost;
    } else {
      for (const key in extentiosnCost) {
        if (extentiosnCost.hasOwnProperty(key)) {
          reulstObject["extentions"][extentiosnCost[key].select] =
            extentiosnCost[key];
        }
      }
    }

    // cost counter
    for (const key in reulstObject) {
      if (Object.keys(reulstObject[key]).length > 0) {
        let data = key;
        // for facility
        if (data == "facilities") {
          for (const key in reulstObject[data]) {
            for (const nKey in reulstObject[data]) {
              totalCost += parseInt(reulstObject[data][nKey]);
            }
          }
        } else if (data == "extentions") {
          for (const nKey in reulstObject[data]) {
            if (nKey == "Interior_Works") {
              totalCost += parseInt(reulstObject[data][nKey]);
            } else {
              totalCost += parseInt(reulstObject[data][nKey].price);
            }
          }
        } else {
          // not for extentions or facility
          for (const key in reulstObject[data]) {
            totalCost += parseInt(reulstObject[data][key]);
          }
        }
      }
    }

    // show result
    let showPrices = false;
    if (totalCost > 0) {
      const pricesBox = document.getElementById("pricesBox");
      const controllerBox = document.getElementById("controllerBox");

      if (!showPrices && Object.keys(totalError).length <= 0) {
        controllerBox.classList.add("hidden");
        pricesBox.classList.remove("hidden");

        // set value
        document.getElementById("totalPrices").innerHTML = `£${formatNumber(
          totalCost
        )}*`;

        // set items
        let itemsBox = document.getElementById("items");
        for (const key in reulstObject) {
          if (Object.keys(reulstObject[key]).length > 0) {
            let data = key;
            // for facility
            if (data == "facilities") {
              for (const key in reulstObject[data]) {
                let html = `<li
                class="flex items-center justify-between py-2 px-3 border-b border-gray-200 bg-gray-50"
              >
                <span class="text-[14px] font-normal text-blue-950"
                  >${key}</span
                >
                <span class="text-[14px] font-normal text-blue-950"
                  >£${formatNumber(reulstObject[data][key])}*</span
                >
              </li>`;
                itemsBox.innerHTML += html;
              }
            } else if (data == "extentions") {
              for (const nKey in reulstObject[data]) {
                if (nKey == "Interior_Works") {
                  let html = `<li
                class="flex items-center justify-between py-2 px-3 border-b border-gray-200 bg-gray-50"
              >
                <span class="text-[14px] font-normal text-blue-950"
                  >Interior Works</span
                >
                <span class="text-[14px] font-normal text-blue-950"
                  >£${formatNumber(reulstObject[data][nKey])}*</span
                >
              </li>`;
                  itemsBox.innerHTML += html;
                } else {
                  let html = `<li
                class="flex items-center justify-between py-2 px-3 border-b border-gray-200 bg-gray-50"
              >
                <span class="text-[14px] font-normal text-blue-950"
                  >
                  ${
                    nKey == "groundFloorSettings"
                      ? "Ground Floor Extension"
                      : ""
                  }
                  ${nKey == "twoStoreySettings" ? "Two-Storey Extension" : ""}
                  ${nKey == "conversionSettings" ? "Loft Conversion" : ""}
                  </span
                >
                <span class="text-[14px] font-normal text-blue-950"
                  >£${formatNumber(reulstObject[data][nKey].price)}*</span
                >
              </li>`;
                  itemsBox.innerHTML += html;
                }
              }
            } else {
              for (const key in reulstObject[data]) {
                let html = `<li
                class="flex items-center justify-between py-2 px-3 border-b border-gray-200 bg-gray-50"
              >
                <span class="text-[14px] font-normal text-blue-950"
                  >${key}</span
                >
                <span class="text-[14px] font-normal text-blue-950"
                  >£${formatNumber(reulstObject[data][key])}*</span
                >
              </li>`;
                itemsBox.innerHTML += html;
              }
            }
          }
        }

        // send mail
        
      } else {
        pricesBox.classList.add("hidden");
        controllerBox.classList.remove("hidden");
      }
    }
  }

  // number formater
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
});
