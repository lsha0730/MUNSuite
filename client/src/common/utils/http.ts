import axios from "axios";
import { CUSTOM_BACKEND_URL } from "../constants";
import { StaffAccountInfo } from "../../staff_side/StaffApp";

export async function getHostAccountInfo(
  uid: string,
  callback: (data: StaffAccountInfo) => void
) {
  const url = `${CUSTOM_BACKEND_URL}/account/info`;
  const body = { uid };
  const response = await axios.post(url, body);
  callback(response.data as StaffAccountInfo);
}
