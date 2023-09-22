/**
 * Dynamic import will always download the full contents of the imported scripts.
 * So, we use a wrapper script that imports and re-exports the parts of the SheetJS library that we need.
 * https://docs.sheetjs.com/docs/getting-started/installation/frameworks#dynamic-imports
 */
import { read, utils } from "xlsx";
export { read, utils };
