import { isServer } from "lit";

const isSsr = () => isServer || typeof window === "undefined";

export default isSsr;
