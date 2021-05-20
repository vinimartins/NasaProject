import axios from "axios";

const token = "dHibVheWA2fA9aXWNzoC1aMTeesGBnGMtbqZjhx6";

const weekMs = 1000 * 60 * 60 * 24 * 7;
const todayObj = new Date();
const todayMs = todayObj.getTime();
const pastWeekObj = new Date(todayMs - weekMs);

const todayStr = todayObj.toISOString().slice(0, 10);
const pastWeekStr = pastWeekObj.toISOString().slice(0, 10);

export const nasaApi = axios.create({
  baseURL: `https://api.nasa.gov/neo/rest/v1/feed?start_date=${pastWeekStr}&end_date=${todayStr}&api_key=${token}`,
});
