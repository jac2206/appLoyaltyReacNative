import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { getCurrentWeekLabel } from "../utils/date-util";

interface Props {
  data: number[];
}

export function ActivityChart({ data }: Props) {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const weekLabel = getCurrentWeekLabel();

  const [selected, setSelected] = useState<{
    day: string;
    value: number;
  } | null>(null);

  const chartData = data.map((value, index) => ({
    value,
    label: days[index],
    frontColor: "#2563EB",
    onPress: () =>
      setSelected({
        day: days[index],
        value,
      }),
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actividad semanal</Text>
      <Text style={styles.subtitle}>{weekLabel}</Text>

      <BarChart
        data={chartData}
        barWidth={22}
        spacing={20}
        roundedTop
        yAxisThickness={0}
        xAxisThickness={0}
        noOfSections={4}
        isAnimated
      />

      {selected && (
        <Text style={styles.selectedText}>
          Seleccionado {selected.day}: {selected.value} pts
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 15,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 14,
    color: "#1E293B",
    fontWeight: "500",
  },
});
