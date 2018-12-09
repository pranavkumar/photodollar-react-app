var PrimaryButtonProps = {
  title: "Button",
  containerStyle: {
    padding: 10,
    height: 55,
    width: 100,
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "white"
  },
  buttonStyle: {
    fontSize: 16,
    backgroundColor: "#536DFE",
    color: "white",
    fontWeight: "normal",
    height: "100%",
    width: "100%",
    borderRadius: 4,
    paddingTop: 5
  }
};

var PrimaryButtonOutlineProps = {
  title: "Button",
  containerStyle: {
    padding: 10,
    height: 55,
    width: 100,
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "white"
  },
  buttonStyle: {
    fontSize: 16,
    backgroundColor: "white",
    color: "#536DFE",
    fontWeight: "normal",
    height: "100%",
    width: "100%",
    borderRadius: 4,
    paddingTop: 5,
    borderWidth: 1,
    borderColor: "#536DFE"
  }
};

var SeparatorProps = {
  width: "100%",
  borderBottomColor: "rgb(189,189,189)",
  borderBottomWidth: 1,
  marginTop: 8,
  marginBottom: 8
}

var BinaryChoiceModalProps = {
    flex: 0,
    backgroundColor: "white",
    padding: 14
}

module.exports = {
  PrimaryButtonProps,
  PrimaryButtonOutlineProps,
  SeparatorProps,
  BinaryChoiceModalProps
};
