const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = {
    type: "service_account",
    project_id: "auto-234d3",
    private_key_id: "b8c8cc4dabaa0e516edad376d300c5064ffb8342",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDK5Nint/JZ3x0U\nutSEDmSvmWFD/7m5wdDoLpexKafBpzasJptk0onaWKx/aSCNi670AtzcTq8JjkUX\n7NE2G6xNc7fwCnwaT/cZPJGOYZZExnno6vcyHJSvDXTeNQ0xE3bLuCj+fNL9UKUa\nIAPIewhUo7od5Ernj7mi/l12xjjhVY3OdGPc/RvB4xRdYRk/JwoU299JHKflWLsr\naMX1ZSn1m4LrDAXLkTl0fpCnJEDLVeAHoGam66afz0vIx4uyIlj/8KYC5wmzVRuU\nopRiPXMlyouhj/NUm+DNvpWtK2YsR/JED20NRmKkbcDAWjznt/7hciKp7CVIXuYW\nG65vfVhRAgMBAAECggEARsd/tz6p6mU1oWotweW9hS6mKlEXKvCsnprGa1TjQ2DA\nZ1zOf+UclxGxF3+Gjipo/ZHUF3zRfi1l+BsyvsP3n0tbov8dXRaBVon1Iyzy/YoZ\ntEHnu1ESI2E34F60e+bU3eugTWshNaKA/jSl7TXSaah2QIBICzDt6yj+VPWAmUae\nK1tHnlrADR7huwG8OqQ26AKA95h7/zw5GJ+xye1Zi4Ld2ebNFeTsPgZFm5QDAIWn\n6tGMVT2cUG9NUdPasxH5U6OQLDJrJdMKF1a6ix0zFrbfYFVixamIxQPXHr6gw5it\nJ2RzShI9knB/gIC6pp5ezUPcOWkoax23LD25558nswKBgQD4LQ4i7oVb1fo50MYa\nYGlLoLOveROMb6OhEFxupe9SGVhkL6eg+RaYx/1UJSTC0N2WorX/TgNeVO9Er0QG\n7hRh9a9Jx5TG+Y0QCux9S4k++aQ6rZn4WajusExPmWosMdFgsW0WowIwyUUDV3kT\n8Gj5liGq7QwzQ80hELK2WTzeEwKBgQDRSlW1tRrm8LJ8jGvLxyBl3PoDv/ZYU4Zk\n3dzMSExNHvGMeAhbblXPI1B+IbdOrLmHZPSJHvYpMmV2yVPP2Fed7KrgERQFkvmO\nImDZ+xPIRof3r2hX9nYF45gKfUgcJtJ9nkipTa3c3yC5JLrOqqD5pE28VeH1DJz8\ndEgv6FSsiwKBgA/wTNUffn8cafqmluKAyKJryr59Ry0gymCAvX75tzoNmKiuitSC\nytm7FmD+FbNRWLng71FbQEohqFA/9V2AktyLu9tALyTsSAv8t52AaWsa+1otZhMW\nJwxVVEFUeAYomOrd2kS26WAavQzu5D7MlOFarATfPoZYV2dFPEULzCXzAoGAY6fH\npBw2URzvgErE0WVh0d8k1UBEps4uwjy6dDNA0cAYOFC3egHRri4cl9KqHDY2qXey\n0NADWp56ndNDq0ZSggo9WzAGnpjbZ4iLIYBibQzYlWHah3f9vtQeg3AgM/dwZwxF\ngQhR70f3pvEMWnf46qYHtdQXIb39yl/8N4OjPf0CgYEAyIOx7Yt8ptN3OqinIUGp\niINz3a0Lr9QmGvyE1anZ4Ry0K3ro7+gurUO+UHYzj6utfkI5zL73HaSomZwtcQYQ\n9eTmE/VXe0M9XKfZHpEFSuBd7foK11Z+wLSw1EO1EEP08KH54mBQ0BWSTySGlBbL\nsNsdOU5Evtg211gOWAHFCX4=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-fbsvc@auto-234d3.iam.gserviceaccount.com",
    client_id: "105238607857140276840",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40auto-234d3.iam.gserviceaccount.com",
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin.firestore();