const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const model = require("../models/index");

app.use(bodyParser.json());

const today = new Date().toISOString().split("T")[0];
const empId = "DO220228";
const base_url = "https://apigonbcv2c15.dataon.comA";
const auth_token = "SFGO172916269593203298421870918473";
// A60FD2B72CE7452F8E59EB971E1E7E64
// SFGO172916175764204590519287655668
const send_whatsapp_message = async (message) => {
    const encoded_message = encodeURIComponent(message);
    await axios.get(
        `https://api.callmebot.com/whatsapp.php?phone=6285731234852&text=${encoded_message}&apikey=4573794`
    );
};

const getHeaders = () => ({
    Authorization: auth_token,
    Connection: "keep-alive",
    "Content-Type": "application/json; charset=UTF-8",
    Origin: "https://app.greatdayhr.com",
    Referer: "https://app.greatdayhr.com/",
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    app: "gd8",
    "ngsw-bypass": "",
});

const getFullName = async () => {
    const response = await axios.post(
        `${base_url}/employees/newGetEmp`,
        {
            fullName: "",
            dataAuth: false,
            positionId: [],
            paging: false,
            empId: empId,
        },
        { headers: getHeaders() }
    );

    return response.data.data[0].fullName;
};

const getTodayStatus = async () => {
    const response = await axios.post(
        `${base_url}/attendances/getUserAttendanceWeekNew`,
        {
            empId: empId,
            startDate: today,
            endDate: today,
        },
        { headers: getHeaders() }
    );

    return response.data.info[0].shiftdailycode;
};

const sendAttendance = async () => {
    const response = await axios.post(
        `${base_url}/attendanceSf6/AddToTemp`,
        {
            empid: empId,
            companyId: 32898,
            datetime: `${today}T13:02:36.256Z`,
            geolocation: {
                latitude: -6.242954530721492,
                longitude: 106.87123344562129,
                accuracy: 132,
                cacheLocation: false,
                address: "",
            },
            photo: null,
            attOn: "online",
            address: null,
            faceRecognition: {
                accuration: 0,
                liveness: null,
                livenessTreshold: 0.5,
                livenessCrashCount: 0,
                deviceInfo:
                    '{"SFGOVersionNumber":"","SFGOVersionCode":"","Model":"Chrome","Platform":"Browser","Version":"124.0.0.0","DeviceID":null,"IMEI":null,"Ready":true,"tokenFCM":""}',
                gdVersion: "",
            },
            setBasePhoto: false,
        },
        { headers: getHeaders() }
    );

    return response.data.data.success;
};

const reqAbsen = async (req, res) => {
    try {
        console.log(`Hari ini : ${today}, ${fullName} hari ini masuk ${todayStatus}`);
        const fullName = await getFullName();
        const todayStatus = await getTodayStatus();

        console.log(`Hari ini : ${today}, ${fullName} hari ini masuk ${todayStatus}`);
        await send_whatsapp_message(`Hari ini : ${today}, ${fullName} hari ini masuk ${todayStatus}`);

        if (todayStatus !== "OFF") {
            // const absen = await sendAttendance();
            // const currentTime = new Date().toLocaleString();

            if (absen === true) {
                await send_whatsapp_message(`Sukses mengirimkan absen di greatday pada ${currentTime} TOLOL`);
            } else {
                await send_whatsapp_message(`Gagal mengirimkan absen di greatday, harus dicek ini. TOLOL`);
            }
        } else {
            await send_whatsapp_message(
                `Absen untuk ${fullName} Hari ini ${todayStatus}, jadi tidak perlu absen TOLOL`
            );
        }

        res.status(200).send("Process completed");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

const cron_runner = async (req, res) => {
    console.log("cron berjalan");
    const data = await model.User.findAll();
    console.log(data);
};

module.exports = { reqAbsen, cron_runner };
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
