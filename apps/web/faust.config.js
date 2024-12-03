import { setConfig } from "@faustwp/core/dist/mjs/config/index.js";
import possibleTypes from "./possibleTypes.json";
import ApolloClientOptionsPlugin from "./plugins/ApolloClientOptionsPlugin";
import { UploadPlugin } from "./plugins/UploadPlugin";


/** @type {import('@faustwp/core').FaustConfig} */
export default setConfig({
  possibleTypes,
  plugins: [new UploadPlugin(), new ApolloClientOptionsPlugin()],
});
