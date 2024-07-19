import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  parennt: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  leftovers: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(47, 71, 190, 0.591)",
    marginVertical: 5,
  },

  child: {
    padding: 15,
    paddingTop: 20,
    paddingBottom: 15,
    borderRadius: 5,
    backgroundColor: "#ebeef2",
    position: "relative",
    minWidth: "90%",
  },

  title: { fontSize: 17, fontWeight: "500", marginBottom: 10, maxWidth: "85%" },

  addDataBlock: {
    width: "95%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  inputTitle: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 15,
    color: "#222",
    marginBottom: 5,
    paddingLeft: 2,
  },

  inputBlock: { width: "48%", minWidth: "48%" },

  input: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 42,
    borderRadius: 5,
    borderColor: "rgb(217 223 232)",
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  btnAdd: {
    color: "#fff",
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "rgb(217 223 232)",
    fontSize: 18,
    marginTop: 10,
    backgroundColor: "rgba(97 ,100, 239,0.7)",
    width: "45%",
    marginBottom: 0,
  },

  //////////////////// krestik
  krest: {
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    position: "absolute",
    right: 0,
    top: 20,
  },

  line: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "red",
  },

  deg: { transform: [{ rotate: "45deg" }] },
  degMinus: { transform: [{ rotate: "-45deg" }] },
});

export default styles;
