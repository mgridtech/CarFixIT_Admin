import React, { useCallback, useEffect, useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
// import { textString } from "../assets/TextStrings";
import payment2 from "../assets/tabysect.png";
import payment3 from "../assets/tamarasect.png";
import payment5 from "../assets/newthr.png";
import payment6 from "../assets/card.jpg";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../store/authSlice";
// import CommonUtils from "../utils/CommonUtils";
import {
  // alrajhi_create_session,
  alrajhi_payment_page,
  alrahhi_transportal_id,
  alrahhi_transportal_pwd,
  alrahhi_terminal_resource_key,
  getCreatedDate,
  aesEncrypt,
} from "../utils/CommonUtils"; // Import your utils

// import CryptoJS from 'react-native-crypto-js';

import {
  postDataWithRef,
  getChildNodeCount,
  getEmployDataWithJobrole,

} from "../DataBase/databaseFunction";
// import CryptoJS from "crypto-js";
import { getTextString } from "../assets/TextStrings";

const textcolor = "#5E5E5E";
const maincolor = "#15488A";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ctx = useRef({}).current;

  const [selectInput, setselectInput] = useState(0);
  const {
    filtersData,
    oilsData,
    tireData,
    batteryData,
    engineOilsData,
    engineOilPetrolData,
  } = useSelector((state) => state.project);
  const { orderProcessName, curentOrderProductData, checkOutData } =
    useSelector((state) => state.orderProcess);
  const { isAuth, cartItems, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuth && isAuth.userId) {
      dispatch(fetchUserProfile(isAuth.userId));
    }
  }, [isAuth, dispatch]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTabbyModal, setShowTabbyModal] = useState(false);

  const [paymentId, setPaymentId] = useState("");
  const [hasNavigatedToCancel, setHasNavigatedToCancel] = useState(false);
  const { isArabicLanguage } = useSelector((state) => state.auth);
  const textString = getTextString(isArabicLanguage);
  const filteredDataFun = useCallback(
    (id, referance) => {
      console.log("Engine Oil Petrol Datassss:", engineOilPetrolData);

      const finalizingDataType =
        referance === "Filters"
          ? filtersData
          : referance === "Tyres"
          ? tireData
          : referance === "btteries"
          ? batteryData
          : referance === "Oils"
          ? oilsData
          : referance === "engineOil"
          ? engineOilsData
          : referance === "engineOilPetrol"
          ? engineOilPetrolData
          : [];
      const finalData = finalizingDataType?.find((dat) => dat.id === id);
      return finalData;
    },
    [
      batteryData,
      filtersData,
      oilsData,
      tireData,
      engineOilsData,
      engineOilPetrolData,
    ]
  );

  const calculatePrice = useCallback(() => {
    let price = 0;
    cartItems?.forEach((dat) => {
      const data = filteredDataFun(dat.id, dat.referance);
      console.log("Fetched data:", data); // Debug log
      if (data && typeof data.originalPrice === "number") {
        const newPriceData =
          parseFloat(data.originalPrice) * parseInt(dat.quantity, 10);
        price += newPriceData;
      } else {
        console.warn(
          `Invalid data for ID: ${dat.id}, Referance: ${dat.referance}`,
          data
        );
      }
    });
    return isNaN(price) ? 0 : price;
  }, [cartItems, filteredDataFun]);

  const findTitle = (referance, id) => {
    const finalizingDataType =
      referance === "Filters"
        ? filtersData
        : referance === "Tyres"
        ? tireData
        : referance === "btteries"
        ? batteryData
        : referance === "Oils"
        ? oilsData
        : referance === "engineOil"
        ? engineOilsData
        : [];
    const finalData = finalizingDataType?.find((dat) => dat.id === id);
    return {
      title: finalData?.productNameEng,
      price: finalData?.originalPrice,
    };
  };

  let formattedProducts = cartItems?.map((dat) => {
    return {
      reference_id: dat?.id,
      category: "digital",
      title: findTitle(dat?.referance, dat?.id)?.title,
      description: findTitle(dat?.referance, dat?.id)?.title,
      quantity: dat?.quantity,
      unit_price: `${findTitle(dat?.referance, dat?.id)?.price}`,
      product_url: "http://example.com",
    };
  });

  let formattedProducts2 = cartItems?.map((dat) => {
    return {
      reference_id: dat?.id,
      type: "digital",
      name: findTitle(dat?.referance, dat?.id)?.title,
      sku: dat?.id,
      description: findTitle(dat?.referance, dat?.id)?.title,
      quantity: dat?.quantity,
      product_url: "http://example.com",
      total_amount: {
        amount: `${findTitle(dat?.referance, dat?.id)?.price}`,
        currency: "SAR",
      },
    };
  });

  // const createTheAlrajhiSession = async () => {
  //   try {
  //     setIsLoading(true);
  //     const amt = `${calculatePrice() + findTaxFn(calculatePrice())}`;
  //     const myData = { amt };
  //     console.log(myData);

  //     const response = await fetch(
  //       "https://alrajhiserver.onrender.com/create-alrajhi-session",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(myData),
  //       }
  //     );

  //     const data = await response.json();
  //     console.log(data);

  //     if (data.error) {
  //       console.error(`Error occurred: ${data.error}`);
  //     } else {
  //       console.log("Payment ID:", data.paymentId);
  //       setPaymentId(data.paymentId);
  //       // No need for redirect here; iframe handles the redirection
  //     }

  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //     setIsLoading(false);
  //   }
  // };

  // createTheAlrajhiSession starting**********************************

  function generateRandomNumber(length) {
    let randomNumber = "";
    for (let i = 0; i < length; i++) {
      randomNumber += Math.floor(Math.random() * 10);
    }
    return randomNumber;
  }

  // const aesEncrypt = (trandata, key) => {
  //   console.log("aesEncrypt", trandata);
  //   const iv = 'PGKEYENCDECIVSPC';
  //   const enckey = CryptoJS.enc.Utf8.parse(key);
  //   const rkEncryptionIv = CryptoJS.enc.Utf8.parse(iv);

  //   // Encrypt using AES in CBC mode
  //   const encryptedData = CryptoJS.AES.encrypt(trandata, enckey, {
  //     iv: rkEncryptionIv,
  //     mode: CryptoJS.mode.CBC,
  //     padding: CryptoJS.pad.Pkcs7,
  //   });
  //   // Convert the encrypted data to hexadecimal representation
  //   const encryptedHex = encryptedData.ciphertext.toString(CryptoJS.enc.Hex);
  //   return encryptedHex;
  // };

  const webHookLink =
    "https://app-xaop4bxqda-uc.a.run.app/alrajhiPaymentUpdate";

  function getMyData() {
    let orderId = generateRandomNumber(6) + getCreatedDate();
    ctx.orderId = orderId;
    console.log("Generated Order ID:", orderId);
    const myData = [
      {
        id: alrahhi_transportal_id,
        password: alrahhi_transportal_pwd,
        action: "1",
        udf1: orderId,
        currencyCode: "682",
        trackId: generateRandomNumber(9),
        amt: `${calculatePrice() + findTaxFn(calculatePrice())}`,
        responseURL: webHookLink,
        errorURL: webHookLink,
      },
    ];
    console.log("Data being prepared for encryption:", myData);
    return myData;
  }

  const createTheAlrajhiSession = async () => {
    try {
      setIsLoading(true);

      // Get the payment data
      const data = getMyData(); // Assuming getMyData returns an array with a single object

      console.log("Data to be sent:", data);

      // Encrypt the data
      const encryptedData = aesEncrypt(
        JSON.stringify(data),
        alrahhi_terminal_resource_key
      );
      console.log("Encrypted Data:", encryptedData);

      // Make the POST request
      const response = await fetch("https://app-xaop4bxqda-uc.a.run.app/alrajhiPaymentId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([
          {
            id: alrahhi_transportal_id,
            trandata: encryptedData,
            responseURL: webHookLink,
            errorURL: webHookLink,
          },
        ]),
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      // Handle the response
      const dataResponse = await response.json();
      console.log("Response received:", dataResponse);

      // Ensure response is in the expected format and contains data
      if (dataResponse && dataResponse?.result) {
        console.log("Data response object:", dataResponse);

        // Extract Payment ID from the response
        const fetchResult = dataResponse?.result;
        if (fetchResult) {
          const paymentId = fetchResult.split(`:`)[0];
          console.log("Payment ID:", paymentId);
          setPaymentId(paymentId);
        } else {
          console.error("No result found in the response data.");
        }
      } else {
        console.error("Empty response or unexpected format:", dataResponse);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Error Occurred");
      setIsLoading(false);
    }
  };

  const responcehandle = (event) => {
    // Check if event.target is defined and is an iframe
    if (!event.target || event.target.tagName !== "IFRAME") {
      console.error("Event target is not an iframe");
      return;
    }
    const iframe = event.target;
    const url = iframe.src || "";

    console.log("Processed URL:", url);

    const baseSuccessUrlPart = "https://aczurex-d4b61.firebaseapp.com/success";
    const baseFailedUrlPart = "https://aczurex-d4b61.firebaseapp.com/";
    const cancelUrlPart = "/paymentcancel";
    const paymentPageUrl =
      "https://securepayments.alrajhibank.com.sa/pg/paymentpage.htm";

    // Ignore the initial payment page URL
    if (url.includes(paymentPageUrl)) {
      console.log("Ignoring payment page URL");
      return;
    }

    if (url.includes(cancelUrlPart)) {
      setHasNavigatedToCancel(true);
      setShowPaymentModal(false);
      console.log("Payment canceled");
    } else if (url.includes(baseSuccessUrlPart) && !hasNavigatedToCancel) {
      console.log("Payment successful");
      saveOrderInDbOnline("paymentSuccess", "Alrajhi", checkOutData)
        .then((result) => {
          console.log("Order saved successfully:", result);
          navigate(`/paymentSuccess/${result}`);
        })
        .catch((error) => {
          console.error("Error saving order:", error);
        });

      setShowPaymentModal(false);
    } else if (url.includes(baseFailedUrlPart)) {
      setShowPaymentModal(false);
      console.log("Payment error");
    } else {
      console.error("Unexpected URL:", url);
    }
  };

  // createTheAlrajhiSession ending**********************************

  const createSessionFunNew = async () => {
    const totalAmount =
      orderProcessName === "support"
        ? curentOrderProductData[0]?.originalPrice +
          findTaxFn(curentOrderProductData[0]?.originalPrice)
        : checkOutData?.totalPrice;

    if (parseInt(totalAmount) >= 100) {
      const result = await saveOrderInDbOnline(
        "",
        "Installment Companies tamara"
      );
      const payload = {
        order_reference_id: `${Date.now()}`,
        total_amount: {
          amount: totalAmount,
          currency: "SAR",
        },
        locale: "en_US",
        description: "string",
        country_code: "SA",
        payment_type: "PAY_BY_INSTALMENTS",
        items:
          orderProcessName === "support"
            ? curentOrderProductData?.map((dat) => {
                return {
                  reference_id: dat?.id,
                  type: "digital",
                  name: findTitle(dat?.referance, dat?.id)?.title,
                  sku: dat?.id,
                  description: dat?.products[0]?.productNameEng,
                  quantity: 1,
                  product_url: "http://example.com",
                  total_amount: {
                    amount: `${dat.originalPrice}`,
                    currency: "SAR",
                  },
                };
              })
            : formattedProducts2,
        consumer: {
          first_name: isAuth?.name,
          last_name: isAuth?.name,
          phone_number: isAuth?.phoneNumber,
          email: isAuth?.userEmail,
        },
        shipping_address: {
          first_name: isAuth?.name,
          last_name: isAuth?.name,
          phone_number: isAuth?.phoneNumber,
          line1: checkOutData?.deliveryInfo?.locationName,
          city: checkOutData?.deliveryInfo?.cityName,
          country_code: "SA",
        },

        tax_amount: {
          amount: "0.00",
          currency: "SAR",
        },
        shipping_amount: {
          amount: "0.00",
          currency: "SAR",
        },
        merchant_url: {
          success: `${window.location.origin}/paymentSuccess/${result}`,
          failure: "https://example.com/checkout/failure",
          cancel: "https://example.com/checkout/cancel",
          notification: "https://example.com/payments/tamarapay",
        },
      };

      console.log("tamara ", payload);
      setIsLoading(true);

      try {
        const response = await axios.post(
          "https://reactjs.aloolahma.com/api/react/tamara/checkout",
          payload,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        if (response.data?.checkout_url) {
          trackEvents("Order created", response.data?.checkout_url);
          window.location.replace(response.data?.checkout_url);
        } else {
          const findTitle = (data) => {
            let check = "";
            data?.map((dal) => {
              check = check + " " + dal.error_code;
              return null;
            });
            return check;
          };
          toast.error(findTitle(response.data?.errors));
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error occurred during payment process");
      }

      setIsLoading(false);
    } else {
      toast.error("Your order value should be at least 100 bucks");
    }
  };

  // const sendWebhook = async (eventName, data) => {
  //   try {
  //     const webhookUrl = "https://api.tabby.ai/api/v1/webhooks"; // Replace with your webhook URL

  //     const response = await fetch(webhookUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ eventName, data }),
  //     });

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`Webhook request failed: ${errorText}`);
  //     }

  //     console.log("Webhook sent successfully");
  //   } catch (error) {
  //     console.error("Error sending webhook:", error);
  //   }
  // };

  const retrievePaymentStatus = async (paymentId) => {
    try {
      const response = await fetch(
        `https://api.tabby.ai/v1/payments/${paymentId}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer sk_test_dda111cc-e1eb-4444-a7a6-47e2fde2ed38", // Use the provided Secret Key
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to retrieve payment status: ${errorText}`);
      }

      const data = await response.json();
      console.log("Payment status:", data);
      return data;
    } catch (error) {
      console.error("Error retrieving payment status:", error);
      return null;
    }
  };

  const scheduleRetrieveRequests = (paymentId) => {
    // First retrieve request after 32 minutes (32 * 60 * 1000 milliseconds)
    setTimeout(async () => {
      const status1 = await retrievePaymentStatus(paymentId);
      // Handle the first retrieve response
      console.log("First retrieve response:", status1);
    }, 32 * 60 * 1000);

    // Second retrieve request after 64 minutes (64 * 60 * 1000 milliseconds)
    setTimeout(async () => {
      const status2 = await retrievePaymentStatus(paymentId);
      // Handle the second retrieve response
      console.log("Second retrieve response:", status2);
    }, 64 * 60 * 1000);
  };

  const capturePayment = async (paymentId) => {
    console.log("jfjweifowjf");

    try {
      const response = await fetch(
        `https://api.tabby.ai/v1/payments/${paymentId}/capture`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer sk_test_dda111cc-e1eb-4444-a7a6-47e2fde2ed38", // Use the provided Secret Key
            "Content-Type": "application/json",
            body: {
              amount: "12",
            },
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to capture payment: ${errorText}`);
      }

      const data = await response.json();
      console.log("Payment captured:", data);
      return data;
    } catch (error) {
      console.error("Error capturing payment:", error);
      return null;
    }
  };

  const createSessionFun = async () => {
    try {
      // Await the result of saveOrderInDbOnline and store it in the result variable
      const result = await saveOrderInDbOnline(
        "",
        "Installment Companies tabby"
      );
      console.log("Order Result:", result); // Debugging log

      const totalAmount =
        orderProcessName === "support"
          ? curentOrderProductData[0]?.originalPrice +
            findTaxFn(curentOrderProductData[0]?.originalPrice)
          : checkOutData?.totalPrice;

      const myTestPayment = {
        merchant_code: "ايه سي زيوركسsau",
        merchant_urls: {
          success: `${window.location.origin}/paymentSuccess/success`,
          cancel: `${window.location.origin}/paymentFailed/cancel`,
          failure: `${window.location.origin}/paymentFailed/failed`,
          webhook:
            "https://us-central1-your-project-id.cloudfunctions.net/tabbyWebhook",
        },
        lang: "en",
        payment: {
          amount: `${totalAmount}`,
          currency: "SAR",
          buyer: {
            email: user?.userEmail,
            phone: user?.phoneNumber,
            name: user?.name,
            dob: "1999-08-24",
          },
          buyer_history: {
            registered_since: "2019-08-24T14:15:22Z",
            loyalty_level: 0,
          },
          order: {
            tax_amount: "0.00",
            shipping_amount: "0.00",
            discount_amount: "0.00",
            reference_id: "#x-abc123",
            items: formattedProducts,
          },
          order_history: [
            {
              purchased_at: "2019-08-24T14:15:22Z",
              amount: "0.00",
              payment_method: "card",
              status: "new",
              buyer: {
                email: user?.userEmail,
                phone: user?.phoneNumber,
                name: "Yazan Khalid",
                dob: "2019-08-24",
              },
              shipping_address: {
                city: "string",
                address: "string",
                zip: "string",
              },
              items: [
                {
                  title: "string",
                  description: "string",
                  quantity: 1,
                  unit_price: "0.00",
                  reference_id: "string",
                  product_url: "http://example.com",
                  category: "string",
                },
              ],
            },
          ],
        },
      };

      setIsLoading(true);

      const response = await axios.post(
        "https://reactjs.aloolahma.com/api/react/tabby/checkout",
        myTestPayment,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (
        response.data?.configuration?.available_products?.installments[0]
          ?.web_url
      ) {
        const tabbyUrl =
          response.data.configuration.available_products.installments[0]
            .web_url;

        // Redirecting in the same tab
        window.location.href = tabbyUrl;
        trackEvents("Order created", tabbyUrl);

        // Schedule the retrieve requests after initiating the payment
        const paymentId = response.data.id; // Assuming you get a paymentId from the response
        if (paymentId) {
          scheduleRetrieveRequests(paymentId);
          await capturePayment(paymentId); // Capture the payment
        }
      } else {
        toast.error("Error occurred while initiating payment");
        console.error(
          "Error: No tabbyUrl found in response data",
          response.data
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred during payment process");
    }

    setIsLoading(false);
  };

  const findTaxFn = (total) => {
    return Math.round((15 / 100) * total);
  };

  const sendNotification = async (registrationToken, title, body) => {
    try {
      const response = await axios.post('https://alrajhiserver.onrender.com/send-notification', {
        registrationToken,
        title,
        body,
      });
      console.log(response)
    } catch (error) {

      console.error("Error sending notification:", error);
    }
  };

  const saveOrderInDbOnline = async (orderStatus, paymethod) => {
    const dataToPost = {
      ...checkOutData,
      paymentMethodName: paymethod,
      orderStatus: orderStatus?.length > 0 ? orderStatus : "paymentWaiting",
    };

    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear().toString().slice(-2);
    const createdDate = `${year}${month}${day}`;

    let orderCount = await getChildNodeCount("orders");
    const orderId = `${orderCount.toString().padStart(6, "0")}W${createdDate}`;

    const result = await postDataWithRef("orders", orderId, {
      ...dataToPost,
    });

    // Notification logic
    const notificationData = {
      title: "Order Placed",
      body: `Order with ID ${orderId} has been successfully created.`,
    };
    const employData = await getEmployDataWithJobrole("supervisor");
    const employDeviceTokens = [];
    for (const key in employData) {
      if (employData[key].deviceToken) {
        employDeviceTokens.push(...employData[key].deviceToken);
      }
    }
   
    await sendNotification(employDeviceTokens, notificationData.title, notificationData.body);

    console.log("Order ID:", orderId); // Debugging log
    console.log("Result from postDataWithRef:", result); // Debugging log

    return orderId; // Ensure the orderId is returned
  };

  const saveOrderInDbCash = async () => {
    const dataToPost = {
      ...checkOutData,
      paymentMethodName: "Cash Payment",
      orderStatus: "pending",
    };
    const today = new Date();
    console.log("today date is", today);
    const day = today.getDate().toString().padStart(2, "0");
    console.log("today is", day);
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear().toString().slice(-2);
    const createdDate = `${year}${month}${day}`;

    let orderCount = await getChildNodeCount("orders");
    const orderId = `${orderCount.toString().padStart(6, "0")}W${createdDate}`;

    await postDataWithRef("orders", orderId, {
      ...dataToPost,
    })
      .then(async (data) => {
        // Notification logic
        const notificationData = {
          title: "Order Placed",
          body: `Order with ID ${orderId} has been successfully created.`,
        };
        const employData = await getEmployDataWithJobrole("supervisor");
        const employDeviceTokens = [];
        for (const key in employData) {
          if (employData[key].deviceToken) {
            employDeviceTokens.push(...employData[key].deviceToken);
          }
        }
    
        
        await sendNotification(employDeviceTokens, notificationData.title, notificationData.body);

        navigate(`/paymentSuccess/${data}`);
      })
      .catch((e) => console.log(e));
  };

  const nextBtnFunction = async () => {
    if (selectInput !== 0) {
      switch (selectInput) {
        case 2:
          window.webengage.track("Payment Method Chosen", {
            "payment method": "tabby",
          });
          await createSessionFun();
          break;
        case 3:
          window.webengage.track("Payment Method Chosen", {
            "payment method": "tamara",
          });
          createSessionFunNew();
          break;
        case 4:
          window.webengage.track("Payment Method Chosen", {
            "payment method": "cod",
          });
          await saveOrderInDbCash();
          trackEvents(
            "Order created",
            `${window.location.origin}/shippingInfo`
          );
          // sendWebhook("Payment Method Chosen", { "payment method": "cod" });
          break;
        case 6:
          setShowPaymentModal(true);
          createTheAlrajhiSession();
          break;
        default:
          toast.error("Payment gateway not available");
      }
      // sendWebhook("Payment Method Chosen", { "payment method": selectInput });
    } else {
      toast.error("Please choose a payment method");
    }
  };

  const trackEvents = useCallback(
    (eventName, checkoutUrl) => {
      let paymethod = "";
      if (selectInput === 2) {
        paymethod = "tabby";
      } else if (selectInput === 3) {
        paymethod = "tamara";
      } else if (selectInput === 4) {
        paymethod = "cod";
      }
      const eventData = {
        "abandoned checkout url": checkoutUrl,
        "Product details": cartItems,
        "product name":
          cartItems?.length > 0
            ? cartItems
                ?.map(
                  (dat) =>
                    filteredDataFun(dat.id, dat.referance)?.productNameEng
                )
                .join(", ")
                .toString()
            : "",
        "Number of Products": cartItems.length,
        Subtotal: calculatePrice(),
        "Cart Total": calculatePrice(),
        "payment method": paymethod,
        "total spent": calculatePrice(),
        "total price": calculatePrice(),
        "Date & Time": new Date().toISOString(),
        "billing address": "",
      };

      window.webengage.track(eventName, eventData);
      // sendWebhook(eventName, eventData);
    },
    [calculatePrice, cartItems, filteredDataFun, selectInput]
  );

  useEffect(() => {
    if (selectInput === 2) {
      // Tabby selected
      const script1 = document.createElement("script");
      script1.src = "https://checkout.tabby.ai/tabby-card.js";
      script1.async = true; // Ensure the script is loaded asynchronously
      script1.onload = () => {
        const script2 = document.createElement("script");
        script2.innerHTML = `
          if (typeof TabbyCard !== 'undefined') {
            new TabbyCard({
              selector: '#tabbyCard',
              currency: 'AED',
              lang: '${isArabicLanguage ? "ar" : "en"}',
              price: ${checkOutData?.totalPrice || 100},
              size: 'narrow',
              theme: 'black',
              header: false
            });
          } else {
            console.error('TabbyCard is not defined.');
          }
        `;
        document.body.appendChild(script2);
      };
      script1.onerror = () => {
        console.error("Failed to load TabbyCard script.");
      };
      document.body.appendChild(script1);

      const script3 = document.createElement("script");
      script3.src = "https://checkout.tabby.ai/tabby-promo.js";
      script3.async = true;
      script3.onload = () => {
        const script4 = document.createElement("script");
        script4.innerHTML = `
          new TabbyPromo({});
        `;
        document.body.appendChild(script4);
      };
      script3.onerror = () => {
        console.error("Failed to load TabbyPromo script.");
      };
      document.body.appendChild(script3);

      return () => {
        document.body.removeChild(script1);
        const existingScript1 = document.querySelector(
          'script[src="https://checkout.tabby.ai/tabby-card.js"]'
        );
        if (existingScript1) document.body.removeChild(existingScript1);

        document.body.removeChild(script3);
        const existingScript3 = document.querySelector(
          'script[src="https://checkout.tabby.ai/tabby-promo.js"]'
        );
        if (existingScript3) document.body.removeChild(existingScript3);
      };
    }
  }, [selectInput, checkOutData, isArabicLanguage]);

  useEffect(() => {
    if (calculatePrice() !== 0 && cartItems?.length > 0) {
      const productNames = cartItems
        ?.map((dat) => {
          const productData = filteredDataFun(dat.id, dat.referance);
          return productData?.productNameEng || "Unknown Product";
        })
        .join(", ")
        .toString();

      window.webengage.track("Checkout started", {
        "Product details": cartItems,
        "product name": productNames,
        "Number of Products": cartItems.length,
        Subtotal: calculatePrice(),
        "Cart Total": calculatePrice(),
      });
    }
  }, [calculatePrice, cartItems, filteredDataFun]);

  return (
    <div className="container paymentPage my-4">
      <img src={logo} className="topLogoPagediv" alt="logo" />
      <h1 className="pageHeading">{textString.choosePayMehodTxt}</h1>
      <div className="row my-4 justify-content-center">
        <div className="col-12 col-md-6 col-lg-3">
          <div
            onClick={() => setselectInput(6)}
            className="paymentCardImagContainer"
            style={{
              border: `1px solid ${
                selectInput === 6 ? "#003978" : "transparent"
              }`,
            }}
          >
            <img src={payment6} alt="payment6" />
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div
            onClick={() => {
              setselectInput(4);
              trackEvents("Order created", "");
            }}
            className="paymentCardImagContainer"
            style={{
              border: `1px solid ${
                selectInput === 4 ? "#003978" : "transparent"
              }`,
            }}
          >
            <img src={payment5} alt="payment3" />
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div
            onClick={() => {
              if (true) return; // Keep it disabled
              setselectInput(2);
            }}
            className="paymentCardImagContainer"
            style={{
              border: `1px solid ${
                selectInput === 2 ? "#003978" : "transparent"
              }`,
              position: "relative",
              overflow: "hidden", // Ensure the overlay doesn't overflow
              cursor: "not-allowed",
            }}
          >
            <img
              src={payment2}
              alt="payment2"
              style={{
                filter: "grayscale(100%)", // Convert image to grayscale
                opacity: 0.7,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Coming Soon
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div
            onClick={() => {
              if (true) return; // Keep it disabled
              setselectInput(3);
            }}
            className="paymentCardImagContainer"
            style={{
              border: `1px solid ${
                selectInput === 3 ? "#003978" : "transparent"
              }`,
              position: "relative",
              overflow: "hidden", // Ensure the overlay doesn't overflow
              cursor: "not-allowed",
            }}
          >
            <img
              src={payment3}
              alt="payment3"
              style={{
                filter: "grayscale(100%)", // Convert image to grayscale
                opacity: 0.7,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Coming Soon
            </div>
          </div>
        </div>
      </div>

      {selectInput === 2 && (
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            border: "2px solid #d1d5db", // Light gray border
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            Pay in 4. No interest, no fees.
          </div>
          <div
            id="tabbyCard"
            style={{
              width: "100%", // Adjust width as needed
              display: "flex",
              justifyContent: "center", // Center content horizontally
              marginBottom: "16px", // Add space between card content and button
            }}
          >
            {/* Content for the Tabby card goes here */}
          </div>
        </div>
      )}

      <div className="d-flex align-items-center justify-content-center">
        <button className="paynextBtn" onClick={nextBtnFunction}>
          {textString.nextbtnTxt}
        </button>
      </div>
      <div style={{ marginBottom: "4rem" }} />
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 70000,
            fontSize: "2rem",
            color: "white",
          }}
          className="w-100 h-100 d-flex align-items-center justify-content-center"
        >
          Loading...
        </div>
      )}
      {showPaymentModal && (
        <Modal
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
          size="xl"
        >
          {isLoading && paymentId?.length <= 0 ? (
            <Modal.Body className="text-center">
              <h4>Loading...</h4>
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </Modal.Body>
          ) : (
            <Modal.Body>
              <Button
                variant="secondary"
                onClick={() => setShowPaymentModal(false)}
                className="close-btn"
                style={{ color: textcolor, backgroundColor: maincolor }}
              >
                Close
              </Button>
              <div style={{ width: "100%", height: "100%" }}>
                <iframe
                  title="Payment Gateway"
                  src={`${alrajhi_payment_page}?PaymentID=${paymentId}`}
                  style={{ width: "100%", height: "100vh", border: "none" }}
                  onLoad={(e) => responcehandle(e)}
                />
              </div>
            </Modal.Body>
          )}
        </Modal>
      )}
      {showTabbyModal && (
        <Modal show={showTabbyModal} onHide={() => setShowTabbyModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{textString.tabbyPaymentTxt}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{/* Your modal content */}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowTabbyModal(false)}
            >
              {textString.closeTxt}
            </Button>
            <Button variant="primary" onClick={() => setShowTabbyModal(false)}>
              {textString.saveChangesTxt}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default PaymentPage;

// <div className="col-12 col-md-6 col-lg-3">
// <div
//   onClick={() => setselectInput(2)}
//   className="paymentCardImagContainer"
//   style={{
//     border: `1px solid ${
//       selectInput === 2 ? "#003978" : "transparent"
//     }`,
//   }}
// >
//   <img src={payment2} alt="payment2" />
// </div>
// </div>
// <div className="col-12 col-md-6 col-lg-3">
// <div
//   onClick={() => setselectInput(3)}
//   className="paymentCardImagContainer"
//   style={{
//     border: `1px solid ${
//       selectInput === 3 ? "#003978" : "transparent"
//     }`,
//   }}
// >
//   <img src={payment3} alt="payment3" />
// </div>
// </div>
