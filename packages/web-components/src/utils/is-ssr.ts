import { isServer } from "lit";

const isSSR = () => isServer || typeof window === "undefined";

export default isSSR;
