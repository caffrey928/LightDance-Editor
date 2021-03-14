import axios from "axios";
// import * as CONSTANT from "../../constants";
const COMMANDS = require("../../../constant");

export default Object.values(COMMANDS).reduce((acc, command) => {
  let callback = null;
  switch (command) {
    case COMMANDS.PLAY:
      callback = ({ startTime, delay, selectedDancers }) => {
        axios.post(`/api/${command}`, {
          args: { startTime, delay },
          selectedDancers,
        });
      };
      break;
    case COMMANDS.UPLOAD_CONTROL:
      callback = ({ controlJson, selectedDancers }) => {
        console.log(controlJson);

        axios.post(`/api/${command}`, {
          args: { controlJson },
          selectedDancers,
        });
      };
      break;
    case COMMANDS.UPLOAD_LED:
      // ledData is an array
      callback = ({ ledData, selectedDancers }) => {
        axios.post(`/api/${command}`, { args: { ledData }, selectedDancers });
      };
      break;
    case COMMANDS.LIGTHCURRENTSTATUS:
      callback = ({ lightCurrentStatus, selectedDancers }) => {
        axios.post(`/api/${command}`, {
          args: { lightCurrentStatus },
          selectedDancers,
        });
      };
      break;
    default:
      callback = ({ selectedDancers }) => {
        axios.post(`/api/${command}`, { args: {}, selectedDancers });
      };
      break;
  }
  return {
    ...acc,
    [command]: callback,
  };
}, {});
