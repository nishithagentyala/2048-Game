const PickColor = (num) => {
  switch (num) {
    case 2:
      return "white";
    case 4:
      return "coral";
    case 8:
      return "cyan";
    case 16:
      return "royalblue";
    case 32:
      return "slateblue";
    case 64:
      return "chocolate";
    case 128:
      return "maroon";
    case 256:
      return "mediumseagreen";
    case 512:
      return "springgreen";
    case 1024:
      return "darkorange";
    case 2048:
      return "hotpink";
    default:
      return "lightgray";
  }
};

export default PickColor;
