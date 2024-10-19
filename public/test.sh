#!/bin/bash

today=$(date +"%Y-%m-%d")
empId="DO220228"
base_url="https://apigonbcv2c15.dataon.com"
# auth_token="SFGO172916175764204590519287655668"
auth_token="SFGO172916269593203298421870918473"
phone="6285731234852"
keywa="4573794"
send_whatsapp_message() {
    local message=$1
    local encoded_message=$(echo $message | jq -sRr @uri)
    curl -s -X GET "https://api.callmebot.com/whatsapp.php?phone=$phone&text=$encoded_message&apikey=$keywa"
}

curl_headers() {
    curl -s -H "Authorization: $auth_token" \
        -H 'Connection: keep-alive' \
        -H 'Content-Type: application/json; charset=UTF-8' \
        -H 'Origin: https://app.greatdayhr.com' \
        -H 'Referer: https://app.greatdayhr.com/' \
        -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
        -H 'app: gd8' \
        -H 'ngsw-bypass;' \
        "$@"
}

full_name=$(curl_headers "$base_url/employees/newGetEmp" \
    --data-raw '{"fullName":"","dataAuth":false,"positionId":[],"paging":false,"empId":"'$empId'"}' | jq -r '.data[].fullName')

today_status=$(curl_headers "$base_url/attendances/getUserAttendanceWeekNew" \
    --data-raw '{"empId":"'$empId'","startDate":"'$today'","endDate":"'$today'"}' | jq -r '.info[].shiftdailycode')

echo "Hari ini : $today, $full_name hari ini masuk $today_status"
send_whatsapp_message  "Hari ini : $today, $full_name hari ini masuk $today_status"

if [ "$today_status" != "OFF" ]; then
    # Mengirim absen
    absen=$(curl_headers "$base_url/attendanceSf6/AddToTemp" \
        --data-raw '{"empid":"'$empId'","companyId":32898,"datetime":"'"$today"'T13:02:36.256Z","geolocation":{"latitude":-6.242954530721492,"longitude":106.87123344562129,"accuracy":132,"cacheLocation":false,"address":""},"photo":null,"attOn":"online","address":null,"faceRecognition":{"accuration":0,"liveness":null,"livenessTreshold":0.5,"livenessCrashCount":0,"deviceInfo":"{\"SFGOVersionNumber\":\"\",\"SFGOVersionCode\":\"\",\"Model\":\"Chrome\",\"Platform\":\"Browser\",\"Version\":\"124.0.0.0\",\"DeviceID\":null,\"IMEI\":null,\"Ready\":true,\"tokenFCM\":\"\"}","gdVersion":""},"setBasePhoto":false}' | jq -r '.data.success')

    current_time=$(date +"%d-%m-%Y %H:%M:%S")
    
    if [ "$absen" = "true" ]; then
        send_whatsapp_message "Sukses mengirimkan absen di greatday pada $current_time TOLOL"
    else
        send_whatsapp_message "Gagal mengirimkan absen di greatday, harus dicek ini. TOLOL"
    fi
else
    send_whatsapp_message "Absen untuk $full_name Hari ini $today_status, jadi tidak perlu absen TOLOL"
fi