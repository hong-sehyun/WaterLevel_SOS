const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = 3001;

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));


app.get('/fetchData', async (req, res) => {
    const { tm1, tm2, stn, disp, help, authKey } = req.query;

    const API_ENDPOINT = `http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${authKey}&numOfRows=10&pageNo=1&dataCd=ASOS&dateCd=DAY&startDt=${tm1}&endDt=${tm2}&stnIds=${stn}&dataType=JSON`;

    try {
        const response = await axios.get(API_ENDPOINT);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from the API:", error);
        res.status(500).json({ message: "Error fetching data from the API" });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
