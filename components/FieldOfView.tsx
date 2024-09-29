import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function FieldOfView() {
  const { sliderFocal } = useContext(AppContext);

  const radius = 150; // The radius of the circle
  const centerX = 125;
  const centerY = 152;

  const startAngle = 270 - sliderFocal / 2;
  const endAngle = 270 + sliderFocal / 2;

  const startRadians = (startAngle * Math.PI) / 180;
  const endRadians = (endAngle * Math.PI) / 180;

  const x1 = centerX + radius * Math.cos(startRadians);
  const y1 = centerY + radius * Math.sin(startRadians);
  const x2 = centerX + radius * Math.cos(endRadians);
  const y2 = centerY + radius * Math.sin(endRadians);

  const largeArcFlag = sliderFocal <= 180 ? "0" : "1";
  const pathData = `
    M ${centerX},${centerY}
    L ${x1},${y1} 
    A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} 
    Z
  `;

  return (
    <View style={{ justifyContent: "center", paddingBottom: 20 }}>
      <Svg height="160" width="250">
        <Path d={pathData} fill="#B7D5EE" stroke="#bbb" strokeWidth="3" />
      </Svg>
    </View>
  );
}
