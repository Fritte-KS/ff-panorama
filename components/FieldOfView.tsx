import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import calculateAngleOfView from "../utils/calculateAngleOfView";

export default function FieldOfView() {
  const { sliderFocal, isPortrait } = useContext(AppContext);

  const angleOfView: number = calculateAngleOfView(
    Number(sliderFocal),
    isPortrait
  );

  const radius: number = 150; // The radius of the circle.
  const centerX: number = 130;
  const centerY: number = 152;

  const startAngle: number = 270 - angleOfView / 2;
  const endAngle: number = 270 + angleOfView / 2;

  const startRadians: number = (startAngle * Math.PI) / 180;
  const endRadians: number = (endAngle * Math.PI) / 180;

  const x1: number = centerX + radius * Math.cos(startRadians);
  const y1: number = centerY + radius * Math.sin(startRadians);
  const x2: number = centerX + radius * Math.cos(endRadians);
  const y2: number = centerY + radius * Math.sin(endRadians);

  const largeArcFlag: string = angleOfView <= 180 ? "0" : "1";
  const pathData: string = `
    M ${centerX},${centerY}
    L ${x1},${y1} 
    A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} 
    Z
  `;

  return (
    <View style={s.container}>
      <Text style={s.angleText}>{angleOfView.toFixed(0)}°</Text>
      <Svg height="160" width="260">
        <Path d={pathData} fill="#B7D5EE" stroke="#bbb" strokeWidth="3" />
      </Svg>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingBottom: 20,
  },
  angleText: {
    fontSize: 18,
    marginBottom: -50, // Adjust to move angleOfView illustration up or down, not the text.
    marginTop: 50, // Adjust to move both text and angleOfView illustration up or down.
    textAlign: "center",
    zIndex: 1,
  },
});
