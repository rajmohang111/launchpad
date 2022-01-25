const OnsenMock = require("./src/__mocks__/react-onsenui");
jest.mock("react-onsenui", () => OnsenMock);
const uuidMock = require("./src/__mocks__/uuid").default;
jest.mock("uuid/v4", () => uuidMock);
const IoniconMock = require("./src/__mocks__/react-ionicons");
jest.mock("react-ionicons", () => IoniconMock);

global.fetch = require("jest-fetch-mock");
require("jest-date-mock");
require("jest-expect-message");

const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-15');

configure({ adapter: new Adapter() });
