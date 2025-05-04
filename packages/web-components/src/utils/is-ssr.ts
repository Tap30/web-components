import { isServer } from "lit";

const isSsr = (): boolean => isServer || typeof window === "undefined";

export default isSsr;
