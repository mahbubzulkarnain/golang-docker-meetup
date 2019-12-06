import axios from "axios";
import { config } from "dotenv";

config();

const BASE_URL_XENDIT = process.env.BASE_URL_XENDIT;

export default async () => {

  const payload = {
    amount           : 0,
    currency         : "IDR",
    description      : "INVOICE::",
    external_id      : "",
    invoice_duration : 86400 * 7,
    payer_email      : "",
    should_send_email: "false",
  };

  await axios.post(`${BASE_URL_XENDIT}/v2/invoices`, payload);
};
